<script setup lang="ts">
import type { HTMLAttributes } from 'vue'

interface InputGroupProps extends /* @vue-ignore */ HTMLAttributes {
  className?: string
}

const { className, ...inputGroupProps } = defineProps<InputGroupProps>()
</script>

<template>
  <div class="tiptap-input-group" :class="className" v-bind="inputGroupProps">
    <slot />
  </div>
</template>

<style>
.tiptap-input-group {
  position: relative;
  display: flex;
  flex-wrap: wrap;
  align-items: stretch;
}
</style>
