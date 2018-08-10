<template>
  <div class="api">
    <div class="markdown-text">
      <h2>API，哪位给我安排一下</h2>
    </div>
  </div>
</template>

<script>

export default {
  name: 'User',

  layout (context) {
    context.store.commit('SET_PAGE', { page: 'API' })
    return 'sidebar'
  }
}
</script>

<style lang="scss">
@include b(api) {
  padding: 10px;
  border-top: 1px solid #e5e5e5;

  h2 {
    font-size: 26px;
  }
}
</style>
