export function useTokenCookie() {
  return useCookie('token', {
    maxAge: 60 * 60 * 24 * 7, // Expires in 7 days
  })
}
