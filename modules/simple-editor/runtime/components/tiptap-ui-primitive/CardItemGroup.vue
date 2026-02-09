<script setup lang="ts">
interface Props {
  orientation?: 'horizontal' | 'vertical'
}

withDefaults(defineProps<Props>(), {
  orientation: 'vertical',
})
</script>

<template>
  <div class="tiptap-card-item-group" :data-orientation="orientation" v-bind="$attrs">
    <slot />
  </div>
</template>
