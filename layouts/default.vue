<template>
  <div>
    <div class="navbar">
      <div class="navbar__inner">
        <div class="navbar__container">
          <div class="navbar__site">
            <a class="navbar__brand">
              <img src="//o4j806krb.qnssl.com/public/images/cnodejs_light.svg" alt="Cnode 中文社区">
            </a>
            <form class="navbar__search" action="/search">
              <!-- <i class="cn-icon-search"></i> -->
              <input type="text" id="q" name="q">
            </form>
          </div>
          <ul class="navbar__nav">
            <li><a href="/">首页</a></li>
            <li><a href="/">新手入门</a></li>
            <li><a href="/">API</a></li>
            <li><a href="/">关于</a></li>
            <li><a href="/">注册</a></li>
            <li><a href="/">登录</a></li>
          </ul>
        </div>
      </div>
    </div>
    <nuxt nuxt-child-key="none" role="main"/>
  </div>
</template>

<style lang="scss">
@import "~/assets/theme/index.scss";
/* =======================
  CSS Reset
 ======================= */
@import "reset-css/sass/_reset.scss";

@import "normalize-scss";
@include normalize();

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
  background-color: #e1e1e1;
}

*, *:before, *:after {
  box-sizing: border-box;
  margin: 0;
}

a {
  text-decoration: none;
}

.button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}

.button--green:hover {
  color: #fff;
  background-color: #3b8070;
}

.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}

.button--grey:hover {
  color: #fff;
  background-color: #35495e;
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
      vertical-align: middle;
      padding: 3px 5px 3px 22px;
      font-size: 13px;
      font-weight: 400;
      line-height: 1;
      color: #666;
      background: url(https://o4j806krb.qnssl.com/public/images/search.e53b380a.hashed.png) 4px 4px no-repeat #888;
      background-color: #888;
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

    a {
      display: block;
      padding: 10px 15px;
      line-height: 20px;
      color: #ccc;

      &:hover {
        color: #fff;
      }
    }
  }
}

@media screen and (max-width: $--break-large) {
  .navbar__container {
    display: block;
    min-width: 0;
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
