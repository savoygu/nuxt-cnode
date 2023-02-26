<template>
  <div v-show="visible" :class="alertClass">
    <i class="alert__close" @click="onClose">×</i>
    <strong class="alert__text">
      <slot>{{ title }}</slot>
    </strong>
  </div>
</template>

<script setup lang="ts">
type AlertProps = {
  modelValue?: boolean
  type?: 'success' | 'info' | 'warning' | 'danger'
  title?: string
}
// props
const props = withDefaults(defineProps<AlertProps>(), {
  type: 'danger',
  title: ''
})
const { modelValue: visible, title, type } = toRefs(props)

// emits
const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>()

// computed
const alertClass = computed(() => {
  return ['alert', type.value ? `alert--${type.value}` : '']
})

// methods
const onClose = () => {
  emit('update:modelValue', false)
}
</script>

<style lang="scss">
@include b(alert) {
  position: relative;
  padding: 8px 35px 8px 14px;
  border: 1px solid #fbeed5;
  line-height: 2em;
  text-shadow: 0 1px 0 rgb(255 255 255 / 50%);

  @include e(close) {
    position: absolute;
    top: 6px;
    right: 12px;
    cursor: pointer;
    font-size: 20px;
    font-weight: 700;
    opacity: 0.2;
    text-shadow: 0 1px 0 #fff;
  }

  @include e(text) {
    // body
  }

  @include m(danger) {
    border-color: #eed3d7;
    background-color: #f2dede;
    color: #b94a48;
  }
}
</style>
