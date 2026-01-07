<script setup lang="ts">
const { className, orientation = 'vertical' } = defineProps<{
  className?: string
  orientation?: 'vertical' | 'horizontal'
}>()
</script>

<template>
  <div class="tiptap-button-group" :class="className" :data-orientation="orientation" v-bind="$attrs">
    <slot />
  </div>
</template>

<style>
.tiptap-button-group {
  position: relative;
  display: flex;
  vertical-align: middle;

  &[data-orientation='vertical'] {
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    min-width: max-content;

    > .tiptap-button {
      width: 100%;
    }
  }

  &[data-orientation='horizontal'] {
    gap: 0.125rem;
    flex-direction: row;
    align-items: center;
  }
}
</style>
