<script setup lang="ts">
interface PanelProps {
  title?: string
  header?: boolean
  contentPadding?: boolean
  bordered?: boolean
}

const { title, header = true, contentPadding = true, bordered = false } = defineProps<PanelProps>()
</script>

<template>
  <div class="panel mb-3 text-regular">
    <div v-if="header" class="rounded-t-small bg-[#f6f6f6] p-2.5">
      <slot name="header">
        <span class="text-[#444]">{{ title }}</span>
      </slot>
    </div>
    <div
      class="rounded-b-small bg-white p-2.5"
      :class="{
        '!p-0': !contentPadding,
        'border-t border-t-[#e5e5e5]': bordered,
      }"
    >
      <slot />
    </div>
  </div>
</template>
