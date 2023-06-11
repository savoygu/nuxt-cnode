import { useToast } from 'vue-toast-notification'

// @ts-ignore
export default defineNuxtPlugin(() => {
  const toast = useToast({
    position: 'top'
  })
  return {
    provide: {
      toast
    }
  }
})
