<script setup lang="ts">
definePageMeta({
  middleware: 'guest',
})

// hooks
const route = useRoute()

// reactive
const accesstoken = ref('')
const alert = reactive({
  visible: false,
  title: '',
})
const loading = ref(false)

function setAlert(title: string, visible: boolean) {
  alert.title = title
  alert.visible = visible
}

// methods
async function signin() {
  if (!accesstoken.value) {
    setAlert('请输入 Access Token', true)
    return false
  }
  setAlert('', false)

  loading.value = true
  try {
    await fetchAccesstoken(accesstoken.value)

    const fallback = route.query.fallback as string
    return navigateTo(fallback ?? '/')
  }
  catch (err: any) {
    setAlert(err.message, true)
  }
  finally {
    loading.value = false
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
          <BaseBreadcrumbItem>登录</BaseBreadcrumbItem>
        </BaseBreadcrumb>
      </template>
      <BaseAlert v-model="alert.visible" :title="alert.title" />
      <div class="mt-[40px]">
        <div>
          <div class="flex items-center mb-[20px]">
            <span class="w-[160px] text-right" for="accesstoken">Access Token</span>
            <div class="ml-[20px]">
              <input
                v-model="accesstoken"
                class="w-[284px] h-[30px] p-[4px_6px] border border-[#ccc] rounded-[4px] shadow-[inset_0_1px_1px_rgb(0_0_0_/_7.5%)] text-[#555] text-[14px] leading-[20px] outline-none focus:border-[rgba(82,168,236,0.8)] focus:shadow-[inset_0_1px_1px_rgb(0_0_0_/_7.5%),_0_0_8px_rgb(82_168_236_/_60%)]"
                name="accesstoken"
                size="30"
                type="text"
              >
            </div>
          </div>
        </div>
        <div class="p-[20px_20px_20px_180px] mt-[20px] mb-[20px]">
          <button class="button-blue" @click="signin">
            {{ loading ? '登录中...' : '登录' }}
          </button>
        </div>
      </div>
    </Panel>
    <template #sidebar>
      <SidebarAbout />
    </template>
  </TheMain>
</template>
