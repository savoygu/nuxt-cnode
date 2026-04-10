<script setup lang="ts">
const { $api } = useNuxtApp()

const route = useRoute()
const loginname = route.params.loginname as string
const logger = useLogger(`[page:user:${loginname}]`)

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

try {
  await getUser()
}
catch (err) {
  logger.error({ err }, 'get user error')
}
</script>

<template>
  <NuxtLayout>
    <template v-if="user">
      <Panel>
        <template #header>
          <ElBreadcrumb>
            <ElBreadcrumbItem to="/">
              主页
            </ElBreadcrumbItem>
            <ElBreadcrumbItem />
          </ElBreadcrumb>
        </template>
        <div class="p-2.5">
          <div class="flex items-center">
            <NuxtImg
              class="mr-2.5 size-10 rounded-small"
              :src="user.avatar_url"
            />
            <span class="inline-block align-top leading-8 text-[#778087]">
              {{ user.loginname }}
            </span>
          </div>
          <div class="mt-5">
            <div class="leading-5">
              {{ user.score }} 积分
            </div>
            <div class="leading-[2em]">
              <NuxtLink class="text-[#778087]" :to="`/user/${user.loginname}/collections`">
                查看话题收藏
              </NuxtLink>
            </div>
          </div>
          <p class="text-regular leading-[2em] text-[#ababab]">
            注册时间 {{ timeAgo(user.create_at) }}
          </p>
        </div>
      </Panel>
      <Panel title="最近创建的话题" :content-padding="false">
        <TopicLatest :topics="user.recent_topics.slice(0, 3)" />
        <div class="border-t border-t-[#f0f0f0] p-2.5">
          <NuxtLink class="text-[#778087]" :to="`/user/${user.loginname}/topics`">
            查看更多»
          </NuxtLink>
        </div>
      </Panel>
      <Panel title="最近参与的话题" :content-padding="false">
        <TopicLatest :topics="user.recent_replies.slice(0, 3)" />
        <div class="border-t border-t-[#f0f0f0] p-2.5">
          <NuxtLink class=" text-[#778087]" :to="`/user/${user.loginname}/replies`">
            查看更多»
          </NuxtLink>
        </div>
      </Panel>
    </template>
    <Panel v-else>
      <template #header>
        <ElBreadcrumb>
          <ElBreadcrumbItem to="/">
            主页
          </ElBreadcrumbItem>
          <ElBreadcrumbItem>通知</ElBreadcrumbItem>
        </ElBreadcrumb>
      </template>
      <ElAlert type="error" title="这个用户不存在。" :closable="false" />
      <NuxtLink to="/" class="mt-5 no-underline button-gray">
        返回
      </NuxtLink>
    </Panel>
    <template #sidebar>
      <SidebarUserProfile title="个人信息" :user="user" />
    </template>
  </NuxtLayout>
</template>

<style>
@media screen and (max-width: 992px) {
  .user__profile {
    margin-top: 0;
  }
  .latest-topic__title h3 {
    width: 100%;
    font-size: 14px;
  }
}
</style>
