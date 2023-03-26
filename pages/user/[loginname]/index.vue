<script setup lang="ts">
definePageMeta({
  name: 'user'
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
            <BaseBreadcrumbItem to="/">主页</BaseBreadcrumbItem>
            <BaseBreadcrumbItem></BaseBreadcrumbItem>
          </BaseBreadcrumb>
        </template>
        <div class="user__info">
          <div class="user__personal">
            <img class="user__avatar" :src="user.avatar_url" alt="" />
            <span class="user__name">{{ user.loginname }}</span>
          </div>
          <div class="user__profile">
            <div class="user__score">{{ user.score }} 积分</div>
            <div class="user__collection">
              <nuxt-link :to="`/user/${user.loginname}/collections`">查看话题收藏</nuxt-link>
            </div>
          </div>
          <p class="user__register">注册时间 {{ timeAgo(user.create_at) }}</p>
        </div>
      </Panel>
      <Panel title="最近创建的话题">
        <TopicLatest :topics="user.recent_topics"></TopicLatest>
      </Panel>
      <Panel title=" 最近参与的话题">
        <TopicLatest :topics="user.recent_replies"></TopicLatest>
      </Panel>
    </template>
    <Panel v-else>
      <template #header>
        <BaseBreadcrumb>
          <BaseBreadcrumbItem to="/">主页</BaseBreadcrumbItem>
          <BaseBreadcrumbItem>通知</BaseBreadcrumbItem>
        </BaseBreadcrumb>
      </template>
      <BaseAlert :model-value="true" title="这个用户不存在。"></BaseAlert>
      <NuxtLink to="/" class="button--gray user__back">返回</NuxtLink>
    </Panel>
    <template #sidebar>
      <SidebarPersonalInformation :user="user" />
      <SidebarPublishTopic />
      <SidebarFriendlyCommunity />
      <SidebarClientQRCode />
    </template>
  </TheMain>
</template>

<style lang="scss">
@include b(user) {
  @include e(info) {
    padding: 10px;
  }

  @include e(avatar) {
    width: 40px;
    height: 40px;
    margin-right: 10px;
    border-radius: 3px;
  }

  @include e(name) {
    display: inline-block;
    color: #778087;
    line-height: 32px;
    vertical-align: top;
  }

  @include e(profile) {
    margin-top: 20px;
  }

  @include e(score) {
    line-height: 20px;
  }

  @include e(collection) {
    line-height: 2em;

    a {
      color: #778087;
    }
  }

  @include e(register) {
    color: #ababab;
    font-size: 14px;
    line-height: 2em;
  }

  @include e(back) {
    margin-top: 20px;
    text-decoration: none;
  }
}

@media screen and (max-width: $breakpoint-lg) {
  .user__profile {
    margin-top: 0;
  }

  .latest-topic__title {
    h3 {
      width: 100%;
      font-size: 14px;
    }
  }
}
</style>
