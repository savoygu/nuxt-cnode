import { baseURL } from '~/server/constants'

import { Response, Topic } from '~/types'

export default defineEventHandler(async event => {
  const query = useQuery(event)
  const { mdrender = true, needAccessToken = false } = query
  const id = event.context.params.id
  const response = await $fetch<Response<Topic>>(`${baseURL}/topic/${id}`, {
    params: {
      mdrender,
      needAccessToken
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