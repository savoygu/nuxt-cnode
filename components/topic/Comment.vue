<script setup lang="ts">
import type { Position } from 'codemirror'
import type { FetchError } from 'ofetch'

const emit = defineEmits<{
  (e: 'replySuccess', value: CNodeReply): void
}>()

const topic = defineModel<CNodeTopic>('topic', {
  type: Object,
  default: () => ({}),
})

// hooks
const { $toast, $api } = useNuxtApp()
const userState = useUserState()
const tokenCookie = useTokenCookie()
const user = computed(() => userState.value.user)

// reactive
const repliesRef = useTemplateRef('replies')
const showReplies = ref<boolean[]>(Array.from({ length: topic.value.replies.length }, () => false))

// methods
async function handleStarReply(reply: CNodeReply) {
  try {
    const { success, data, msg } = await $api.cnode.upReply({ accesstoken: tokenCookie.value!, reply_id: reply.id })
    if (success) {
      const isUped = data.action === 'up'
      topic.value.replies = topic.value.replies.map((item) => {
        if (item.id === reply.id) {
          item.is_uped = isUped
          if (user.value) {
            if (isUped) {
              item.ups.push(user.value.id)
            }
            else {
              item.ups = item.ups.filter(name => name !== user.value!.id)
            }
          }
        }
        return item
      })
      $toast.open({
        type: 'success',
        message: isUped ? '点赞成功' : '取消点赞成功',
      })
    }
    else {
      $toast.open({ type: 'error', message: msg! })
    }
  }
  catch (err: unknown) {
    const data = (err as FetchError).data as APIResponse
    $toast.open({ type: 'error', message: data.msg || '网络错误，点赞失败' })
  }
}
function handleOpenReply(reply: Reply, index: number) {
  showReplies.value[index] = !showReplies.value[index]

  nextTick(() => {
    if (showReplies.value[index] && repliesRef.value?.at(-1)) {
      const loginname = reply.author.loginname
      const editor = repliesRef.value.at(-1)?.editor
      if (editor) {
        editor.codemirror.focus()
        if (!editor.codemirror.getValue().startsWith(`@${loginname}`)) {
          editor.value(`@${loginname} `)
          editor.codemirror.setCursor({ line: 1 } as Position)
        }
      }
    }
  })
}
function handleReply(item: CNodeReply, index: number) {
  showReplies.value[index] = !showReplies.value[index]
  emit('replySuccess', item)
}
</script>

<template>
  <Panel v-if="topic" :title="`${topic.reply_count} 回复`" :content-padding="false">
    <div class="comment-list">
      <div
        v-for="(item, index) in topic.replies"
        :id="item.id"
        :key="item.id"
        class="border-t border-t-[#f0f0f0] p-2.5"
      >
        <div class="grid grid-cols-[30px_1fr] gap-2.5">
          <NuxtLink :to="`/user/${item.author.loginname}`">
            <img
              :src="item.author.avatar_url"
              :alt="item.author.loginname"
              class="size-[30px] rounded-3"
            >
          </NuxtLink>
          <div>
            <div class="flex justify-between">
              <a class="font-bold text-[#666]">{{ item.author.loginname }}</a>
              <div class="mr-auto">
                <a
                  class="mx-1 text-11 text-primary hover:text-[#005580] hover:underline"
                  :href="`#${item.id}`"
                >
                  {{ index + 1 }}楼•{{ timeAgo(item.create_at) }}
                </a>
                <span v-if="user && user?.loginname === item.author.loginname" class="bg-[#6ba44e] p-0.5 text-xs text-white">作者</span>
              </div>
              <template v-if="user">
                <span
                  :class="{ 'opacity-100': item.is_uped }"
                  @click="handleStarReply(item)"
                >
                  <i class="iconfont icon-star cursor-pointer opacity-40 hover:opacity-100" />
                  <span class="text-11 text-gray-500">
                    {{ item.ups.length }}
                  </span>
                </span>
                <span @click="handleOpenReply(item, index)">
                  <i class="iconfont icon-share cursor-pointer opacity-40 hover:opacity-100" />
                </span>
              </template>
            </div>
            <div class="pl-[15px]" v-html="item.content" />
          </div>
        </div>
        <TopicReply
          v-if="user && showReplies[index]"
          ref="replies"
          :topic="topic"
          :reply="item"
          @reply-success="() => handleReply(item, index)"
        />
      </div>
    </div>
  </Panel>
</template>
