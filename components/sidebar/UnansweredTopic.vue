<script setup lang="ts">
import type { Topic } from '~/types'

const { data: topics } = await useFetch<Topic[]>('/api/topics/unanswered')
</script>

<template>
  <Panel title="无人回复的话题">
    <ul class="panel__unstyled">
      <li v-for="topic in topics" :key="topic.id">
        <a class="dark" :href="`/topic/${topic.id}`" :title="topic.title">{{ topic.title }}</a>
      </li>
    </ul>
  </Panel>
</template>
