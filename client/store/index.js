import Vue from 'vue'

import { validTabs } from '~/common/constants'
import { lazy } from '~/common/utils'
import { get, post } from '~/common/http'
import { store } from '~/common/store'
import { CancelToken } from 'axios'

export default {
  // =================================================
  // State
  // =================================================
  state: () => {
    const state = {
      items: {
        /* [id: number]: Item */
      },
      topics: {
        /* [page: number] : [ [id: number] ] */
      },
      user: null,
      users: {
        /* [id: string]: User */
      },
      createdTopics: {

      },
      loading: false
    }

    validTabs.forEach(tab => {
      state.topics[tab] = {}
    })

    return state
  },
  // =================================================
  // Actions
  // =================================================
  actions: {
    nuxtServerInit({ commit }, { req }) {
      if (req.session.user) {
        const user = req.session.user
        commit('SET_ACCESSTOKEN', { accesstoken: user.accesstoken, item: user })
      } else {
        commit('SET_ACCESSTOKEN', { accesstoken: '', item: null })
      }
    },

    FETCH_ITEM ({ commit, state }, { id }) {
      return lazy(
        item => commit('SET_ITEM', { item }),
        () => get('/topic/' + id),
        Object.assign({ id, loading: true, replies: [] }, state.items[id])
      )
    },

    FETCH_TOPIC ({ commit, state }, { tab, page, prefetch }) {
      if (state.topics[tab][page] && state.topics[tab][page].length) {
        prefetch = true
      }

      if (!prefetch) {
        if (this.topicCancelSource) {
          this.topicCancelSource.cancel(
            'priorotize topic: ' + tab + ' page: ' + page
          )
        }
        this.topicCancelSource = CancelToken.source()
      }

      return lazy(
        items => {
          const ids = items.map(item => item.id)
          commit('SET_TOPIC', { tab, ids, page })
          commit('SET_ITEMS', { items })
        },
        () =>  this.$axios.$get('/api/topics', {
          params: {
            page,
            tab,
            limit: 40,
            mdrender: true
          },
          cancelToken: this.topicCancelSource && this.topicCancelSource.token
        }),
        (state.topics[tab][page] || []).map(id => state.items[id])
      )
    },

    FETCH_ACCESSTOKEN ({ commit, state }, { accesstoken }) {
      return lazy(
        item => commit('SET_ACCESSTOKEN', { item }),
        () => post('/user/login', {},  {
          accesstoken
        }),
        Object.assign({ loading: true }, state.user)
      )
    },

    async LOGOUT ({ commit }) {
      await get('/user/logout')
      commit('SET_ACCESSTOKEN', { item: null })
      this.$router.push('/')
    },

    FETCH_USER ({ commit, state }, { name }) {
      return lazy(
        user => commit('SET_USER', { name, user }),
        () => get('/user/' + name),
        Object.assign({ name, loading: true, replies: [], topices: [] }, state.users[name])
      )
    },

    async CREATE_TOPIC ({ commit, state }, { tab, title, content }) {
      commit('SET_LOADING', { loading: true })
      await post('/topics', {
        needAccessToken: true
      }, {
        tab: 'dev', // 防止误操作😆
        title,
        content
      })
      commit('SET_LOADING', { loading: false })
      this.$router.push('/')
    }
  },
  // =================================================
  // Mutations
  // =================================================
  mutations: {
    SET_ITEM: (state, { item }) => {
      if (item) {
        Vue.set(state.items, item.id, item)
      }
    },

    SET_TOPIC: (state, { tab, ids, page }) => {
      Vue.set(state.topics[tab], page, ids)
    },

    SET_ITEMS: (state, { items }) => {
      items.forEach(item => {
        if (item) {
          Vue.set(state.items, item.id, item)
        }
      })
    },

    SET_ACCESSTOKEN: (state, { item }) => {
      Vue.set(state, 'user', item)
    },

    SET_USER: (state, { name, user }) => {
      Vue.set(state.users, name, user || false) /* false means user not found */
    },

    SET_LOADING: (state, { loading }) => {
      Vue.set(state, 'loading', loading)
    }
  }
}
