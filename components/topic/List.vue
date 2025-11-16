<script setup lang="ts">
interface TopicProps {
  topics: Topic[]
}

const props = defineProps<TopicProps>()
const { topics } = toRefs(props)
</script>

<template>
  <ul class="m-0">
    <TopicItem v-for="topic in topics" :key="topic.id" :item="topic" />
  </ul>
</template>
