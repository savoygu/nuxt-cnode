<script setup lang="ts">
const { orientation = 'vertical' } = defineProps<{
  orientation?: string
}>()

const separatorRef = useTemplateRef('separator')

defineExpose({
  separatorRef,
})
</script>

<template>
  <div ref="separator" class="tiptap-separator" :data-orientation="orientation" v-bind="$attrs" />
</template>

<style>
.tiptap-separator {
  --tt-link-border-color: var(--tt-gray-light-a-200);
}
</style>

<style>
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
