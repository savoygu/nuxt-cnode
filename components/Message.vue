<script setup lang="ts">
defineProps<{
  message: CNodeMessage
}>()
</script>

<template>
  <div class="border-t border-t-[#f0f0f0] bg-white p-2.5 text-regular">
    <span class="leading-[22px]">
      <NuxtLink
        class="inline-block max-w-[460px] truncate align-middle text-[#08c]"
        :to="`/user/${message.author.loginname}`"
      >
        {{ message.author.loginname }}
      </NuxtLink>
      {{ message.type === 'at' ? '在话题' : '回复了你的话题' }}
      <NuxtLink
        class="inline-block max-w-[460px] truncate align-middle text-[#08c]"
        :to="`/topic/${message.topic.id}#${message.id}`"
      >
        {{ message.topic.title }}
      </NuxtLink>
      {{ message.type === 'at' ? '中@了你' : '' }}
    </span>
  </div>
</template>
