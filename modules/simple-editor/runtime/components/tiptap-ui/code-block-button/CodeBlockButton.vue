<script setup lang="ts">
import type { ButtonProps } from '../../tiptap-ui-primitive/Button.vue'
import type { UseCodeBlockConfig } from './useCodeBlock'
import { useCodeBlock } from './useCodeBlock'

interface CodeBlockButtonProps extends /* @vue-ignore */ Omit<ButtonProps, 'type' | 'disabled'>, UseCodeBlockConfig {
  showShortcut?: boolean
  text?: string
}

const { hideWhenUnavailable = false, onToggled, text, ...buttonProps } = defineProps<CodeBlockButtonProps>()
const emit = defineEmits<{
  (e: 'click', event: MouseEvent): void
}>()

const slots = useSlots()
const { editor } = useEditorStore()!
const { isVisible, canToggle, isActive, label, Icon, handleToggle } = useCodeBlock({
  editor,
  hideWhenUnavailable: () => hideWhenUnavailable,
  onToggled,
})

function handleClick(event: MouseEvent) {
  emit('click', event)

  if (event.defaultPrevented) {
    return
  }

  handleToggle()
}
</script>

<template>
  <TiptapButton
    v-if="isVisible"
    type="button"
    data-style="ghost"
    :data-active-state="`${isActive ? 'on' : 'off'}`" :data-disabled="!canToggle"
    :disabled="!canToggle"
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
