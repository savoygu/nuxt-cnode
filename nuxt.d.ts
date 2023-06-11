import { ToastServiceMethods } from 'primevue/toastservice'

declare module '#app' {
  interface NuxtApp {
    $toast: ToastServiceMethods
  }
}
