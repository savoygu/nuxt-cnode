<script setup lang="ts">
defineProps<{
  topics: CNodeTopic[]
}>()
</script>

<template>
  <div class="m-0">
    <TopicItem v-for="topic in topics" :key="topic.id" :item="topic" />
  </div>
</template>
