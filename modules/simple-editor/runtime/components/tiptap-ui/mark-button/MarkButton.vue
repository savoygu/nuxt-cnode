<script setup lang="ts">
import type { ButtonProps } from '../../tiptap-ui-primitive/Button.vue'
import type { UseMarkConfig } from './useMark'
import { useMark } from './useMark'

interface MarkButtonProps extends /* @vue-ignore */ Omit<ButtonProps, 'type' | 'disabled'>, UseMarkConfig {
  showShortcut?: boolean
  text?: string
}

const { type, hideWhenUnavailable = false, onToggled, text, ...buttonProps } = defineProps<MarkButtonProps>()
const emit = defineEmits<{
  (e: 'click', event: MouseEvent): void
}>()

const slots = useSlots()
const { editor } = useEditorStore()!
const { isVisible, canToggle, isActive, label, Icon, handleMark } = useMark({
  editor,
  type: () => type,
  hideWhenUnavailable: () => hideWhenUnavailable,
  onToggled,
})

function handleClick(event: MouseEvent) {
  emit('click', event)

  if (event.defaultPrevented) {
    return
  }

  handleMark()
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
