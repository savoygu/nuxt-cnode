<script setup lang="ts">
import type { FetchError } from 'ofetch'

// props
const props = defineProps<{
  topic: CNodeTopic
  reply?: CNodeReply
}>()

// emits
const emit = defineEmits<{
  (e: 'replySuccess', value?: CNodeReply): void
}>()

const { $api } = useNuxtApp()
const tokenCookie = useTokenCookie()
const editorRef = useTemplateRef('editor')

// reactive
const loading = shallowRef(false)
const editor = shallowRef<Editor>()
const alert = reactive({
  visible: false,
  title: '',
})

// computed
const replyId = computed(() => `reply-${props.reply?.id ?? '0'}`)

// methods
async function handleReply() {
  if (loading.value)
    return

  loading.value = true

  try {
    const content = editor.value?.codemirror.getValue() ?? ''
    const { success, msg } = await $api.cnode.createReply({ accesstoken: tokenCookie.value!, topic_id: props.topic.id, content, reply_id: props.reply?.id })
    if (success) {
      editor.value?.codemirror.getDoc().setValue('') // 清空回复
      emit('replySuccess', props.reply)
    }
    else {
      Object.assign(alert, {
        visible: true,
        title: msg ?? '回复失败',
      })
    }
  }
  catch (err) {
    const data = (err as FetchError).data as APIResponse
    Object.assign(alert, {
      visible: true,
      title: data.msg ?? '回复失败',
    })
  }
  finally {
    loading.value = false
  }
}

// lifecycle
onMounted(() => {
  editor.value = new Editor({
    element: editorRef.value!,
    status: false,
  })
  editor.value.render()
})

// expose
defineExpose({
  editor,
})
</script>

<template>
  <div class="reply">
    <div>
      <textarea
        :id="replyId"
        ref="editor"
        rows="8"
        class="h-[200px] w-[98%] resize-y p-[0.5em] text-[15px] leading-[2em]"
        style="display: none"
      />
    </div>
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

<style scoped>
.reply {
  .CodeMirror {
    height: 160px;
  }
}
</style>
