import type { RouterConfig } from '@nuxt/schema'
import type { RouteRecordRaw } from 'vue-router'

export default {
  routes: (_routes) => {
    const routes = _routes.reduce((acc, route) => {
      // 过滤掉 _ 开头的路径
      if (route.path.includes('/_')) {
        return acc
      }

      acc.push(route)

      return acc
    }, [] as RouteRecordRaw[])

    return [...routes]
  },
} satisfies RouterConfig
