import { addComponentsDir, addImportsDir, createResolver, defineNuxtModule } from '@nuxt/kit'

export default defineNuxtModule({
  meta: {
    name: 'simple-editor',
  },
  setup() {
    const resolver = createResolver(import.meta.url)

    addImportsDir([
      resolver.resolve('./runtime/composables'),
      resolver.resolve('./runtime/utils'),
    ])

    addComponentsDir({
      path: resolver.resolve('./runtime/components'),
      pathPrefix: false,
      prefix: 'Tiptap',
    })
  },
})
