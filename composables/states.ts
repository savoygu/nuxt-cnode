export function useUserState() {
  return useState<{ isLogin: boolean, user: CNodeUser | undefined }>('user', () => ({
    isLogin: false,
    user: undefined,
  }))
}

export function useMessageState() {
  return useState<{ count: number }>('message', () => ({
    count: 0,
  }))
}
