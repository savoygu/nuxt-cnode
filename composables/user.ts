export async function useUser() {
  const { $api } = useNuxtApp()
  const tokenCookie = useTokenCookie()
  const userState = useUserState()
  const logger = useLogger('[composables:user]')

  if (tokenCookie.value && !userState.value.isLogin) {
    try {
      const response = await $api.cnode.accesstoken({ accesstoken: tokenCookie.value })
      const data = response.data
      userState.value.isLogin = response.success
      const { success, data: user } = await $api.cnode.user({ loginname: data.loginname })
      if (success) {
        userState.value.user = {
          ...data,
          ...user,
        }
      }
      logger.info({ ...userState.value }, 'get accesstoken success')
      return user
    }
    catch (err) {
      tokenCookie.value = undefined
      userState.value.user = undefined
      logger.error({ err }, 'get accesstoken error')
      return undefined
    }
  }

  return userState.value.user
}

export async function useUserLogin(accesstoken: string) {
  const { $api } = useNuxtApp()
  const tokenCookie = useTokenCookie()
  const userState = useUserState()

  const response = await $api.cnode.accesstoken({ accesstoken })
  if (response.success) {
    tokenCookie.value = accesstoken
    userState.value.isLogin = true
    const { success, data } = await $api.cnode.user({ loginname: response.data.loginname })
    if (success) {
      userState.value.user = {
        ...response.data,
        ...data,
      }
    }
  }
  return response
}

export function useUserLogout() {
  const userState = useUserState()
  const tokenCookie = useTokenCookie()
  userState.value = { isLogin: false, user: undefined }
  tokenCookie.value = ''
}
