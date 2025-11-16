<script setup lang="ts">
useEditor()

// hooks
const { $toast } = useNuxtApp()
const route = useRoute()
const state = useStore()

// fetch
const id = route.params.id as string
const { data: topic, refresh } = await fetchTopic(id)

// computed
const currentUser = computed(() => state.value.user)
const currentAuthor = computed(() => topic.value?.author)
const author = computed(() => state.value.users[currentAuthor.value?.loginname ?? ''] ?? {})
const recentTopics = computed(() => author.value?.recent_topics.filter(topic => topic.id !== id) ?? [])

if (currentAuthor.value) {
  await fetchUser(currentAuthor.value.loginname)
}

// methods
async function handleTopicCollect() {
  if (!topic.value)
    return

  const isCollect = topic.value.is_collect
  const { data, error } = await collectTopic(id, isCollect)
  if (data.value?.success) {
    refresh().then(() => {
      $toast.open({
        type: 'success',
        message: !isCollect ? '收藏成功' : '取消收藏成功',
      })
    })
  }
  else if (error.value) {
    const { data } = error.value.data
    $toast.open({ type: 'error', message: data.error_msg })
  }
}
function handleTopicReply({ reply, data }: { reply: Reply | null, data: ResponseReply }) {
  refresh().then(() => {
    reply?.id && navigateTo({ path: route.path, replace: true, hash: `#${data?.reply_id}` })
  })
}
</script>

<template>
  <TheMain>
    <template v-if="topic">
      <Panel class="bg-white" bordered>
        <template #header>
          <span class="inline-block w-[75%] my-[8px] text-[22px] font-bold leading-[130%]">
            <span class="p-[2px_4px] bg-[#80bd01] rounded-[3px] text-white text-[12px]">
              {{ topic.top ? '置顶' : topic.good ? '精品' : topic.tab && tabsInfo[topic.tab].name }}
            </span>
            {{ topic.title }}
          </span>
          <div class="flex justify-between text-[#838383] text-[12px]">
            <div>
              <span>&nbsp;发布于 {{ timeAgo(topic.create_at) }}&nbsp;</span>
              <span v-show="topic.author">&nbsp;作者 {{ topic.author.loginname }}&nbsp;</span>
              <span>&nbsp;{{ topic.visit_count }} 次预览&nbsp;</span>
              <span>&nbsp;最后一次回复是 {{ timeAgo(topic.last_reply_at) }}&nbsp;</span>
              <span>&nbsp;来自 {{ tabsInfo[topic.tab] && tabsInfo[topic.tab].name }}&nbsp;</span>
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
          <div v-if="currentUser && currentUser?.loginname === currentAuthor?.loginname" class="topic-article__manage">
            <a :href="`/topic/${topic.id}/edit`"><i class="iconfont icon-edit text-black opacity-40 hover:opacity-100" /></a>
          </div>
        </template>
        <div class="mx-[10px]" v-html="topic.content" />
      </Panel>
      <Comment v-if="topic.replies.length > 0" :topic="topic" @reply="handleTopicReply" />
      <Panel v-if="currentUser" id="reply-topic" title="添加回复" bordered>
        <TopicReply :topic="topic" @reply="handleTopicReply" />
      </Panel>
    </template>
    <template #sidebar>
      <SidebarPersonalInformation :key="author.loginname" title="作者" :user="author" />
      <SidebarRecentTopics :topics="recentTopics" />
      <SidebarUnansweredTopic />
    </template>
  </TheMain>
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
