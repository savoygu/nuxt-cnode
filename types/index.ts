export interface Author {
  loginname: string
  avatar_url: string
}

export interface Ranking {
  user: string
  score: number
}

// 回复
export interface Reply {
  id: string
  author: Author
  content: string
  ups: string[]
  create_at: string
  reply_id?: string
  is_uped: boolean
}

// 话题
export interface Topic {
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

// Response
export interface Response<T> {
  success: boolean
  data: T
}

export interface ResponseError {
  success: boolean
  error_msg: string
}

export interface ResponseReply {
  success: boolean
  reply_id: string
}

export interface ResponseStar {
  success: boolean
  action: 'up' | 'down'
}

export interface ResponseTopic {
  success: boolean
  topic_id: string
}

export interface Token {
  success: boolean
  id: string
  loginname: string
  avatar_url: string
}

export interface User {
  loginname: string
  avatar_url: string
  githubUsername: string
  create_at: string
  score: number
  recent_topics: Topic[]
  recent_replies: Topic[]
}

export interface Message {
  id: string
  type: string
  has_read: boolean
  author: Author
  topic: Topic
  reply: Reply
}
