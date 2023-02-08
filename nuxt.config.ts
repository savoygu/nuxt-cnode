import { defineNuxtConfig } from 'nuxt'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  css: ['@/assets/scss/index.scss'],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData:
            '@import "sass-bem-next"; @import "assets/scss/variables.scss"; @import "assets/scss/mixins.scss";'
        }
      }
    }
  }
})
