<script setup lang="ts">
const route = useRoute()
const topicType = route.params.topictype as string
if (!['replies', 'topics', 'collections'].includes(topicType)) {
  throw createError({ statusCode: 404, statusMessage: 'Not Found' })
}

const { $api } = useNuxtApp()
const userState = useUserState()
const logger = useLogger('[page:collections]')

const loginname = route.params.loginname as string
const isCollections = topicType === 'collections'
const currentUser = ref<CNodeUser | undefined>(userState.value.user)
const collections = ref<CNodeTopic[]>([])

const isOwnProfile = computed(() => {
  return userState.value.user?.loginname === loginname
})
const topics = computed(() => {
  if (isCollections) {
    return collections.value
  }
  return topicType === 'topics'
    ? currentUser.value?.recent_topics || []
    : currentUser.value?.recent_replies || []
})

try {
  await Promise.all([
    fetchUser(loginname),
    fetchCollections(loginname),
  ])
}
catch (err) {
  logger.error({ err }, 'get user collections error')
}

async function fetchUser(loginname: string) {
  if (isOwnProfile.value) {
    return
  }

  const { error, data } = await useAsyncData(() => $api.cnode.user({ loginname }))
  if (error.value) {
    currentUser.value = undefined
  }
  else {
    currentUser.value = data.value?.data || undefined
  }
}

async function fetchCollections(loginname: string) {
  if (!isCollections) {
    return
  }

  const { error, data } = await useAsyncData(() => $api.cnode.topicCollects({ loginname }))
  if (error.value) {
    collections.value = []
  }
  else {
    collections.value = data.value?.data || []
  }
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
          <template v-if="currentUser">
            <ElBreadcrumbItem :to="`/user/${currentUser.loginname}`">
              {{ currentUser.loginname }}的主页
            </ElBreadcrumbItem>
            <ElBreadcrumbItem>
              {{ currentUser.loginname }} {{ isCollections ? '收藏' : topicType === 'topics' ? '创建' : '参与' }}的话题
            </ElBreadcrumbItem>
          </template>
          <ElBreadcrumbItem v-else>
            通知
          </ElBreadcrumbItem>
        </ElBreadcrumb>
      </template>
      <div>
        <template v-if="currentUser">
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
      <SidebarUserProfile v-if="currentUser" title="个人信息" :user="currentUser" />
    </template>
  </NuxtLayout>
</template>
