<script setup lang="ts">
interface PersonalInformationProps {
  title?: string
  user: User
}

const props = withDefaults(defineProps<PersonalInformationProps>(), {
  title: '个人信息',
})
const { title, user } = toRefs(props)
</script>

<template>
  <Panel :title="title">
    <div>
      <div class="flex items-center">
        <nuxt-link class="mr-[0.5em]" :to="`/user/${user.loginname}`">
          <img
            class="block w-[48px] h-[48px] rounded-[3px]"
            :src="user.avatar_url"
            :alt="user.loginname"
          >
        </nuxt-link>
        <span class="text-[16px]">
          <nuxt-link class="text-[#666] hover:text-[#385f8a]" :to="`/user/${user.loginname}`">
            {{ user.loginname }}
          </nuxt-link>
        </span>
      </div>
      <div class="mt-[10px] text-[14px]">
        积分: {{ user.score }}
      </div>
      <div class="italic">
        “ 这家伙很懒，什么个性签名都没有留下。 ”
      </div>
    </div>
  </Panel>
</template>
