import type { ToastPluginApi } from 'vue-toast-notification'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxtjs/stylelint-module',
    '@nuxtjs/tailwindcss',
    '@element-plus/nuxt',
    '@vueuse/nuxt',
    './modules/trace-id',
  ],

  css: [
    'vue-toast-notification/dist/theme-default.css',
    '~/assets/css/fonts.css',
    '~/assets/css/element.css',
  ],

  compatibilityDate: '2025-08-17',

  app: {
    cdnURL: import.meta.env.NUXT_PUBLIC_CDN_URL,
  },

  runtimeConfig: {
    public: {
      cnodeApiBaseUrl: import.meta.env.NUXT_PUBLIC_CNODEAPI_BASE_URL,
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
    config: {
      theme: {
        extend: {
          colors: {
            primary: '#1E88E5',
            secondary: '#26A69A',
            accent: '#9C27B0',
            error: '#F44336',
            warning: '#FF9800',
            info: '#2196F3',
            success: '#4CAF50',
          },
          screens: {
            xs: '375px',
            sm: '420px',
            md: '768px',
            lg: '992px',
          },
          listStyleType: {
            circle: 'circle',
          },
        },
      },
    },
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
