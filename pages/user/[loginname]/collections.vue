<script setup lang="ts">
// hooks
const route = useRoute()
const loginname = route.params.loginname as string

const [{ data: user }, { data: collections }] = await Promise.all([fetchUser(loginname), fetchCollections(loginname)])
</script>

<template>
  <TheMain v-if="user">
    <Panel>
      <template #header>
        <BaseBreadcrumb>
          <BaseBreadcrumbItem to="/">主页</BaseBreadcrumbItem>
          <BaseBreadcrumbItem>{{ user.loginname }} 收藏的话题</BaseBreadcrumbItem>
        </BaseBreadcrumb>
      </template>
      <div class="collect-topic">
        <template v-if="collections.length">
          <TopicItem v-for="item in collections" :key="item.id" :item="item"></TopicItem>
        </template>
        <p v-else class="collect-topic__none">暂无话题</p>
      </div>
    </Panel>
    <template #sidebar>
      <SidebarPersonalInformation :user="user" />
      <SidebarPublishTopic />
      <SidebarFriendlyCommunity />
      <SidebarClientQRCode />
    </template>
  </TheMain>
</template>

<style lang="scss" scoped>
@include b(collect-topic) {
  @include e(none) {
    padding: 10px 0 20px;
    text-align: center;
  }
}
</style>
