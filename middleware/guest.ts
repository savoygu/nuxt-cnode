export default defineNuxtRouteMiddleware(async () => {
  const user = await useUser()

  if (user !== null && user !== undefined) {
    return navigateTo('/')
  }
})
