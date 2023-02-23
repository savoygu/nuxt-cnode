<template>
  <div class="breadcrumb__item">
    <span class="breadcrumb__inner">
      <NuxtLink v-if="to" :to="to" :replace="replace">
        <slot></slot>
      </NuxtLink>
      <slot v-else></slot>
    </span>
    <i v-if="separatorClass" class="breadcrumb__separator" :class="separatorClass"></i>
    <span class="breadcrumb__separator" :class="separatorClass">{{ separator }}</span>
  </div>
</template>

<script setup lang="ts">
import { RouteLocationRaw } from 'vue-router'

type BreadcrumbItemProps = {
  to?: string | RouteLocationRaw
  replace?: boolean
}

// props
const { to, replace } = withDefaults(defineProps<BreadcrumbItemProps>(), {
  to: '',
  replace: false
})

const breadcrumbContext = inject('BreadcrumbContext', undefined)!
const { separator, separatorClass } = toRefs(breadcrumbContext)
</script>
