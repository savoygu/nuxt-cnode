import { baseURL } from '~/server/constants'
import { Response, Topic } from '~/types'

export default defineEventHandler(async event => {
  const loginname = event.context.params?.loginname
  const response = await $fetch<Response<Topic[]>>(`${baseURL}/topic_collect/${loginname}`)
  if (!response.success) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error'
    })
  }
  return response.data
})
