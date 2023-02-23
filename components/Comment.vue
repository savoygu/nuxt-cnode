<script setup lang="ts">
import { Reply, Topic } from '~/types'

type CommentProps = {
  topic: Topic
}

// props
const props = defineProps<CommentProps>()
const { topic } = toRefs(props)

// emits
const emit = defineEmits<{ (e: 'comment', reply: Reply): void }>()

// hooks
const store = useStore()
const currentUser = computed(() => store.value.user)

// methods
const handleStarReply = async (reply: Reply) => {
  // if (!currentUser.value) {
  //   // 请先登录，登录后即可点赞
  //   return
  // }

  const { data } = await starReply({ topicId: topic.value.id, replyId: reply.id })
  if (data.value && data.value.success) {
    // TODO 点赞成功
  }
}
const handleReplyTopic = (reply: Reply) => {
  emit('comment', reply)
}
</script>

<template>
  <Panel v-if="topic" :title="`${topic.reply_count} 回复`" no-padding>
    <div class="comment__list">
      <div v-for="reply in topic.replies" :key="reply.id" class="comment__item">
        <div class="comment__author">
          <div class="comment__user">
            <a class="comment__avatar" :href="`/user/${reply.author.loginname}`">
              <img :src="reply.author.avatar_url" :alt="reply.author.loginname" />
            </a>
            <a class="comment__name">{{ reply.author.loginname }}</a>
            <a class="comment__time" :href="`#${reply.id}`">1楼•{{ timeAgo(reply.create_at) }}</a>
          </div>
          <div v-if="currentUser" class="comment__action">
            <span :class="{ 'is-uped': reply.is_uped }" @click="handleStarReply(reply)">
              <i class="icon-star"></i>
              <span class="comment__count">
                {{ reply.ups.length }}
              </span>
            </span>
            <a href="#reply-topic" @click="handleReplyTopic(reply)"><i class="icon-share"></i></a>
          </div>
        </div>
        <div class="comment__content" v-html="reply.content"></div>
      </div>
    </div>
  </Panel>
</template>

<style lang="scss">
@include b(comment) {
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
