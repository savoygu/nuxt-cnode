<template>
  <sidebar-wrapper header="无人回复的话题">
    <ul class="noreply-topic__list">
      <li class="noreply-topic__item" v-for="topic in topics" :key="topic.id">
        <a class="is-dark" :href="`https://cnodejs.org/topic/${topic.id}`" :title="topic.title">{{ topic.title }}</a>
      </li>
    </ul>
  </sidebar-wrapper>
</template>

<script>
  import SidebarWrapper from './sidebar-wrapper'
  export default {
    name: 'NoreplyTopic',

    components: {
      SidebarWrapper
    },

    data () {
      return {
        topics: [
          { id: '5b604e06673571454c633d75', title: '原生node.js捕获图片的数据流，拿到数据，图片存不起来？' },
          { id: '5b60495e58db3ccf66a450c6', title: 'nest如何实现多进程间通信和egg类似的agent机制' },
          { id: '5b6017062860af042a217a08', title: '云+校园老带新活动 1核2G 1M带宽 50G系统盘 10元/月' },
          { id: '5b5fea342860af042a2179fe', title: '基于 nest.js (typescript) + Graphql +Grpc 的微服务框架——开发中  （欢迎参与）"' },
          { id: '5b5fc2d0673571454c633d4f', title: '云+校园老带新活动 1核2G 1M带宽 50G系统盘 10元/月' },
        ]
      }
    }
  }
</script>

<style lang="scss">
@include b(noreply-topic) {
  @include e(list) {
    margin-bottom: 10px;
  }

  @include e(item) {
    @include utils-ellipsis;

    a {
      display: inline-block;
      max-width: 270px;
      font-size: 14px;
      line-height: 30px;
    }
  }
}

</style>
