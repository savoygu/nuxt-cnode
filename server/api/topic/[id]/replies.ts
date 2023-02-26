import { baseURL } from '~/server/constants'

export default defineEventHandler(async event => {
  const body = await readBody(event)
  const id = event.context.params?.id
  const response = await $fetch<{ success: boolean; reply_id: string }>(`/topic/${id}/replies`, {
    baseURL,
    method: 'POST',
    body
  })
  if (!response.success) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error'
    })
  }
  return response
})
