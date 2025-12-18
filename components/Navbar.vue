<script setup lang="ts">
const { $api } = useNuxtApp()
const tokenCookie = useTokenCookie()
const userState = useUserState()
const user = computed(() => userState.value.user)

const messageCount = shallowRef(0)

if (tokenCookie.value) {
  const { data } = await useAsyncData(() => $api.cnode.messageCount({ accesstoken: tokenCookie.value! }))
  messageCount.value = data.value?.data ?? 0
}

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
          <NuxtLink class="ml-[-20px] h-[40px] w-[160px] p-[3px_20px] font-bold text-[#ccc]" to="/">
            <img src="//static2.cnodejs.org/public/images/cnodejs_light.svg" alt="CNode 中文社区">
          </NuxtLink>
          <form class="relative mb-0 flex items-center" action="/search">
            <input
              id="q"
              type="text"
              name="q"
              class="h-[26px] w-[233px] rounded-[15px] border-0 bg-[url(//static2.cnodejs.org/public/images/search.e53b380a.hashed.png)_4px_4px_no-repeat_#888] p-[3px_5px_3px_22px] text-small font-normal leading-none text-[#666] transition-all duration-500 focus:bg-white focus:shadow-[inset_0_1px_1px_rgb(0_0_0_/_7.5%),_0_0_8px_rgb(82_168_236_/_60%)] focus:outline-0"
            >
          </form>
        </div>
        <div class="flex items-center">
          <span>
            <NuxtLink class="block cursor-pointer p-[10px_15px] leading-[20px] text-[#ccc] hover:text-white hover:no-underline" to="/">首页</NuxtLink>
          </span>
          <span v-if="user?.loginname">
            <NuxtLink class="block cursor-pointer p-[10px_15px] leading-[20px] text-[#ccc] hover:text-white hover:no-underline" to="/my/messages">
              <span v-if="messageCount > 0" class="mr-[0.5em] rounded-[8px] bg-[#80bd01] p-[1px_5px] text-white">{{ messageCount }}</span>
              未读消息
            </NuxtLink>
          </span>
          <span>
            <NuxtLink class="block cursor-pointer p-[10px_15px] leading-[20px] text-[#ccc] hover:text-white hover:no-underline" to="/getstart">新手入门</NuxtLink>
          </span>
          <span>
            <NuxtLink class="block cursor-pointer p-[10px_15px] leading-[20px] text-[#ccc] hover:text-white hover:no-underline" to="/api">API</NuxtLink>
          </span>
          <span>
            <NuxtLink class="block cursor-pointer p-[10px_15px] leading-[20px] text-[#ccc] hover:text-white hover:no-underline" to="/about">关于</NuxtLink>
          </span>
          <span class="no-ssr">
            <template v-if="user">
              <NuxtLink class="inline-block cursor-pointer p-[10px_15px] leading-[20px] text-[#ccc] hover:text-white hover:no-underline" to="/setting">设置</NuxtLink>
              <span class="inline-block cursor-pointer p-[10px_15px] leading-[20px] text-[#ccc] hover:text-white" @click="handleLogout()">退出</span>
            </template>
            <template v-else>
              <NuxtLink class="inline-block cursor-pointer p-[10px_15px] leading-[20px] text-[#ccc] hover:text-white hover:no-underline" to="/signin">登录</NuxtLink>
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
