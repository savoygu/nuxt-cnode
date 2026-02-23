<script setup lang="ts">
import type { ButtonProps } from '../../tiptap-ui-primitive/Button.vue'
import type { HighlightColor, UseColorHighlightConfig } from '../color-highlight-button/useColorHighlight'
import { pickHighlightColorsByValue, useColorHighlight } from '../color-highlight-button/useColorHighlight'

interface ColorHighlightPopoverProps extends /* @vue-ignore */ Omit<ButtonProps, 'type' | 'disabled'>, Pick<UseColorHighlightConfig, 'hideWhenUnavailable' | 'onApplied'> {
  colors?: HighlightColor[]
  onOpenChange?: (isOpen: boolean) => void
}

const { colors = pickHighlightColorsByValue([
  'var(--tt-color-highlight-green)',
  'var(--tt-color-highlight-blue)',
  'var(--tt-color-highlight-red)',
  'var(--tt-color-highlight-purple)',
  'var(--tt-color-highlight-yellow)',
]), hideWhenUnavailable = false, onApplied, onOpenChange, ...buttonProps } = defineProps<ColorHighlightPopoverProps>()

const emit = defineEmits<{
  openChange: [isOpen: boolean]
}>()

const { editor, appendTo } = useEditorStore()!
const [_, setIsOpen] = useToggle(false)
const { isVisible, canColorHighlight, isActive, label, Icon }
  = useColorHighlight({
    editor,
    hideWhenUnavailable: () => hideWhenUnavailable,
    onApplied,
  })

function handleOpenChange(open: boolean) {
  if (!editor.value || !canColorHighlight.value) {
    return
  }
  setIsOpen(open)
  emit('openChange', open)
  onOpenChange?.(open)
}
</script>

<template>
  <ElPopover
    v-if="isVisible"
    trigger="click"
    :disabled="!canColorHighlight"
    :append-to="appendTo"
    width="auto"
    :popper-style="{
      '--el-popover-padding': 0,
      '--el-popover-bg-color': 'transparent',
      '--el-popover-border-color': 'transparent',
      '--el-box-shadow-light': 'none',
    }"
    @visible-change="handleOpenChange"
  >
    <template #reference>
      <TiptapColorHighlightPopoverButton
        :disabled="!canColorHighlight"
        :data-active-state="isActive ? 'on' : 'off'"
        :data-disabled="!canColorHighlight"
        v-bind="buttonProps"
      >
        <template #tooltip>
          {{ label }}
        </template>
        <component :is="Icon" class="tiptap-button-icon" />
      </TiptapColorHighlightPopoverButton>
    </template>
    <TiptapColorHighlightPopoverContent :colors="colors" />
  </ElPopover>
</template>
