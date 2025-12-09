<script setup lang="ts">
defineProps<{
  title: string
}>()

const userState = useUserState()
const user = computed(() => userState.value.user)
</script>

<template>
  <template v-if="user">
    <Panel :title="title">
      <div>
        <div class="flex items-center">
          <NuxtLink class="mr-[0.5em]" :to="`/user/${user.loginname}`">
            <img
              class="block size-12 rounded-3"
              :src="user.avatar_url"
              :alt="user.loginname"
            >
          </NuxtLink>
          <span class="text-base">
            <NuxtLink class="text-[#666] hover:text-[#385f8a]" :to="`/user/${user.loginname}`">
              {{ user.loginname }}
            </NuxtLink>
          </span>
        </div>
        <div class="mt-2.5 text-sm">
          积分: {{ user.score }}
        </div>
        <div class="italic">
          “ 这家伙很懒，什么个性签名都没有留下。 ”
        </div>
      </div>
    </Panel>
    <Panel :header="false">
      <NuxtLink to="/topic/create">
        <span class="button-green">发布话题</span>
      </NuxtLink>
    </Panel>
  </template>
  <Panel v-else :header="false">
    <p class="mb-2.5 text-sm">
      CNode：Node.js专业中文社区
    </p>
    <div>
      您可以通过 CNode Token
      <NuxtLink to="/signin" class="text-color-regular hover:underline">
        登录
      </NuxtLink>
    </div>
  </Panel>
</template>
