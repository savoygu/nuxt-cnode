export default defineNuxtRouteMiddleware(async from => {
  const user = await useUser()

  // eslint-disable-next-line eqeqeq
  if (user == null && user == undefined) {
    return navigateTo(`/signin?fallback=${encodeURIComponent(from.fullPath)}`)
  }
})
