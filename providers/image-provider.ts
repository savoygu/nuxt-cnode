import { createOperationsGenerator, defineProvider } from '@nuxt/image/runtime'
import { joinURL } from 'ufo'

const operationsGenerator = createOperationsGenerator()

export default defineProvider<{ baseURL?: string, dir: string }>({
  getImage(src, { modifiers, baseURL, dir }) {
    if (/^(?:https?:)?\/\//.test(src)) {
      return {
        url: src,
      }
    }

    if (!baseURL) {
      // also support runtime config
      baseURL = useRuntimeConfig().public.cdnUrl
    }

    const operations = operationsGenerator(modifiers)

    return {
      url: joinURL(baseURL, dir, src + (operations ? `?${operations}` : '')),
    }
  },
})
