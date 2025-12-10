<script setup lang="ts">
import type { FetchError } from 'ofetch'

definePageMeta({
  middleware: 'auth',
})

const route = useRoute()
const fallback = route.query.fallback as string | undefined

const alert = reactive({
  visible: false,
  title: '',
})
const accesstoken = shallowRef('')
const loading = shallowRef(false)

function setAlert(title: string, visible: boolean) {
  alert.title = title
  alert.visible = visible
}

async function handleSignin() {
  if (loading.value) {
    return
  }

  if (!accesstoken.value) {
    setAlert('请输入 Access Token', true)
    return false
  }
  setAlert('', false)

  loading.value = true
  try {
    const { success } = await useUserLogin(accesstoken.value)
    if (success) {
      await navigateTo(fallback ?? '/')
    }
  }
  catch (err: unknown) {
    const data = (err as FetchError).data as APIResponse<CNodeToken>
    setAlert(data.msg!, true)
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
          <ElBreadcrumbItem>登录</ElBreadcrumbItem>
        </ElBreadcrumb>
      </template>
      <ElAlert v-if="alert.visible" :title="alert.title" type="error" />
      <div class="mt-10">
        <div class="flex items-center">
          <span class="w-40 text-right" for="accesstoken">Access Token</span>
          <div class="ml-5">
            <input
              v-model="accesstoken"
              class="h-[30px] w-[284px] rounded border border-[#ccc] p-[4px_6px] text-sm text-[#555] shadow-[inset_0_1px_1px_rgb(0_0_0_/_7.5%)] outline-none focus:border-[rgba(82,168,236,0.8)] focus:shadow-[inset_0_1px_1px_rgb(0_0_0_/_7.5%),_0_0_8px_rgb(82_168_236_/_60%)]"
              name="accesstoken"
              size="30"
              type="text"
            >
          </div>
        </div>
        <div class="my-5 p-[20px_20px_20px_180px]">
          <button class="button-blue" @click="handleSignin()">
            {{ loading ? '登录中...' : '登录' }}
          </button>
        </div>
      </div>
    </Panel>
    <template #sidebar>
      <SidebarAbout />
    </template>
  </NuxtLayout>
</template>
