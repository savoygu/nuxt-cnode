<script setup lang="ts">
import { Reply, Topic, ResponseReply } from '~/types'

type TopicReplyProps = {
  topic: Topic
  reply?: Reply | null
}
// props
const props = withDefaults(defineProps<TopicReplyProps>(), {
  reply: null
})
const { reply, topic } = toRefs(props)

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

// reactive
const visible = ref(false)
const loading = ref(false)
const errorText = ref('')
const editorRef = ref<HTMLTextAreaElement | null>(null)
const editor = ref<any>()

// computed
const replyId = computed(() => `reply-${reply.value?.id ?? '0'}`)

// methods
const handleTopicReply = async () => {
  if (loading.value) return
  loading.value = true

  const content = editor.value.codemirror.getValue()
  const { data, error } = await replyTopic(topic.value!.id, content, reply.value?.id ?? '')

  loading.value = false

  if (data.value?.success) {
    editor.value.codemirror.getDoc().setValue('') // 清空回复
    emit('reply', { reply: reply.value, data: data.value })
  } else {
    errorText.value = error.value?.message ?? '回复失败'
  }
}

// lifecycle
onMounted(() => {
  editor.value = new window.Editor({
    element: editorRef.value,
    status: false
  })
  editor.value.render()
})

// expose
defineExpose({
  editor
})
</script>

<template>
  <div class="topic-reply">
    <div class="topic-reply__inner">
      <textarea :id="replyId" ref="editorRef" rows="8" style="display: none"></textarea>
    </div>
    <button class="button--blue" :disabled="loading" @click="handleTopicReply">
      {{ loading ? '回复中..' : '回复' }}
    </button>
    <BaseAlert v-model="visible" type="danger" :title="errorText"></BaseAlert>
  </div>
</template>

<style lang="scss">
@include b(topic-reply) {
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
