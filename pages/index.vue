<template>
  <div class="main">
    <div class="main__content">
      <div class="main__panel">
        <div class="topic-nav">
          <a href="/?tab=all" class="topic-nav__tab is-current">全部</a>
          <a href="/?tab=good" class="topic-nav__tab">精华</a>
          <a href="/?tab=share" class="topic-nav__tab">分享</a>
          <a href="/?tab=ask" class="topic-nav__tab">问答</a>
          <a href="/?tab=job" class="topic-nav__tab">招聘</a>
          <a href="/?tab=dev" class="topic-nav__tab">客户端测试</a>
        </div>
        <div class="main__topic">
          <div class="topic-list">
            <topic-item></topic-item>
          </div>
          <div class="main__pagination">
            <cn-pagination :page-count="pageCount" :current-page="currentPage" @change="handlePageChange"/>
          </div>
        </div>
      </div>
    </div>
    <div class="main__sidebar"></div>
  </div>
</template>

<script>
import CnRow from '~/components/row'
import CnCol from '~/components/col'
import CnPagination from '~/components/pagination'
import TopicItem from '~/components/topic-item'

export default {
  components: {
    CnRow,
    CnCol,
    CnPagination,
    TopicItem
  },

  data() {
    return {
      pageCount: 10,
      currentPage: 1
    }
  },

  methods: {
    handlePageChange (page) {
      this.currentPage = page
    }
  },
}
</script>

<style lang="scss">

@include b(main) {
  @include e(topic) {
    background-color: #fff;
    border-radius: 0 0 3px 3px;
  }
}

@include b(topic-nav) {
  padding: 10px;
  background-color: #f6f6f6;
  border-radius: 3px 3px 0 0;

  @include e(tab) {
    margin: 0 10px;
    color: #80bd01;

    @include is(current) {
      background-color: #80bd01;
      color: #fff;
      padding: 3px 4px;
      border-radius: 3px;
    }
  }
}

@media screen and (max-width: $--break-mini) {
    .topic-nav {
      padding: 10px 0;
    }

    .topic-nav__tab {
      margin: 0 8px;
    }
}
</style>
