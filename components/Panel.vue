<script setup lang="ts">
type PanelProps = {
  title?: string
  header?: boolean
  contentPadding?: boolean
  bordered?: boolean
}
const { title, header, contentPadding, bordered } = withDefaults(defineProps<PanelProps>(), {
  title: '',
  header: true,
  contentPadding: true,
  bordered: false
})
</script>

<template>
  <div class="panel">
    <div v-if="header" class="panel__header">
      <slot name="header">
        <span class="panel__title">{{ title }}</span>
      </slot>
    </div>
    <div class="panel__content" :class="{ 'no-padding': !contentPadding, 'is-border': bordered }">
      <slot></slot>
    </div>
  </div>
</template>

<style lang="scss">
@include b(panel) {
  margin-bottom: 13px;
  font-size: 13px;

  @include e(header) {
    padding: 10px;
    background-color: #f6f6f6;
    border-radius: 3px 3px 0 0;

    a.dark {
      color: #666;

      @include p(':active', ':link', ':visited') {
        color: #666;
        text-decoration: none;
      }

      @include p(':hover') {
        color: #385f8a;
      }
    }
  }

  @include e(title) {
    color: #444;
  }

  @include e(content) {
    padding: 10px;
    background-color: #fff;
    border-radius: 0 0 3px 3px;
    line-height: 2em;

    ol {
      margin: 4px 0;
      list-style: none;
    }

    &.no-padding {
      padding: 0;
    }

    &.is-border {
      border-top: 1px solid #e5e5e5;
    }
  }

  @include e(link) {
    color: #778087;
  }

  @include e(unstyled) {
    margin: 0 0 10px;
    list-style: none;

    li {
      line-height: 2em;

      a {
        display: inline-block;
        max-width: 270px;
        font-size: 14px;
        line-height: 30px;
        vertical-align: middle;

        @include utils-ellipsis;
      }
    }
  }
}
</style>
