import { baseURL } from '~/server/constants'
import { Response, User } from '~/types'

export default defineEventHandler(async event => {
  const body = await useBody(event)
  const accesstoken = body.accesstoken
  const loginname = event.context.params.id
  const response = await $fetch<Response<User>>(`${baseURL}/user/${loginname}`, {
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
