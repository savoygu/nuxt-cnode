<script setup lang="ts">
import { Reply } from '~/types'

const route = useRoute()
const state = useStore()

const visible = ref(false)
const errorText = ref('')

// fetch
const id = route.params.id as string
await fetchTopic(id)

const currentUser = computed(() => state.value.user)
const topic = computed(() => state.value.topics[id])
const user = computed(() => topic.value?.author)

const handleCollectTopic = () => {}
const handleReplyTopic = () => {}
const handleCommentTopic = (reply: Reply) => {}
</script>

<template>
  <Main>
    <div class="main__panel">
      <div v-if="topic" class="topic topic-article">
        <div class="topic-article__header">
          <span class="topic-article__title">
            <span>{{ topic.top ? '置顶' : topic.good ? '精品' : topic.tab && tabsInfo[topic.tab].name }}</span>
            {{ topic.title }}
          </span>
          <div class="topic-article__changes">
            <div>
              <span> 发布于 {{ timeAgo(topic.create_at) }} </span>
              <span v-show="topic.author"> 作者 {{ topic.author.loginname }} </span>
              <span> {{ topic.visit_count }} 次预览 </span>
              <span> 最后一次回复是 {{ timeAgo(topic.last_reply_at) }} </span>
              <span> 来自 {{ tabsInfo[topic.tab] && tabsInfo[topic.tab].name }} </span>
            </div>
            <div style="display: flex">
              <!-- <div class="topic-article__lazy-wrapper"><lazy-wrapper :loading="loading"></lazy-wrapper></div> -->
              <button
                class="topic-article__collection"
                :class="topic.is_collect ? 'button--white' : 'button--green'"
                @click="handleCollectTopic"
              >
                {{ topic.is_collect ? '取消收藏' : '收藏' }}
              </button>
            </div>
          </div>
          <div v-show="currentUser.loginname === user.loginname" class="topic-article__manage">
            <a :href="`/topic/${topic.id}/edit`"><i class="icon-edit"></i></a>
          </div>
        </div>
        <div class="topic-article__content">
          <div class="topic-article__markdown" v-html="topic.content"></div>
        </div>
      </div>
    </div>
    <div class="main__panel">
      <CommentItem :topic="topic" @comment="handleCommentTopic"></CommentItem>
    </div>
    <div id="reply-topic" class="main__panel">
      <div class="main__header">添加回复</div>
      <div class="topic topic-reply">
        <div class="topic-reply__inner">
          <textarea rows="8" style="display: none" class="reply-0"></textarea>
        </div>
        <button class="button--blue" @click="handleReplyTopic">回复</button>
        <BaseAlert v-model="visible" type="danger" :title="errorText"></BaseAlert>
      </div>
    </div>
    <template #sidebar></template>
  </Main>
</template>

<style lang="scss" scoped>
@include b(topic-article) {
  @include e(header) {
    padding: 10px;
    border-radius: 3px 3px 0 0;
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
    padding: 10px;
    border-top: 1px solid #e5e5e5;
    border-radius: 0 0 3px 3px;
  }

  @include e(markdown) {
    margin: 0 10px;
  }

  @include e(lazy-wrapper) {
    display: inline-block;
    height: 34px;
    margin-top: -5px;
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
  padding: 10px;
  border-top: 1px solid #e5e5e5;

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
