import type { Message, Response } from '~/types'
import { baseURL } from '~/server/constants'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const { mdrender = true, accesstoken } = query
  const response = await $fetch<Response<{ has_read_messages: Message[], hasnot_read_messages: Message[] }>>(
    '/messages',
    {
      baseURL,
      params: {
        mdrender,
        accesstoken,
      },
    },
  )
  if (!response.success) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error',
    })
  }
  return response.data
})
