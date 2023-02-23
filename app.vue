<script setup lang="ts">
useHead({
  titleTemplate: titleChunk => {
    return titleChunk ? titleChunk + ' - Nuxt3 CNode 技术社区' : 'Nuxt3 CNode：Node.js专业中文社区'
  },
  meta: [
    { charset: 'utf-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { name: 'description', content: '基于 Nuxt3 构建 CNode 社区' },
    { name: 'keywords', content: 'CNode, Node.js, Node, Nuxt3' }
  ],
  link: [
    {
      rel: 'alternate',
      title: 'RSS',
      type: 'application/rss+xml',
      href: '//cnodejs.org/rss'
    },
    {
      rel: 'icon',
      type: 'image/x-icon',
      href: '//static2.cnodejs.org/public/images/cnode_icon_32.png'
    },
    {
      rel: 'stylesheet',
      href: '//cdn.jsdelivr.net/editor/0.1.0/editor.css'
    }
  ],
  script: [
    {
      src: '//cdn.jsdelivr.net/editor/0.1.0/editor.js',
      defer: 'true'
    },
    {
      src: '//cdn.jsdelivr.net/editor/0.1.0/marked.js',
      defer: 'true'
    }
  ]
})

const nuxtApp = useNuxtApp()
nuxtApp.hook('page:finish', () => {
  window.scrollTo(0, 0)
})

await useUser()
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
