<template>
  <div class="cnode">
    <Header />
    <div class="content">
      <nuxt nuxt-child-key="none" role="main"/>
    </div>
    <Footer />
  </div>
</template>

<script>
import Header from '~/components/layout/header'
import Footer from '~/components/layout/footer'

export default {
  name: 'defaultLayout',

  components: {
    Header,
    Footer
  }
}
</script>

<style lang="scss">

</style>
