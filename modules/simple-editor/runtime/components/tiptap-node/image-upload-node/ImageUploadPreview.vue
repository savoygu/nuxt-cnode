<script setup lang="ts">
import type { FileItem } from './useFileUpload'
import CloudUploadIcon from './CloudUploadIcon.vue'

interface ImageUploadPreviewProps {
  fileItem: FileItem
}

const { fileItem } = defineProps<ImageUploadPreviewProps>()

const emit = defineEmits<{
  remove: []
}>()

function formatFileSize(bytes: number): string {
  if (bytes === 0)
    return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return `${Number.parseFloat((bytes / k ** i).toFixed(2))} ${sizes[i]}`
}

function handleRemoveClick(e: Event) {
  e.stopPropagation()
  emit('remove')
}
</script>

<template>
  <div class="tiptap-image-upload-preview">
    <div
      v-if="fileItem.status === 'uploading'"
      class="tiptap-image-upload-progress"
      :style="{ width: `${fileItem.progress}%` }"
    />

    <div class="tiptap-image-upload-preview-content">
      <div class="tiptap-image-upload-file-info">
        <div class="tiptap-image-upload-file-icon">
          <CloudUploadIcon />
        </div>
        <div class="tiptap-image-upload-details">
          <span class="tiptap-image-upload-text">
            {{ fileItem.file.name }}
          </span>
          <span class="tiptap-image-upload-subtext">
            {{ formatFileSize(fileItem.file.size) }}
          </span>
        </div>
      </div>
      <div class="tiptap-image-upload-actions">
        <span
          v-if="fileItem.status === 'uploading'"
          class="tiptap-image-upload-progress-text"
        >
          {{ fileItem.progress }}%
        </span>
        <button
          type="button"
          class="tiptap-button tiptap-button-ghost"
          @click="handleRemoveClick"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path
              d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"
            />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>
