// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxt/eslint', '@nuxtjs/stylelint-module', '@nuxtjs/tailwindcss'],

  css: ['vue-toast-notification/dist/theme-default.css', '@/assets/styles/index.scss'],

  compatibilityDate: '2025-08-17',

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData:
            '@import "sass-bem-next"; @import "assets/styles/common/variables.scss"; @import "assets/styles/common/mixins.scss";',
        },
      },
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
})
