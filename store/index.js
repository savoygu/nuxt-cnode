import Vue from 'vue'

import { validTabs } from '~/common/constants'
import { lazy } from '~/common/utils'
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
      accesstoken: '',
      tokens: {
        /* [accesstoken: string]: User */
      },
      users: {
        /* [id: string]: User */
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
    FETCH_ITEM ({ commit, state }, { id }) {
      return lazy(
        item => commit('SET_ITEM', { item }),
        () => this.$axios.$get('/api/topic/' + id),
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
        item => commit('SET_ACCESSTOKEN', { accesstoken, item }),
        () => this.$axios.$post('/api/accesstoken', {
          accesstoken
        }),
        Object.assign({ accesstoken, loading: true }, state.tokens[accesstoken])
      )
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

    SET_ACCESSTOKEN: (state, { item, accesstoken }) => {
      Vue.set(state, 'accesstoken', accesstoken)
      Vue.set(state.tokens, accesstoken, item)
    }
  }
}
