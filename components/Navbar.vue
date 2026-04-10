<script setup lang="ts">
defineProps<{
  messageCount: number
}>()

const userState = useUserState()
const user = computed(() => userState.value.user)

function handleLogout() {
  useUserLogout()
  return navigateTo('/')
}
</script>

<template>
  <div class="relative z-[9] mb-0 w-full bg-[#444] text-small text-primary">
    <div class="mx-auto min-h-[50px] w-[90%] rounded-none border-none bg-transparent p-[5px] shadow-none">
      <div class="mx-auto flex w-full min-w-[960px] max-w-[1400px] items-center justify-between">
        <div class="flex justify-start">
          <NuxtLink class="-ml-5 h-10 w-40 px-5 py-1 font-bold text-[#ccc]" to="/">
            <NuxtImg src="/cnodejs_light.svg" alt="CNode 中文社区" />
          </NuxtLink>
          <form class="relative mb-0 flex items-center" action="/search">
            <NuxtImg src="/search.png" class="absolute left-1 size-5" />
            <input
              id="q"
              type="text"
              name="q"
              class="h-[26px] w-[233px] rounded-large border-0 bg-[#888] py-1 pl-6 pr-1 text-small font-normal leading-none text-[#666] transition-all duration-500 focus:bg-white focus:shadow-[inset_0_1px_1px_rgb(0_0_0_/_7.5%),_0_0_8px_rgb(82_168_236_/_60%)] focus:outline-0"
            >
          </form>
        </div>
        <div class="flex items-center">
          <span>
            <NuxtLink class="block cursor-pointer p-[10px_15px] leading-5 text-[#ccc] hover:text-white hover:no-underline" to="/">首页</NuxtLink>
          </span>
          <span v-if="user">
            <NuxtLink class="block cursor-pointer p-[10px_15px] leading-5 text-[#ccc] hover:text-white hover:no-underline" to="/my/messages">
              <span v-if="messageCount > 0" class="rounded-2 mr-[0.5em] bg-[#80bd01] p-[1px_5px] text-white">{{ messageCount }}</span>
              未读消息
            </NuxtLink>
          </span>
          <span class="no-ssr">
            <template v-if="user">
              <NuxtLink class="inline-block cursor-pointer p-[10px_15px] leading-5 text-[#ccc] hover:text-white hover:no-underline" to="/setting">设置</NuxtLink>
              <span class="inline-block cursor-pointer p-[10px_15px] leading-5 text-[#ccc] hover:text-white" @click="handleLogout()">退出</span>
            </template>
            <template v-else>
              <NuxtLink class="inline-block cursor-pointer p-[10px_15px] leading-5 text-[#ccc] hover:text-white hover:no-underline" to="/signin">登录</NuxtLink>
            </template>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
@media screen and (max-width: 992px) {
  .navbar .flex {
    display: block;
    min-width: 0;
  }
}

@media screen and (max-width: 420px) {
  .navbar .w-\\[90\\%\\] {
    width: 100%;
  }
  .navbar .justify-start {
    flex-direction: column;
    align-items: center;
  }
  .navbar .items-center {
    flex-wrap: wrap;
  }
}

@media screen and (max-width: 375px) {
  .navbar .items-center {
    justify-content: center;
  }
  .navbar a {
    padding: 10px;
  }
}
</style>
