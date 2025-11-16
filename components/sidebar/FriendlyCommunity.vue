<script setup lang="ts">
const communities = [
  { website: 'https://ruby-china.org/', logo: '//static2.cnodejs.org/public/images/ruby-china-20150529.png' },
  { website: 'http://golangtc.com/', logo: '//static2.cnodejs.org/public/images/golangtc-logo.png' },
  { website: 'http://phphub.org/', logo: '//static2.cnodejs.org/public/images/phphub-logo.png' },
]
</script>

<template>
  <Panel title="友情社区">
    <ol>
      <li v-for="item in communities" :key="item.website" class="mb-[10px] last:mb-0">
        <a :href="item.website" target="_blank">
          <img :src="item.logo" class="w-[150px]">
        </a>
      </li>
    </ol>
  </Panel>
</template>
