<script setup lang="ts">
import { Tab } from '~/composables/api'

// hooks
const { $toast } = useNuxtApp()

// reactive
const loading = ref(false)
const alert = reactive({
  visible: false,
  title: ''
})
const form = reactive({
  title: '',
  content: '',
  tab: '' as Tab
})
const editorRef = ref<HTMLTextAreaElement | null>(null)
const editor = ref()

// lifecycle
onMounted(() => {
  editor.value = new window.Editor({
    element: editorRef.value
  })
  editor.value.render()
})

// methods
const setAlert = (title: string, visible: boolean) => {
  alert.title = title
  alert.visible = visible
}

const handleTopicSubmit = async () => {
  if (!form.tab) {
    return setAlert('请选择发布的板块', true)
  }

  if (form.title.length < 10) {
    return setAlert('话题标题字数不能小于 10 个', true)
  }

  form.content = editor.value.value()
  if (!form.content) {
    return setAlert('话题内容不能为空', true)
  }

  if (loading.value) return
  loading.value = true

  const { data, error } = await createTopic(form)
  loading.value = false

  if (data.value?.success) {
    $toast.add({
      severity: 'success',
      detail: '创建话题成功',
      life: 3000
    })
    navigateTo({ path: '/', query: { tab: form.tab } })
  } else if (error.value) {
    const { data } = error.value.data
    $toast.add({ severity: 'error', detail: data.error_msg, life: 3000 })
  }
}
</script>

<template>
  <ClientOnly>
    <Toast position="top-center" />
  </ClientOnly>
  <TheMain>
    <Panel>
      <template #header>
        <BaseBreadcrumb>
          <BaseBreadcrumbItem to="/">主页</BaseBreadcrumbItem>
          <BaseBreadcrumbItem>发布话题</BaseBreadcrumbItem>
        </BaseBreadcrumb>
      </template>
      <div class="topic-create">
        <BaseAlert v-model="alert.visible" class="topic-create__alert" :title="alert.title"></BaseAlert>
        <div class="topic-create__plate">
          <span>选择板块：</span>
          <select id="plate" v-model="form.tab" name="plate">
            <option disabled value="">请选择</option>
            <option value="share">分享</option>
            <option value="ask">问答</option>
            <option value="job">招聘</option>
            <option value="dev">客户端测试</option>
          </select>
        </div>
        <div class="topic-create__title">
          <input v-model="form.title" type="text" placeholder="标题字数 10 字以上" />
        </div>
        <div class="topic-create__content">
          <div id="editormd">
            <textarea
              ref="editorRef"
              class="topic-create__editor"
              placeholder="文章支持 Markdown 语法, 请注意标记代码"
            ></textarea>
          </div>
        </div>
        <div class="topic-create__submit">
          <button :disabled="loading" class="button--blue" @click="handleTopicSubmit">
            {{ loading ? '提交中..' : '提交' }}
          </button>
        </div>
      </div>
    </Panel>
    <template #sidebar>
      <SidebarMarkdownGrammar />
      <SidebarTopicPublishGuide />
    </template>
  </TheMain>
</template>
