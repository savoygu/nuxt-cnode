<script setup lang="ts">
// hooks
const state = useStore()
const route = useRoute()
const router = useRouter()
const tab = computed(() => route.query.tab as string)
const page = computed(() => route.query.page as string)

const user = computed(() => state.value.user)

// reactive
const currentTab = ref(tab.value || 'all')
const currentPage = ref(Number(page.value) || 1)
// const transition = ref('slide-right')

// fetch
const [{ data: topics, refresh }] = await Promise.all([
  fetchTopics({
    currentTab,
    currentPage
  }),
  fetchUser(user.value.loginname)
])

// watch
watch(tab, newTab => {
  currentTab.value = newTab || 'all'
  currentPage.value = 1
  refresh()
})
watch(page, newPage => {
  currentPage.value = Number(newPage) || 1
  refresh()
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
      <div class="home__topic">
        <div :key="currentPage" class="home__topic-list">
          <ul>
            <TopicItem v-for="topic in topics" :key="topic.id" :item="topic" />
          </ul>
        </div>
        <!-- <transition :name="transition" mode="out-in">
            <div :key="currentPage" class="topic-list">
              <transition-group tag="ul" name="item">
                <topic-item v-for="topic in topics" :key="topic.id" :item="topic" />
              </transition-group>
            </div>
          </transition> -->
        <div class="main__pagination">
          <BasePagination :total-page="100" :current-page="currentPage" @change="handlePageChange" />
        </div>
      </div>
    </Panel>
    <template #sidebar>
      <SidebarPersonalInformation v-if="user" />
      <SidebarPublishTopic no-header />
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
