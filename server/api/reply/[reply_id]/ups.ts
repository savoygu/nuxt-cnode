import { baseURL } from '~/server/constants'

type Response = {
  success: boolean
  action: 'up' | 'down'
}

export default defineEventHandler(async event => {
  const body = await readBody(event)
  const accesstoken = body.accesstoken

  const replyId = event.context.params?.reply_id
  const response = await $fetch<Response>(`/reply/${replyId}/ups`, {
    baseURL,
    method: 'POST',
    body: {
      accesstoken
    }
  })
  if (!response.success) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error'
    })
  }
  return response
})
