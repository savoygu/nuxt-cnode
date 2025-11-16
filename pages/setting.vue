<script setup lang="ts">
definePageMeta({
  middleware: 'auth',
})

// hooks
const accesstoken = useToken()
</script>

<template>
  <TheMain>
    <Panel>
      <template #header>
        <BaseBreadcrumb>
          <BaseBreadcrumbItem to="/">
            主页
          </BaseBreadcrumbItem>
          <BaseBreadcrumbItem>Access Token</BaseBreadcrumbItem>
        </BaseBreadcrumb>
      </template>
      <div class="p-[10px] border-t border-t-[#e5e5e5]">
        <div>字符串：{{ accesstoken }}</div>
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
