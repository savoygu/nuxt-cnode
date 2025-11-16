<script setup lang="ts">
interface TopicReplyProps {
  topic: Topic
  reply?: Reply | null
}
// props
const props = withDefaults(defineProps<TopicReplyProps>(), {
  reply: null,
})
// emits
const emit = defineEmits<{
  (
    e: 'reply',
    value: {
      reply: Reply | null
      data: ResponseReply
    }
  ): void
}>()

const { reply, topic } = toRefs(props)

// reactive
const visible = ref(false)
const loading = ref(false)
const errorText = ref('')
const editorRef = ref<HTMLTextAreaElement>()
const editor = ref<Editor>()

// computed
const replyId = computed(() => `reply-${reply.value?.id ?? '0'}`)

// methods
async function handleTopicReply() {
  if (loading.value)
    return
  loading.value = true

  const content = editor.value?.codemirror.getValue() ?? ''
  const { data, error } = await replyTopic(topic.value!.id, content, reply.value?.id ?? '')
  loading.value = false

  if (data.value?.success) {
    editor.value?.codemirror.getDoc().setValue('') // 清空回复
    emit('reply', { reply: reply.value, data: data.value })
  }
  else {
    errorText.value = error.value?.message ?? '回复失败'
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
  <div>
    <div>
      <textarea
        :id="replyId"
        ref="editorRef"
        rows="8"
        class="w-[98%] h-[200px] p-[0.5em] text-[15px] leading-[2em] resize-y"
        style="display: none"
      />
    </div>
    <button
      class="button-blue my-[10px]"
      :disabled="loading"
      @click="handleTopicReply"
    >
      {{ loading ? '回复中..' : '回复' }}
    </button>
    <BaseAlert v-model="visible" type="danger" :title="errorText" />
  </div>
</template>

<style>
.CodeMirror {
  height: 160px;
}
</style>
