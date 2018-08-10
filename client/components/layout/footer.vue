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
    max-width: 1400px;
    min-width: 960px;
    margin: 0 auto;
    padding: 20px 0;
    font-size: 13px;
    line-height: 2em;
    color: #e2e2e2;
  }


  @include e(links) {

    a {
      color: #666;
      text-decoration: none
    }
  }

  @include e(aim) {
    line-height: 20px;
    color: #ababab;
  }
}

@media screen and (max-width: $--break-large) {
  .footer {
    display: none;
  }
}
</style>
