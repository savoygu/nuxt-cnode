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
  <div class="panel mb-[13px] text-[13px]">
    <div v-if="header" class="rounded-t-3 bg-[#f6f6f6] p-[10px]">
      <slot name="header">
        <span class="text-[#444]">{{ title }}</span>
      </slot>
    </div>
    <div
      class="rounded-b-3 bg-white p-[10px] leading-[2em]"
      :class="{
        '!p-0': !contentPadding,
        'border-t border-t-[#e5e5e5]': bordered,
      }"
    >
      <slot />
    </div>
  </div>
</template>
