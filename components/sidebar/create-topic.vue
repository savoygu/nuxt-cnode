<template>
  <sidebar-wrapper>
    <a class="create-topic is-dark" href="/topic/create">
      <span>发布话题</span>
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
  span {
    display: inline-block;
    padding: 3px 10px;
    font-size: 14px;
    letter-spacing: 2px;
    color: #fff;
    border-radius: 3px;
    background-color: #80bd01;
    cursor: pointer;
    transition: all .2s ease-in-out;

    @include hover {
      background-color: #6ba44e;
    }
  }
}

</style>
