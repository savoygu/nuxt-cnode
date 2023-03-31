import { baseURL } from '~/server/constants'
import type { Response, Topic } from '~/types'

export default defineEventHandler(async event => {
  const loginname = event.context.params?.loginname
  const response = await $fetch<Response<Topic[]>>(`/topic_collect/${loginname}`, {
    baseURL
  })
  if (!response.success) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error'
    })
  }
  return response.data
})
