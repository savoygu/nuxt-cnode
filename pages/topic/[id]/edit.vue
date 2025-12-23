<script setup lang="ts">
// useEditor()

// hooks
const route = useRoute()
const { $api } = useNuxtApp()
const tokenCookie = useTokenCookie()
const id = route.params.id as string

const { data } = await useAsyncData(() => $api.cnode.topic({ id, accesstoken: tokenCookie.value!, mdrender: 'true' }))
const topic = data.value?.data

// reactive
const form = reactive({
  title: topic?.title ?? '',
  content: topic?.content ?? '',
  tab: topic?.tab as TabKey,
})
const alert = reactive({
  visible: false,
  title: '',
})
const editorRef = shallowRef<HTMLTextAreaElement>()
const editor = shallowRef<Editor>()
const loading = shallowRef(false)

// lifecycle
onMounted(() => {
  // editor.value = new Editor({
  //   element: editorRef.value!,
  // })
  // editor.value.render()
})

// methods
function setAlert(title: string, visible: boolean) {
  alert.title = title
  alert.visible = visible
}

async function handleTopicSubmit() {
  if (loading.value)
    return

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

  loading.value = true

  const { success, msg } = await $api.cnode.updateTopic({ topic_id: id, accesstoken: tokenCookie.value!, ...form })
  loading.value = false
  if (success) {
    ElMessage.success({
      type: 'success',
      message: '更新话题成功',
    })
    await navigateTo({ path: '/', query: { tab: form.tab } })
  }
  else {
    ElMessage.error({ type: 'error', message: msg ?? '更新话题失败' })
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
          <ElBreadcrumbItem>编辑话题</ElBreadcrumbItem>
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
              v-model="form.content"
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
