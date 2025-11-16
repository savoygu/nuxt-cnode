<script setup lang="ts">
definePageMeta({
  name: 'user',
})

// hooks
const state = useStore()
const route = useRoute()
const loginUser = computed(() => state.value.user)
const loginname = route.params.loginname as string
const { data: currentUser } = await fetchUser(loginname)
const user = computed(() => currentUser.value ?? state.value.users[loginUser.value?.loginname ?? ''])
if (!currentUser.value && loginUser.value) {
  await fetchUser(loginUser.value.loginname)
}
</script>

<template>
  <TheMain>
    <template v-if="currentUser">
      <Panel>
        <template #header>
          <BaseBreadcrumb>
            <BaseBreadcrumbItem to="/">
              主页
            </BaseBreadcrumbItem>
            <BaseBreadcrumbItem />
          </BaseBreadcrumb>
        </template>
        <div class="p-[10px]">
          <div class="flex items-center">
            <img
              class="w-[40px] h-[40px] mr-[10px] rounded-[3px]"
              :src="user.avatar_url"
              alt=""
            >
            <span class="inline-block text-[#778087] leading-[32px] align-top">
              {{ user.loginname }}
            </span>
          </div>
          <div class="mt-[20px]">
            <div class="leading-[20px]">
              {{ user.score }} 积分
            </div>
            <div class="leading-[2em]">
              <nuxt-link class="text-[#778087]" :to="`/user/${user.loginname}/collections`">
                查看话题收藏
              </nuxt-link>
            </div>
          </div>
          <p class="text-[#ababab] text-[14px] leading-[2em]">
            注册时间 {{ timeAgo(user.create_at) }}
          </p>
        </div>
      </Panel>
      <Panel title="最近创建的话题">
        <TopicLatest :topics="user.recent_topics" />
      </Panel>
      <Panel title=" 最近参与的话题">
        <TopicLatest :topics="user.recent_replies" />
      </Panel>
    </template>
    <Panel v-else>
      <template #header>
        <BaseBreadcrumb>
          <BaseBreadcrumbItem to="/">
            主页
          </BaseBreadcrumbItem>
          <BaseBreadcrumbItem>通知</BaseBreadcrumbItem>
        </BaseBreadcrumb>
      </template>
      <BaseAlert :model-value="true" title="这个用户不存在。" />
      <NuxtLink to="/" class="button-gray mt-[20px] no-underline">
        返回
      </NuxtLink>
    </Panel>
    <template #sidebar>
      <SidebarPersonalInformation :user="user" />
      <SidebarPublishTopic />
      <SidebarFriendlyCommunity />
      <SidebarClientQRCode />
    </template>
  </TheMain>
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
