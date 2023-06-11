<script setup lang="ts">
import type { Reply, ResponseReply, Topic } from '~/types'
import { TopicReply } from '#components'

type CommentProps = {
  topic: Topic
}

// props
const props = defineProps<CommentProps>()
const { topic } = toRefs(props)

// emits
const emit = defineEmits<{ (e: 'reply', value: { reply: Reply | null; data: ResponseReply }): void }>()

// hooks
const { $toast } = useNuxtApp()
const state = useStore()
const currentUser = computed(() => state.value.user)

// reactive
const replyRef = ref<InstanceType<typeof TopicReply>[]>()
const showReplies = ref<boolean[]>(Array(topic.value.replies.length).fill(false))

// methods
const handleReplyStar = async (reply: Reply) => {
  const { data, error } = await starReply({ topicId: topic.value.id, replyId: reply.id })
  if (data.value?.success) {
    $toast.open({
      type: 'success',
      message: data.value.action === 'up' ? '点赞成功' : '取消点赞成功'
    })
  } else if (error.value) {
    const { data } = error.value.data
    $toast.open({ type: 'error', message: data.error_msg })
  }
}
const onTopicReply = (reply: Reply, index: number) => {
  showReplies.value[index] = !showReplies.value[index]

  nextTick(() => {
    if (showReplies.value[index] && replyRef.value?.at(-1)) {
      const loginname = reply.author.loginname
      const editor = replyRef.value.at(-1)!.editor!
      const cm = editor.codemirror
      cm.focus()
      if (!cm.getValue().includes(`@${loginname}`)) {
        editor!.value(`@${loginname} `)
        // @ts-ignore
        cm.setCursor({ line: 1 }) // set cursor to right position
      }
    }
  })
}
</script>

<template>
  <Panel v-if="topic" :title="`${topic.reply_count} 回复`" :content-padding="false">
    <div class="comment__list">
      <div v-for="(item, index) in topic.replies" :id="item.id" :key="item.id" class="comment__item">
        <div class="comment__author">
          <div class="comment__user">
            <a class="comment__avatar" :href="`/user/${item.author.loginname}`">
              <img :src="item.author.avatar_url" :alt="item.author.loginname" />
            </a>
            <a class="comment__name">{{ item.author.loginname }}</a>
            <a class="comment__time" :href="`#${item.id}`">1楼•{{ timeAgo(item.create_at) }}</a>
          </div>
          <div v-if="currentUser" class="comment__action">
            <span :class="{ 'is-uped': item.is_uped }" @click="handleReplyStar(item)">
              <i class="iconfont icon-star"></i>
              <span class="comment__count">
                {{ item.ups.length }}
              </span>
            </span>
            <span @click="onTopicReply(item, index)"><i class="iconfont icon-share"></i></span>
          </div>
        </div>
        <div class="comment__content" v-html="item.content"></div>
        <TopicReply
          v-if="currentUser && showReplies[index]"
          ref="replyRef"
          :topic="topic"
          :reply="item"
          @reply="
            value => {
              showReplies[index] = !showReplies[index]
              emit('reply', value)
            }
          "
        />
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
