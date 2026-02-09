<script setup lang="ts">
import type { CSSProperties } from 'vue'
import type { ButtonProps } from '../../tiptap-ui-primitive/Button.vue'
import type { UseColorHighlightConfig } from './useColorHighlight'
import { useColorHighlight } from './useColorHighlight'

interface ColorHighlightButtonProps extends /* @vue-ignore */ Omit<ButtonProps, 'type' | 'disabled'>, UseColorHighlightConfig {
  text?: string
  showShortcut?: boolean
}

const { highlightColor, hideWhenUnavailable = false, onApplied, text, ...buttonProps } = defineProps<ColorHighlightButtonProps>()

const emit = defineEmits<{
  (e: 'click', event: MouseEvent): void
}>()

const slots = useSlots()
const attrs = useAttrs()
const { editor } = useEditorStore()!
const { isVisible, canColorHighlight, isActive, label, handleColorHighlight } = useColorHighlight({
  editor,
  highlightColor: () => highlightColor,
  label: () => text || `Toggle highlight (${highlightColor})`,
  hideWhenUnavailable: () => hideWhenUnavailable,
  onApplied,
})

const buttonStyle = computed(() => {
  return {
    ...(attrs.style ?? {}),
    '--highlight-color': highlightColor,
  } as CSSProperties
})

function handleClick(event: MouseEvent) {
  emit('click', event)

  if (event.defaultPrevented) {
    return
  }

  handleColorHighlight()
}
</script>

<template>
  <TiptapButton
    v-if="isVisible"
    type="button"
    data-style="ghost"
    :data-active-state="`${isActive ? 'on' : 'off'}`" :data-disabled="!canColorHighlight"
    :disabled="!canColorHighlight"
    :style="buttonStyle"
    v-bind="buttonProps"
    @click="handleClick"
  >
    <template #tooltip>
      {{ label }}
    </template>
    <slot v-if="slots.default" />
    <template v-else>
      <!-- <component :is="Icon" class="tiptap-button-icon" /> -->
      <span
        class="tiptap-button-highlight"
        :style="{ '--highlight-color': highlightColor }"
      />
      <span v-if="text" class="tiptap-button-text">{{ text }}</span>
    </template>
  </TiptapButton>
</template>

<style>
.tiptap-button-highlight {
  position: relative;
  width: 1.25rem;
  height: 1.25rem;
  margin: 0 -0.175rem;
  border-radius: var(--tt-radius-xl);
  background-color: var(--highlight-color);
  transition: transform 0.2s ease;

  &::after {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    border-radius: inherit;
    box-sizing: border-box;
    border: 1px solid var(--highlight-color);
    filter: brightness(95%);
    mix-blend-mode: multiply;

    .dark & {
      filter: brightness(140%);
      mix-blend-mode: lighten;
    }
  }
}

.tiptap-button {
  &[data-active-state='on'] {
    .tiptap-button-highlight {
      &::after {
        filter: brightness(80%);
      }
    }
  }

  .dark & {
    &[data-active-state='on'] {
      .tiptap-button-highlight {
        &::after {
          /* // Andere Eigenschaft für .dark Kontext */
          filter: brightness(180%);
        }
      }
    }
  }
}
</style>
