<script setup lang="ts">
import { Reply } from '~/types'

// hooks
const route = useRoute()
const state = useStore()

// reactive
const visible = ref(false)
const errorText = ref('')
let editor: any
let currentReply: Reply

// fetch
const id = route.params.id as string
await fetchTopic(id)

// computed
const currentUser = computed(() => state.value.user)
const topic = computed(() => state.value.topics[id])
const currentAuthor = computed(() => topic.value.author)
const author = computed(() => state.value.users[currentAuthor.value.loginname])
const recentTopics = computed(() => author.value.recent_topics.filter(topic => topic.id !== id))

await fetchUser(currentAuthor.value.loginname)

// methods
const handleCollectTopic = () => {}
const handleReplyTopic = () => {}
const handleCommentTopic = (reply: Reply) => {
  if (editor) {
    currentReply = reply
    nextTick(() => {
      editor.codemirror.getDoc().setValue(`@${reply.author.loginname} `)
      editor.codemirror.cursor()
      console.log(editor.codemirror)
    })
  }
}

// lifecycle
onMounted(() => {
  editor = new window.Editor({
    element: document.querySelector('.reply-0'),
    status: false
  })
  editor.render()
})
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
                @click="handleCollectTopic"
              >
                {{ topic.is_collect ? '取消收藏' : '收藏' }}
              </button>
            </div>
          </div>
          <div v-if="currentUser && currentUser.loginname === currentAuthor.loginname" class="topic-article__manage">
            <a :href="`/topic/${topic.id}/edit`"><i class="iconfont icon-edit"></i></a>
          </div>
        </template>
        <div class="topic-article__content" v-html="topic.content"></div>
      </Panel>
      <Comment v-if="topic.replies.length > 0" :topic="topic" @comment="handleCommentTopic"></Comment>
      <Panel v-if="currentUser" id="reply-topic" title="添加回复" bordered>
        <div class="topic-reply">
          <div class="topic-reply__inner">
            <textarea rows="8" style="display: none" class="reply-0"></textarea>
          </div>
          <button class="button--blue" @click="handleReplyTopic">回复</button>
          <BaseAlert v-model="visible" type="danger" :title="errorText"></BaseAlert>
        </div>
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

@include b(topic-reply) {
  textarea {
    width: 98%;
    height: 200px;
    padding: 0.5em;
    font-size: 15px;
    line-height: 2em;
    resize: vertical;
  }

  .CodeMirror {
    height: 160px;
  }

  button {
    margin: 10px 0;
  }
}
</style>
