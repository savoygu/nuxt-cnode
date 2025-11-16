<script setup lang="ts">
import type { Message } from '~/types'

interface MessageProps {
  message: Message
}

const props = defineProps<MessageProps>()
const { message } = toRefs(props)
</script>

<template>
  <div class="p-[10px] border-t border-t-[#f0f0f0] bg-white text-[14px]">
    <span class="leading-[22px]">
      <NuxtLink
        class="inline-block max-w-[460px] text-[#08c] align-middle overflow-hidden text-ellipsis whitespace-nowrap"
        :to="`/user/${message.author.loginname}`"
      >
        {{ message.author.loginname }}
      </NuxtLink>
      {{ message.type === 'at' ? '在话题' : '回复了你的话题' }}
      <NuxtLink
        class="inline-block max-w-[460px] text-[#08c] align-middle overflow-hidden text-ellipsis whitespace-nowrap"
        :to="`/topic/${message.topic.id}#${message.id}`"
      >
        {{ message.topic.title }}
      </NuxtLink>
      {{ message.type === 'at' ? '中@了你' : '' }}
    </span>
  </div>
</template>
