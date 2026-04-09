<script setup lang="ts">
import type { ButtonProps } from '../../tiptap-ui-primitive/Button.vue'
import type { UseImageUploadConfig } from './useImageUpload'
import { useImageUpload } from './useImageUpload'

interface ImageUploadButtonProps extends /* @vue-ignore */ Omit<ButtonProps, 'type' | 'disabled'>, UseImageUploadConfig {
  text?: string
  showShortcut?: boolean
}

const { hideWhenUnavailable = false, text, onInserted, ...buttonProps } = defineProps<ImageUploadButtonProps>()

const emit = defineEmits<{
  (e: 'click', event: MouseEvent): void
}>()

const slots = useSlots()
const { editor } = useEditorStore()!
const { isVisible, canInsert, handleImage, label, isActive, Icon } = useImageUpload({
  editor,
  hideWhenUnavailable: () => hideWhenUnavailable,
  onInserted,
})

function handleClick(event: MouseEvent) {
  emit('click', event)
  if (event.defaultPrevented) {
    return
  }
  handleImage()
}
</script>

<template>
  <TiptapButton
    v-if="isVisible"
    type="button"
    data-style="ghost"
    :data-active-state="`${isActive ? 'on' : 'off'}`"
    :data-disabled="!canInsert"
    :disabled="!canInsert"
    v-bind="buttonProps"
    @click="handleClick"
  >
    <template #tooltip>
      {{ label }}
    </template>
    <slot v-if="slots.default" />
    <template v-else>
      <component :is="Icon" class="tiptap-button-icon" />
      <span v-if="text" class="tiptap-button-text">{{ text }}</span>
    </template>
  </TiptapButton>
</template>
