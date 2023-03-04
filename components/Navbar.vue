<script setup lang="ts">
// hooks
const state = useStore()
const user = computed(() => state.value.user)
let messageCount = 0
if (user.value) {
  messageCount = (await fetchMessageCount()).data.value ?? 0
}

// methods
const logout = () => {
  removeAccesstoken()
  return navigateTo('/')
}
</script>

<template>
  <div class="navbar">
    <div class="navbar__inner">
      <div class="navbar__container">
        <div class="navbar__site">
          <NuxtLink class="navbar__brand" to="/">
            <img src="//static2.cnodejs.org/public/images/cnodejs_light.svg" alt="CNode 中文社区" />
          </NuxtLink>
          <form class="navbar__search" action="/search">
            <input id="q" type="text" name="q" />
          </form>
        </div>
        <div class="navbar__nav">
          <span>
            <NuxtLink to="/">首页</NuxtLink>
          </span>
          <span v-if="user?.loginname">
            <NuxtLink to="/my/messages">
              <span v-if="messageCount > 0" class="navbar__message-count">{{ messageCount }}</span>
              未读消息
            </NuxtLink>
          </span>
          <span>
            <NuxtLink to="/getstart">新手入门</NuxtLink>
          </span>
          <span>
            <NuxtLink to="/api">API</NuxtLink>
          </span>
          <span>
            <NuxtLink to="/about">关于</NuxtLink>
          </span>
          <span class="navbar__no-ssr">
            <template v-if="user">
              <NuxtLink to="/setting">设置</NuxtLink>
              <span class="navbar__logout" @click="logout">退出</span>
            </template>
            <template v-else>
              <!-- <NuxtLink to="/signin">注册</NuxtLink> -->
              <NuxtLink to="/signin">登录</NuxtLink>
            </template>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@include b(navbar) {
  position: relative;
  z-index: 9;
  width: 100%;
  margin-bottom: 0;
  background: #444;
  font-size: 13px;

  @include e(inner) {
    width: 90%;
    min-height: 50px;
    padding: 5px;
    border: none;
    margin: auto;
    background: 0 0;
    border-radius: 0;
    box-shadow: none;
  }

  @include e(container) {
    display: flex;
    width: 100%;
    min-width: 960px;
    max-width: 1400px;
    align-items: center;
    justify-content: space-between;
    margin: 0 auto;
  }

  @include e(site) {
    display: flex;
    justify-content: flex-start;
  }

  @include e(brand) {
    width: 160px;
    height: 40px;
    padding: 3px 20px;
    margin-left: -20px;
    color: #ccc;
    font-weight: 700;
  }

  @include e(search) {
    position: relative;
    display: flex;
    align-items: center;
    margin-bottom: 0;

    i {
      position: absolute;
      left: 3px;
      color: #a5a6a5;
    }

    input {
      width: 233px;
      height: 26px;
      padding: 3px 5px 3px 22px;
      border: 0;
      background: url(//static2.cnodejs.org/public/images/search.e53b380a.hashed.png) 4px 4px no-repeat #888;
      border-radius: 15px;
      color: #666;
      font-size: 13px;
      font-weight: 400;
      line-height: 1;
      transition: all 0.5s;

      &:focus {
        border-color: rgb(82 168 236 / 80%);
        background-color: #fff;
        box-shadow: inset 0 1px 1px rgb(0 0 0 / 7.5%), 0 0 8px rgb(82 168 236 / 60%);
        outline: 0;
      }
    }
  }

  @include e(nav) {
    display: flex;
    align-items: center;

    a,
    .navbar__logout {
      display: block;
      padding: 10px 15px;
      color: #ccc;
      cursor: pointer;
      line-height: 20px;

      &:hover {
        color: #fff;
      }
    }

    a:hover,
    a:focus {
      text-decoration: none;
    }

    .navbar__no-ssr {
      a,
      span {
        display: inline-block;
      }
    }
  }

  @include e(message-count) {
    padding: 1px 5px;
    margin-right: 0.5em;
    background-color: #80bd01;
    border-radius: 8px;
    color: #fff;
  }
}

@media screen and (max-width: $breakpoint-lg) {
  @include b(navbar) {
    @include e(container) {
      display: block;
      min-width: 0;
    }
  }
}

@media screen and (max-width: $breakpoint-sm) {
  @include b(navbar) {
    @include e(inner) {
      width: 100%;
    }

    @include e(site) {
      flex-direction: column;
      align-items: center;
    }

    @include e(nav) {
      flex-wrap: wrap;
    }
  }
}

@media screen and (max-width: $breakpoint-xs) {
  @include b(navbar) {
    @include e(nav) {
      justify-content: center;

      a {
        padding: 10px;
      }
    }
  }
}
</style>
