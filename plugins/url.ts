export type UrlInstance = ReturnType<typeof parseURL>

export default defineNuxtPlugin({
  name: 'url',
  enforce: 'pre',
  setup() {
    const requestUrl = useRequestURL()
    const url: UrlInstance = parseURL(requestUrl.href)

    return {
      provide: {
        url,
      },
    }
  },
})
