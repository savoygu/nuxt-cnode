<script setup lang="ts">
definePageMeta({
  middleware: 'auth',
})

const { $api } = useNuxtApp()
const userState = useUserState()
const tokenCookie = useTokenCookie()
const logger = useLogger('[page:messages]')

const message = ref<{
  hasnot_read_messages: CNodeMessage[]
  has_read_messages: CNodeMessage[]
}>({
  hasnot_read_messages: [],
  has_read_messages: [],
})

const currentUser = computed(() => userState.value.user)

try {
  await fetchMessages()
  await markAll()
}
catch (err) {
  logger.error({ err }, 'get my messages error')
}

async function fetchMessages() {
  const { data, error } = await useAsyncData(() => $api.cnode.messages({ accesstoken: tokenCookie.value! }))
  if (!error.value) {
    message.value = data.value?.data || message.value
  }
}

async function markAll() {
  await useLazyAsyncData(() => $api.cnode.messageMarkAll({ accesstoken: tokenCookie.value! }))
}
</script>

<template>
  <NuxtLayout>
    <Panel :content-padding="false">
      <template #header>
        <ElBreadcrumb>
          <ElBreadcrumbItem to="/">
            主页
          </ElBreadcrumbItem>
          <ElBreadcrumbItem>新消息</ElBreadcrumbItem>
        </ElBreadcrumb>
      </template>
      <div>
        <template v-if="message?.hasnot_read_messages.length">
          <Message v-for="item in message.hasnot_read_messages" :key="item.id" :message="item" />
        </template>
        <p v-else class="p-2.5">
          无消息
        </p>
      </div>
    </Panel>
    <Panel title="过往消息" :content-padding="false">
      <div>
        <template v-if="message?.has_read_messages.length">
          <Message v-for="item in message.has_read_messages" :key="item.id" :message="item" />
        </template>
        <p v-else class="p-2.5">
          无消息
        </p>
      </div>
    </Panel>
    <template #sidebar>
      <SidebarUserProfile title="个人信息" :user="currentUser" />
    </template>
  </NuxtLayout>
</template>
