<script setup lang="ts">
// useEditor()

const { $api } = useNuxtApp()
const tokenCookie = useTokenCookie()
const logger = useLogger('page:topic:create')

// reactive
const form = reactive({
  title: '',
  content: '',
  tab: '' as TabKey,
})
const alert = reactive({
  visible: false,
  title: '',
})
const loading = ref(false)
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

  try {
    const { success, msg } = await $api.cnode.createTopic({ accesstoken: tokenCookie.value!, ...form })

    if (success) {
      ElMessage.success({ type: 'success', message: '创建话题成功' })
      await navigateTo({ path: '/', query: { tab: form.tab } })
    }
    else {
      ElMessage.error({ type: 'error', message: msg || '创建话题失败' })
    }
  }
  catch (err) {
    logger.error({ err }, 'create topic error')
    ElMessage.error({ type: 'error', message: '创建话题失败' })
  }
  finally {
    loading.value = false
  }
}
</script>

<template>
  <NuxtLayout>
    <Panel>
      <template #header>
        <ElBreadcrumb>
          <ElBreadcrumbItem to="/">
            主页
          </ElBreadcrumbItem>
          <ElBreadcrumbItem>发布话题</ElBreadcrumbItem>
        </ElBreadcrumb>
      </template>
      <div>
        <ElAlert v-model="alert.visible" :title="alert.title" />
        <div class="mb-5">
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
        <div class="mb-5">
          <input
            v-model="form.title"
            type="text"
            class="w-full rounded border border-[#ccc] p-2"
            placeholder="标题字数 10 字以上"
          >
        </div>
        <div class="mb-5">
          <div id="editormd">
            <textarea
              ref="editorRef"
              class="min-h-[300px] w-full rounded border border-[#ccc] p-2"
              placeholder="文章支持 Markdown 语法, 请注意标记代码"
            />
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
  </NuxtLayout>
</template>
