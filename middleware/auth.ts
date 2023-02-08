export default defineNuxtRouteMiddleware(async () => {
  const user = await useUser()

  // eslint-disable-next-line eqeqeq
  if (user == null && user == undefined) {
    return '/signin'
  }
})
