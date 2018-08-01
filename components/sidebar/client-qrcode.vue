<template>
  <sidebar-wrapper header="移动端二维码">
    <div class="client-qrcode">
      <img width="200" src="https://qr.api.cli.im/qr?data=https%253A%252F%252Fgithub.com%252Fsavoygu%252Fnuxt-cnode&level=H&transparent=false&bgcolor=%23ffffff&forecolor=%23000000&blockpixel=12&marginblock=1&logourl=&size=280&kid=cliim&key=a845e4d36efea2d425645e9ad2ce3108" alt="">
      <a href="https://github.com/savoygu/nuxt-cnode" target="_blank">『Nuxt构建Cnode技术社区』源码地址</a>
    </div>
  </sidebar-wrapper>
</template>

<script>
  import SidebarWrapper from './sidebar-wrapper'
  export default {
    name: 'NoreplyTopic',

    components: {
      SidebarWrapper
    }
  }
</script>

<style lang="scss">
@include b(client-qrcode) {
  text-align: center;

  img {
    display: block;
    margin: 0 auto;
  }
}

</style>
