<script setup lang="ts">
const { item } = defineProps<{
  item: Topic
}>()
</script>

<template>
  <div class="grid          items-center relative p-2.5 border-t border-t-[#f0f0f0] bg-white text-[14px] first:border-t-0">
    <NuxtLink class="topic-item__author" :to="`/user/${item.author?.loginname}`">
      <img
        class="block w-[30px] h-[30px] rounded-[3px]"
        :src="item.author?.avatar_url"
        :title="item.author?.loginname"
      >
    </NuxtLink>
    <span class="flex-[0_0_70px] text-center">
      <span class="text-[#9e78c0]"> {{ ` ${item.reply_count} ` }} </span>
      <span class="mx-[-3px] text-[10px]"> / </span>
      <span class="text-[#b4b4b4] text-[10px]"> {{ ` ${item.visit_count} ` }} </span>
    </span>
    <span
      class="p-[2px_4px] mr-[4px] bg-[#e5e5e5] rounded-[3px] text-[#999] text-[12px] leading-[14px]"
      :class="{ 'bg-[#80bd01] text-white': item.top || item.good }"
    >
      {{ item.top ? '置顶' : item.good ? '精华' : (item.tab && TAB_MAP[item.tab]?.name) || item.tab }}
    </span>
    <a
      class="max-w-[70%] flex-1 text-[#333] text-[16px] leading-[30px] overflow-hidden text-ellipsis whitespace-nowrap visited:text-[#888]"
      :href="`/topic/${item.id}`"
      :title="item.title"
    >
      {{ item.title }}
    </a>
    <a
      class="block flex-[0_0_80px] ml-auto text-[#778087] text-[11px] text-right"
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
