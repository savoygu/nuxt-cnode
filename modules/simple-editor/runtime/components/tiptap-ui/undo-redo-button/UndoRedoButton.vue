<script setup lang="ts">
import type { ButtonProps } from '../../tiptap-ui-primitive/Button.vue'
import type { UseUndoRedoConfig } from './useUndoRedo'
import { useUndoRedo } from './useUndoRedo'

interface UndoRedoButtonProps extends /* @vue-ignore */ Omit<ButtonProps, 'type' | 'disabled'>, UseUndoRedoConfig {
  showShortcut?: boolean
  text?: string
}

const { action, hideWhenUnavailable = false, onExecuted, text, ...buttonProps } = defineProps<UndoRedoButtonProps>()
const emit = defineEmits<{
  (e: 'click', event: MouseEvent): void
}>()

const slots = useSlots()
const { editor } = useEditorStore()!
const { isVisible, canExecute, label, Icon, handleAction } = useUndoRedo({
  editor,
  action: () => action,
  hideWhenUnavailable: () => hideWhenUnavailable,
  onExecuted,
})

function handleClick(event: MouseEvent) {
  emit('click', event)

  if (event.defaultPrevented) {
    return
  }

  handleAction()
}
</script>

<template>
  <TiptapButton
    v-if="isVisible"
    type="button"
    data-style="ghost"
    :data-disabled="!canExecute"
    :disabled="!canExecute"
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
