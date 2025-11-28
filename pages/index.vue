<script setup lang="ts">
const { $api } = useNuxtApp()
const route = useRoute()
const userState = useUserState()
const logger = useLogger('[pages:index]')

const user = computed(() => userState.value.user)
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
          class="mx-[10px] text-[#80bd01] hover:no-underline"
          :class="{ 'rounded-[3px] bg-[#80bd01] p-[3px_4px] text-white': currentTab === key }"
        >
          {{ value.name }}
        </NuxtLink>
      </template>
      <div v-if="!pending" class="rounded-b-[3px] bg-white">
        <template v-if="topics && topics.length > 0">
          <TopicList :topics="topics" />
          <!-- <BasePagination
            class="main__pagination"
            :total-page="TAB_MAP[currentTab]?.totalPage ?? 0"
            :current-page="currentPage"
            @change="handlePageChange"
          /> -->
        </template>
        <div v-else class="main__empty">
          暂无数据
        </div>
      </div>
      <Skeleton v-else />
    </Panel>
    <template #sidebar>
      <template v-if="user">
        <SidebarPersonalInformation :key="user.loginname" :user="user" />
        <SidebarPublishTopic />
      </template>
      <template v-else>
        <SidebarSigninCNode />
      </template>
      <SidebarUnansweredTopic />
      <SidebarRanking />
      <SidebarFriendlyCommunity />
      <SidebarClientQRCode />
    </template>
  </NuxtLayout>
</template>

<style>
@media screen and (max-width: 992px) {
  .main {
    display: block;
    width: 100%;
    min-width: 0;
    margin: 20px auto;
  }
  .main__content {
    margin-right: 0;
  }
  .main__panel {
    margin: 0 5px;
  }
  .main__sidebar {
    display: none;
  }
}

@media screen and (max-width: 420px) {
  .home__tab {
    margin: 0 8px;
  }
}
</style>
