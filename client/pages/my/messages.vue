<template>
  <div class="main__content">
    <div class="main__panel">
      <div class="main__header">
        <breadcrumb>
          <breadcrumb-item to="/">主页</breadcrumb-item>
          <breadcrumb-item>新消息</breadcrumb-item>
        </breadcrumb>
      </div>
      <lazy-wrapper :loading="loading">
        <div class="messages">
          <template v-if="unread && unread.length">
            <message-item v-for="item in unread" :key="item.id" :item="item"></message-item>
          </template>
          <p v-else class="messages__none">无消息</p>
        </div>
      </lazy-wrapper>

      <div class="main__header">
        过往消息
      </div>
      <lazy-wrapper :loading="loading">
        <div class="messages__beyond">
          <template v-if="read && read.length">
            <message-item v-for="item in read" :key="item.id" :item="item"></message-item>
          </template>
          <p v-else class="messages__none">无消息</p>
        </div>
      </lazy-wrapper>
    </div>
  </div>
</template>

<script>
import LazyWrapper from '~/components/lazy-wrapper'
import Breadcrumb from '~/components/breadcrumb'
import BreadcrumbItem from '~/components/breadcrumb/item'
import MessageItem from '~/components/message-item'

export default {
  name: 'Message',

  layout: 'sidebar',

  components: {
    LazyWrapper,
    Breadcrumb,
    BreadcrumbItem,
    MessageItem
  },

  fetch ({ store }) {
    return store.dispatch('FETCH_MESSAGE')
  },

  computed: {
    messages () {
      return this.$store.state.messages
    },

    read () {
      return this.messages.read
    },

    unread () {
      return this.messages.unread
    },

    loading () {
      return this.$store.state.loading
    }
  }
}
</script>

<style lang="scss">
@include b(messages) {
  @include e(none) {
    padding: 10px;
  }

  @include e(beyond) {
    //body
  }

}
</style>
