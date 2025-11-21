import type { AsyncData, AsyncDataOptions, NuxtError } from '#app'
import type { Logger } from 'pino'

export interface APIResponse<T = any> {
  success: boolean
  data: T
  msg?: string
}

export type APIAsyncData<T> = Awaited<AsyncData<APIResponse<T> | undefined, NuxtError<unknown> | undefined>>

interface UseRefreshAsyncDataOptions<T> {
  fetcher: () => Promise<APIResponse<T>>
  processor: (data?: T) => T
  initialValue?: T
  logger?: Logger
  logContext?: string
  uniqueKey?: string
  fetchOptions?: AsyncDataOptions<APIResponse<T>>
}

export function useRefreshAsyncData<T>({
  fetcher,
  processor,
  initialValue,
  logger,
  logContext,
  uniqueKey: providedKey,
  fetchOptions,
}: UseRefreshAsyncDataOptions<T>) {
  // 使用 useId() 来生成在 SSR 环境下安全的唯一 ID
  const instanceId = useId()

  // 如果提供了 uniqueKey，则使用它；否则，使用 useId() 生成的 ID
  const uniqueKey = providedKey ?? `__use-refresh-async-data-${instanceId}__`
  const uniqueLazyKey = providedKey ?? `__use-refresh-lazy-async-data-${instanceId}__`

  // useAsyncData 的返回状态
  const dataState = ref<APIAsyncData<T> | null>(null)
  // 经过 processor 处理后的最终渲染数据
  const processedData = ref<T>(initialValue ?? processor()) as Ref<T>

  // 监听 useAsyncData 返回的 data 变化，通常在 refresh 后触发
  watch(
    () => dataState.value?.data?.data,
    (newData) => {
      processedData.value = processor(newData)
      if (logger && logContext) {
        logger.info({ data: toRaw(dataState.value?.data), render: toRaw(processedData.value) }, `watch ${logContext} change`)
      }
    },
  )

  async function fetch() {
    dataState.value = await useAsyncData(uniqueKey, fetcher, fetchOptions)
    // useAsyncData 在挂起状态结束后，立即处理一次数据
    if (!dataState.value?.pending) {
      const data = dataState.value?.data
      processedData.value = processor(data?.data)
      if (logger && logContext) {
        logger.info({ data: toRaw(data), render: toRaw(processedData.value) }, `get ${logContext}`)
      }
    }
  }

  async function lazyFetch() {
    dataState.value = await useLazyAsyncData(uniqueLazyKey, fetcher, fetchOptions)
    // useAsyncData 在挂起状态结束后，立即处理一次数据
    if (!dataState.value?.pending) {
      const data = dataState.value?.data
      processedData.value = processor(data?.data)
      if (logger && logContext) {
        logger.info({ data: toRaw(data), render: toRaw(processedData.value) }, `lazy get ${logContext}`)
      }
    }
  }

  return {
    data: processedData,
    state: dataState,
    pending: computed(() => dataState.value?.pending),
    fetch,
    lazyFetch,
  }
}
