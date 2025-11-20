import type { ToastPluginApi } from 'vue-toast-notification'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxt/eslint', '@nuxtjs/stylelint-module', '@nuxtjs/tailwindcss', '@element-plus/nuxt'],

  css: ['vue-toast-notification/dist/theme-default.css', '~/assets/css/fonts.css', '~/assets/css/element.css'],

  compatibilityDate: '2025-08-17',

  runtimeConfig: {
    public: {
      cnodeApiBaseUrl: import.meta.env.NUXT_PUBLIC_CNODEAPI_BASE_URL || 'https://cnodejs.org',
    },
  },

  eslint: {
    config: {
      standalone: false,
    },
  },

  // Defaults options
  tailwindcss: {
    cssPath: [`~/assets/css/tailwind.css`, { injectPosition: 'first' }],
    config: {},
    viewer: true,
    exposeConfig: false,
  },

  imports: {
    dirs: [
      './types',
      './repository/modules',
    ],
  },
})

declare module '#app' {
  interface NuxtApp {
    $toast: ToastPluginApi
  }
}
