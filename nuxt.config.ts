// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxt/eslint', '@nuxtjs/stylelint-module', '@nuxtjs/tailwindcss', '@element-plus/nuxt'],

  css: ['vue-toast-notification/dist/theme-default.css', '~/assets/css/fonts.css', '~/assets/css/element.css'],

  compatibilityDate: '2025-08-17',

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
