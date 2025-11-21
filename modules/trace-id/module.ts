import { addImportsDir, addPlugin, addServerHandler, createResolver, defineNuxtModule } from '@nuxt/kit'

export default defineNuxtModule({
  meta: {
    name: 'trace-id',
  },
  setup() {
    const resolver = createResolver(import.meta.url)

    addPlugin(resolver.resolve('./runtime/plugins/trace-id'))

    addImportsDir(resolver.resolve('./runtime/composables'))

    addServerHandler({
      middleware: true,
      handler: resolver.resolve('./runtime/server/middleware/trace-id'),
    })
  },
})
