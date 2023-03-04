import { baseURL } from '~/server/constants'

import { Response } from '~/types'

export default defineEventHandler(async event => {
  const query = getQuery(event)
  const { accesstoken } = query
  const response = await $fetch<Response<number>>('/message/count', {
    baseURL,
    params: {
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
