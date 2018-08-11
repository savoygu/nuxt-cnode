<template>
  <div class="main__content">
    <div class="main__panel">
      <div class="main__header">
        <breadcrumb>
          <breadcrumb-item to="/">主页</breadcrumb-item>
          <breadcrumb-item>设置</breadcrumb-item>
        </breadcrumb>
      </div>
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
    </div>
  </div>
</template>

<script>
import SidebarWrapper from '~/components/sidebar/sidebar-wrapper'
import Breadcrumb from '~/components/breadcrumb'
import BreadcrumbItem from '~/components/breadcrumb/item'

export default {
  name: 'setting',

  layout: 'sidebar',

  components: {
    SidebarWrapper,
    Breadcrumb,
    BreadcrumbItem
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
