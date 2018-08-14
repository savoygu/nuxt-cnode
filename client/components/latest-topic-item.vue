<template>
  <li>
    <nuxt-link :to="`/user/${topic.author.loginname}`">
      <img :src="topic.author.avatar_url" :alt="topic.author.loginname">
    </nuxt-link>
    <nuxt-link class="latest-topic__title" :to="`/topic/${topic.id}`">
      <span class="latest-topic__titleful">{{topic.title}}</span>
    </nuxt-link>
    <span class="latest-topic__time">{{topic.last_reply_at | timeAgo}}</span>
  </li>
</template>

<script>
  export default {
    name: 'LatestTopicItem',

    props: {
      topic: {
        type: Object,
        default () {
          return {}
        }
      }
    }
  }
</script>

<style lang="scss">
@include b(latest-topic) {

  li {
    display: flex;
    align-items: center;
    padding: 10px;
    font-size: 14px;
    background: #fff;
    border-top: 1px solid #f0f0f0;
  }

  a {
    color: #08c;

    &:hover {
      color: #005580;
      text-decoration: underline;
    }
  }

  img {
    width: 30px;
    height: 30px;
    border-radius: 3px;
  }

  @include e(title) {
    flex: 1;
    margin-left: 8px;
    font-size: 16px;
    line-height: 30px
  }

  @include e(titleful) {
    display: block;
    max-width: 80%;
    @include utils-ellipsis;
  }

  @include e(time) {
    font-size: 10px;
    color: #777;
  }
}

</style>
