<template>
  <div class="topic-item">
    <a class="topic-item__author" href="https://cnodejs.org/user/XadillaX">
      <img class="topic-item__avatar" src="https://avatars3.githubusercontent.com/u/2842176?v=4&s=120" title="XadillaX">
    </a>
    <span class="topic-item__count">
      <span class="topic-item__replies">
        75
      </span>
      <span class="topic-item__seperator">/</span>
      <span class="topic-item__visits">
        12753
      </span>
    </span>
    <span class="topic-item__tab is-top">置顶</span>
    <a class="topic-item__title" href="https://cnodejs.org/topic/5b5f231f58db3ccf66a45083">【20180811】Node 地下铁第六期「成都站」线下沙龙邀约 - 企业级的 Node.js 实践</a>
    <a class="topic-item__last" href="https://cnodejs.org/topic/5b223c1d5cd02be640901490#5b5ea7d8673571454c633d0c">
      <img class="topic-item__user" src="https://avatars1.githubusercontent.com/u/39525221?v=4&s=120">
      <span class="topic-item__time">20小时前</span>
    </a>
  </div>
</template>

<script>
  export default {

  }
</script>

<style lang="scss">
@include b(topic-item) {
  display: flex;
  align-items: center;
  position: relative;
  padding: 10px;
  font-size: 14px;
  background: #fff;
  border-top: 1px solid #f0f0f0;

  @include first {
    broder-top: none;
  }

  @include e(avatar) {
    display: block;
    width: 30px;
    height: 30px;
    border-radius: 3px;
  }

  @include e(tab) {
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
    flex: 0 1 70px;
    width: 70px;
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
    color: #333;
    @include utils-ellipsis;

    @include visited {
      color: #888;
    }
  }

  @include e(last) {
    margin-left: 20px;
    font-size: 11px;
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
  }
}

@media screen and (max-width: $--break-large) {
  .topic-item__user {
    display: none;
  }
}
</style>
