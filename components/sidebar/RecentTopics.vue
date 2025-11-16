<script setup lang="ts">
interface RecentTopicsProps {
  topics: Topic[]
}

const props = withDefaults(defineProps<RecentTopicsProps>(), {})
const { topics } = toRefs(props)
</script>

<template>
  <Panel title="作者其他话题">
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
