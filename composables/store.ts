import { Ref } from 'vue'
import { ResponseErr, Token, Topic, User } from '~/types'

export type RootState = {
  topics: Record<string, Topic>
  tabs: Record<string, Record<number, string[]>>
  user: undefined | Token
  users: Record<string, User>
  isLogin: boolean
}

export const INITIAL_USER = {
  success: false,
  id: '',
  loginname: '',
  avatar_url: '',
  accesstoken: ''
}

export const useStore = () =>
  useState<RootState>('main', () => ({
    topics: {},
    tabs: Object.fromEntries(validTabs.map(tab => [tab, {}])),
    isLogin: false,
    user: undefined, // INITIAL_USER
    users: {}
  }))

export type TopicQuery = {
  currentTab: Ref<string>
  currentPage: Ref<number>
}

// ===========================================================================
// Topic
// ===========================================================================

export function getTopics(state: RootState, query: TopicQuery) {
  const { currentTab, currentPage } = query

  const ids = state.tabs?.[currentTab.value]?.[currentPage.value] ?? []
  if (ids.length) {
    return ids.map(id => state.topics[id])
  }
}

export async function fetchTopics(query: TopicQuery) {
  const state = useStore()
  const { currentTab, currentPage } = query

  const { data, pending, refresh, error } = await useFetch(
    () => `/api/topics?tab=${currentTab.value}&page=${currentPage.value}`,
    {
      default: () => getTopics(state.value, query)
    }
  )

  // update state
  if (data.value) {
    const ids = data.value.map(topic => topic.id)
    state.value.tabs[currentTab.value][currentPage.value] = ids
    data.value.filter(Boolean).forEach(topic => {
      if (state.value.topics[topic.id]) {
        Object.assign(state.value.topics[topic.id], topic)
      } else {
        state.value.topics[topic.id] = topic
      }
    })
  }

  return {
    data,
    pending,
    refresh,
    error
  }
}

export async function fetchTopic(id: string, mdrender = true) {
  const state = useStore()
  const token = useToken()
  const { data, refresh } = await useFetch(`/api/topic/${id}`, {
    params: {
      mdrender,
      accesstoken: state.value.isLogin && mdrender ? token.value : ''
    },
    default: () => state.value.topics[id]
  })

  if (data.value) {
    state.value.topics[id] = data.value
  }

  return {
    data,
    refresh
  }
}

// ===========================================================================
// User
// ===========================================================================

export async function fetchUser(loginname: string) {
  const state = useStore()
  const { data } = await useFetch(`/api/user/${loginname}`, {
    default: () => state.value.users[loginname]
  })
  if (data.value) state.value.users[loginname] = data.value
}

// ===========================================================================
// Token
// ===========================================================================

export async function fetchAccesstoken(accesstoken: string) {
  const state = useStore()
  const { data, error } = await useFetch('/api/accesstoken', {
    method: 'POST',
    body: {
      accesstoken
    }
  })
  if (error.value) {
    if (typeof error.value !== 'boolean') {
      const { data } = error.value.data
      throw new TypeError((data as ResponseErr).error_msg)
    }
  }

  if (data.value) {
    state.value.isLogin = data.value.success
    state.value.user = data.value
  }
}

export function removeAccesstoken() {
  const store = useStore()
  store.value.isLogin = false
  store.value.user = undefined // INITIAL_USER
  useToken().value = ''
}

// ===========================================================================
// Reply
// ===========================================================================

export async function starReply({ topicId, replyId }: { topicId: string; replyId: string }) {
  const token = useToken()
  const { data } = await useFetch(`/api/reply/${replyId}/ups`, {
    method: 'POST',
    body: {
      accesstoken: token.value
    }
  })
  if (data.value && data.value.success) {
    const user = useStore().value.user
    const topics = useStore().value.topics
    const topic = topics[topicId]
    topic.replies = topic.replies.map(reply => {
      if (reply.id === replyId) {
        reply.is_uped = data.value!.action === 'up'
        if (user) {
          if (reply.is_uped) {
            reply.ups.push(user.id)
          } else {
            reply.ups.splice(reply.ups.indexOf(user.id), 1)
          }
        }
      }
      return reply
    })
  }
  return {
    data
  }
}

// export async function createReply() }
