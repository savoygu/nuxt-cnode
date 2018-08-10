<template>
  <div class="about">
    <div class="markdown-text">
      <h2>安排一下我？</h2>
    </div>
  </div>
</template>

<script>
export default {
  name: 'User',

  layout (context) {
    context.store.commit('SET_PAGE', { page: '关于' })
    return 'sidebar'
  }
}
</script>

<style lang="scss">
@include b(about) {
  padding: 10px;
  border-top: 1px solid #e5e5e5;

  h2 {
    font-size: 26px;
  }
}
</style>
