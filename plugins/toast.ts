import type { ToastPluginApi } from 'vue-toast-notification'
import ToastPlugin from 'vue-toast-notification'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(ToastPlugin, {
    position: 'top',
  })

  const toast: ToastPluginApi = nuxtApp.vueApp.config.globalProperties.$toast

  return {
    provide: {
      toast,
    },
  }
})
