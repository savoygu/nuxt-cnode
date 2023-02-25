<script setup lang="ts">
import { Topic } from '~/types'

type LatestTopicProps = {
  topics: Topic[]
}

const props = defineProps<LatestTopicProps>()
const { topics } = toRefs(props)
</script>

<template>
  <div class="latest-topic">
    <div v-for="topic in topics" :key="topic.id" class="latest-topic__item">
      <nuxt-link :to="`/user/${topic.author.loginname}`">
        <img :src="topic.author.avatar_url" :alt="topic.author.loginname" />
      </nuxt-link>
      <nuxt-link class="latest-topic__title" :to="`/topic/${topic.id}`">
        <span class="latest-topic__fulltitle">{{ topic.title }}</span>
      </nuxt-link>
      <span class="latest-topic__time">{{ timeAgo(topic.last_reply_at) }}</span>
    </div>
  </div>
</template>

<style lang="scss">
@include b(latest-topic) {
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
