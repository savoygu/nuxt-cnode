export function useUserState() {
  return useState<{ isLogin: boolean, user: CNodeUser | undefined }>('user', () => ({
    isLogin: false,
    user: undefined,
  }))
}
