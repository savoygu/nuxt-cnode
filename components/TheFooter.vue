<script setup lang="ts"></script>

<template>
  <div class="footer">
    <div class="footer__main">
      <div class="footer__links">
        <a class="is-dark" href="https://cnodejs.org/rss">RSS</a>
        |
        <a class="is-dark" href="https://github.com/savoygu/nuxt-cnode">源码地址</a>
      </div>
      <div class="footer__aim">
        <p>CNode 社区为国内最专业的 Node.js 开源技术社区，致力于 Node.js 的技术研究。</p>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@include b(footer) {
  background-color: #fff;

  @include e(main) {
    width: 90%;
    min-width: 960px;
    max-width: 1400px;
    padding: 20px 0;
    margin: 0 auto;
    color: #e2e2e2;
    font-size: 13px;
    line-height: 2em;
  }

  @include e(links) {
    a {
      color: #666;
      text-decoration: none;
    }
  }

  @include e(aim) {
    color: #ababab;
    line-height: 20px;
  }
}

@media screen and (max-width: $breakpoint-lg) {
  .footer {
    display: none;
  }
}
</style>
