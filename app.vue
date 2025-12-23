<script setup lang="ts">
const img = useImage()

useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} - Nuxt CNode 技术社区` : 'Nuxt CNode：Node.js专业中文社区'
  },
  meta: [
    { charset: 'utf-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { name: 'description', content: 'Nuxt CNode：Node.js专业中文社区' },
    { name: 'keywords', content: 'cnode, nodejs, node, nuxt' },
  ],
  link: [
    { rel: 'alternate', title: 'RSS', type: 'application/rss+xml', href: '//cnodejs.org/rss' },
    { rel: 'icon', type: 'image/x-icon', href: img('/cnode_icon_32.png') },
  ],
})

await useUser()
</script>

<template>
  <NuxtPage />
</template>
