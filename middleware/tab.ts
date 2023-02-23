import { Tab } from '~/composables/api'

export default defineNuxtRouteMiddleware(from => {
  if (from.query.tab && !validTabs.includes(from.query.tab as Tab)) {
    return navigateTo(`/?tab=${validTabs[0]}`)
  }
  if (from.query.page && isNaN(Number(from.query.page))) {
    return navigateTo(`/?tab=${from.query.tab}&page=1`)
  }
})
