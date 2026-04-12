<script setup lang="ts">
import type { FetchError } from 'ofetch'

const emit = defineEmits<{
  (e: 'replySuccess', value: CNodeReply): void
}>()

const topic = defineModel<CNodeTopic>('topic', {
  type: Object,
  default: () => ({}),
})

// hooks
const { $api } = useNuxtApp()
const tokenCookie = useTokenCookie()

const userState = useUserState()
const user = computed(() => userState.value.user)

// reactive
const showReplies = ref<boolean[]>(Array.from({ length: topic.value.replies.length }, () => false))

// methods
async function handleStarReply(reply: CNodeReply) {
  try {
    const { success, data, msg } = await $api.cnode.upReply({ accesstoken: tokenCookie.value!, reply_id: reply.id })
    if (success) {
      const isUped = data.action === 'up'
      const targetReply = topic.value.replies.find(item => item.id === reply.id)
      if (targetReply) {
        targetReply.is_uped = isUped
        if (user.value) {
          if (isUped) {
            targetReply.ups.push(user.value.id)
          }
          else {
            targetReply.ups = targetReply.ups.filter(id => id !== user.value!.id)
          }
        }
      }
      ElMessage.success({
        type: 'success',
        message: isUped ? '点赞成功' : '取消点赞成功',
      })
    }
    else {
      ElMessage.error({ type: 'error', message: msg! })
    }
  }
  catch (err: unknown) {
    const data = (err as FetchError).data as APIResponse
    ElMessage.error({ type: 'error', message: data.msg || '网络错误，点赞失败' })
  }
}

function handleOpenReply(reply: CNodeReply, index: number) {
  showReplies.value[index] = !showReplies.value[index]
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
            <NuxtImg
              :src="item.author.avatar_url"
              :alt="item.author.loginname"
              class="size-[30px] rounded-small"
              loading="lazy"
            />
          </NuxtLink>
          <div>
            <div class="justify-between ver-center">
              <a class="font-bold text-[#666]">{{ item.author.loginname }}</a>
              <div class="mr-auto">
                <a
                  class="mx-1 text-small text-primary hover:text-[#005580] hover:underline"
                  :href="`#${item.id}`"
                >
                  {{ index + 1 }}楼•{{ timeAgo(item.create_at) }}
                </a>
                <span v-if="user && user?.loginname === item.author.loginname" class="bg-[#6ba44e] p-0.5 text-xs text-white">作者</span>
              </div>
              <template v-if="user">
                <span
                  class="ver-center"
                  :class="{ 'opacity-100': item.is_uped }"
                  @click="handleStarReply(item)"
                >
                  <NuxtIcon name="uil:thumbs-up" class="cursor-pointer opacity-40 hover:opacity-100" />
                  <span class="text-small leading-4 text-gray-500">
                    {{ item.ups.length }}
                  </span>
                </span>
                <NuxtIcon name="uil:share" class="cursor-pointer opacity-40 hover:opacity-100" @click="handleOpenReply(item, index)" />
              </template>
            </div>
            <div class="pl-4" v-html="item.content" />
          </div>
        </div>
        <TopicReply
          v-if="user && showReplies[index]"
          :topic="topic"
          :reply="item"
          @reply-success="handleReply(item, index)"
        />
      </div>
    </div>
  </Panel>
</template>
