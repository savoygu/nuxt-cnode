<template>
  <sidebar-wrapper>
    <p class="anonymous__community">CNode：Node.js专业中文社区</p>
    <div>
      你可以 <a class="anonymous__signin" href="/signin">登录</a> 或 <a class="anonymous__signup" href="/signup">注册</a> 也可以
      <a class="anonymous__github is-dark" href="/auth/github"><span class="button--blue">通过 Github 登录</span></a>
    </div>
  </sidebar-wrapper>
</template>

<script>
  import SidebarWrapper from './sidebar-wrapper'
  export default {
    name: 'Anonymous',

    components: {
      SidebarWrapper
    }
  }
</script>

<style lang="scss">
@include b(anonymous) {
  @include e(community) {
    font-size: 14px;
    margin-bottom: 10px;
  }

  @include p('e:signin', 'e:signup') {
    @include hover {
      text-decoration: underline;
    }
  }

  @include e(github) {
    display: inline-block;
  }
}

</style>
