<template>
  <div class="main__content">
    <div class="main__panel">
      <div class="main__header">
        <breadcrumb>
          <breadcrumb-item to="/">主页</breadcrumb-item>
          <breadcrumb-item>API</breadcrumb-item>
        </breadcrumb>
      </div>
      <div class="api">
        <div class="markdown-text">
          <h2>API，哪位给我安排一下</h2>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Breadcrumb from '~/components/breadcrumb'
import BreadcrumbItem from '~/components/breadcrumb/item'

export default {
  name: 'apiv1',

  layout: 'sidebar',

  components: {
    Breadcrumb,
    BreadcrumbItem
  }
}
</script>

<style lang="scss">
@include b(api) {
  padding: 10px;
  border-top: 1px solid #e5e5e5;

  h2 {
    font-size: 26px;
  }
}
</style>
