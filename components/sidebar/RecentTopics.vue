<script setup lang="ts">
defineProps<{
  topics: CNodeTopic[]
}>()
</script>

<template>
  <Panel title="作者其他话题">
    <ul class="ml-0 list-none p-0">
      <li v-for="topic in topics" :key="topic.id" class="py-0.5">
        <NuxtLink
          class="text-[#666] hover:text-[#385f8a] hover:underline"
          :to="`/topic/${topic.id}`"
          :title="topic.title"
        >
          {{ topic.title }}
        </NuxtLink>
      </li>
    </ul>
  </Panel>
</template>
