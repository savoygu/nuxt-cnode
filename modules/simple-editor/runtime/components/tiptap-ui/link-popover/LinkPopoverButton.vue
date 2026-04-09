<script setup lang="ts">
import type { ButtonProps } from '../../tiptap-ui-primitive/Button.vue'

interface LinkPopoverButtonProps extends /* @vue-ignore */ Omit<ButtonProps, 'type'> {}

const { ...buttonProps } = defineProps<LinkPopoverButtonProps>()

const slots = defineSlots<{
  default?: () => any
  tooltip?: () => any
}>()
</script>

<template>
  <TiptapButton
    type="button"
    data-style="ghost"
    v-bind="buttonProps"
  >
    <template #tooltip>
      <slot name="tooltip">
        Link
      </slot>
    </template>
    <slot v-if="slots.default" />
    <TiptapLinkIcon v-else class="tiptap-button-icon" />
  </TiptapButton>
</template>
