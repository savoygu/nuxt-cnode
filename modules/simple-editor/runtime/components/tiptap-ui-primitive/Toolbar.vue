<script setup lang="ts">
const { variant = 'fixed' } = defineProps<{
  variant?: 'floating' | 'fixed'
}>()

const toolbarRef = useTemplateRef('toolbar')

defineExpose({
  toolbarRef,
})
</script>

<template>
  <div ref="toolbar" class="tiptap-toolbar" :data-variant="variant" v-bind="$attrs">
    <slot />
  </div>
</template>

<style>
.tiptap-toolbar {
  --tt-toolbar-height: 2.75rem;
  --tt-safe-area-bottom: env(safe-area-inset-bottom, 0px);
  --tt-toolbar-bg-color: var(--white);
  --tt-toolbar-border-color: var(--tt-gray-light-a-100);
}
</style>

<style>
.tiptap-toolbar {
  display: flex;
  align-items: center;
  gap: 0.25rem;

  &[data-variant='fixed'] {
    position: sticky;
    top: 0;
    z-index: 10;
    width: 100%;
    min-height: var(--tt-toolbar-height);
    background: var(--tt-toolbar-bg-color);
    border-bottom: 1px solid var(--tt-toolbar-border-color);
    padding: 0 0.5rem;
    overflow-x: auto;
    overscroll-behavior-x: contain;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none;
    -ms-overflow-style: none;

    &::-webkit-scrollbar {
      display: none;
    }

    @media (max-width: 480px) {
      position: absolute;
      top: auto;
      height: calc(var(--tt-toolbar-height) + var(--tt-safe-area-bottom));
      border-top: 1px solid var(--tt-toolbar-border-color);
      border-bottom: none;
      padding: 0 0.5rem var(--tt-safe-area-bottom);
      flex-wrap: nowrap;
      justify-content: flex-start;

      .tiptap-toolbar-group {
        flex: 0 0 auto;
      }
    }
  }

  &[data-variant='floating'] {
    --tt-toolbar-padding: 0.125rem;
    --tt-toolbar-border-width: 1px;

    padding: 0.188rem;
    border-radius: calc(var(--tt-toolbar-padding) + var(--tt-radius-lg) + var(--tt-toolbar-border-width));
    border: var(--tt-toolbar-border-width) solid var(--tt-toolbar-border-color);
    background-color: var(--tt-toolbar-bg-color);
    box-shadow: var(--tt-shadow-elevated-md);
    outline: none;
    overflow: hidden;

    &[data-plain='true'] {
      padding: 0;
      border-radius: 0;
      border: none;
      box-shadow: none;
      background-color: transparent;
    }

    @media screen and (max-width: 480px) {
      width: 100%;
      border-radius: 0;
      border: none;
      box-shadow: none;
    }
  }
}
</style>
