<script setup lang="ts">
import type { TiptapCard } from '#components'
import type { ButtonProps } from '../../tiptap-ui-primitive/Button.vue'
import type { HighlightColor, UseColorHighlightConfig } from '../color-highlight-button/useColorHighlight'
import { pickHighlightColorsByValue, useColorHighlight } from '../color-highlight-button/useColorHighlight'

interface ColorHighlightPopoverProps extends /* @vue-ignore */ Omit<ButtonProps, 'type' | 'disabled'>, Pick<UseColorHighlightConfig, 'hideWhenUnavailable' | 'onApplied'> {
  colors?: HighlightColor[]
  onOpenChange?: (isOpen: boolean) => void
}

const { colors = pickHighlightColorsByValue([
  'var(--tt-color-highlight-green)',
  'var(--tt-color-highlight-blue)',
  'var(--tt-color-highlight-red)',
  'var(--tt-color-highlight-purple)',
  'var(--tt-color-highlight-yellow)',
]) } = defineProps<ColorHighlightPopoverProps>()

const { editor } = useEditorStore()!
const { handleRemoveHighlight } = useColorHighlight({ editor })
const containerRef = useTemplateRef<InstanceType<typeof TiptapCard>>('container')

const menuItems = computed(() => {
  return [...colors, { label: 'Remove highlight', value: 'none', border: 'none' }]
})

const { selectedIndex } = useMenuNavigation({
  containerRef: computed(() => containerRef.value?.$el) as Ref<HTMLElement | null>,
  items: menuItems.value,
  orientation: 'both',
  autoSelectFirstItem: false,
  onSelect: (item) => {
    if (!containerRef.value)
      return false
    const highlightedElement = containerRef.value.$el.querySelector(
      '[data-highlighted="true"]',
    ) as HTMLElement
    if (highlightedElement)
      highlightedElement.click()
    if (item.value === 'none')
      handleRemoveHighlight()
    return true
  },
})
</script>

<template>
  <TiptapCard ref="container">
    <TiptapCardBody>
      <TiptapCardItemGroup orientation="horizontal">
        <TiptapButtonGroup orientation="horizontal">
          <TiptapColorHighlightButton
            v-for="(color, index) in colors"
            :key="color.value"
            :highlight-color="color.value"
            :data-highlighted="index === selectedIndex"
          >
            <template #tooltip>
              {{ color.label }}
            </template>
          </TiptapColorHighlightButton>
        </TiptapButtonGroup>
        <TiptapSeparator />
        <TiptapButtonGroup orientation="horizontal">
          <TiptapButton
            type="button"
            data-style="ghost"
            :data-highlighted="selectedIndex === colors.length"
            @click="handleRemoveHighlight"
          >
            <template #tooltip>
              Remove highlight
            </template>
            <TiptapBanIcon class="tiptap-button-icon" />
          </TiptapButton>
        </TiptapButtonGroup>
      </TiptapCardItemGroup>
    </TiptapCardBody>
  </TiptapCard>
</template>
