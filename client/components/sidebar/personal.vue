<template>
  <sidebar-wrapper :header="header">
    <div class="personal">
      <div class="personal__user">
        <a class="personal__user-avatar" href="/user/savoygu">
          <img src="https://avatars2.githubusercontent.com/u/9302866?v=4&s=120" alt="savoygu">
        </a>
        <span class="personal__user-name">
          <a class="is-dark" href="/user/savoygu">savoygu</a>
        </span>
      </div>
      <div class="personal__board">积分:40</div>
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
