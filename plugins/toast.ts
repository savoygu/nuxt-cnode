import ToastPlugin from 'vue-toast-notification'

// @ts-ignore
export default defineNuxtPlugin(nuxtApp => {
  nuxtApp.vueApp.use(ToastPlugin, {
    position: 'top'
  })

  return {
    provide: {
      toast: nuxtApp.vueApp.config.globalProperties.$toast
    }
  }
})
