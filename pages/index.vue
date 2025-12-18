<script setup lang="ts">
const { $api } = useNuxtApp()
const route = useRoute()
const logger = useLogger('[pages:index]')

const currentTab = computed<string>(() => route.query.tab as string || 'all')

const { list: topics, initialLoading: pending, fetch: fetchTopics } = usePaginatedList({
  fetcher: (page, limit) => $api.cnode.topics({ tab: currentTab.value, page, limit, mdrender: 'false' }),
  processor(data) {
    return data ?? []
  },
  logger,
  logContext: 'topics',
  fetchOptions: {
    watch: [currentTab],
  },
  limit: 40,
  distance: 200,
})

try {
  await fetchTopics()
}
catch (err) {
  logger.error({ err }, 'get topics error')
}
</script>

<template>
  <NuxtLayout>
    <Panel :content-padding="false">
      <template #header>
        <NuxtLink
          v-for="(value, key) in TABS"
          :key="key"
          :to="{ path: '/', query: { tab: key } }"
          class="mx-2.5 text-primary hover:text-primary-hover hover:no-underline focus:no-underline"
          :class="{ 'rounded-small bg-primary p-1 text-white hover:text-white focus:text-white': currentTab === key }"
        >
          {{ value.name }}
        </NuxtLink>
      </template>
      <div v-if="!pending" class="rounded-b-small bg-white">
        <TopicList v-if="topics && topics.length > 0" :topics="topics" />
        <div v-else>
          暂无数据
        </div>
      </div>
      <Skeleton v-else />
    </Panel>
    <template #sidebar>
      <SidebarUserProfile title="个人信息" />
    </template>
  </NuxtLayout>
</template>
