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
    class="text-shadow-[0_1px_0_rgb(255_255_255_/_50%)] relative border border-[#fbeed5] p-[8px_35px_8px_14px] leading-[2em]"
    :class="{
      'border-[#eed3d7] bg-[#f2dede] text-[#b94a48]': type === 'danger',
      'border-[#bce8f1] bg-[#d9edf7] text-[#3a87ad]': type === 'info',
      'border-[#d6e9c6] bg-[#dff0d8] text-[#468847]': type === 'success',
      'border-[#fbeed5] bg-[#fcf8e3] text-[#c09853]': type === 'warning',
    }"
  >
    <i
      class="text-shadow-[0_1px_0_#fff] absolute right-[12px] top-[6px] cursor-pointer text-[20px] font-bold opacity-20 hover:opacity-100"
      @click="onClose"
    >
      ×
    </i>
    <strong>
      <slot>{{ title }}</slot>
    </strong>
  </div>
</template>
