<script setup lang="ts">
import { Topic } from '~/types'

const { data: topics } = await useFetch<Topic[]>('/api/topics/unanswered')
</script>

<template>
  <SidebarPanel header="无人回复的话题">
    <ul class="unanswered-topic__list unstyled">
      <li v-for="topic in topics" :key="topic.id" class="unanswered-topic__item">
        <a class="dark" :href="`https://cnodejs.org/topic/${topic.id}`" :title="topic.title">{{ topic.title }}</a>
      </li>
    </ul>
  </SidebarPanel>
</template>

<style lang="scss">
@include b(unanswered-topic) {
  @include e(list) {
    margin: 0 0 10px;
  }

  @include e(item) {
    a {
      display: inline-block;
      max-width: 270px;
      font-size: 14px;
      line-height: 30px;
      vertical-align: middle;

      @include utils-ellipsis;
    }
  }
}
</style>
