<template>
  <div class="main">
    <div class="main__content">
      <div class="main__panel">
        <div class="topic-nav">
          <router-link :to="'/'+item"
            v-for="item in validTabs"
            :key="item"
            class="topic-nav__tab"
            :class="{ 'is-current': tab === item  }">
            {{tabs[item].name}}
          </router-link>
        </div>
        <div class="main__topic">
          <lazy-wrapper :loading="loading">
            <transition :name="transition" mode="out-in">
              <div :key="currentPage" class="topic-list">
                <transition-group tag="ul" name="item">
                  <topic-item v-for="item in displayedTopics" :key="item.id" :item="item"></topic-item>
                </transition-group>
              </div>
            </transition>
          </lazy-wrapper>
          <div class="main__pagination">
            <cn-pagination :page-count="pageCount" :current-page="currentPage" @change="handlePageChange"/>
          </div>
        </div>
      </div>
    </div>
    <div class="main__sidebar sidebar">
      <anonymous></anonymous>
      <personal></personal>
      <create-topic></create-topic>
      <noreply-topic></noreply-topic>
      <leaderboard></leaderboard>
      <client-qrcode></client-qrcode>
    </div>
  </div>
</template>

<script>
import CnPagination from '~/components/pagination'
import TopicItem from '~/components/topic-item'
import LazyWrapper from '~/components/lazy-wrapper'
import Personal from '~/components/sidebar/personal'
import Anonymous from '~/components/sidebar/anonymous'
import NoreplyTopic from '~/components/sidebar/noreply-topic'
import Leaderboard from '~/components/sidebar/leaderboard'
import ClientQrcode from '~/components/sidebar/client-qrcode'
import CreateTopic from '~/components/sidebar/create-topic'
import { tabs, validTabs } from '~/common/constants'

export default {
  components: {
    CnPagination,
    TopicItem,
    LazyWrapper,
    Personal,
    Anonymous,
    NoreplyTopic,
    Leaderboard,
    ClientQrcode,
    CreateTopic
  },

  validate ({ params: { tab } }) {
    return validTabs.includes(tab)
  },

  fetch ({ store, params: { tab = 'all', page = 1 } }) {
    return store.dispatch('FETCH_TOPIC', { tab, page })
  },

  head () {
    return {
      title: tabs[this.$route.params.tab].title
    }
  },

  data () {
    return {
      pageCount: 100,
      currentPage: Number(this.page) || 1,
      tabs: tabs,
      validTabs: validTabs,
      transition: 'slide-right'
    }
  },

  computed: {
    tab () {
      return this.$route.params.tab
    },
    page () {
      return Number(this.$route.params.page) || 1
    },
    pageData () {
      return this.$store.state.topics[this.tab][this.page] || []
    },
    displayedTopics () {
      return this.pageData.map(id => this.$store.state.items[id])
    },
    loading () {
      return this.displayedTopics.length === 0
    }
  },

  watch: {
    page: 'pageChanged'
  },

  mounted () {
    this.pageChanged(this.page)
  },

  methods: {
    handlePageChange (page) {
      this.$router.push(`/${this.tab}/${page}`)
    },
    pageChanged (to, from = -1) {
      if (to < 0) {
        this.$router.replace(`/${this.tab}/1`)
        return
      }

      // Prefetch next page
      this.$store
        .dispatch('FETCH_TOPIC', {
          tab: this.tab,
          page: to,
          prefetch: true
        })
        .catch(() => {})

      this.transition =
        from === -1 ? null : to > from ? 'slide-left' : 'slide-right'

      this.currentPage = to
    }
  },
}
</script>

<style lang="scss">
.topic-list {
  transition: all 0.3s cubic-bezier(0.55, 0, 0.1, 1);
}

.slide-left-enter, .slide-right-leave-to {
  opacity: 0;
  transform: translate(30px, 0);
}

.slide-left-leave-to, .slide-right-enter {
  opacity: 0;
  transform: translate(-30px, 0);
}

.item-move, .item-enter-active, .item-leave-active {
  transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
}

.item-enter {
  opacity: 0;
  transform: translate(30px, 0);
}

.item-leave-active {
  position: absolute;
  opacity: 0;
  transform: translate(30px, 0);
}

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
