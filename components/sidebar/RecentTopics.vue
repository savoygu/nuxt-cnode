<script setup lang="ts">
import { Topic } from '~/types'

type RecentTopicsProps = {
  topics: Topic[]
}

const props = withDefaults(defineProps<RecentTopicsProps>(), {})
const { topics } = toRefs(props)
</script>

<template>
  <Panel title="作者其他话题">
    <ul class="panel__unstyled">
      <li v-for="topic in topics" :key="topic.id">
        <a class="dark" :href="`/topic/${topic.id}`" :title="topic.title">{{ topic.title }}</a>
      </li>
    </ul>
  </Panel>
</template>
