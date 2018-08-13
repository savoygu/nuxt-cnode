<template>
  <div class="main__content">
    <div class="main__panel">
      <div class="main__header">
        <breadcrumb>
          <breadcrumb-item to="/">主页</breadcrumb-item>
          <breadcrumb-item>新消息</breadcrumb-item>
        </breadcrumb>
      </div>
      <div class="messages">
        <template v-if="unread && unread.length">
          <message-item v-for="item in unread" :key="item.id" :item="item"></message-item>
        </template>
        <p v-else class="messages__none">无消息</p>
      </div>
    </div>
    <div class="main__panel">
      <div class="main__header">
        过往消息
      </div>
      <div class="messages__beyond">
        <template v-if="read && read.length">
          <message-item v-for="item in read" :key="item.id" :item="item"></message-item>
        </template>
        <p v-else class="messages__none">无消息</p>
      </div>
    </div>
  </div>
</template>

<script>
import Breadcrumb from '~/components/breadcrumb'
import BreadcrumbItem from '~/components/breadcrumb/item'
import MessageItem from '~/components/message-item'

export default {
  name: 'Message',

  layout: 'sidebar',

  components: {
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
