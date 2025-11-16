<script setup lang="ts">
interface TopicLatestProps {
  topics: Topic[]
}

const props = defineProps<TopicLatestProps>()
const { topics } = toRefs(props)
</script>

<template>
  <div>
    <div
      v-for="topic in topics"
      :key="topic.id"
      class="flex items-center p-[10px] border-t border-t-[#f0f0f0] bg-white text-[14px]"
    >
      <nuxt-link :to="`/user/${topic.author.loginname}`" class="text-[#08c] hover:text-[#005580] hover:underline">
        <img
          :src="topic.author.avatar_url"
          :alt="topic.author.loginname"
          class="w-[30px] h-[30px] rounded-[3px]"
        >
      </nuxt-link>
      <nuxt-link
        class="flex-1 ml-[8px] text-[16px] leading-[30px] text-[#08c] hover:text-[#005580] hover:underline"
        :to="`/topic/${topic.id}`"
      >
        <span class="block max-w-[80%] overflow-hidden text-ellipsis whitespace-nowrap">
          {{ topic.title }}
        </span>
      </nuxt-link>
      <span class="text-[#777] text-[10px]">
        {{ timeAgo(topic.last_reply_at) }}
      </span>
    </div>
  </div>
</template>
