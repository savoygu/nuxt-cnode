import type { RouterConfig } from '@nuxt/schema'

export default {
  routes: (_routes) => {
    const routes = _routes.filter((route) => {
      // 过滤掉 _ 开头的路径
      if (route.path.includes('/_')) {
        return false
      }
      return true
    })

    return [...routes]
  },
} satisfies RouterConfig
