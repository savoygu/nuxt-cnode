import type { NitroFetchOptions } from 'nitropack'
import { omit } from 'lodash-es'
import { FetchFactory } from '../factory'

export class CNodeModule extends FetchFactory {
  private RESOURCE = '/api/v1'

  // 主题
  topics(query: { page: number, tab: string, limit: number, mdrender: string }, opts?: NitroFetchOptions<'json'>) {
    return this.$fetch<APIResponse<CNodeTopic[]>>(`${this.RESOURCE}/topics`, {
      query,
      ...opts,
    })
  }

  topic(query: { id: string, accesstoken: string, mdrender: string }, opts?: NitroFetchOptions<'json'>) {
    return this.$fetch<APIResponse<CNodeTopic>>(`${this.RESOURCE}/topic/${query.id}`, {
      query: omit(query, 'id'),
      ...opts,
    })
  }

  createTopic(body: { accesstoken: string, title: string, tab: string, content: string }, opts?: NitroFetchOptions<'json'>) {
    return this.$fetch<APIResponse<{ topic_id: string }>>(`${this.RESOURCE}/topics`, {
      method: 'POST',
      body,
      ...opts,
    })
  }

  updateTopic(body: { topic_id: string, accesstoken: string, title: string, tab: string, content: string }, opts?: NitroFetchOptions<'json'>) {
    return this.$fetch<APIResponse<{ topic_id: string }>>(`${this.RESOURCE}/topics/update`, {
      method: 'POST',
      body,
      ...opts,
    })
  }

  collectTopic(body: { accesstoken: string, topic_id: string }, opts?: NitroFetchOptions<'json'>) {
    return this.$fetch<APIResponse>(`${this.RESOURCE}/topic_collect/collect`, {
      method: 'POST',
      body,
      ...opts,
    })
  }

  deCollectTopic(body: { accesstoken: string, topic_id: string }, opts?: NitroFetchOptions<'json'>) {
    return this.$fetch<APIResponse>(`${this.RESOURCE}/topic_collect/de_collect`, {
      method: 'POST',
      body,
      ...opts,
    })
  }

  topicCollects(query: { loginname: string }, opts?: NitroFetchOptions<'json'>) {
    return this.$fetch<APIResponse<CNodeTopic[]>>(`${this.RESOURCE}/topic_collect/${query.loginname}`, {
      ...opts,
    })
  }

  // 评论
  createReply(body: { accesstoken: string, topic_id: string, content: string, reply_id?: string }, opts?: NitroFetchOptions<'json'>) {
    return this.$fetch<APIResponse<{ reply_id: string }>>(`${this.RESOURCE}/topic/${body.topic_id}/replies`, {
      method: 'POST',
      body: omit(body, 'topic_id'),
      ...opts,
    })
  }

  upReply(body: { accesstoken: string, reply_id: string }, opts?: NitroFetchOptions<'json'>) {
    return this.$fetch<APIResponse<{ action: 'up' | 'down' }>>(`${this.RESOURCE}/reply/${body.reply_id}/ups`, {
      method: 'POST',
      body: omit(body, 'reply_id'),
      ...opts,
    })
  }

  // 用户
  user(query: { loginname: string }, opts?: NitroFetchOptions<'json'>) {
    return this.$fetch<APIResponse<CNodeUser>>(`${this.RESOURCE}/user/${query.loginname}`, {
      ...opts,
    })
  }

  accesstoken(body: { accesstoken: string }, opts?: NitroFetchOptions<'json'>) {
    return this.$fetch<APIResponse<CNodeToken>>(`${this.RESOURCE}/accesstoken`, {
      method: 'POST',
      body,
      ...opts,
    })
  }

  // 消息通知
  messageCount(query: { accesstoken: string }, opts?: NitroFetchOptions<'json'>) {
    return this.$fetch<APIResponse<number>>(`${this.RESOURCE}/message/count`, {
      query,
      ...opts,
    })
  }

  messages(query: { accesstoken: string, mdrender?: boolean }, opts?: NitroFetchOptions<'json'>) {
    return this.$fetch<APIResponse<{ has_read_messages: CNodeMessage[], hasnot_read_messages: Message[] }>>(`${this.RESOURCE}/messages`, {
      query,
      ...opts,
    })
  }

  messageMarkAll(body: { accesstoken: string }, opts?: NitroFetchOptions<'json'>) {
    return this.$fetch<APIResponse<{ marked_msgs: { id: string }[] }>>(`${this.RESOURCE}/message/mark_all`, {
      method: 'POST',
      body,
      ...opts,
    })
  }

  messageMarkOne(body: { accesstoken: string, msgId: string }, opts?: NitroFetchOptions<'json'>) {
    return this.$fetch<APIResponse<{ marked_msg_id: string }>>(`${this.RESOURCE}/message/mark_one/${body.msgId}`, {
      method: 'POST',
      body: omit(body, 'msgId'),
      ...opts,
    })
  }
}

export interface CNodeAuthor {
  loginname: string
  avatar_url: string
}

export interface CNodeRanking {
  user: string
  score: number
}

// 回复
export interface CNodeReply {
  id: string
  author: Author
  content: string
  ups: string[]
  create_at: string
  reply_id?: string
  is_uped: boolean
}

// 话题
export interface CNodeTopic {
  id: string
  author_id: string
  tab: Tab
  content: string
  text?: string
  title: string
  last_reply_at: string
  good: boolean
  top: boolean
  reply_count: number
  visit_count: number
  create_at: string
  author: Author
  replies: Reply[]
  is_collect: boolean
}

export interface CNodeUser {
  loginname: string
  avatar_url: string
  githubUsername: string
  create_at: string
  score: number
  recent_topics: CNodeTopic[]
  recent_replies: CNodeTopic[]
}

export interface CNodeMessage {
  id: string
  type: string
  has_read: boolean
  author: CNodeAuthor
  topic: CNodeTopic
  reply: CNodeReply
}

export interface CNodeToken {
  id: string
  loginname: string
  avatar_url: string
}
