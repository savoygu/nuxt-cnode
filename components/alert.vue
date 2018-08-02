<template>
  <div class="alert"
    v-if="value"
    :class="type ? `alert--${type}` : ''">
    <i class="alert__close" @click="$emit('input', false)">×</i>
    <strong class="alert__text"><slot>{{text}}</slot></strong>
  </div>
</template>

<script>
  export default {
    name: 'Alert',

    props: {
      value: Boolean,
      type: String,
      text: String
    }
  }
</script>

<style lang="scss">
@include b(alert) {
  position: relative;
  padding: 8px 35px 8px 14px;
  line-height: 2em;
  border: 1px solid #fbeed5;
  text-shadow: 0 1px 0 rgba(255,255,255,.5);

  @include e(close) {
    position: absolute;
    top: 6px;
    right: 12px;
    font-size: 20px;
    font-weight: 700;
    text-shadow: 0 1px 0 #fff;
    opacity: .2;
    cursor: pointer;
  }


  @include e(text) {
    //body
  }

  @include m(error) {
    color: #b94a48;
    background-color: #f2dede;
    border-color: #eed3d7;
  }
}

</style>
