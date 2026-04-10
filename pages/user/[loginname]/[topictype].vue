<script setup lang="ts">
const route = useRoute()
const topicType = route.params.topictype as string
const loginname = route.params.loginname as string
const isCollections = topicType === 'collections'
if (!['replies', 'topics', 'collections'].includes(topicType)) {
  throw createError({ statusCode: 404, statusMessage: 'Not Found' })
}

const { $api } = useNuxtApp()
const logger = useLogger(`[page:user:${topicType}]`)

const userState = useUserState()
const isOwnProfile = computed(() => {
  return userState.value.user?.loginname === loginname
})

const { data: user, fetch: getUser } = useAPIData({
  fetcher: () => {
    // 个人主页
    if (isOwnProfile.value) {
      return Promise.resolve({ success: true, data: userState.value.user })
    }
    return $api.cnode.user({ loginname })
  },
  processor: data => data,
})

const { data: collections, fetch: getCollections } = useAPIData({
  fetcher: () => {
    if (!isCollections) {
      return Promise.resolve({ success: true, data: [] })
    }
    return $api.cnode.topicCollects({ loginname })
  },
  processor: data => data ?? [],
})

const topics = computed(() => {
  if (isCollections) {
    return collections.value
  }

  return topicType === 'topics'
    ? user.value?.recent_topics || []
    : user.value?.recent_replies || []
})

try {
  await Promise.all([
    getUser(),
    getCollections(),
  ])
}
catch (err) {
  logger.error({ err }, 'get user or collections error')
}
</script>

<template>
  <NuxtLayout>
    <Panel>
      <template #header>
        <ElBreadcrumb>
          <ElBreadcrumbItem to="/">
            主页
          </ElBreadcrumbItem>
          <template v-if="user">
            <ElBreadcrumbItem :to="`/user/${user.loginname}`">
              {{ user.loginname }}的主页
            </ElBreadcrumbItem>
            <ElBreadcrumbItem>
              {{ user.loginname }} {{ isCollections ? '收藏' : topicType === 'topics' ? '创建' : '参与' }}的话题
            </ElBreadcrumbItem>
          </template>
          <ElBreadcrumbItem v-else>
            通知
          </ElBreadcrumbItem>
        </ElBreadcrumb>
      </template>
      <div>
        <template v-if="user">
          <template v-if="topics.length">
            <TopicItem v-for="item in topics" :key="item.id" :item="item" :show-tag="isCollections" />
          </template>
          <p v-else class="pb-5 pt-2.5 text-center">
            找不到话题 (T_T)
          </p>
        </template>
        <ElAlert v-else type="error" title="这个用户不存在。" :closable="false" center />
      </div>
    </Panel>
    <template #sidebar>
      <SidebarUserProfile v-if="user" title="个人信息" :user="user" />
    </template>
  </NuxtLayout>
</template>
