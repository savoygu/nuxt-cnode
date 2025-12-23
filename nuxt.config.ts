// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    cdnURL: import.meta.env.NUXT_PUBLIC_CDN_URL,
  },

  compatibilityDate: '2025-08-17',

  css: [
    'element-plus/theme-chalk/base.css',
    '@semi-bot/semi-theme-cnode/scss/global.scss',
    '@semi-bot/semi-theme-cnode/scss/animation.scss',
    '~/assets/css/semi.css',
    '~/assets/css/element.css',
  ],

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          silenceDeprecations: ['import'],
        },
      },
    },
  },

  features: {
    inlineStyles: false,
  },

  imports: {
    dirs: [
      './types',
      './repository/modules',
    ],
  },

  modules: [
    '@nuxt/eslint',
    '@nuxtjs/stylelint-module',
    '@nuxtjs/tailwindcss',
    '@element-plus/nuxt',
    '@vueuse/nuxt',
    '@nuxt/icon',
    './modules/trace-id',
    './modules/simple-editor',
  ],

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

  icon: {
    componentName: 'NuxtIcon',
    size: '16px',
    mode: 'css',
    cssLayer: 'base',
    serverBundle: {
      collections: ['uil'],
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
