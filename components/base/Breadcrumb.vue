<template>
  <div class="breadcrumb">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
type BreadcrumbProps = {
  separator?: string
  separatorClass?: string
}
// props
const props = withDefaults(defineProps<BreadcrumbProps>(), {
  separator: '/',
  separatorClass: ''
})

provide('BreadcrumbContext', props)
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
    color: #ccc !important;

    &[class*='icon'] {
      margin: 0 3px;
      font-weight: normal;
    }
  }
}
</style>
