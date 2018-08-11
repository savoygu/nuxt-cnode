<template>
  <div class="main__content">
    <template v-if="user">
      <div class="main__panel">
        <div class="main__header">
          <breadcrumb>
            <breadcrumb-item to="/">主页</breadcrumb-item>
            <breadcrumb-item></breadcrumb-item>
          </breadcrumb>
        </div>
        <div class="user__info">
          <div class="user__personal">
            <img class="user__avatar" :src="user.avatar_url" alt="">
            <span class="user__name">{{user.loginname}}</span>
          </div>
          <div class="user__profile">
            <div class="user__score">{{user.score}} 积分</div>
            <div class="user__collection"><nuxt-link :to="`/user/${user.loginname}/collections`">查看话题收藏</nuxt-link></div>
          </div>
          <p class="user__register">注册时间 {{user.create_at | timeAgo}}</p>
        </div>
      </div>
      <lazy-wrapper :loading="user.loading">
        <div class="main__panel">
          <div class="main__header">
            最近创建的话题
          </div>
          <ul class="latest-topic">
            <latest-topic-item v-for="topic in user.recent_topics" :topic="topic" :key="topic.id"></latest-topic-item>
          </ul>
          <!-- <div class="latest-topic__more"><a href="#">查看更多»</a></div> -->
        </div>
        <div class="main__panel">
          <div class="main__header">
            最近参与的话题
          </div>
          <ul class="latest-topic">
            <latest-topic-item v-for="topic in user.recent_replies" :topic="topic" :key="topic.id"></latest-topic-item>
          </ul>
          <!-- <div class="latest-topic__more"><a href="#">查看更多»</a></div> -->
        </div>
      </lazy-wrapper>
    </template>
    <template v-else>
      <h1>没有找到用户</h1>
    </template>
  </div>
</template>

<script>
import LazyWrapper from '~/components/lazy-wrapper'
import LatestTopicItem from '~/components/latest-topic-item'
import Breadcrumb from '~/components/breadcrumb'
import BreadcrumbItem from '~/components/breadcrumb/item'

export default {
  name: 'User',

  layout: 'sidebar',

  components: {
    LazyWrapper,
    LatestTopicItem,
    Breadcrumb,
    BreadcrumbItem
  },

  fetch ({ store, params: { name } }) {
    return store.dispatch('FETCH_USER', { name })
  },

  computed: {
    name () {
      return this.$route.params.name
    },
     user () {
      return this.$store.state.users[this.name]
    }
  }
}
</script>

<style lang="scss">

@include b(user) {
  @include e(info) {
    padding: 10px;
  }

  @include e(personal) {
    //body
  }

  @include e(avatar) {
    width: 40px;
    height: 40px;
    margin-right: 10px;
    border-radius: 3px;
  }

  @include e(name) {
    display: inline-block;
    line-height: 32px;
    color: #778087;
    vertical-align: top;
  }

  @include e(profile) {
    margin-top: 20px;
  }

  @include e(score) {
    line-height: 20px;
  }

  @include e(collection) {
    line-height: 2em;

    a {
      color: #778087;
    }
  }

  @include e(register) {
    font-size: 14px;
    line-height: 2em;
    color: #ababab;
  }
}

@media screen and (max-width: $--break-large) {
  .user__profile {
    margin-top: 0;
  }

  .latest-topic__title {
    h3 {
      font-size: 14px;
      width: 100%;
    }
  }
}

</style>
