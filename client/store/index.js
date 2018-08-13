import Vue from 'vue'

import { validTabs } from '~/common/constants'
import { lazy } from '~/common/utils'
// import { get, post } from '~/common/http'
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
      collections: {
        /* [name: string]: User Collect */
      },
      loading: false,
      // page: '',
      messages: {
        /* [name: string]: { read: [], unread: [] } */
      }
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

    FETCH_ITEM ({ commit, state, dispatch }, { id, mdrender = true }) {
      return lazy(
        item => commit('SET_ITEM', { item }),
        async () => {
          let item = await this.$axios.$get('/api/topic/' + id, {
            params: {
              mdrender: mdrender,
              needAccessToken: state.user ? true : ''
            }
          })

          await dispatch('FETCH_USER', { name: item.data.author.loginname })

          // let name = item.data.author.loginname
          // let user = await this.$axios.$get('/api/user/' + name)
          // commit('SET_USER', { name, user: user.data })

          return item
        },
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
        () => this.$axios.$post('/api/user/login', {
          accesstoken
        }),
        Object.assign({ loading: true }, state.user)
      )
    },

    async LOGOUT ({ commit }) {
      await this.$axios.$get('/api/user/logout')
      commit('SET_ACCESSTOKEN', { item: null })
      this.$router.push('/')
    },

    FETCH_USER ({ commit, state }, { name }) {
      return lazy(
        user => commit('SET_USER', { name, user }),
        () => this.$axios.$get('/api/user/' + name),
        Object.assign({ name, loading: true, replies: [], topices: [] }, state.users[name])
      )
    },

    async CREATE_TOPIC ({ commit, state }, { tab, title, content }) {
      commit('SET_LOADING', { loading: true })
      await this.$axios.$post('/api/topics?needAccessToken=true', {
        tab: 'dev', // 防止误操作😆
        title,
        content
      })
      commit('SET_LOADING', { loading: false })
      this.$router.push('/')
    },

    async UPDATE_TOPIC ({ commit, state }, { id, tab, title, content }) {
      commit('SET_LOADING', { loading: true })
      await this.$axios.$post('/api/topics/update?needAccessToken=true', {
        topic_id: id,
        tab: 'dev', // 防止误操作😆
        title,
        content
      })
      commit('SET_LOADING', { loading: false })
      this.$router.push('/')
    },

    async COLLECT_TOPIC ({ commit, state }, { id, cancel }) {
      commit('SET_LOADING', { loading: true })
      await this.$axios.$post(`/api/topic_collect/${cancel ? 'de_collect' : 'collect'}?needAccessToken=true`, {
        topic_id: id
      })
      commit('SET_LOADING', { loading: false })
      commit('SET_ITEM', { item: Object.assign({}, state.items[id], { is_collect: !cancel }) })
    },

    FETCH_COLLECT ({ commit, state }, { name }) {
      return lazy(
        collections => commit('SET_COLLECT', { name, collections }),
        () => this.$axios.$get(`/api/topic_collect/${name}`),
        { loading: true }
      )
    },

    FETCH_MESSAGE ({ commit, state }) {
      return lazy(
        data => commit('SET_MESSAGE', { data }),
        () => this.$axios.$get('/api/messages?needAccessToken=true'),
        { loading: true }
      )
    },

    async REPLY_TOPIC ({ commit, state, dispatch }, { id, content, reply_id }) {
      let data = { content }
      if (reply_id) {
        data.reply_id = reply_id
      }
      await this.$axios.$post(`/api/topic/${id}/replies?needAccessToken=true`, data)
      dispatch('FETCH_ITEM', { id })
    },

    async STAR_TOPIC ({ commit, state }, { reply_id }) {
      await this.$axios.$post(`/api/reply/${reply_id}/ups?needAccessToken=true`)
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
      if (
        user && !user.loading &&
        state.user &&
        user.loginname === state.user.loginname
      ) { // 如果获取的是当前登录用户
        Vue.set(state, 'user', Object.assign({}, state.user, user))
      }
    },

    SET_LOADING: (state, { loading }) => {
      Vue.set(state, 'loading', loading)
    },

    SET_COLLECT: (state, { name, collections }) => {
      Vue.set(state, 'loading', !!collections.loading)
      Vue.set(state.collections, name, collections)
    },

    SET_PAGE: (state, { page }) => {
      Vue.set(state, 'page', page)
    },

    SET_MESSAGE: (state, { data }) => {
      Vue.set(state, 'loading', !!data.loading)
      Vue.set(state.messages, 'read', data.has_read_messages)
      Vue.set(state.messages, 'unread', data.hasnot_read_messages)
    }
  }
}
