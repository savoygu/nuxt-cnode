<script setup lang="ts">
// hooks
const route = useRoute()
const router = useRouter()
const tab = computed(() => route.query.tab as string)
const page = computed(() => route.query.page as string)

// reactive
const currentTab = ref(tab.value || 'all')
const currentPage = ref(Number(page.value) || 1)
// const transition = ref('slide-right')

// fetch
const { data: topics, refresh } = await fetchTopics({
  currentTab,
  currentPage
})

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
  <div class="main">
    <div class="main__content">
      <div class="main__panel">
        <div class="topic-nav">
          <NuxtLink
            v-for="item in validTabs"
            :key="item"
            :to="{ query: { tab: item } }"
            class="topic-nav__tab"
            :class="{ 'is-current': currentTab === item }"
          >
            {{ tabsInfo[item].name }}
          </NuxtLink>
        </div>
        <div class="main__topic">
          <div :key="currentPage" class="topic-list">
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
      </div>
    </div>
    <div class="main__sidebar sidebar">
      <SidebarUnansweredTopic />
      <SidebarRanking />
      <SidebarFriendlyCommunity />
      <SidebarClientQRCode />
    </div>
  </div>
</template>

<style lang="scss">
@include b(main) {
  @include e(topic) {
    background-color: #fff;
    border-radius: 0 0 3px 3px;
  }
}

@include b(topic-nav) {
  padding: 10px;
  background-color: #f6f6f6;
  border-radius: 3px 3px 0 0;

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
}

@include b(topic-list) {
  transition: all 0.3s cubic-bezier(0.55, 0, 0.1, 1);

  ul {
    margin: 0;
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
  @include b(topic-nav) {
    padding: 10px 0;

    @include e(tab) {
      margin: 0 8px;
    }
  }
}
</style>
