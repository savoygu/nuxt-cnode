<script setup lang="ts">
import { isUndefined } from 'lodash-es'

const props = defineProps<{
  item: CNodeTopic
  showTag: boolean
}>()

const showCount = computed(() => {
  const item = props.item
  if (isUndefined(item.reply_count) && isUndefined(item.visit_count)) {
    return false
  }
  return true
})
</script>

<template>
  <div class="relative grid grid-cols-[30px_70px_36px_1fr_80px] items-center border-t border-t-[#f0f0f0] bg-white p-2.5 text-sm first:border-t-0" :class="{ '!grid-cols-[30px_70px_1fr_50px]': showCount && !showTag, '!grid-cols-[30px_35px_1fr_50px]': !showCount && showTag, '!grid-cols-[30px_1fr_50px]': !showCount && !showTag }">
    <NuxtLink :to="`/user/${item.author?.loginname}`">
      <NuxtImg class="block size-[30px] rounded-small" :src="item.author?.avatar_url" :title="item.author?.loginname" />
    </NuxtLink>
    <span v-if="showCount" class="text-center">
      <span class="text-[#9e78c0]"> {{ ` ${item.reply_count} ` }} </span>
      <span class="-mx-1 text-extra-small"> / </span>
      <span class="text-extra-small text-[#b4b4b4]"> {{ ` ${item.visit_count} ` }} </span>
    </span>
    <span v-if="showTag" class="rounded-small bg-[#e5e5e5] px-1 py-0.5 text-xs leading-3.5 text-text-2" :class="{ '!bg-primary !text-white': item.top || item.good }">
      {{ item.top ? '置顶' : item.good ? '精华' : (item.tab && TAB_MAP[item.tab]?.name) || item.tab }}
    </span>
    <NuxtLink class="ml-1 truncate text-base leading-7.5 text-text-0 visited:text-[#888]" :to="`/topic/${item.id}`" :title="item.title">
      {{ item.title }}
    </NuxtLink>
    <NuxtLink class="text-right text-small text-text-2" :to="`/topic/${item.id}`">
      <span class="min-w-[50px] whitespace-nowrap">{{ timeAgo(item.last_reply_at) }}</span>
    </NuxtLink>
  </div>
</template>
