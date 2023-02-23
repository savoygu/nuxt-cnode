<script setup lang="ts">
definePageMeta({
  middleware: 'guest'
})

// hooks
const route = useRoute()

// reactive
const accesstoken = ref('')
const alert = reactive({
  visible: false,
  title: ''
})
const loading = ref(false)

const setAlert = (title: string, visible: boolean) => {
  alert.title = title
  alert.visible = visible
}

// methods
const signin = async () => {
  if (!accesstoken.value) {
    setAlert('请输入 Access Token', true)
    return false
  }

  setAlert('', false)

  loading.value = true

  try {
    await fetchAccesstoken(accesstoken.value)

    const from = route.query.from as string
    if (from) {
      window.location.href = from
    } else {
      return navigateTo('/')
    }
  } catch (err: any) {
    setAlert(err.message, true)
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <TheMain>
    <Panel>
      <template #header>
        <BaseBreadcrumb>
          <BaseBreadcrumbItem to="/">主页</BaseBreadcrumbItem>
          <BaseBreadcrumbItem>登录</BaseBreadcrumbItem>
        </BaseBreadcrumb>
      </template>
      <BaseAlert v-model="alert.visible" :title="alert.title"></BaseAlert>
      <div class="form">
        <div class="form-control">
          <div class="form-control__group">
            <span class="form-control__label" for="accesstoken">Access Token</span>
            <div class="form-control__item">
              <input v-model="accesstoken" class="form-input--large" name="accesstoken" size="30" type="text" />
            </div>
          </div>
        </div>
        <div class="form-action">
          <button class="button--blue" @click="signin">{{ loading ? '登录中...' : '登录' }}</button>
        </div>
      </div>
    </Panel>
    <template #sidebar>
      <SidebarAbout />
    </template>
  </TheMain>
</template>

<style lang="scss">
@include b(form) {
  margin-top: 40px;
}

@include b(form-input) {
  @include m(large) {
    width: 284px;
  }
}

@include b(form-control) {
  @include e(group) {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
  }

  @include e(label) {
    width: 160px;
    text-align: right;
  }

  @include e(item) {
    margin-left: 20px;

    input {
      height: 30px;
      padding: 4px 6px;
      border: 1px solid #ccc;
      border-radius: 4px;
      box-shadow: inset 0 1px 1px rgb(0 0 0 / 7.5%);
      color: #555;
      font-size: 14px;
      line-height: 20px;
      outline: none;

      &:focus {
        border-color: rgb(82 168 236 / 80%);
        box-shadow: inset 0 1px 1px rgb(0 0 0 / 7.5%), 0 0 8px rgb(82 168 236 / 60%);
      }
    }
  }
}

@include b(form-action) {
  padding: 20px 20px 20px 180px;
  margin-top: 20px;
  margin-bottom: 20px;
}
</style>
