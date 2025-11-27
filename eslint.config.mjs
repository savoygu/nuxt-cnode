// @ts-check
import antfu from '@antfu/eslint-config'
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt(
  antfu({
    formatters: {
      css: 'prettier',
      html: 'prettier',
      prettierOptions: {
        plugins: ['prettier-plugin-tailwindcss'],
      },
    },
  }),
)
