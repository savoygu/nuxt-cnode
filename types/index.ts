export type Author = {
  loginname: string
  avatar_url: string
}

export type Ranking = {
  user: string
  score: number
}

// 回复
export type Reply = {
  id: string
  author: Author
  content: string
  ups: string[]
  create_at: string
  reply_id?: string
  is_uped: boolean
}

// 话题
export type Topic = {
  id: string
  author_id: string
  tab: string
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
export type Response<T> = {
  success: boolean
  data: T
}

export type ResponseErr = {
  success: boolean
  error_msg: string
}

export type Token = {
  success: boolean
  id: string
  loginname: string
  avatar_url: string
}

export type User = {
  loginname: string
  avatar_url: string
  githubUsername: string
  score: number
  recent_topics: Topic[]
  recent_replies: []
}
