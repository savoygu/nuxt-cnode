<script setup lang="ts">
import type { Topic } from '~/types'

const { item } = defineProps<{
  item: Topic
}>()
</script>

<template>
  <li class="topic-item">
    <NuxtLink class="topic-item__author" :to="`/user/${item.author?.loginname}`">
      <img class="topic-item__avatar" :src="item.author?.avatar_url" :title="item.author?.loginname" />
    </NuxtLink>
    <span class="topic-item__count">
      <span class="topic-item__replies"> {{ ' ' + item.reply_count + ' ' }} </span>
      <span class="topic-item__seperator"> / </span>
      <span class="topic-item__visits"> {{ ' ' + item.visit_count + ' ' }} </span>
    </span>
    <span class="topic-item__tab" :class="{ 'is-top': item.top || item.good }">{{
      item.top ? '置顶' : item.good ? '精华' : (item.tab && tabsInfo[item.tab].name) || item.tab
    }}</span>
    <a class="topic-item__title" :href="`/topic/${item.id}`" :title="item.title">
      {{ item.title }}
    </a>
    <a class="topic-item__last" :href="`/topic/${item.id}`">
      <!-- <img class="topic-item__user" :src="item.replies?.at(-1).author.avatar_url" /> -->
      <span class="topic-item__time">{{ timeAgo(item.last_reply_at) }}</span>
    </a>
  </li>
</template>

<style lang="scss">
@include b(topic-item) {
  position: relative;
  display: flex;
  align-items: center;
  padding: 10px;
  border-top: 1px solid #f0f0f0;
  background: #fff;
  font-size: 14px;

  @include first {
    border-top: none;
  }

  @include e(avatar) {
    display: block;
    width: 30px;
    height: 30px;
    border-radius: 3px;
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
    color: #b4b4b4;
    font-size: 10px;
  }

  @include e(tab) {
    padding: 2px 4px;

    // flex: 0 0 32px;
    margin-right: 4px;
    background-color: #e5e5e5;
    border-radius: 3px;
    color: #999;
    font-size: 12px;
    line-height: 14px;

    @include is(top) {
      background-color: #80bd01;
      color: #fff;
    }
  }

  @include e(title) {
    max-width: 70%;
    flex: 1;
    color: #333;
    font-size: 16px;
    line-height: 30px;

    @include utils-ellipsis;

    @include visited {
      color: #888;
    }
  }

  @include e(last) {
    display: block;
    flex: 0 0 80px;
    margin-left: auto;
    color: #778087;
    font-size: 11px;
    text-align: right;
  }

  @include e(user) {
    width: 18px;
    height: 18px;
    margin-right: 0.5em;
    border-radius: 3px;
    vertical-align: middle;
  }

  @include e(time) {
    min-width: 50px;
    white-space: nowrap;
  }
}

@media screen and (max-width: $breakpoint-lg) {
  @include b(topic-item) {
    @include e(user) {
      display: none;
    }

    @include e(title) {
      @include utils-ellipsis;
    }
  }
}
</style>
