<script setup lang="ts">
const communities = [
  { website: 'https://ruby-china.org/', logo: '//static2.cnodejs.org/public/images/ruby-china-20150529.png' },
  { website: 'http://golangtc.com/', logo: '//static2.cnodejs.org/public/images/golangtc-logo.png' },
  { website: 'http://phphub.org/', logo: '//static2.cnodejs.org/public/images/phphub-logo.png' }
]
</script>

<template>
  <Panel title="友情社区">
    <ol class="friendly-community">
      <li v-for="item in communities" :key="item.website">
        <a :href="item.website" target="_blank">
          <img :src="item.logo" />
        </a>
      </li>
    </ol>
  </Panel>
</template>

<style lang="scss">
@include b(friendly-community) {
  li {
    margin-bottom: 10px;

    &:last-child {
      margin-bottom: 0;
    }
  }

  img {
    width: 150px;
  }
}
</style>
