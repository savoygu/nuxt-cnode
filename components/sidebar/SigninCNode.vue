<template>
  <Panel :header="false">
    <p class="signin-cnode__title">CNode：Node.js专业中文社区</p>
    <div>
      您可以通过 CNode Token
      <NuxtLink to="/signin">登录</NuxtLink>
    </div>
  </Panel>
</template>

<style lang="scss">
@include b(signin-cnode) {
  @include e(title) {
    margin-bottom: 10px;
    font-size: 14px;
  }
}
</style>
