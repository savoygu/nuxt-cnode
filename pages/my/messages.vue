<script setup lang="ts">
definePageMeta({
  middleware: 'auth'
})

// hooks
const state = useStore()
const currentUser = computed(() => state.value.user)
const user = computed(() => state.value.users[currentUser.value?.loginname ?? ''])

const [{ data: message }] = await Promise.all([
  fetchMessages(),
  currentUser.value && fetchUser(currentUser.value.loginname)
])
</script>

<template>
  <TheMain>
    <Panel :content-padding="false">
      <template #header>
        <BaseBreadcrumb>
          <BaseBreadcrumbItem to="/">主页</BaseBreadcrumbItem>
          <BaseBreadcrumbItem>新消息</BaseBreadcrumbItem>
        </BaseBreadcrumb>
      </template>
      <div class="messages">
        <template v-if="message?.hasnot_read_messages.length">
          <Message v-for="item in message.hasnot_read_messages" :key="item.id" :message="item"></Message>
        </template>
        <p v-else class="messages__none">无消息</p>
      </div>
    </Panel>
    <Panel title="过往消息" :content-padding="false">
      <div class="messages__beyond">
        <template v-if="message?.has_read_messages.length">
          <Message v-for="item in message.has_read_messages" :key="item.id" :message="item"></Message>
        </template>
        <p v-else class="messages__none">无消息</p>
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

<style lang="scss">
@include b(messages) {
  @include e(none) {
    padding: 10px;
  }

  @include e(beyond) {
    // body
  }
}
</style>
