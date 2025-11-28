<script setup lang="ts">
const { item } = defineProps<{
  item: Topic
}>()
</script>

<template>
  <div class="relative flex items-center border-t border-t-[#f0f0f0] bg-white p-2.5 text-[14px] first:border-t-0">
    <NuxtLink class="topic-item__author" :to="`/user/${item.author?.loginname}`">
      <img
        class="block size-[30px] rounded-[3px]"
        :src="item.author?.avatar_url"
        :title="item.author?.loginname"
      >
    </NuxtLink>
    <span class="flex-[0_0_70px] text-center">
      <span class="text-[#9e78c0]"> {{ ` ${item.reply_count} ` }} </span>
      <span class="mx-[-3px] text-[10px]"> / </span>
      <span class="text-[10px] text-[#b4b4b4]"> {{ ` ${item.visit_count} ` }} </span>
    </span>
    <span
      class="mr-[4px] rounded-[3px] bg-[#e5e5e5] p-[2px_4px] text-[12px] leading-[14px] text-[#999]"
      :class="{ 'bg-[#80bd01] text-white': item.top || item.good }"
    >
      {{ item.top ? '置顶' : item.good ? '精华' : (item.tab && TAB_MAP[item.tab]?.name) || item.tab }}
    </span>
    <a
      class="max-w-[70%] flex-1 truncate text-[16px] leading-[30px] text-[#333] visited:text-[#888]"
      :href="`/topic/${item.id}`"
      :title="item.title"
    >
      {{ item.title }}
    </a>
    <a
      class="ml-auto block flex-[0_0_80px] text-right text-[11px] text-[#778087]"
      :href="`/topic/${item.id}`"
    >
      <span class="min-w-[50px] whitespace-nowrap">{{ timeAgo(item.last_reply_at) }}</span>
    </a>
  </div>
</template>

<style>
@media screen and (max-width: 992px) {
  .topic-item a {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
</style>
