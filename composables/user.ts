export async function useUser() {
  const { $api } = useNuxtApp()
  const tokenCookie = useTokenCookie()
  const userState = useUserState()
  const logger = useLogger('[composables:user]')

  if (tokenCookie.value && !userState.value.isLogin) {
    try {
      const response = await $api.cnode.accesstoken({ accesstoken: tokenCookie.value })
      const user = response.data
      userState.value.isLogin = response.success
      const { success, data } = await $api.cnode.user({ loginname: user.loginname })
      if (success)
        userState.value.user = data
      logger.info({ ...userState.value }, 'get accesstoken success')
      return user
    }
    catch (err) {
      tokenCookie.value = undefined
      userState.value.user = undefined
      logger.error({ err }, 'get accesstoken failed')
      return undefined
    }
  }

  return userState.value.user
}

export function useUserLogout() {
  const userState = useUserState()
  const tokenCookie = useTokenCookie()
  userState.value = { isLogin: false, user: undefined }
  tokenCookie.value = ''
}
