<script setup lang="ts">
import type { RouteLocationRaw } from 'vue-router'

interface BreadcrumbItemProps {
  to?: string | RouteLocationRaw
  replace?: boolean
}

// props
const { to, replace } = withDefaults(defineProps<BreadcrumbItemProps>(), {
  to: '',
  replace: false,
})

const breadcrumbContext = inject('BreadcrumbContext', undefined)!
const { separator, separatorClass } = toRefs(breadcrumbContext)
</script>

<template>
  <div>
    <span>
      <NuxtLink
        v-if="to"
        :to="to"
        :replace="replace"
        class="text-[#80bd01] hover:underline"
      >
        <slot />
      </NuxtLink>
      <slot v-else />
    </span>
    <i
      v-if="separatorClass"
      class="mx-[5px] text-[#ccc]"
      :class="separatorClass"
    />
    <span
      class="mx-[5px] text-[#ccc]"
      :class="separatorClass"
    >
      {{ separator }}
    </span>
  </div>
</template>
