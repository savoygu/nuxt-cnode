<script setup lang="ts">
import { User } from '~/types'

type PersonalInformationProps = {
  title?: string
  user: User
}

const props = withDefaults(defineProps<PersonalInformationProps>(), {
  title: '个人信息'
})
const { title, user } = toRefs(props)
</script>

<template>
  <Panel v-if="user" :title="title">
    <div class="personal">
      <div class="personal__user">
        <nuxt-link class="personal__user-avatar" :to="`/user/${user.loginname}`">
          <img :src="user.avatar_url" :alt="user.loginname" />
        </nuxt-link>
        <span class="personal__user-name">
          <nuxt-link class="dark" :to="`/user/${user.loginname}`">{{ user.loginname }}</nuxt-link>
        </span>
      </div>
      <div class="personal__board">积分: {{ user.score }}</div>
      <div class="personal__signature">“ 这家伙很懒，什么个性签名都没有留下。 ”</div>
    </div>
  </Panel>
</template>

<style lang="scss">
@include b(personal) {
  @include e(user) {
    display: flex;
    align-items: center;
  }

  @include e(user-avatar) {
    margin-right: 0.5em;

    img {
      display: block;
      width: 48px;
      height: 48px;
      border-radius: 3px;
    }
  }

  @include e(user-name) {
    font-size: 16px;
  }

  @include e(board) {
    margin-top: 10px;
    font-size: 14px;
  }

  @include e(signature) {
    font-style: italic;
  }
}
</style>
