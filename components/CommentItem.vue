<script setup lang="ts">
import { Reply, Topic } from '~/types'

type CommentItemProps = {
  topic: Topic
}
const props = defineProps<CommentItemProps>()
const { topic } = toRefs(props)

const emit = defineEmits<{ (e: 'comment', reply: Reply): void }>()

const store = useStore()
const user = computed(() => store.value.user)

const handleStarReply = async (reply: Reply) => {
  if (!user.value) {
    // 请先登录，登录后即可点赞
    return
  }

  const { data } = await starReply({ topicId: topic.value.id, replyId: reply.id })
  if (data.value.success) {
    // 点赞成功
  }
}
const handleReplyTopic = (reply: Reply) => {
  emit('comment', reply)
}
</script>

<template>
  <div class="topic topic-comment">
    <div class="topic-comment__header">
      <span>{{ topic.reply_count }} 回复</span>
    </div>
    <div class="topic-comment__list">
      <div v-for="reply in topic.replies" :key="reply.id" class="topic-comment__item">
        <div class="topic-comment__author">
          <div class="topic-comment__user">
            <a class="topic-comment__avatar" :href="`/user/${reply.author.loginname}`">
              <img :src="reply.author.avatar_url" :alt="reply.author.loginname" />
            </a>
            <a class="topic-comment__name">{{ reply.author.loginname }}</a>
            <a class="topic-comment__time" :href="`#${reply.id}`">1楼•{{ timeAgo(reply.create_at) }}</a>
          </div>
          <div class="topic-comment__action">
            <span :class="{ 'is-uped': reply.is_uped }" @click="handleStarReply(reply)">
              <i class="icon-star"></i>
              <span class="topic-comment__count">
                {{ reply.ups.length }}
              </span>
            </span>
            <a v-if="user" href="#reply-topic" @click="handleReplyTopic(reply)"><i class="icon-share"></i></a>
          </div>
        </div>
        <div class="topic-comment__content" v-html="reply.content"></div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@include b(topic-comment) {
  @include e(header) {
    padding: 10px;
    background-color: #f6f6f6;
    border-radius: 3px 3px 0 0;
    color: #444;
  }

  @include e(item) {
    padding: 10px;
    border-top: 1px solid #f0f0f0;
  }

  @include e(author) {
    display: flex;
    justify-content: space-between;
  }

  @include e(user) {
    display: flex;
  }

  @include e(avatar) {
    img {
      width: 30px;
      height: 30px;
      border-radius: 3px;
    }
  }

  @include e(name) {
    margin-left: 10px;
    color: #666;
    font-weight: 700;
    line-height: 20px;
  }

  @include e(time) {
    margin-left: 4px;
    color: #08c;
    font-size: 11px;
    line-height: 20px;

    @include hover {
      color: #005580;
      text-decoration: underline;
    }
  }

  @include e(action) {
    i {
      cursor: pointer;
      opacity: 0.4;
    }

    span {
      @include is(uped) {
        i {
          opacity: 1;
        }
      }
    }
  }

  @include e(count) {
    color: gray;
  }

  @include e(content) {
    padding-top: 5px;
  }
}
</style>
