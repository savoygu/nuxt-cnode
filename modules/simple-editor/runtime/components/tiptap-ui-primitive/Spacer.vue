<script setup lang="ts">
const { orientation = 'horizontal', size } = defineProps<{
  orientation?: 'horizontal' | 'vertical'
  size?: string | number
}>()

const attrs = useAttrs()

const computedStyle = computed(() => {
  return {
    ...(attrs.style ?? {}),
    ...(orientation === 'horizontal' && !size && { flex: 1 }),
    ...(size && {
      width: orientation === 'vertical' ? '1px' : size,
      height: orientation === 'horizontal' ? '1px' : size,
    }),
  }
})
</script>

<template>
  <div v-bind="attrs" :style="computedStyle" />
</template>
