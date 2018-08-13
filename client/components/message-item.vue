<template>
  <div class="message-item">
    <span>
      <nuxt-link :to="`/user/${item.author.loginname}`">{{item.author.loginname}}</nuxt-link>
      回复了你的话题
      <nuxt-link :to="`/topic/${item.topic.id}#${item.id}`">{{item.topic.title}}</nuxt-link>
    </span>
  </div>
</template>

<script>
  export default {
    name: 'MessageItem',

    props: {
      item: {
        type: Object,
        default () {
          return {}
        }
      }
    }
  }
</script>

<style lang="scss">
@include b(message-item) {
  padding: 10px;
  font-size: 14px;
  border-top: 1px solid #f0f0f0;
  background-color: #fff;

  span {
    line-height: 22px;
  }

  a {
    display: inline-block;
    max-width: 460px;
    vertical-align: middle;
    color: #08c;
    @include utils-ellipsis;
  }
}

</style>
