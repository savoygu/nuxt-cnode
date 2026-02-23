<script setup lang="ts">
import type { ButtonProps } from '../../tiptap-ui-primitive/Button.vue'

interface ColorHighlightPopoverButtonProps extends /* @vue-ignore */ Omit<ButtonProps, 'type'> {}

const { ...buttonProps } = defineProps<ColorHighlightPopoverButtonProps>()
</script>

<template>
  <TiptapButton
    type="button"
    data-style="ghost"
    v-bind="buttonProps"
  >
    <template #tooltip>
      <slot name="tooltip">
        Highlight
      </slot>
    </template>
    <slot v-if="$slots.default" />
    <TiptapHighlighterIcon v-else class="tiptap-button-icon" />
  </TiptapButton>
</template>
