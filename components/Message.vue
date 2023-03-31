<script setup lang="ts">
import type { Message } from '~/types'

type MessageProps = {
  message: Message
}

const props = defineProps<MessageProps>()
const { message } = toRefs(props)
</script>

<template>
  <div class="message-item">
    <span>
      <NuxtLink :to="`/user/${message.author.loginname}`">{{ message.author.loginname }}</NuxtLink>
      {{ message.type === 'at' ? '在话题' : '回复了你的话题' }}
      <NuxtLink :to="`/topic/${message.topic.id}#${message.id}`">{{ message.topic.title }}</NuxtLink>
      {{ message.type === 'at' ? '中@了你' : '' }}
    </span>
  </div>
</template>

<style lang="scss">
@include b(message-item) {
  padding: 10px;
  border-top: 1px solid #f0f0f0;
  background-color: #fff;
  font-size: 14px;

  span {
    line-height: 22px;
  }

  a {
    display: inline-block;
    max-width: 460px;
    color: #08c;
    vertical-align: middle;

    @include utils-ellipsis;
  }
}
</style>
