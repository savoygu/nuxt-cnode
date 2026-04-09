<script setup lang="ts">
interface CardItemGroupProps {
  orientation?: 'horizontal' | 'vertical'
}

withDefaults(defineProps<CardItemGroupProps>(), {
  orientation: 'vertical',
})
</script>

<template>
  <div class="tiptap-card-item-group" :data-orientation="orientation" v-bind="$attrs">
    <slot />
  </div>
</template>
