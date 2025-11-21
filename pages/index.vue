<script setup lang="ts">
const { $api } = useNuxtApp()
const route = useRoute()
const userState = useUserState()
const logger = useLogger('[pages:index]')

const user = computed(() => userState.value.user)

const currentTab = computed<string>(() => route.query.tab as string || 'all')
const currentPage = computed<number>(() => Number(route.query.page) || 1)

const { data: topics, pending, fetch } = useRefreshAsyncData({
  fetcher: () => $api.cnode.topics({ tab: currentTab.value, page: currentPage.value, limit: 20, mdrender: 'false' }),
  processor(data) {
    return data ?? []
  },
  logger,
  logContext: 'topics',
  fetchOptions: {
    watch: [currentPage, currentTab],
  },
})

try {
  await fetch()
}
catch (err) {
  logger.error({ err }, 'get topics error')
}

async function handlePageChange(page: number) {
  await navigateTo({ path: route.path, query: { ...route.query, page } })
  window.scrollTo({ top: 0 })
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
          :class="{ 'p-[3px_4px] bg-[#80bd01] rounded-[3px] text-white': currentTab === key }"
        >
          {{ value.name }}
        </NuxtLink>
      </template>
      <div v-if="!pending" class="bg-white rounded-b-[3px]">
        <template v-if="topics && topics.length > 0">
          <TopicList :topics="topics" />
          <BasePagination
            class="main__pagination"
            :total-page="TAB_MAP[currentTab]?.totalPage ?? 0"
            :current-page="currentPage"
            @change="handlePageChange"
          />
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
