<template>
  <sidebar-wrapper :header="header">
    <div class="personal">
      <div class="personal__user">
        <nuxt-link class="personal__user-avatar" :to="`/user/${name}`">
          <img :src="avatar" alt="savoygu">
        </nuxt-link>
        <span class="personal__user-name">
          <nuxt-link class="is-dark" :to="`/user/${name}`">{{name}}</nuxt-link>
        </span>
      </div>
      <div class="personal__board">积分: {{user.score}}</div>
      <div class="personal__signature">“ 这家伙很懒，什么个性签名都没有留下。 ”</div>
    </div>
  </sidebar-wrapper>
</template>

<script>
  import SidebarWrapper from './sidebar-wrapper'
  export default {
    name: 'NoreplyTopic',

    components: {
      SidebarWrapper
    },

    props: {
      header: {
        type: String,
        default: '个人信息'
      },
      user: {
        type: Object,
        default () {
          return {}
        }
      }
    },

    computed: {
      name () {
        return this.user.loginname || this.user.author.loginname
      },
      avatar () {
        return this.user.avatar_url || this.user.author.avatar_url
      }
    }
  }
</script>

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
