import { isUndefined } from 'lodash-es'

export default defineNuxtRouteMiddleware(async (from, to) => {
  const user = await useUser()
  if (isUndefined(user) && from.path !== '/signin') {
    return navigateTo(`/signin?fallback=${encodeURIComponent(to.fullPath)}`)
  }
  else if (!isUndefined(user) && to.path === '/signin') {
    return navigateTo('/')
  }
})
