<script setup lang="ts">
import type { ButtonProps } from '../../tiptap-ui-primitive/Button.vue'

const { ...buttonProps } = defineProps<Omit<ButtonProps, 'type'>>()
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
    <slot>
      <TiptapHighlighterIcon class="tiptap-button-icon" />
    </slot>
  </TiptapButton>
</template>
