<script setup lang="ts">
import type { Topic } from '~/types'

type TopicLatestProps = {
  topics: Topic[]
}

const props = defineProps<TopicLatestProps>()
const { topics } = toRefs(props)
</script>

<template>
  <div class="topic-latest">
    <div v-for="topic in topics" :key="topic.id" class="topic-latest__item">
      <nuxt-link :to="`/user/${topic.author.loginname}`">
        <img :src="topic.author.avatar_url" :alt="topic.author.loginname" />
      </nuxt-link>
      <nuxt-link class="topic-latest__title" :to="`/topic/${topic.id}`">
        <span class="topic-latest__fulltitle">{{ topic.title }}</span>
      </nuxt-link>
      <span class="topic-latest__time">{{ timeAgo(topic.last_reply_at) }}</span>
    </div>
  </div>
</template>

<style lang="scss">
@include b(topic-latest) {
  @include e(item) {
    display: flex;
    align-items: center;
    padding: 10px;
    border-top: 1px solid #f0f0f0;
    background: #fff;
    font-size: 14px;
  }

  a {
    color: #08c;

    &:hover {
      color: #005580;
      text-decoration: underline;
    }
  }

  img {
    width: 30px;
    height: 30px;
    border-radius: 3px;
  }

  @include e(title) {
    flex: 1;
    margin-left: 8px;
    font-size: 16px;
    line-height: 30px;
  }

  @include e(fulltitle) {
    display: block;
    max-width: 80%;

    @include utils-ellipsis;
  }

  @include e(time) {
    color: #777;
    font-size: 10px;
  }
}
</style>
