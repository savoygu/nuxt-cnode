<script setup lang="ts">
import type { ButtonProps } from '../../tiptap-ui-primitive/Button.vue'
import type { UseTextAlignConfig } from './useTextAlign'
import { useTextAlign } from './useTextAlign'

interface TextAlignButtonProps extends /* @vue-ignore */ Omit<ButtonProps, 'type' | 'disabled'>, UseTextAlignConfig {
  text?: string
  showShortcut?: boolean
}

const { align, hideWhenUnavailable = false, onAligned, text, ...buttonProps } = defineProps<TextAlignButtonProps>()
const emit = defineEmits<{
  (e: 'click', event: MouseEvent): void
}>()

const slots = useSlots()
const { editor } = useEditorStore()!
const { isVisible, isActive, canAlign, label, Icon, handleTextAlign } = useTextAlign({
  editor,
  align: () => align,
  hideWhenUnavailable: () => hideWhenUnavailable,
  onAligned,
})

function handleClick(event: MouseEvent) {
  emit('click', event)

  if (event.defaultPrevented) {
    return
  }

  handleTextAlign()
}
</script>

<template>
  <TiptapButton
    v-if="isVisible"
    type="button"
    data-style="ghost"
    :data-disabled="!canAlign"
    :disabled="!canAlign"
    :data-active-state="`${isActive ? 'on' : 'off'}`"
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
