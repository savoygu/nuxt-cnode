<script setup lang="ts">
interface BreadcrumbProps {
  separator?: string
  separatorClass?: string
}
// props
const props = withDefaults(defineProps<BreadcrumbProps>(), {
  separator: '/',
  separatorClass: '',
})

provide('BreadcrumbContext', props)
</script>

<template>
  <div class="inline-flex text-[14px] leading-[20px]">
    <slot />
  </div>
</template>
