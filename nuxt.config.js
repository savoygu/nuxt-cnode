module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'Nuxt Cnode',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '基于 Nuxt (服务器端渲染 SSR) 构建 CNode 社区' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ],
    script: [
      { innerHTML: 'window.onload = function () {console.log(123); prettyPrint() }', type: 'text/javascript' }
    ]
  },
  css: [
    '~/assets/prettify/prettify.css'
  ],
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLint on save
    */
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    },
    vendor: ['~/assets/prettify/prettify.js']
  },
  modules: [
    'nuxt-sass-resources-loader', '@nuxtjs/axios'
  ],
  sassResources: [
    './node_modules/sass-bem/_bem.scss',
    './assets/theme/common/var.scss',
    './assets/theme/common/utils.scss',
    './assets/theme/common/mixins.scss'
  ],
  axios: {
    proxy: true
  },
  proxy: {
    '/api': {
      target: 'https://cnodejs.org/api/v1',
      pathRewrite: { '^/api/': '' }
    }
  },
  plugins: ['~/plugins/filters']
}
