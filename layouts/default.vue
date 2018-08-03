<template>
  <div>
    <div class="navbar">
      <div class="navbar__inner">
        <div class="navbar__container">
          <div class="navbar__site">
            <nuxt-link class="navbar__brand" to="/">
              <img src="//o4j806krb.qnssl.com/public/images/cnodejs_light.svg" alt="Cnode 中文社区">
            </nuxt-link>
            <form class="navbar__search" action="/search">
              <!-- <i class="cn-icon-search"></i> -->
              <input type="text" id="q" name="q">
            </form>
          </div>
          <div class="navbar__nav">
            <span><nuxt-link to="/">首页</nuxt-link></span>
            <no-ssr><span v-if="user"><nuxt-link to="/my/messages">未读消息</nuxt-link></span></no-ssr>
            <span><nuxt-link to="/getstart">新手入门</nuxt-link></span>
            <span><nuxt-link to="/api">API</nuxt-link></span>
            <span><nuxt-link to="/about">关于</nuxt-link></span>
            <no-ssr>
              <span class="navbar__nossr">
                <template v-if="user">
                  <nuxt-link to="/settings">设置</nuxt-link>
                  <span class="navbar__logout" @click="logout">退出</span>
                </template>
                <template v-else>
                  <nuxt-link to="/signin">注册</nuxt-link>
                  <nuxt-link to="/signin">登录</nuxt-link>
                </template>
              </span>
              <span slot="placeholder">
                <lazy-wrapper :loading="true" height="40px"></lazy-wrapper>
              </span>
            </no-ssr>
          </div>
        </div>
      </div>
    </div>
    <nuxt nuxt-child-key="none" role="main"/>
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
  </div>
</template>

<script>
import LazyWrapper from '~/components/lazy-wrapper'

export default {
  name: 'defaultLayout',

  components: {
    LazyWrapper
  },

  computed: {
    accesstoken () {
      return this.$store.state.accesstoken
    },
    user () {
      return this.$store.state.user
    }
  },

  methods: {
    logout () {
      this.$store.commit('SET_ACCESSTOKEN', { accesstoken: '', item: null  })
      this.$router.push('/')
    }
  }
}
</script>

<style lang="scss">
html {
  // font-family: "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  font-family: "Helvetica Neue","Luxi Sans","DejaVu Sans",Tahoma,"Hiragino Sans GB",STHeiti,sans-serif!important;
  font-size: 14px;
  word-spacing: 1px;
  // -ms-text-size-adjust: 100%;
  // -webkit-text-size-adjust: 100%;
  // -moz-osx-font-smoothing: grayscale;
  // -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

body {
  color: #333;
  background-color: #e1e1e1;
}

*, *:before, *:after {
  box-sizing: border-box;
  margin: 0;
}

a {
  text-decoration: none;
}

@include b(navbar) {
  position: relative;
  z-index: 9;
  width: 100%;
  margin-bottom: 0;
  font-size: 13px;
  background: #444;

  @include e(inner) {
    width: 90%;
    min-height: 50px;
    margin: auto;
    padding: 5px;
    background: 0 0;
    border: none;
    border-radius: 0;
    box-shadow: none;
  }

  @include e(container) {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    min-width: 960px;
    margin: 0 auto;
    max-width: 1400px;
  }

  @include e(site) {
    display: flex;
    justify-content: flex-start;
  }

  @include e(brand) {
    width: 160px;
    margin-left: -20px;
    padding: 3px 20px;
    height: 40px;
    line-height: 40px;
    color: #ccc;
    font-weight: 700;
  }

  @include e(search) {
    position: relative;
    display: flex;
    align-items: center;

    i {
      position: absolute;
      left: 3px;
      color: #a5a6a5;
    }

    input {
      width: 233px;
      height: 26px;
      padding: 3px 5px 3px 22px;
      font-size: 13px;
      font-weight: 400;
      line-height: 1;
      color: #666;
      background: url(https://o4j806krb.qnssl.com/public/images/search.e53b380a.hashed.png) 4px 4px no-repeat #888;
      border: 0;
      border-radius: 15px;
      transition: all .5s;

      &:focus {
        background-color: #fff;
        border-color: rgba(82,168,236,.8);
        outline: 0;
        box-shadow: inset 0 1px 1px rgba(0,0,0,.075), 0 0 8px rgba(82,168,236,.6);
      }
    }
  }

  @include e(nav) {
    display: flex;
    align-items: center;

    a, .navbar__logout {
      display: block;
      padding: 10px 15px;
      line-height: 20px;
      color: #ccc;
      cursor: pointer;

      &:hover {
        color: #fff;
      }
    }

    .navbar__nossr {
      a, span {
        display: inline-block;
      }
    }
  }
}

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
  .navbar__container {
    display: block;
    min-width: 0;
  }

  .footer {
    display: none;
  }
}

@media screen and (max-width: $--break-small) {
  .navbar__inner {
    width: 100%;
  }

  .navbar__site {
    align-items: center;
    flex-direction: column;
  }

  .navbar__nav {
    flex-wrap: wrap;
  }
}

@media screen and (max-width: $--break-mini) {
    .navbar__nav {
      justify-content: center;

      a {
        padding: 10px;
      }
    }
}
</style>
