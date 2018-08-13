module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'Nuxt CNode：Node.js专业中文社区',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '基于 Nuxt (服务器端渲染 SSR) 构建 CNode 社区' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  css: [
    '~/assets/prettify/prettify.css',
    { src: 'reset-css/sass/_reset.scss', lang: 'scss' },
    { src: '~/assets/theme/index.scss', lang: 'scss' }
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
    vendor: [
      '~/assets/prettify/prettify.js',
      '~/assets/jquery/jquery.js',
      'axios',
    ]
  },
  modules: [
    'nuxt-sass-resources-loader',
    // '@nuxtjs/pwa',
    // '@nuxtjs/component-cache',
    '@nuxtjs/axios'
  ],
  sassResources: [
    'sass-bem/_bem.scss',
    '~/assets/theme/common/var.scss',
    '~/assets/theme/common/utils.scss',
    '~/assets/theme/common/mixins.scss'
  ],
  // axios: {
  //   proxy: true
  // },
  // proxy: {
  //   '/api': {
  //     target: 'http://localhost:3333/api',
  //     pathRewrite: { '^/api/': '' }
  //   }
  // },
  plugins: [
    '~/plugins/filters.js',
    '~/plugins/packages.js',
    { src: '~/assets/prettify/prettify.js', ssr: false },
    { src: '~/plugins/localStorage.js', ssr: false }
  ],
  srcDir: 'client/',
  serverMiddleware: [
    // '~/common/cache.js'
    '../server/app.js'
  ],
  // render: {
  //   http2: {
  //     push: true
  //   },
  //   static: {
  //     maxAge: '1y',
  //     setHeaders(res, path) {
  //       if (path.includes('sw.js')) {
  //         res.setHeader('Cache-Control', `public, max-age=${15 * 60}`)
  //       }
  //     }
  //   }
  // }
}
