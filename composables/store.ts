import { Ref } from 'vue'
import { H3Error } from 'h3'
import { Response, ResponseErr, Topic, User } from '~/types'

export type RootState = {
  topics: Record<string, Topic>
  tabs: Record<string, Record<number, string[]>>
  user: null | User
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
    user: null, // INITIAL_USER
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

  const { data, refresh } = await useFetch(() => `/api/topics?tab=${currentTab.value}&page=${currentPage.value}`, {
    default: () => getTopics(state.value, query)
  })

  // update state
  const ids = data.value.map(topic => topic.id)
  state.value.tabs[currentTab.value][currentPage.value] = ids
  data.value.filter(Boolean).forEach(topic => {
    if (state.value.topics[topic.id]) {
      Object.assign(state.value.topics[topic.id], topic)
    } else {
      state.value.topics[topic.id] = topic
    }
  })

  return {
    data,
    refresh
  }
}

export async function fetchTopic(id: string, mdrender = true) {
  const state = useStore()
  const { data, refresh } = await useFetch<Topic>(`/api/topics/${id}`, {
    params: {
      // id,
      mdrender,
      needAccessToken: state.value.isLogin && mdrender
    },
    default: () => state.value.topics[id]
  })

  if (mdrender) {
    await fetchUser(data.value.author.loginname)
  } else {
    // 保存到 text 上??
    data.value.text = data.value.content
    // update state
  }

  state.value.topics[id] = data.value

  return {
    data,
    refresh
  }
}

// ===========================================================================
// User
// ===========================================================================

export async function fetchUser(loginname) {
  const store = useStore()
  const token = useToken()
  const { data } = await useFetch<User>(`/api/user/${loginname}`, {
    method: 'POST',
    body: {
      accesstoken: token.value
    },
    default: () => store.value.users[loginname]
  })
  store.value.users[loginname] = data.value
}

// ===========================================================================
// Token
// ===========================================================================

export async function fetchAccesstoken(accesstoken: string) {
  const state = useStore()
  const { data, error } = await useFetch<User, Response<H3Error>>('/api/accesstoken', {
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
  state.value.isLogin = data.value.success
  state.value.user = data.value
}

export function removeAccesstoken() {
  const store = useStore()
  store.value.isLogin = false
  store.value.user = null // INITIAL_USER
  useToken().value = null
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
    },
    initialCache: false // ? crazy
  })
  if (data.value.success) {
    const store = useStore()
    const topic = store.value.topics[topicId]
    topic.replies = topic.replies.map(reply => {
      if (reply.id === replyId) {
        reply.is_uped = data.value.action === 'up'
        if (reply.is_uped) {
          reply.ups.push(store.value.user.id)
        } else {
          reply.ups.splice(reply.ups.indexOf(store.value.user.id), 1)
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
