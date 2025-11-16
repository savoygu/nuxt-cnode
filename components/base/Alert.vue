<script setup lang="ts">
interface AlertProps {
  modelValue?: boolean
  type?: 'success' | 'info' | 'warning' | 'danger'
  title?: string
}
// props
const props = withDefaults(defineProps<AlertProps>(), {
  type: 'danger',
  title: '',
})
// emits
const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>()

const { modelValue: visible, title, type } = toRefs(props)

// methods
function onClose() {
  emit('update:modelValue', false)
}
</script>

<template>
  <div
    v-show="visible"
    class="relative p-[8px_35px_8px_14px] border border-[#fbeed5] leading-[2em] text-shadow-[0_1px_0_rgb(255_255_255_/_50%)]"
    :class="{
      'border-[#eed3d7] bg-[#f2dede] text-[#b94a48]': type === 'danger',
      'border-[#bce8f1] bg-[#d9edf7] text-[#3a87ad]': type === 'info',
      'border-[#d6e9c6] bg-[#dff0d8] text-[#468847]': type === 'success',
      'border-[#fbeed5] bg-[#fcf8e3] text-[#c09853]': type === 'warning',
    }"
  >
    <i
      class="absolute top-[6px] right-[12px] cursor-pointer text-[20px] font-bold opacity-20 text-shadow-[0_1px_0_#fff] hover:opacity-100"
      @click="onClose"
    >
      ×
    </i>
    <strong>
      <slot>{{ title }}</slot>
    </strong>
  </div>
</template>
