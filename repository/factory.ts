import type { $Fetch } from 'nitropack'

export class FetchFactory {
  protected $fetch: $Fetch

  constructor(fetcher: $Fetch) {
    this.$fetch = fetcher
  }

  genApiKey(apiUrl: string, params: Record<string, any>) {
    return `__${[...apiUrl.split('/').filter(Boolean), ...Object.values(params)].join('_')}__`
  }
}
