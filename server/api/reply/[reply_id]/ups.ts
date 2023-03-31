import { baseURL } from '~/server/constants'
import type { ResponseStar } from '~/types'

export default defineEventHandler(async event => {
  const body = await readBody(event)
  const accesstoken = body.accesstoken
  const replyId = event.context.params?.reply_id

  const response = await $fetch<ResponseStar>(`/reply/${replyId}/ups`, {
    baseURL,
    method: 'POST',
    body: {
      accesstoken
    }
  })
  if (!response.success) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error',
      data: response
    })
  }
  return response
})
