<script setup lang="ts">
const { data: ranking } = await useFetch<Ranking[]>('/api/ranking')
</script>

<template>
  <Panel>
    <template #header>
      <div>
        <span>积分榜</span> &nbsp; <a class="text-[#666] hover:text-[#385f8a]" href="https://cnodejs.org/users/top100">TOP 100 >></a>
      </div>
    </template>
    <ol class="my-[4px] list-none">
      <li v-for="item in ranking" :key="item.user" class="flex items-center">
        <span class="p-[2px] mr-[10px] text-gray-500">{{ item.score }}</span>
        <span class="inline-block max-w-[120px] whitespace-nowrap">
          <a class="panel__link" :href="`https://cnodejs.org/user/${item.user}`">{{ item.user }}</a>
        </span>
      </li>
    </ol>
  </Panel>
</template>
