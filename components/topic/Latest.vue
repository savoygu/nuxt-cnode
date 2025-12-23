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
      class="flex items-center border-t border-t-[#f0f0f0] bg-white p-2.5 text-regular"
    >
      <NuxtLink :to="`/user/${topic.author.loginname}`" class="text-[#08c] hover:text-[#005580] hover:underline">
        <NuxtImg
          :src="topic.author.avatar_url"
          :alt="topic.author.loginname"
          class="size-[30px] rounded-small"
        />
      </NuxtLink>
      <NuxtLink
        class="ml-2 flex-1 text-header-6 leading-7.5 text-[#08c] hover:text-[#005580] hover:underline"
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
