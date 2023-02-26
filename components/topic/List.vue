<script setup lang="ts">
import { Topic } from '~/types'

type TopicProps = {
  topics: Topic[]
}

const props = defineProps<TopicProps>()
const { topics } = toRefs(props)
</script>

<template>
  <ul class="topic-list">
    <TopicItem v-for="topic in topics" :key="topic.id" :item="topic" />
  </ul>
</template>

<style lang="scss">
@include b(topic-list) {
  margin: 0;
}
</style>
