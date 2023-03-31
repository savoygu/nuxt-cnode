export const useToken = () => useCookie('token')

export const useUser = async () => {
  const token = useToken()
  const store = useStore()

  if (token.value && !store.value.isLogin) {
    try {
      await fetchAccesstoken(token.value)
      return store.value.user
    } catch (err) {
      token.value = null
      return null
    }
  }

  return store.value.user
}
