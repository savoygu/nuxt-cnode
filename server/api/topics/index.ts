import { baseURL } from '~/server/constants'

import { validTabs } from '~/composables/api'
import { Response, Topic } from '~/types'

export default defineEventHandler(event => {
  const query = useQuery(event)
  const { tab = 'all', page = '1' } = query as {
    tab: string
    page: string
  }

  if (!validTabs.includes(tab) || String(Number(page)) !== page) {
    throw createError({
      statusCode: 422,
      statusMessage: `Must provide one of ${validTabs.join(', ')} and a valid page number.`
    })
  }

  return fetchTopics(tab, page)
})

async function fetchTopics(tab: string, page = '1') {
  const response = await $fetch<Response<Topic[]>>(`${baseURL}/topics`, {
    params: {
      tab,
      page,
      limit: 40,
      mdrender: true
    }
  })
  if (!response.success) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error'
    })
  }
  return response.data
}
