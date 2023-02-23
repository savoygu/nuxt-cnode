<script setup lang="ts">
import { Tab } from '../composables/api'

// hooks
const state = useStore()
const route = useRoute()
const router = useRouter()
const tab = computed(() => route.query.tab as Tab)
const page = computed(() => route.query.page as string)

const currentUser = computed(() => state.value.user)
const user = computed(() => currentUser.value && state.value.users[currentUser.value.loginname])

// reactive
const currentTab = ref(tab.value || 'all')
const currentPage = ref(Number(page.value) || 1)
// const transition = ref('slide-right')

// fetch
const [{ data: topics, refresh, pending }] = await Promise.all([
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
  refresh()
})
watch(
  tab,
  newTab => {
    useHead({
      title: newTab === 'all' ? '' : tabsInfo[newTab].title
    })
  },
  {
    immediate: true
  }
)
watch(page, newPage => {
  currentPage.value = Number(newPage) || 1
  refresh()
  window.scrollTo(0, 0)
})

// methods
const handlePageChange = (page: number) => {
  router.push({
    query: {
      tab: currentTab.value,
      page
    }
  })
}
</script>

<template>
  <TheMain>
    <Panel no-padding>
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
          <div :key="currentPage" class="home__topic-list">
            <ul>
              <TopicItem v-for="topic in topics" :key="topic.id" :item="topic" />
            </ul>
          </div>
          <!-- <Transition :name="transition" mode="out-in">
          <div :key="currentPage" class="home__topic-list">
            <TransitionGroup tag="ul" name="item">
              <TopicItem v-for="topic in topics" :key="topic.id" :item="topic" />
            </TransitionGroup>
          </div>
        </Transition> -->
          <div class="main__pagination">
            <BasePagination
              :total-page="tabsInfo[currentTab].total"
              :current-page="currentPage"
              @change="handlePageChange"
            />
          </div>
        </template>
        <div v-else class="main__empty">暂无数据</div>
      </div>
      <Skeleton v-else />
    </Panel>
    <template #sidebar>
      <template v-if="user">
        <SidebarPersonalInformation :key="user.loginname" :user="user" />
        <SidebarPublishTopic no-header />
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

  @include e(topic-list) {
    transition: all 0.3s cubic-bezier(0.55, 0, 0.1, 1);

    ul {
      margin: 0;
    }
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
