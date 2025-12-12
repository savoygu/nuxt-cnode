<script setup lang="ts">
const groupRef = useTemplateRef('group')

defineExpose({
  groupRef,
})
</script>

<template>
  <div ref="group" role="group" class="tiptap-toolbar-group" v-bind="$attrs">
    <slot />
  </div>
</template>

<style>
.tiptap-toolbar-group {
  display: flex;
  align-items: center;
  gap: 0.125rem;

  &:empty {
    display: none;
  }

  &:empty + .tiptap-separator,
  .tiptap-separator + &:empty {
    display: none;
  }
}
</style>
