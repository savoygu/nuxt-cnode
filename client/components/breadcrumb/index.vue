<template>
  <div class="cn-breadcrumb" aria-label="Breadcrumb" role="navigation">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 'CnBreadcrumb',
    props: {
      separator: {
        type: String,
        default: '/'
      },
      separatorClass: {
        type: String,
        default: ''
      }
    },
    provide() {
      return {
        cnBreadcrumb: this
      }
    },
    mounted() {
      const items = this.$el.querySelectorAll('.cn-breadcrumb__item')
      if (items.length) {
        items[items.length - 1].setAttribute('aria-current', 'page')
      }
    }
  }
</script>

<style lang="scss">
@include c(breadcrumb) {
  display: inline-flex;
  font-size: 14px;
  line-height: 20px;

  @include e(item) {

    @include e(inner) {
      a {
        color: #80bd01;

        @include hover {
          text-decoration: underline;
        }
      }
    }


    &:last-child {
      .cn-breadcrumb__inner {
        color: #999;
      }

      .cn-breadcrumb__separator {
        display: none;
      }
    }
  }

  @include e(separator) {
    margin: 0 5px;
    font-weight: bold;
    color: #ccc;

    &[class*=icon] {
      margin: 0 3px;
      font-weight: normal;
    }
  }
}
</style>
