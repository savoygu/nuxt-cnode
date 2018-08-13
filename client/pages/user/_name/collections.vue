<template>
  <div class="main__content">
    <div class="main__panel">
      <div class="main__header">
        <breadcrumb>
          <breadcrumb-item to="/">主页</breadcrumb-item>
          <breadcrumb-item>{{user.loginname}} 收藏的话题</breadcrumb-item>
        </breadcrumb>
      </div>
      <div class="collect-topic">
        <lazy-wrapper :loading="collections.loading">
          <template v-if="collections.length">
            <topic-item v-for="item in collections" :key="item.id" :item="item"></topic-item>
          </template>
          <p v-else class="collect-topic__none">暂无话题</p>
        </lazy-wrapper>
      </div>
    </div>
  </div>
</template>

<script>
import LazyWrapper from '~/components/lazy-wrapper'
import TopicItem from '~/components/topic-item'
import Breadcrumb from '~/components/breadcrumb'
import BreadcrumbItem from '~/components/breadcrumb/item'

export default {
  name: 'collections',

  layout: 'sidebar',

  components: {
    LazyWrapper,
    TopicItem,
    Breadcrumb,
    BreadcrumbItem
  },

  fetch ({ store, params: { name } }) {
    return store.dispatch('FETCH_COLLECT', { name })
  },

  computed: {
    name () {
      return this.$route.params.name
    },
     user () {
      return this.$store.state.users[this.name] || {}
    },
    collections () {
      return this.$store.state.collections[this.name]
    }
  }
}
</script>

<style lang="scss">
@include b(collect-topic) {
  @include e(none) {
    padding: 10px 0 20px;
    text-align: center;
  }

}
</style>
