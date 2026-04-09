import { computed, ref } from 'vue'

export interface FileItem {
  id: string
  file: File
  progress: number
  status: 'uploading' | 'success' | 'error'
  url?: string
  error?: string
  abortController?: AbortController
}

export interface UseFileUploadOptions {
  maxSize: number // bytes, default unlimited
  limit: number
  accept: string
  upload: (file: File, onProgress?: (event: { progress: number }) => void, signal?: AbortSignal) => Promise<string>
  onSuccess?: (url: string) => void
  onError?: (error: Error) => void
}

export function useFileUpload(options: UseFileUploadOptions) {
  const fileItems = ref<FileItem[]>([])

  const uploadFile = async (file: File) => {
    if (file.size > options.maxSize) {
      const error = new Error(
        `File size exceeds maximum allowed (${options.maxSize / 1024 / 1024}MB)`,
      )
      options.onError?.(error)
      return null
    }

    const id = crypto.randomUUID()
    const abortController = new AbortController()

    const fileItem: FileItem = {
      id,
      file,
      progress: 0,
      status: 'uploading',
      abortController,
    }

    fileItems.value.push(fileItem)

    try {
      if (!options.upload) {
        throw new Error('Upload function is not defined')
      }

      const url = await options.upload(file, (event: { progress: number }) => {
        fileItems.value = fileItems.value.map((item) => {
          if (item.id === id) {
            return { ...item, progress: event.progress }
          }
          return item
        })
      }, abortController.signal)

      if (!url) {
        throw new Error('Upload failed: no URL returned')
      }

      if (!abortController.signal.aborted) {
        fileItems.value = fileItems.value.map(item =>
          item.id === id
            ? { ...item, status: 'success', url, progress: 100 }
            : item,
        )
        options.onSuccess?.(url)

        return url
      }

      return null
    }
    catch (error) {
      if (!abortController.signal.aborted) {
        fileItems.value = fileItems.value.map(item =>
          item.id === id
            ? { ...item, status: 'error', progress: 0 }
            : item,
        )
        options.onError?.(
          error instanceof Error ? error : new Error('Upload failed'),
        )
      }
      return null
    }
  }

  const uploadFiles = async (files: File[],
  ) => {
    if (!files || files.length === 0) {
      options.onError?.(new Error('No files to upload'))
      return []
    }

    if (options.limit && files.length > options.limit) {
      options.onError?.(
        new Error(
          `Maximum ${options.limit} file${options.limit === 1 ? '' : 's'} allowed`,
        ),
      )
      return []
    }

    // Upload all files concurrently
    const uploadPromises = files.map(file => uploadFile(file))
    const results = await Promise.all(uploadPromises)

    // Filter out null results (failed uploads)
    return results.filter((url): url is string => url !== null)
  }

  const removeFileItem = (id: string) => {
    const index = fileItems.value.findIndex(item => item.id === id)
    if (index !== -1) {
      const item = fileItems.value[index]!
      if (item.abortController) {
        item.abortController.abort()
      }
      if (item.url) {
        URL.revokeObjectURL(item.url)
      }
      fileItems.value.splice(index, 1)
    }
  }

  const clearAllFiles = () => {
    const items: (FileItem | undefined)[] = [...fileItems.value]
    for (const item of items) {
      if (!item)
        continue

      if (item.abortController) {
        item.abortController.abort()
      }
      if (item.url) {
        URL.revokeObjectURL(item.url)
      }
    }
    fileItems.value = []
  }

  const successCount = computed(() => fileItems.value.filter(item => item.status === 'success').length)
  const errorCount = computed(() => fileItems.value.filter(item => item.status === 'error').length)
  const uploadingCount = computed(() => fileItems.value.filter(item => item.status === 'uploading').length)

  return {
    fileItems,
    uploadFile,
    uploadFiles,
    removeFileItem,
    clearAllFiles,
    successCount,
    errorCount,
    uploadingCount,
  }
}
