<template>
  <div class="nuxt-cnode">
    <Navbar />
    <slot />
    <TheFooter />
  </div>
</template>

<style lang="scss">
.nuxt-cnode {
  display: flex;
  min-height: 100%;
  flex-direction: column;
}
</style>
