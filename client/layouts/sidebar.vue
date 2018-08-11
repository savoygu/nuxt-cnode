<template>
  <div class="cnode">
    <Header />
    <div class="main">
      <!-- <div class="main__content">
        <div class="main__panel">
          <div class="main__header">
            <breadcrumb>
              <breadcrumb-item to="/">主页</breadcrumb-item>
              <breadcrumb-item>{{page}}</breadcrumb-item>
            </breadcrumb>
          </div>
        </div>
      </div> -->
      <nuxt nuxt-child-key="none" role="main"/>
      <div class="main__sidebar sidebar">
        <anonymous v-if="!user"></anonymous>
        <template v-else>
          <personal :user="user"></personal>
          <create-topic></create-topic>
        </template>
        <client-qrcode></client-qrcode>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import Header from '~/components/layout/header'
import Footer from '~/components/layout/footer'
import Anonymous from '~/components/sidebar/anonymous'
import Personal from '~/components/sidebar/personal'
import CreateTopic from '~/components/sidebar/create-topic'
import ClientQrcode from '~/components/sidebar/client-qrcode'
// import Breadcrumb from '~/components/breadcrumb'
// import BreadcrumbItem from '~/components/breadcrumb/item'

export default {
  name: 'sidebarLayout',

  components: {
    Header,
    Footer,
    Anonymous,
    Personal,
    CreateTopic,
    ClientQrcode,
    // Breadcrumb,
    // BreadcrumbItem
  },

  // props: ['page'],

  computed: {
    // page () {
    //   return this.$store.state.page
    // },
    user () {
      return this.$store.state.user
    }
  }
}
</script>
