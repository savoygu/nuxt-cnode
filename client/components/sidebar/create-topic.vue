<template>
  <sidebar-wrapper>
    <nuxt-link class="create-topic is-dark" to="/topic/create">
      <span class="button--green">发布话题</span>
    </nuxt-link>
  </sidebar-wrapper>
</template>

<script>
  import SidebarWrapper from './sidebar-wrapper'
  export default {
    name: 'CreateTopic',

    components: {
      SidebarWrapper
    }
  }
</script>

<style lang="scss">
@include b(create-topic) {
}

</style>
