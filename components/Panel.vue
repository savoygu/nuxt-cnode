<script setup lang="ts">
interface PanelProps {
  title?: string
  header?: boolean
  contentPadding?: boolean
  bordered?: boolean
}
const { title, header, contentPadding, bordered } = withDefaults(defineProps<PanelProps>(), {
  title: '',
  header: true,
  contentPadding: true,
  bordered: false,
})
</script>

<template>
  <div class="mb-[13px] text-[13px]">
    <div v-if="header" class="p-[10px] bg-[#f6f6f6] rounded-t-[3px]">
      <slot name="header">
        <span class="text-[#444]">{{ title }}</span>
      </slot>
    </div>
    <div
      class="p-[10px] bg-white rounded-b-[3px] leading-[2em]"
      :class="{
        'p-0': !contentPadding,
        'border-t border-t-[#e5e5e5]': bordered,
      }"
    >
      <slot />
    </div>
  </div>
</template>
