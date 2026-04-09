<script setup lang="ts">
import type { Editor, NodeViewProps } from '@tiptap/vue-3'
import { NodeViewWrapper } from '@tiptap/vue-3'
import { computed, ref } from 'vue'
import { isValidPosition } from '../../../utils/tiptap'
import DropZoneContent from './DropZoneContent.vue'
import ImageUploadDragArea from './ImageUploadDragArea.vue'
import ImageUploadPreview from './ImageUploadPreview.vue'
import { useFileUpload } from './useFileUpload'

interface ImageUploadNodeProps extends NodeViewProps {}

const { node, extension, getPos, editor } = defineProps<ImageUploadNodeProps>()
const { accept, limit, maxSize } = node.attrs
const { upload, onSuccess, onError } = extension.options

const fileInputRef = ref<HTMLInputElement>()

const uploadOptions = {
  maxSize,
  limit,
  accept,
  upload,
  onSuccess,
  onError,
}
const { fileItems, uploadFiles, removeFileItem, clearAllFiles } = useFileUpload(uploadOptions)

const hasFiles = computed(() => fileItems.value.length > 0)

/**
 * Handle file upload and insert image nodes
 */
async function handleUpload(files: File[]) {
  const urls = await uploadFiles(files)

  if (urls.length > 0) {
    const pos = getPos()

    if (isValidPosition(pos)) {
      const imageNodes = urls.map((url, index) => {
        const filename = files[index]?.name.replace(/\.[^/.]+$/, '') || 'unknown'
        return {
          type: extension.options.type,
          attrs: {
            ...extension.options,
            src: url,
            alt: filename,
            title: filename,
          },
        }
      })

      editor
        .chain()
        .focus()
        .deleteRange({ from: pos, to: pos + node.nodeSize })
        .insertContentAt(pos, imageNodes)
        .run()

      focusNextNode(editor as Editor)
    }
  }
}

function handleChange(e: Event) {
  const input = e.target as HTMLInputElement
  if (!input.files || input.files.length === 0) {
    extension.options.onError?.(new Error('No file selected'))
    return
  }
  handleUpload(Array.from(input.files))
}

function handleClick() {
  if (fileInputRef.value && !hasFiles.value) {
    fileInputRef.value.click()
  }
}
</script>

<template>
  <NodeViewWrapper class="tiptap-image-upload" tabindex="0" @click="handleClick">
    <!-- Drag and drop upload area -->
    <template v-if="!hasFiles">
      <ImageUploadDragArea @file="handleUpload">
        <DropZoneContent :max-size="maxSize" :limit="limit" />
      </ImageUploadDragArea>
    </template>

    <!-- File preview section -->
    <template v-else>
      <div class="tiptap-image-upload-previews">
        <div v-if="fileItems.length > 1" class="tiptap-image-upload-header">
          <span>Uploading {{ fileItems.length }} files</span>
          <button
            type="button"
            class="tiptap-button tiptap-button-ghost"
            @click="(e) => {
              e.stopPropagation()
              clearAllFiles()
            }"
          >
            Clear All
          </button>
        </div>

        <div class="tiptap-image-upload-file-list">
          <ImageUploadPreview
            v-for="fileItem in fileItems"
            :key="fileItem.id"
            :file-item="fileItem"
            @remove="removeFileItem(fileItem.id)"
          />
        </div>
      </div>
    </template>

    <!-- Hidden file input -->
    <input
      ref="fileInputRef"
      name="file"
      :accept="accept"
      type="file"
      :multiple="limit > 1"
      style="display: none"
      @change="handleChange"
      @click.stop="(e) => (e as any).stopPropagation()"
    >
  </NodeViewWrapper>
</template>
