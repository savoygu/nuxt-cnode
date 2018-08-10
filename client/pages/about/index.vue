<template>
  <div class="main">
    <div class="main__content">
      <div class="main__panel">
        <div class="main__header">
          <breadcrumb>
            <breadcrumb-item to="/">主页</breadcrumb-item>
            <breadcrumb-item>关于</breadcrumb-item>
          </breadcrumb>
        </div>
        <div class="getstart">
          <div class="markdown-text">
            <h2>安排一下我？</h2>
          </div>
        </div>
      </div>
    </div>
    <div class="main__sidebar sidebar">
      <anonymous v-if="!user"></anonymous>
      <template v-else>
        <personal :user="user"></personal>
        <create-topic></create-topic>
      </template>
      <client-qrcode></client-qrcode>
    </div>
  </div>
</template>

<script>
import LazyWrapper from '~/components/lazy-wrapper'
import Anonymous from '~/components/sidebar/anonymous'
import Personal from '~/components/sidebar/personal'
import CreateTopic from '~/components/sidebar/create-topic'
import ClientQrcode from '~/components/sidebar/client-qrcode'
import Breadcrumb from '~/components/breadcrumb'
import BreadcrumbItem from '~/components/breadcrumb/item'

export default {
  name: 'User',

  components: {
    LazyWrapper,
    Anonymous,
    Personal,
    CreateTopic,
    ClientQrcode,
    Breadcrumb,
    BreadcrumbItem
  },

  computed: {
    user () {
      return this.$store.state.user
    }
  }
}
</script>

<style lang="scss">
@include b(getstart) {
  padding: 10px;
  border-top: 1px solid #e5e5e5;

  h2 {
    font-size: 26px;
  }
}
</style>
