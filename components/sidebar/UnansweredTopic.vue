<script setup lang="ts">
const { data: topics } = await useFetch<Topic[]>('/api/topics/unanswered')
</script>

<template>
  <Panel title="无人回复的话题">
    <ul class="list-none p-0">
      <li v-for="topic in topics" :key="topic.id" class="py-[5px]">
        <a
          class="text-[#666] hover:text-[#385f8a] hover:underline"
          :href="`/topic/${topic.id}`"
          :title="topic.title"
        >
          {{ topic.title }}
        </a>
      </li>
    </ul>
  </Panel>
</template>
