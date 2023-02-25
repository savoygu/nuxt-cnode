import { baseURL } from '~/server/constants'

import { Message, Response } from '~/types'

export default defineEventHandler(async event => {
  const query = getQuery(event)
  const { mdrender = true, accesstoken } = query
  const response = await $fetch<Response<{ has_read_messages: Message[]; hasnot_read_messages: Message[] }>>(
    '/messages',
    {
      baseURL,
      params: {
        mdrender,
        accesstoken
      }
    }
  )
  if (!response.success) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error'
    })
  }
  return response.data
})
