<template>
  <sidebar-wrapper>
    <template slot="header">
      <span>积分榜</span> &nbsp; <a href='https://cnodejs.org/users/top100'>TOP 100 >></a>
    </template>
    <ol class="leaderboard__list">
      <li class="leaderboard__item" v-for="nb in nbs" :key="nb.user">
        <span class="leaderboard__score">{{nb.score}}</span>
        <span class="leaderboard__user"><a :href="`https://cnodejs.org/user/${nb.user}`">{{nb.user}}</a></span>
      </li>
    </ol>
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
        nbs: [
          { user: 'i5ting', score: 21230 },
          { user: 'alsotang', score: 15020 },
          { user: 'leapon', score: 9350 },
          { user: 'jiyinyiyong', score: 8760 },
          { user: 'yakczh', score: 6980 },
          { user: 'here', score: 6595 },
          { user: 'atian25', score: 6365 },
          { user: 'DevinXian', score: 6020 },
          { user: 'magicdawn', score: 5315 },
          { user: 'chapgaga', score: 4875 }
        ]
      }
    }
  }
</script>

<style lang="scss">
@include b(leaderboard) {
  @include e(list) {
    margin: 4px 0;
    list-style: none;
  }

  @include e(score) {
    margin-right: 10px;
    padding: 2px;
    color: gray;
  }

  @include e(user) {
    display: inline-block;
    max-width: 120px;
    white-space: nowrap;
  }
}

</style>
