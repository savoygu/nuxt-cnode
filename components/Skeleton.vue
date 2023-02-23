<template>
  <div class="skeleton skeleton--animated">
    <div class="skeleton__item">
      <div class="skeleton__content">
        <div class="skeleton__line"></div>
        <div class="skeleton__line"></div>
        <div class="skeleton__line"></div>
        <div class="skeleton__line"></div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@include b(skeleton) {
  width: 100%;
  background-color: #fff;

  @include e(item) {
    padding-bottom: 21px;
    border-bottom: 1px solid #f3f3f3;
    margin-bottom: 21px;

    &:last-child {
      padding: 0;
      border: none;
      margin: 0;
    }
  }

  @include e(content) {
    overflow: hidden;
    padding: 20px;
  }

  @include e(line) {
    width: 100%;
    height: 14px;
    margin-bottom: 16px;

    &:first-child {
      width: 40%;
      margin-top: 8px;
    }

    &:nth-child(3) {
      width: 80%;
    }

    &:last-child {
      width: 60%;
      margin-bottom: 0;
    }
  }

  @include m(animated) {
    @include p('e:avatar', 'e:line') {
      animation: skeleton-keyframes 0.6s linear infinite;
      background: linear-gradient(90deg, #e4e6eb, rgb(228 230 235 / 50%), #e4e6eb);
      background-size: 480px 480px;
    }
  }
}

@keyframes skeleton-keyframes {
  0% {
    background-position: 0 0;
  }

  100% {
    background-position: 480px 0;
  }
}
</style>
