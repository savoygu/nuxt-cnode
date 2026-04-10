<script setup lang="ts">
import type { FetchError } from 'ofetch'

// props
const { topic, reply } = defineProps<{
  topic: CNodeTopic
  reply?: CNodeReply
}>()

// emits
const emit = defineEmits<{
  (e: 'replySuccess', value?: CNodeReply): void
}>()

const { $api } = useNuxtApp()
const tokenCookie = useTokenCookie()

const [loading, toggleLoading] = useToggle(false)
const [alert, setAlert] = useToggle({
  visible: false,
  title: '',
})
const content = shallowRef<string>('')

// computed
// const replyId = computed(() => `reply-${props.reply?.id ?? useId()}`)

// methods
async function handleReply() {
  if (loading.value)
    return

  if (!content.value.trim()) {
    setAlert({ visible: true, title: '回复内容不能为空' })
    return
  }

  toggleLoading()
  try {
    const { success, msg } = await $api.cnode.createReply({ accesstoken: tokenCookie.value!, topic_id: topic.id, content: content.value, reply_id: reply?.id })
    if (success) {
      content.value = ''
      emit('replySuccess', reply)
    }
    else {
      setAlert({ visible: true, title: msg ?? '回复失败' })
    }
  }
  catch (err) {
    const data = (err as FetchError).data as APIResponse
    setAlert({ visible: true, title: data.msg ?? '回复失败' })
  }
  finally {
    toggleLoading()
  }
}
</script>

<template>
  <div class="reply">
    <ClientOnly>
      <div class="h-[200px] w-[98%] resize-y p-[0.5em] text-[15px] leading-[2em]">
        <TiptapSimpleEditor v-model="content" />
      </div>
    </ClientOnly>
    <ElButton
      type="primary"
      class="my-2.5"
      :disabled="loading"
      @click="handleReply()"
    >
      {{ loading ? '回复中..' : '回复' }}
    </ElButton>
    <ElAlert v-if="alert.visible" type="error" :title="alert.title" />
  </div>
</template>
