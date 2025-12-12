<script setup lang="ts">
const props = withDefaults(defineProps<{
  orientation?: 'horizontal' | 'vertical'
  size?: string | number
}>(), {
  orientation: 'horizontal',
})

const attrs = useAttrs()

const computedStyle = computed(() => {
  const { orientation, size } = props

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
  <div v-bind="$attrs" :style="computedStyle" />
</template>
