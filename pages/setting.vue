<script setup lang="ts">
definePageMeta({
  middleware: 'auth'
})

// hooks
const accesstoken = useToken()
</script>

<template>
  <TheMain>
    <Panel>
      <template #header>
        <BaseBreadcrumb>
          <BaseBreadcrumbItem to="/">主页</BaseBreadcrumbItem>
          <BaseBreadcrumbItem>Access Token</BaseBreadcrumbItem>
        </BaseBreadcrumb>
      </template>
      <div class="setting">
        <div class="setting-token">字符串：{{ accesstoken }}</div>
        <!-- <div class="setting-code">
          <span>二维码：</span>
          <div>
            <img :src="`//qr.liantu.com/api.php?&w=200&text=${accesstoken}`" alt="" />
          </div>
        </div> -->
      </div>
    </Panel>
  </TheMain>
</template>

<style lang="scss" scoped>
@include b(setting) {
  padding: 10px;
  border-top: 1px solid #e5e5e5;

  h2 {
    font-size: 26px;
  }
}
</style>
