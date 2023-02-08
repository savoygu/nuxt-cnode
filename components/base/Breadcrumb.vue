<template>
  <div ref="breadcrumb" class="breadcrumb" aria-label="Breadcrumb" role="navigation">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
type BreadcrumbProps = {
  separator?: string
  separatorClass?: string
}
const props = withDefaults(defineProps<BreadcrumbProps>(), {
  separator: '/',
  separatorClass: ''
})

const breadcrumb = ref(null)

provide('breadcrumb', props)

onMounted(() => {
  const items = breadcrumb.value!.querySelectorAll('.breadcrumb__item')
  if (items.length) {
    items[items.length - 1].setAttribute('aria-current', 'page')
  }
})
</script>

<style lang="scss">
@include b(breadcrumb) {
  display: inline-flex;
  font-size: 14px;
  line-height: 20px;

  @include e(item) {
    @include e(inner) {
      a {
        color: #80bd01;

        @include hover {
          text-decoration: underline;
        }
      }
    }

    &:last-child {
      .breadcrumb__inner {
        color: #999;
      }

      .breadcrumb__separator {
        display: none;
      }
    }
  }

  @include e(separator) {
    margin: 0 5px;
    color: #ccc;
    font-weight: bold;

    &[class*='icon'] {
      margin: 0 3px;
      font-weight: normal;
    }
  }
}
</style>
