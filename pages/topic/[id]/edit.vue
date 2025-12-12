<script setup lang="ts">
// useEditor()

// hooks
const { $toast } = useNuxtApp()
const route = useRoute()
const id = route.params.id as string

const { data: topic } = await fetchTopic(id, false)

// reactive
const loading = ref(false)
const alert = reactive({
  visible: false,
  title: '',
})
const form = reactive({
  title: topic.value?.title ?? '',
  content: topic.value?.content ?? '',
  tab: topic.value?.tab as Tab,
})
const editorRef = ref<HTMLTextAreaElement>()
const editor = ref<Editor>()

// lifecycle
onMounted(() => {
  editor.value = new Editor({
    element: editorRef.value!,
  })
  editor.value.render()
})

// methods
function setAlert(title: string, visible: boolean) {
  alert.title = title
  alert.visible = visible
}

async function handleTopicSubmit() {
  if (!form.tab) {
    return setAlert('请选择发布的板块', true)
  }

  if (form.title.length < 10) {
    return setAlert('话题标题字数不能小于 10 个', true)
  }

  form.content = editor.value?.value()
  if (!form.content) {
    return setAlert('话题内容不能为空', true)
  }

  if (loading.value)
    return
  loading.value = true

  const { data, error } = await updateTopic(id, form)
  loading.value = false

  if (data.value?.success) {
    $toast.open({
      type: 'success',
      message: '更新话题成功',
    })
    navigateTo({ path: '/', query: { tab: form.tab } })
  }
  else if (error.value) {
    const { data } = error.value.data
    $toast.open({ type: 'error', message: data.error_msg })
  }
}
</script>

<template>
  <TheMain>
    <Panel>
      <template #header>
        <BaseBreadcrumb>
          <BaseBreadcrumbItem to="/">
            主页
          </BaseBreadcrumbItem>
          <BaseBreadcrumbItem>编辑话题</BaseBreadcrumbItem>
        </BaseBreadcrumb>
      </template>
      <div>
        <BaseAlert v-model="alert.visible" :title="alert.title" />
        <div class="mb-[20px]">
          <span>选择板块：</span>
          <select id="plate" v-model="form.tab" name="plate">
            <option disabled value="">
              请选择
            </option>
            <option value="share">
              分享
            </option>
            <option value="ask">
              问答
            </option>
            <option value="job">
              招聘
            </option>
            <option value="dev">
              客户端测试
            </option>
          </select>
        </div>
        <div class="mb-[20px]">
          <input
            v-model="form.title"
            type="text"
            class="w-full rounded-[4px] border border-[#ccc] p-[8px]"
            placeholder="标题字数 10 字以上"
          >
        </div>
        <div class="mb-[20px]">
          <div id="editormd">
            <textarea
              ref="editorRef"
              class="min-h-[300px] w-full rounded-[4px] border border-[#ccc] p-[8px]"
              placeholder="文章支持 Markdown 语法, 请注意标记代码"
            >{{ topic?.content ?? '' }}</textarea>
          </div>
        </div>
        <div>
          <button :disabled="loading" class="button-blue" @click="handleTopicSubmit">
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
