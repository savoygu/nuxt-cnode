import type { AsyncData, AsyncDataOptions, NuxtError } from '#app'
import type { Logger } from 'pino'

export interface APIResponse<T = any> {
  success: boolean
  data: T
  msg?: string
}

export type APIAsyncData<T> = Awaited<AsyncData<APIResponse<T> | undefined, NuxtError<unknown> | undefined>>

interface UseAPIDataOptions<T, R> {
  fetcher: () => Promise<APIResponse<T>>
  processor: (data?: T) => R
  initialValue?: R
  logger?: Logger
  logContext?: string
  uniqueKey?: string
  fetchOptions?: AsyncDataOptions<APIResponse<T>>
}

export function useAPIData<T, R>({
  fetcher,
  processor,
  initialValue,
  logger,
  logContext,
  uniqueKey: providedKey,
  fetchOptions,
}: UseAPIDataOptions<T, R>) {
  // 使用 useId() 来生成在 SSR 环境下安全的唯一 ID
  const instanceId = useId()

  // 如果提供了 uniqueKey，则使用它；否则，使用 useId() 生成的 ID
  const uniqueKey = providedKey ?? `__use-api-data-${instanceId}__`
  const uniqueLazyKey = providedKey ?? `__use-lazy-api-data-${instanceId}__`

  // useAsyncData 的返回状态
  const dataState = ref<APIAsyncData<T> | null>(null)
  // 经过 processor 处理后的最终渲染数据
  const processedData = ref<R>(initialValue ?? processor()) as Ref<R>

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

  async function rawFetch() {
    const res = await fetcher()
    processedData.value = processor(res.data)
    if (logger && logContext) {
      logger.info({ data: toRaw(res), render: toRaw(processedData.value) }, `raw get ${logContext}`)
    }
  }

  function refresh() {
    dataState.value?.refresh()
  }

  return {
    data: processedData,
    state: dataState,
    pending: computed(() => dataState.value?.pending),
    fetch,
    lazyFetch,
    rawFetch,
    refresh,
  }
}

export interface UsePaginatedListOptions<T> {
  fetcher: (page: number, limit: number) => Promise<APIResponse<T[]>>
  processor: (data?: T[]) => T[]
  initialValue?: T[]
  logger?: Logger
  logContext?: string
  uniqueKey?: string
  fetchOptions?: AsyncDataOptions<APIResponse<T[]>>
  limit?: number
  enableLimitCheck?: boolean
  scrollTarget?: Ref<HTMLElement | null | undefined> | HTMLElement | null // 滚动监听的目标元素
  distance?: number // 距离底部多少像素时触发加载
}

export function usePaginatedList<T>({
  fetcher,
  processor,
  initialValue,
  logger,
  logContext,
  uniqueKey: providedKey,
  fetchOptions,
  limit = 40,
  enableLimitCheck = true,
  scrollTarget,
  distance = 100,
}: UsePaginatedListOptions<T>) {
  const instanceId = useId()
  const uniqueKey = providedKey ?? `__use-paginated-list-${instanceId}__`

  const dataState = ref<APIAsyncData<T[]> | null>(null)
  const page = ref(1)
  const list = ref<T[]>(initialValue ?? processor()) as Ref<T[]>
  const loading = ref(false) // 用于客户端加载“更多”的状态
  const finished = ref(false)

  const initialLoading = computed(() => {
    return dataState.value?.pending
  })
  const shouldShowLoading = computed(() => {
    return loading.value || finished.value
  })

  watch(
    () => dataState.value?.data?.data,
    (newData) => {
      const processedData = list.value = processor(newData)
      if (!processedData || !processedData.length || (enableLimitCheck && processedData.length < limit)) {
        finished.value = true
      }
      if (logger && logContext) {
        logger.info({ page: 1, data: toRaw(dataState.value?.data), render: toRaw(processedData) }, `watch ${logContext} change`)
      }
    },
  )

  async function fetch() {
    dataState.value = await useAsyncData(uniqueKey, () => {
      page.value = 1
      finished.value = false
      return fetcher(1, limit)
    }, fetchOptions)
    if (!dataState.value?.pending) {
      const data = dataState.value?.data
      const processedData = list.value = processor(data?.data)
      if (!processedData || !processedData.length || (enableLimitCheck && processedData.length < limit)) {
        finished.value = true
      }
      if (logger && logContext) {
        logger.info({ page: 1, data: toRaw(data), render: toRaw(processedData) }, `get ${logContext}`)
      }
    }
  }

  async function loadMore() {
    if (loading.value || finished.value || dataState.value?.pending) {
      return
    }

    loading.value = true
    page.value++

    try {
      const { data } = await fetcher(page.value, limit)
      const processedData = processor(data)
      if (processedData && processedData.length > 0) {
        list.value.push(...processedData)
        if (enableLimitCheck && processedData.length < limit) {
          finished.value = true
        }
      }
      else {
        finished.value = true
      }
      if (logger && logContext) {
        logger.info({ page: page.value, data: toRaw(data), render: toRaw(processedData) }, `load more ${logContext}`)
      }
    }
    catch (err) {
      page.value--
      if (logger && logContext) {
        logger.error({ err }, `load more ${logContext} error`)
      }
    }
    finally {
      loading.value = false
    }
  }

  if (import.meta.client) {
    useInfiniteScroll(scrollTarget || window, loadMore, { distance })
  }

  return {
    dataState,
    initialLoading,
    page,
    list,
    loading,
    finished,
    shouldShowLoading,
    fetch,
    loadMore,
  }
}
