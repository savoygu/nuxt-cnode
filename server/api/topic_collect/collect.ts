import { baseURL } from '~/server/constants'

export default defineEventHandler(async event => {
  const body = await readBody(event)

  const response = await $fetch<{ success: boolean }>(`/topic_collect/collect`, {
    baseURL,
    method: 'POST',
    body
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
