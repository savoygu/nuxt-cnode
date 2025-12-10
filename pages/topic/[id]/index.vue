<script setup lang="ts">
useEditor()

// hooks
const { $toast, $api } = useNuxtApp()
const route = useRoute()
const tokenCookie = useTokenCookie()
const userState = useUserState()
const logger = useLogger('[pages:topic]')

// fetch
const id = route.params.id as string

const { state: topicState, data: topic, fetch: fetchTopic } = useAPIData({
  fetcher: () => $api.cnode.topic({ id, accesstoken: tokenCookie.value ?? '', mdrender: 'true' }),
  processor(data) {
    return data ?? {} as CNodeTopic
  },
  logger,
  logContext: 'topic',
})
const author = ref<CNodeUser>()

// computed
const user = computed(() => userState.value.user)
const isSameUser = computed(() => user.value && user.value.loginname === topic.value?.author?.loginname)
const recentTopics = computed(() => {
  const topics = isSameUser.value ? user.value?.recent_topics : author.value?.recent_topics
  return topics?.filter(topic => topic.id !== id) ?? []
})
const tabName = computed(() => TAB_MAP[topic.value?.tab]?.name)

try {
  await fetchTopic()
  await fetchAuthor()
}
catch (err) {
  logger.error({ err }, 'get topic error')
}

async function fetchAuthor() {
  if (isSameUser.value) {
    return
  }

  const { error, data } = await useAsyncData(() => $api.cnode.user({ loginname: topic.value.author.loginname }))
  if (!error.value) {
    const { success, data: result } = data.value!
    if (success) {
      author.value = result
    }
    logger.info({ data: toRaw(data.value), render: toRaw(author.value) })
  }
}

// methods
async function handleTopicCollect() {
  if (!topic.value)
    return

  const isCollect = topic.value.is_collect
  const { success, msg } = await (isCollect ? $api.cnode.deCollectTopic : $api.cnode.collectTopic)({ topic_id: topic.value.id, accesstoken: tokenCookie.value ?? '' })
  if (success) {
    await topicState.value?.refresh()
    $toast.open({ type: 'success', message: isCollect ? '取消收藏成功' : '收藏成功' })
  }
  else {
    $toast.open({ type: 'error', message: msg! })
  }
}
async function handleTopicReply({ reply, data }: { reply: Reply | null, data: ResponseReply }) {
  await topicState.value?.refresh()
  reply?.id && navigateTo({ path: route.path, replace: true, hash: `#${data?.reply_id}` })
}
</script>

<template>
  <NuxtLayout>
    <Panel class="bg-white" bordered>
      <template #header>
        <span class="my-2 inline-block w-3/4 text-[22px] font-bold leading-[130%]">
          <span class="rounded-3 bg-success p-[2px_4px] text-xs text-white">
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
            <button
              :class="topic.is_collect ? 'button-white' : 'button-green'"
              @click="handleTopicCollect"
            >
              {{ topic.is_collect ? '取消收藏' : '收藏' }}
            </button>
          </div>
        </div>
        <div v-if="isSameUser">
          <NuxtLink :to="`/topic/${topic.id}/edit`">
            <i class="iconfont icon-edit text-black opacity-40 hover:opacity-100" />
          </NuxtLink>
        </div>
      </template>
      <div class="mx-[10px]" v-html="topic.content" />
    </Panel>
    <Comment v-if="topic.replies.length > 0" :topic="topic" @reply="handleTopicReply" />
    <Panel v-if="user" id="reply-topic" title="添加回复" bordered>
      <TopicReply :topic="topic" @reply="handleTopicReply" />
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
