import type { FetchOptions } from 'ofetch'
import { has, omit } from 'lodash-es'

export default defineNuxtPlugin({
  name: 'api',
  setup() {
    const config = useRuntimeConfig()

    function normalizeApiResponse<T = any>(response: APIResponse<T>): APIResponse<T> {
      if (has(response, 'error_msg')) {
        return {
          ...omit(response, 'error_msg'),
          msg: response.error_msg as string,
        }
      }
      else if (has(response, 'reply_id')) {
        return {
          ...omit(response, 'reply_id'),
          data: { reply_id: response.reply_id } as T,
        }
      }
      else if (has(response, 'action')) {
        return {
          ...omit(response, 'action'),
          data: { action: response.action } as T,
        }
      }
      else if (has(response, 'topic_id')) {
        return {
          ...omit(response, 'topic_id'),
          data: { topic_id: response.topic_id } as T,
        }
      }
      else if (has(response, 'id') && has(response, 'loginname') && has(response, 'avatar_url')) {
        return {
          ...omit(response, ['id', 'loginname', 'avatar_url']),
          data: { id: response.id, loginname: response.loginname, avatar_url: response.avatar_url } as T,
        }
      }
      else if (has(response, 'marked_msg_id')) {
        return {
          ...omit(response, 'marked_msg_id'),
          data: { marked_msg_id: response.marked_msg_id } as T,
        }
      }
      else if (has(response, 'marked_msgs')) {
        return {
          ...omit(response, 'marked_msgs'),
          data: { marked_msgs: response.marked_msgs } as T,
        }
      }
      return response
    }

    const sharedFetchOptions: FetchOptions = {
      ...(import.meta.server
        ? { headers: useRequestHeaders(['cookie']) }
        : {
            headers: useRequestHeaders(['cookie']),
            credentials: 'include',
          }),
      onResponse({ response }) {
        if (response._data && typeof response._data === 'object') {
          response._data = normalizeApiResponse(response._data)
        }
      },
    }
    const cnodeApi = $fetch.create({
      baseURL: config.public.cnodeApiBaseUrl,
      ...sharedFetchOptions,
    })

    const api: ApiInstance = {
      cnode: new CNodeModule(cnodeApi),
    }

    return {
      provide: {
        api,
      },
    }
  },
})

export interface ApiInstance {
  cnode: CNodeModule
}
