<script setup lang="ts">
definePageMeta({
  middleware: 'auth',
})

const accesstoken = useTokenCookie()
</script>

<template>
  <NuxtLayout>
    <Panel title="Access Token">
      <div class="p-2.5">
        <div>字符串：{{ accesstoken }}</div>
      </div>
    </Panel>
  </NuxtLayout>
</template>
