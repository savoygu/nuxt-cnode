<script setup lang="ts">
// useEditor()

// hooks
const { $api } = useNuxtApp()
const tokenCookie = useTokenCookie()

const route = useRoute()
const id = route.params.id as string

const logger = useLogger(`[pages:topic:${id}]`)

const userState = useUserState()
const user = computed(() => userState.value.user)

const { state: topicState, data: topic, fetch: getTopic } = useAPIData({
  fetcher: () => $api.cnode.topic({ id, accesstoken: tokenCookie.value ?? '', mdrender: 'true' }),
  processor(data) {
    return data ?? {} as CNodeTopic
  },
  logger,
  logContext: 'topic',
})

const isSameUser = computed(() => user.value && user.value.loginname === topic.value?.author?.loginname)

const { data: author, fetch: getAuthor } = useAPIData({
  fetcher: () => {
    if (isSameUser.value) {
      return Promise.resolve({ success: true, data: user.value })
    }
    return $api.cnode.user({ loginname: topic.value?.author.loginname ?? '' })
  },
  processor: data => data,
})

// computed
const recentTopics = computed(() => {
  return author.value?.recent_topics?.filter(topic => topic.id !== id) ?? []
})
const tabName = computed(() => TAB_MAP[topic.value?.tab]?.name)

try {
  await getTopic()
  await getAuthor()
}
catch (err) {
  logger.error({ err }, 'get topic error')
}

// methods
async function handleTopicCollect() {
  if (!topic.value)
    return

  const isCollect = topic.value.is_collect
  const { success, msg } = await (isCollect ? $api.cnode.deCollectTopic : $api.cnode.collectTopic)({ topic_id: topic.value.id, accesstoken: tokenCookie.value ?? '' })
  if (success) {
    await topicState.value?.refresh()
    ElMessage.success({ type: 'success', message: isCollect ? '取消收藏成功' : '收藏成功' })
  }
  else {
    ElMessage.error({ type: 'error', message: msg! })
  }
}

async function handleTopicReply(reply?: CNodeReply) {
  await topicState.value?.refresh()
  reply?.id && navigateTo({ path: route.path, replace: true, hash: `#${reply?.reply_id}` })
}
</script>

<template>
  <NuxtLayout>
    <Panel class="bg-white" bordered>
      <template #header>
        <span class="my-2 inline-block w-3/4 text-[22px] font-bold leading-[130%]">
          <span v-if="topic.top || topic.good" class="rounded-small bg-primary p-[2px_4px] text-xs text-white">
            {{ topic.top ? '置顶' : topic.good ? '精品' : tabName }}
          </span>
          {{ topic.title }}
        </span>
        <div class="flex justify-between text-xs text-[#838383]">
          <div>
            <span>&nbsp;发布于 {{ timeAgo(topic.create_at) }}&nbsp;</span>
            <span v-show="topic.author">&nbsp;作者 {{ topic.author.loginname }}&nbsp;</span>
            <span>&nbsp;{{ topic.visit_count }} 次预览&nbsp;</span>
            <span>&nbsp;最后一次回复是 {{ timeAgo(topic.last_reply_at) }}&nbsp;</span>
            <span>&nbsp;来自 {{ tabName }}&nbsp;</span>
          </div>
          <div class="flex">
            <ElButton
              :type="topic.is_collect ? 'default' : 'primary'"
              @click="handleTopicCollect"
            >
              {{ topic.is_collect ? '取消收藏' : '收藏' }}
            </ElButton>
          </div>
        </div>
        <div v-if="isSameUser">
          <NuxtLink :to="`/topic/${topic.id}/edit`">
            <NuxtIcon name="uil:edit" class="text-black opacity-40 hover:opacity-100" />
          </NuxtLink>
        </div>
      </template>
      <div class="mx-2.5" v-html="topic.content" />
    </Panel>
    <TopicComment v-if="topic.replies.length > 0" v-model:topic="topic" @reply-success="handleTopicReply" />
    <Panel v-if="user" id="reply-topic" title="添加回复" bordered>
      <TopicReply :topic="topic" @reply-success="handleTopicReply" />
    </Panel>
    <template #sidebar>
      <SidebarUserProfile title="作者" :user="author" />
      <SidebarRecentTopics :topics="recentTopics" />
    </template>
  </NuxtLayout>
</template>

<style>
@media screen and (max-width: 768px) {
  .topic-article__changes {
    flex-direction: column;
  }
  .topic-article__collection {
    margin-top: 10px;
  }
}
</style>
