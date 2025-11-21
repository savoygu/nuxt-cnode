export default defineNuxtPlugin({
  name: 'traceId',
  enforce: 'pre',
  setup() {
    const traceId = useTraceId()
    useHydration('traceId', () => traceId.value, (data) => {
      traceId.value = data
    })
  },
})
