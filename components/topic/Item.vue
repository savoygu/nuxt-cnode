<script setup lang="ts">
const { item } = defineProps<{
  item: Topic
}>()

const route = useRoute()
const showTag = computed(() => {
  const tab = route.query.tab as string
  return !tab || tab === 'all' || tab === 'good'
})
</script>

<template>
  <div class="relative grid grid-cols-[30px_70px_36px_1fr_80px] items-center border-t border-t-[#f0f0f0] bg-white p-2.5 text-sm first:border-t-0" :class="{ '!grid-cols-[30px_70px_1fr_50px]': !showTag }">
    <NuxtLink :to="`/user/${item.author?.loginname}`">
      <img
        class="block size-[30px] rounded-3"
        :src="item.author?.avatar_url"
        :title="item.author?.loginname"
      >
    </NuxtLink>
    <span class="text-center">
      <span class="text-[#9e78c0]"> {{ ` ${item.reply_count} ` }} </span>
      <span class="mx-[-3px] text-10"> / </span>
      <span class="text-10 text-[#b4b4b4]"> {{ ` ${item.visit_count} ` }} </span>
    </span>
    <span
      v-if="showTag"
      class="mr-1 rounded-3 bg-[#e5e5e5] px-1 py-0.5 text-xs leading-3.5 text-color-secondary"
      :class="{ '!bg-success !text-white': item.top || item.good }"
    >
      {{ item.top ? '置顶' : item.good ? '精华' : (item.tab && TAB_MAP[item.tab]?.name) || item.tab }}
    </span>
    <a
      class="truncate text-base leading-7.5 text-color-primary visited:text-[#888]"
      :href="`/topic/${item.id}`"
      :title="item.title"
    >
      {{ item.title }}
    </a>
    <a
      class="text-right text-11 text-color-regular"
      :href="`/topic/${item.id}`"
    >
      <span class="min-w-[50px] whitespace-nowrap">{{ timeAgo(item.last_reply_at) }}</span>
    </a>
  </div>
</template>
