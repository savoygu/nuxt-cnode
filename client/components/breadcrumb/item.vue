<template>
  <div class="cn-breadcrumb__item">
    <span class="cn-breadcrumb__inner">
      <nuxt-link v-show="to"
        :to="to"
        :replace="replace">
        <slot></slot>
      </nuxt-link>
      <slot v-show="!to"></slot>
    </span>
    <i v-if="separatorClass" class="cn-breadcrumb__separator" :class="separatorClass"></i>
    <span class="cn-breadcrumb__separator" :class="separatorClass">{{separator}}</span>
  </div>
</template>

<script>
  export default {
    name: 'CnBreadcrumbItem',
    props: {
      to: {},
      replace: Boolean
    },
    data() {
      return {
        separator: '',
        separatorClass: ''
      }
    },
    inject: ['cnBreadcrumb'],
    mounted() {
      this.separator = this.cnBreadcrumb.separator
      this.separatorClass = this.cnBreadcrumb.separatorClass
    }
  }
</script>
