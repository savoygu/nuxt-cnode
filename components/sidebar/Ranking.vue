<script setup lang="ts">
import { Ranking } from '~/types'

const { data: ranking } = await useFetch<Ranking[]>('/api/ranking')
</script>

<template>
  <Panel>
    <template #header>
      <div class="ranking__header">
        <span>积分榜</span> &nbsp; <a class="dark" href="https://cnodejs.org/users/top100">TOP 100 >></a>
      </div>
    </template>
    <ol class="ranking__list">
      <li v-for="item in ranking" :key="item.user" class="ranking__item">
        <span class="ranking__score">{{ item.score }}</span>
        <span class="ranking__user">
          <a class="panel__link" :href="`https://cnodejs.org/user/${item.user}`">{{ item.user }}</a>
        </span>
      </li>
    </ol>
  </Panel>
</template>

<style lang="scss">
@include b(ranking) {
  @include e(list) {
    margin: 4px 0;
    list-style: none;
  }

  @include e(score) {
    padding: 2px;
    margin-right: 10px;
    color: gray;
  }

  @include e(user) {
    display: inline-block;
    max-width: 120px;
    white-space: nowrap;
  }
}
</style>
