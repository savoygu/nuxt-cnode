import { baseURL } from '~/server/constants'
import type { ResponseTopic } from '~/types'

export default defineEventHandler(async event => {
  const body = await readBody(event)
  const response = await $fetch<ResponseTopic>('/topics/update', {
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
