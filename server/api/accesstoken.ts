import { baseURL } from '~/server/constants'
import { User } from '~/types'

export default defineEventHandler(async event => {
  const body = await useBody(event)
  const accesstoken = body.accesstoken

  if (!accesstoken) {
    throw createError({
      statusCode: 422,
      statusMessage: 'Must provide an access token.'
    })
  }

  try {
    const response = await $fetch<User>('/accesstoken', {
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
    setCookie(event, 'token', accesstoken)
    return response
  } catch (err) {
    setCookie(event, 'token', null)
    // 401: Unauthorized
    throw createError({
      statusCode: 401,
      statusMessage: 'Invalid access token.',
      data: err.data
    })
  }
})