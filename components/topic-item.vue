<template>
  <li class="topic-item">
    <a class="topic-item__author" :href="`/user/${item.author.loginname}`">
      <img class="topic-item__avatar" :src="item.author.avatar_url" :title="item.author.loginname">
    </a>
    <span class="topic-item__count">
      <span class="topic-item__replies">
        {{item.reply_count}}
      </span>
      <span class="topic-item__seperator">/</span>
      <span class="topic-item__visits">
        {{item.visit_count}}
      </span>
    </span>
    <span class="topic-item__tab" :class="{ 'is-top': item.top || item.good }">{{item.top ? '置顶' : item.good ? '精华' : (item.tab && tabs[item.tab].name || item.tab)}}</span>
    <a class="topic-item__title" :href="`/topic/${item.id}`" :title="item.title">
      {{item.title}}
    </a>
    <a class="topic-item__last" :href="`/topic/${item.id}`">
      <!-- <img class="topic-item__user" src="https://avatars1.githubusercontent.com/u/39525221?v=4&s=120"> -->
      <span class="topic-item__time">{{ item.last_reply_at | timeAgo}}</span>
    </a>
  </li>
</template>

<script>
  import { tabs } from '~/common/constants'

  export default {
    name: 'TopicItem',
    props: {
      item: {
        type: Object,
        required: true
      }
    },
    data() {
      return {
        tabs: tabs
      }
    }
  }
</script>

<style lang="scss">
@include b(topic-item) {
  position: relative;
  display: flex;
  align-items: center;
  padding: 10px;
  font-size: 14px;
  background: #fff;
  border-top: 1px solid #f0f0f0;

  @include first {
    border-top: none;
  }

  @include e(avatar) {
    display: block;
    width: 30px;
    height: 30px;
    border-radius: 3px;
  }

  @include e(tab) {
    flex: 0 0 32px;
    margin-right: 4px;
    padding: 2px 4px;
    font-size: 12px;
    color: #999;
    background-color: #e5e5e5;
    border-radius: 3px;

    @include is(top) {
      color: #fff;
      background-color: #80bd01;
    }
  }

  @include e(count) {
    flex: 0 0 70px;
    text-align: center;
  }

  @include e(replies) {
    color: #9e78c0;
  }

  @include e(seperator) {
    margin: 0 -3px;
    font-size: 10px;
  }

  @include e(visits) {
    font-size: 10px;
    color: #888;
  }

  @include e(title) {
    flex: 1;
    font-size: 16px;
    line-height: 30px;
    color: #333;
    // @include utils-ellipsis;

    @include visited {
      color: #888;
    }
  }

  @include e(last) {
    display: block;
    flex: 0 0 80px;
    font-size: 11px;
    text-align: right;
    color: #778087;
  }

  @include e(user) {
    width: 18px;
    height: 18px;
    vertical-align: middle;
    margin-right: .5em;
    border-radius: 3px;
  }

  @include e(time) {
    min-width: 50px;
    white-space: nowrap;
  }
}

@media screen and (max-width: $--break-large) {
  .topic-item__user {
    display: none;
  }

  .topic-item__title {
    @include utils-ellipsis;
  }
}
</style>
