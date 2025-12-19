<script setup lang="ts">
defineProps<{
  topics: CNodeTopic[]
  showTag: boolean
}>()
</script>

<template>
  <div class="m-0">
    <TopicItem v-for="topic in topics" :key="topic.id" :item="topic" :show-tag="showTag" />
  </div>
</template>
