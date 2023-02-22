import { baseURL } from '~/server/constants'
import { Response, User } from '~/types'

export default defineEventHandler(async event => {
  const loginname = event.context.params.loginname
  const response = await $fetch<Response<User>>(`${baseURL}/user/${loginname}`)
  if (!response.success) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error'
    })
  }
  return response.data
})
