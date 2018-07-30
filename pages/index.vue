<template>
  <section class="container">
    <div>
      <app-logo/>
      <cn-row type="flex">
        <cn-col>1</cn-col>
        <cn-col>2</cn-col>
        <cn-col>3</cn-col>
        <cn-col>4</cn-col>
        <cn-col>5</cn-col>
      </cn-row>
      <h1 class="title">
        nuxt-cnode
      </h1>
      <h2 class="subtitle">
        基于 Nuxt (服务器端渲染 SSR) 构建 CNode 社区
      </h2>
      <button class="default__button">Hello World</button>
      <div class="links">
        <a
          href="https://nuxtjs.org/"
          target="_blank"
          class="button--green">Documentation</a>
        <a
          href="https://github.com/nuxt/nuxt.js"
          target="_blank"
          class="button--grey">GitHub</a>
      </div>
    </div>
  </section>
</template>

<script>
import AppLogo from '~/components/AppLogo.vue'
import CnRow from '~/components/row'
import CnCol from '~/components/col'

export default {
  components: {
    AppLogo,
    CnRow,
    CnCol
  }
}
</script>

<style lang="scss">
.container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; /* 1 */
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
