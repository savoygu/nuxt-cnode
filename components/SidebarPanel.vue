<script setup lang="ts">
type SidebarPanelProps = {
  header?: string
}
const { header } = withDefaults(defineProps<SidebarPanelProps>(), {
  header: ''
})
</script>

<template>
  <div class="sidebar-panel">
    <div class="sidebar-panel__header">
      <slot name="header">{{ header }}</slot>
    </div>
    <div class="sidebar-panel__content">
      <slot></slot>
    </div>
  </div>
</template>

<style lang="scss">
@include b(sidebar-panel) {
  margin-bottom: 13px;
  font-size: 13px;

  @include e(header) {
    padding: 10px;
    background-color: #f6f6f6;
    border-radius: 3px 3px 0 0;
    color: #51585c;

    a {
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

  @include e(content) {
    padding: 10px;
    background-color: #fff;
    border-radius: 0 0 3px 3px;
    line-height: 2em;

    a {
      color: #778087;
    }

    ol {
      margin: 4px 0;
      list-style: none;
    }
  }
}
</style>
