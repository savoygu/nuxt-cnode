import { defineNuxtConfig } from 'nuxt/config'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  css: ['@/assets/styles/index.scss'],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData:
            '@import "sass-bem-next"; @import "assets/styles/common/variables.scss"; @import "assets/styles/common/mixins.scss";'
        }
      }
    }
  }
})
