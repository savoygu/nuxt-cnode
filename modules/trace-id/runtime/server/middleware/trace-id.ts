import { randomUUID } from 'node:crypto'
import { defineEventHandler, setResponseHeader } from 'h3'

// refer: https://github.com/nuxt/nuxt/discussions/27253
export default defineEventHandler((event) => {
  const traceId = randomUUID()

  // 存储到请求上下文
  event.context.traceId = traceId

  // 设置响应头
  setResponseHeader(event, 'x-request-id', traceId)
  // setCookie(event, 'x-request-id', traceId)
})
