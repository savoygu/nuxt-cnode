<script setup lang="ts">
import type { Reply, ResponseReply } from '~/types'

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
const handleTopicCollect = async () => {
  if (!topic.value) return

  const isCollect = topic.value.is_collect
  const { data, error } = await collectTopic(id, isCollect)
  if (data.value?.success) {
    refresh().then(() => {
      $toast.add({
        severity: 'success',
        detail: !isCollect ? '收藏成功' : '取消收藏成功',
        life: 3000
      })
    })
  } else if (error.value) {
    const { data } = error.value.data
    $toast.add({ severity: 'error', detail: data.error_msg, life: 3000 })
  }
}
const handleTopicReply = ({ reply, data }: { reply: Reply | null; data: ResponseReply }) => {
  refresh().then(() => {
    reply?.id && navigateTo({ path: route.path, replace: true, hash: `#${data?.reply_id}` })
  })
}
</script>

<template>
  <TheMain>
    <template v-if="topic">
      <Panel class="topic-article" bordered>
        <template #header>
          <span class="topic-article__title">
            <span>{{ topic.top ? '置顶' : topic.good ? '精品' : topic.tab && tabsInfo[topic.tab].name }}</span>
            {{ topic.title }}
          </span>
          <div class="topic-article__changes">
            <div>
              <span>&nbsp;发布于 {{ timeAgo(topic.create_at) }}&nbsp;</span>
              <span v-show="topic.author">&nbsp;作者 {{ topic.author.loginname }}&nbsp;</span>
              <span>&nbsp;{{ topic.visit_count }} 次预览&nbsp;</span>
              <span>&nbsp;最后一次回复是 {{ timeAgo(topic.last_reply_at) }}&nbsp;</span>
              <span>&nbsp;来自 {{ tabsInfo[topic.tab] && tabsInfo[topic.tab].name }}&nbsp;</span>
            </div>
            <div style="display: flex">
              <button
                class="topic-article__collection"
                :class="topic.is_collect ? 'button--white' : 'button--green'"
                @click="handleTopicCollect"
              >
                {{ topic.is_collect ? '取消收藏' : '收藏' }}
              </button>
            </div>
          </div>
          <div v-if="currentUser && currentUser?.loginname === currentAuthor?.loginname" class="topic-article__manage">
            <a :href="`/topic/${topic.id}/edit`"><i class="iconfont icon-edit"></i></a>
          </div>
        </template>
        <div class="topic-article__content" v-html="topic.content"></div>
      </Panel>
      <Comment v-if="topic.replies.length > 0" :topic="topic" @reply="handleTopicReply"></Comment>
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

<style lang="scss">
@include b(topic-article) {
  .panel__header {
    background-color: #fff;
  }

  @include e(title) {
    display: inline-block;
    width: 75%;
    margin: 8px 0;
    font-size: 22px;
    font-weight: 700;
    line-height: 130%;

    span {
      padding: 2px 4px;
      background: #80bd01;
      border-radius: 3px;
      color: #fff;
      font-size: 12px;
    }
  }

  @include e(changes) {
    display: flex;
    justify-content: space-between;
    color: #838383;
    font-size: 12px;

    span {
      &::before {
        content: '•';
      }
    }
  }

  @include e(manage) {
    i {
      color: #000;
      opacity: 0.4;
    }

    &:hover {
      i {
        opacity: 1;
      }
    }
  }

  @include e(content) {
    margin: 0 10px;
  }
}

@media screen and (max-width: $breakpoint-md) {
  .topic-article__changes {
    flex-direction: column;
  }

  .topic-article__collection {
    margin-top: 10px;
  }
}
</style>
