<template>
  <sidebar-wrapper>
    <a class="create-topic is-dark" href="/topic/create">
      <span class="button--green">发布话题</span>
    </a>
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
