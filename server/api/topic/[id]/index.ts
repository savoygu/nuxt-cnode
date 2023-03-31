import { baseURL } from '~/server/constants'
import type { Response, Topic } from '~/types'

export default defineEventHandler(async event => {
  const query = getQuery(event)
  const { mdrender = true, accesstoken } = query
  const id = event.context.params?.id
  const response = await $fetch<Response<Topic>>(`/topic/${id}`, {
    baseURL,
    params: {
      mdrender,
      accesstoken
    }
  })
  if (!response.success) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error'
    })
  }
  return response.data
})
