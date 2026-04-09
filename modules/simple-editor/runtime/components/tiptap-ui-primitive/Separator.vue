<script setup lang="ts">
import type { HTMLAttributes } from 'vue'

type Orientation = 'horizontal' | 'vertical'

interface SeparatorProps extends /* @vue-ignore */ HTMLAttributes {
  className?: string
  orientation?: Orientation
  decorative?: boolean
}

const { decorative, orientation = 'vertical', className, ...separatorProps } = defineProps<SeparatorProps>()

const ariaOrientation = computed(() => orientation === 'vertical' ? orientation : undefined)
const semanticProps = computed(() => {
  return decorative
    ? { role: 'none' }
    : { 'aria-orientation': ariaOrientation, 'role': 'separator' }
})
</script>

<template>
  <div
    class="tiptap-separator"
    :class="[className]"
    :data-orientation="orientation"
    v-bind="{ ...semanticProps, ...separatorProps }"
  />
</template>

<style>
.tiptap-separator {
  --tt-link-border-color: var(--tt-gray-light-a-200);

  .dark & {
    --tt-link-border-color: var(--tt-gray-dark-a-200);
  }
}

.tiptap-separator {
  flex-shrink: 0;
  background-color: var(--tt-link-border-color);

  &[data-orientation='horizontal'] {
    height: 1px;
    width: 100%;
    margin: 0.5rem 0;
  }

  &[data-orientation='vertical'] {
    height: 1.5rem;
    width: 1px;
  }
}
</style>
