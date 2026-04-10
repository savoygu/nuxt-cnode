<script setup lang="ts">
definePageMeta({
  middleware: 'auth',
})

const { $api } = useNuxtApp()
const tokenCookie = useTokenCookie()
const logger = useLogger('[page:messages]')

const userState = useUserState()
const user = computed(() => userState.value.user)

const { data, fetch: getMessages } = useAPIData({
  fetcher: () => $api.cnode.messages({ accesstoken: tokenCookie.value! }),
  processor: (data) => {
    return data ?? { hasnot_read_messages: [], has_read_messages: [] }
  },
})

const { lazyFetch: lazyMarkAll } = useAPIData({
  fetcher: () => $api.cnode.messageMarkAll({ accesstoken: tokenCookie.value! }),
  processor: data => data ?? { marked_msgs: [] },
})

try {
  await getMessages()
  await lazyMarkAll()
}
catch (err) {
  logger.error({ err }, 'get my messages error')
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
        <template v-if="data.hasnot_read_messages.length">
          <Message v-for="item in data.hasnot_read_messages" :key="item.id" :message="item" />
        </template>
        <p v-else class="p-2.5">
          无消息
        </p>
      </div>
    </Panel>
    <Panel title="过往消息" :content-padding="false">
      <div>
        <template v-if="data.has_read_messages.length">
          <Message v-for="item in data.has_read_messages" :key="item.id" :message="item" />
        </template>
        <p v-else class="p-2.5">
          无消息
        </p>
      </div>
    </Panel>
    <template #sidebar>
      <SidebarUserProfile title="个人信息" :user="user" />
    </template>
  </NuxtLayout>
</template>
