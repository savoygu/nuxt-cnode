<script setup lang="ts">
defineProps<{
  topics: CNodeTopic[]
}>()
</script>

<template>
  <div>
    <div
      v-for="topic in topics"
      :key="topic.id"
      class="flex items-center border-t border-t-[#f0f0f0] bg-white p-[10px] text-[14px]"
    >
      <NuxtLink :to="`/user/${topic.author.loginname}`" class="text-[#08c] hover:text-[#005580] hover:underline">
        <img
          :src="topic.author.avatar_url"
          :alt="topic.author.loginname"
          class="size-[30px] rounded-[3px]"
        >
      </NuxtLink>
      <NuxtLink
        class="ml-[8px] flex-1 text-[16px] leading-7.5 text-[#08c] hover:text-[#005580] hover:underline"
        :to="`/topic/${topic.id}`"
      >
        <span class="block max-w-[80%] truncate">
          {{ topic.title }}
        </span>
      </NuxtLink>
      <span class="text-extra-small text-[#777]">
        {{ timeAgo(topic.last_reply_at) }}
      </span>
    </div>
  </div>
</template>
