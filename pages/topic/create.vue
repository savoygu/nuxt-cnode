<script setup lang="ts">
const { $api } = useNuxtApp()
const tokenCookie = useTokenCookie()
const logger = useLogger('page:topic:create')

// reactive
const [alert, setAlert] = useToggle({
  visible: false,
  title: '',
})
const [loading, toggleLoading] = useToggle(false)
const topic = reactive({
  title: '',
  content: '文章支持 Markdown 语法, 请注意标记代码',
  tab: '' as TabKey,
})

async function handleTopicSubmit() {
  if (loading.value)
    return

  if (!topic.tab) {
    return setAlert({ visible: true, title: '请选择发布的板块' })
  }

  if (topic.title.length < 10) {
    return setAlert({ visible: true, title: '话题标题字数不能小于 10 个' })
  }

  if (!topic.content) {
    return setAlert({ visible: true, title: '话题内容不能为空' })
  }

  toggleLoading()
  try {
    const { success, msg } = await $api.cnode.createTopic({ accesstoken: tokenCookie.value!, ...topic })
    if (success) {
      ElMessage.success({ type: 'success', message: '创建话题成功' })
      await navigateTo({ path: '/', query: { tab: topic.tab } })
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
    toggleLoading()
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
          <select id="plate" v-model="topic.tab" name="plate">
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
            v-model="topic.title"
            type="text"
            class="w-full rounded border border-[#ccc] p-2"
            placeholder="标题字数 10 字以上"
          >
        </div>
        <div class="mb-5">
          <ClientOnly>
            <div class="min-h-[300px] w-full rounded border border-[#ccc] p-2">
              <TiptapSimpleEditor v-model="topic.content" />
            </div>
          </ClientOnly>
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
