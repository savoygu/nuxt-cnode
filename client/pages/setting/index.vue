<template>
  <div class="setting">
    <sidebar-wrapper header="Access Token">
      <div class="setting-token">字符串：{{user.accesstoken}}</div>
      <div class="setting-code">
        <span>二维码：</span>
        <div>
          <img :src="`http://qr.liantu.com/api.php?&w=200&text=${user.accesstoken}`" alt="">
        </div>
      </div>
    </sidebar-wrapper>
  </div>
</template>

<script>
import SidebarWrapper from '~/components/sidebar/sidebar-wrapper'

export default {
  name: 'User',

  components: {
    SidebarWrapper
  },

  layout (context) {
    context.store.commit('SET_PAGE', { page: '设置' })
    return 'sidebar'
  },

  computed: {
    user () {
      return this.$store.state.user
    }
  }
}
</script>

<style lang="scss">
@include b(setting) {
  padding: 10px;
  border-top: 1px solid #e5e5e5;

  h2 {
    font-size: 26px;
  }
}
</style>
