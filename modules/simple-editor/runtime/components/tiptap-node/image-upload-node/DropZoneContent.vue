<script setup lang="ts">
import CloudUploadIcon from './CloudUploadIcon.vue'
import FileCornerIcon from './FileCornerIcon.vue'
import FileIcon from './FileIcon.vue'

interface DropZoneContentProps {
  maxSize: number
  limit: number
}

const { maxSize, limit } = defineProps<DropZoneContentProps>()
</script>

<template>
  <div class="tiptap-image-upload-dropzone">
    <FileIcon />
    <FileCornerIcon />
    <div class="tiptap-image-upload-icon-container">
      <CloudUploadIcon />
    </div>
  </div>

  <div class="tiptap-image-upload-content">
    <span class="tiptap-image-upload-text">
      <em>Click to upload</em> or drag and drop
    </span>
    <span class="tiptap-image-upload-subtext">
      Maximum {{ limit }} file{{ limit === 1 ? '' : 's' }}, {{ maxSize / 1024 / 1024 }}MB
      each.
    </span>
  </div>
</template>
