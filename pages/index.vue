<script setup lang="ts">
import { Tab } from '../composables/api'

definePageMeta({
  middleware: 'tab'
})

// hooks
const state = useStore()
const route = useRoute()
const tab = computed(() => route.query.tab as Tab)
const page = computed(() => route.query.page as string)
const currentUser = computed(() => state.value.user)
const user = computed(() => state.value.users[currentUser.value?.loginname ?? ''])

// reactive
const currentTab = ref(tab.value || 'all')
const currentPage = ref(Number(page.value) || 1)

// fetch
const [{ data: topics, pending }] = await Promise.all([
  fetchTopics({
    currentTab,
    currentPage
  }),
  currentUser.value && fetchUser(currentUser.value.loginname)
])

// watch
watch(tab, newTab => {
  currentTab.value = newTab || 'all'
  currentPage.value = 1
})
watch(
  tab,
  newTab => {
    useHead({
      title: newTab !== 'all' ? tabsInfo[newTab ?? 'all'].title : ''
    })
  },
  {
    immediate: true
  }
)
watch(page, newPage => {
  currentPage.value = Number(newPage) || 1
  window.scrollTo(0, 0)
})

// methods
const handlePageChange = (page: number) => {
  navigateTo({
    query: {
      tab: currentTab.value,
      page
    }
  })
}
</script>

<template>
  <TheMain>
    <Panel :content-padding="false">
      <template #header>
        <NuxtLink
          v-for="item in validTabs"
          :key="item"
          :to="{ query: { tab: item } }"
          class="home__tab"
          :class="{ 'is-current': currentTab === item }"
        >
          {{ tabsInfo[item].name }}
        </NuxtLink>
      </template>
      <div v-if="!pending" class="home__topic">
        <template v-if="topics && topics.length > 0">
          <TopicList :topics="topics" />
          <BasePagination
            class="main__pagination"
            :total-page="tabsInfo[currentTab].total"
            :current-page="currentPage"
            @change="handlePageChange"
          />
        </template>
        <div v-else class="main__empty">暂无数据</div>
      </div>
      <Skeleton v-else />
    </Panel>
    <template #sidebar>
      <template v-if="user">
        <SidebarPersonalInformation :key="user.loginname" :user="user" />
        <SidebarPublishTopic />
      </template>
      <SidebarUnansweredTopic />
      <SidebarRanking />
      <SidebarFriendlyCommunity />
      <SidebarClientQRCode />
    </template>
  </TheMain>
</template>

<style lang="scss">
@include b(home) {
  @include e(tab) {
    margin: 0 10px;
    color: #80bd01;

    &:hover,
    &:focus {
      text-decoration: none;
    }

    @include is(current) {
      padding: 3px 4px;
      background-color: #80bd01;
      border-radius: 3px;
      color: #fff;
    }
  }

  @include e(topic) {
    background-color: #fff;
    border-radius: 0 0 3px 3px;
  }
}

@media screen and (max-width: $breakpoint-lg) {
  @include b(main) {
    display: block;
    width: 100%;
    min-width: 0;
    margin: 20px auto;

    @include e(content) {
      margin-right: 0;
    }

    @include e(panel) {
      margin: 0 5px;
    }

    @include e(sidebar) {
      display: none;
    }
  }
}

@media screen and (max-width: $breakpoint-sm) {
  @include b(home) {
    @include e(tab) {
      margin: 0 8px;
    }
  }
}
</style>
