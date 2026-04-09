<script setup lang="ts">
interface ImageUploadDragAreaProps {
  /**
   * Callback function triggered when files are dropped or selected
   */
  onFile?: (files: File[]) => void
}

const { onFile } = defineProps<ImageUploadDragAreaProps>()

const emit = defineEmits<{
  file: [files: File[]]
}>()

const isDragActive = ref(false)
const isDragOver = ref(false)

function handleDragEnter(e: DragEvent) {
  e.preventDefault()
  e.stopPropagation()
  isDragActive.value = true
}

function handleDragLeave(e: DragEvent) {
  e.preventDefault()
  e.stopPropagation()
  if (!(e.currentTarget as Node).contains(e.relatedTarget as Node)) {
    isDragActive.value = false
    isDragOver.value = false
  }
}

function handleDragOver(e: DragEvent) {
  e.preventDefault()
  e.stopPropagation()
  isDragOver.value = true
}

function handleDrop(e: DragEvent) {
  e.preventDefault()
  e.stopPropagation()
  isDragActive.value = false
  isDragOver.value = false

  const files = Array.from(e.dataTransfer?.files ?? [])
  if (files.length > 0) {
    // Try to call onFile if provided, otherwise emit
    if (onFile) {
      onFile(files)
    }
    emit('file', files)
  }
}
</script>

<template>
  <div
    class="tiptap-image-upload-drag-area"
    :class="{ 'drag-active': isDragActive, 'drag-over': isDragOver }"
    @dragenter="handleDragEnter"
    @dragleave="handleDragLeave"
    @dragover="handleDragOver"
    @drop="handleDrop"
  >
    <slot />
  </div>
</template>
