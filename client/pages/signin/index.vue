<template>
  <div class="main">
    <div class="main__content">
      <div class="main__panel">
        <div class="signin">
          <div class="signin__header">
            <breadcrumb>
              <breadcrumb-item to="/">主页</breadcrumb-item>
              <breadcrumb-item>登录</breadcrumb-item>
            </breadcrumb>
          </div>
          <div class="signin__content">
            <alert type="error" v-model="visible" :text="errorText"></alert>
            <div class="control">
              <div class="control__group">
                <label class="control__label" for="accesstoken">Access Token</label>
                <div class="control__item">
                  <input class="input--large" v-model="accesstoken"  name="accesstoken" size="30" type="text">
                </div>
              </div>
            </div>
            <div class="control__action">
              <button class="button--blue" @click="signin">登录</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="main__sidebar sidebar">
      <about></about>
    </div>
  </div>
</template>

<script>
  import About from '~/components/sidebar/about'
  import Breadcrumb from '~/components/breadcrumb'
  import BreadcrumbItem from '~/components/breadcrumb/item'
  import Alert from '~/components/alert'

  export default {
    name: 'Signin',

    components: {
      About,
      Breadcrumb,
      BreadcrumbItem,
      Alert
    },

    data () {
      return {
        accesstoken: '',
        visible: false,
        errorText: ''
      }
    },

    methods: {
      async signin () {
        const { accesstoken } = this

        if (!accesstoken) {
          this.errorText = '请输入您的 Access Token'
          this.visible = true
          return false
        }
        await this.$store.dispatch('FETCH_ACCESSTOKEN', { accesstoken })
        // TODO: 从哪来回哪去
        // 跳转到首页
        this.$router.push('/')
      }
    },
  }
</script>

<style lang="scss">
@include b(signin) {
  @include e(header) {
    padding: 10px;
    background-color: #f6f6f6;
    border-radius: 3px 3px 0 0;
  }

  @include e(content) {
    padding: 10px;
    border-radius: 0 0 3px 3px;
  }
}

@include b(input) {

  @include m(large) {
    width: 284px;
  }
}

@include b(control) {
  margin-top: 40px;

  @include e(group) {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
  }

  @include e(label) {
    width: 160px;
    text-align: right;
  }

  @include e(item) {
    margin-left: 20px;

    input {
      height: 30px;
      padding: 4px 6px;
      font-size: 14px;
      line-height: 20px;
      color: #555;
      border: 1px solid #ccc;
      border-radius: 4px;
      box-shadow: inset 0 1px 1px rgba(0,0,0,.075);
      outline: none;

      &:focus {
        border-color: rgba(82,168,236,.8);
        box-shadow: inset 0 1px 1px rgba(0,0,0,.075),0 0 8px rgba(82,168,236,.6);
      }
    }
  }

  @include e(action) {
    padding: 20px 20px 20px 180px;
  }

}

</style>
