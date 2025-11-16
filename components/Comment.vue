<script setup lang="ts">
interface CommentProps {
  topic: Topic
}

// props
const props = defineProps<CommentProps>()
// emits
const emit = defineEmits<{ (e: 'reply', value: { reply: Reply | null, data: ResponseReply }): void }>()
// props
const { topic } = toRefs(props)

// hooks
const { $toast } = useNuxtApp()
const state = useStore()
const currentUser = computed(() => state.value.user)

// reactive
const replyRef = ref<InstanceType<typeof TopicReply>[]>()
const showReplies = ref<boolean[]>(Array.from({ length: topic.value.replies.length }).fill(false))

// methods
async function handleReplyStar(reply: Reply) {
  const { data, error } = await starReply({ topicId: topic.value.id, replyId: reply.id })
  if (data.value?.success) {
    $toast.open({
      type: 'success',
      message: data.value.action === 'up' ? '点赞成功' : '取消点赞成功',
    })
  }
  else if (error.value) {
    const { data } = error.value.data
    $toast.open({ type: 'error', message: data.error_msg })
  }
}
function onTopicReply(reply: Reply, index: number) {
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
      <div
        v-for="(item, index) in topic.replies"
        :id="item.id"
        :key="item.id"
        class="p-[10px] border-t border-t-[#f0f0f0]"
      >
        <div class="flex justify-between">
          <div class="flex">
            <a class="comment__avatar" :href="`/user/${item.author.loginname}`">
              <img
                :src="item.author.avatar_url"
                :alt="item.author.loginname"
                class="w-[30px] h-[30px] rounded-[3px]"
              >
            </a>
            <a class="ml-[10px] text-[#666] font-bold leading-[20px]">{{ item.author.loginname }}</a>
            <a
              class="ml-[4px] text-[#08c] text-[11px] leading-[20px] hover:text-[#005580] hover:underline"
              :href="`#${item.id}`"
            >
              1楼•{{ timeAgo(item.create_at) }}
            </a>
          </div>
          <div v-if="currentUser" class="comment__action">
            <span
              :class="{ 'opacity-100': item.is_uped }"
              @click="handleReplyStar(item)"
            >
              <i class="iconfont icon-star cursor-pointer opacity-40 hover:opacity-100" />
              <span class="text-gray-500 text-[11px]">
                {{ item.ups.length }}
              </span>
            </span>
            <span @click="onTopicReply(item, index)">
              <i class="iconfont icon-share cursor-pointer opacity-40 hover:opacity-100" />
            </span>
          </div>
        </div>
        <div class="pt-[5px]" v-html="item.content" />
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
