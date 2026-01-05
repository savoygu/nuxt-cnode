<script setup lang="ts">
import type { ChainedCommands, Editor } from '@tiptap/vue-3'
import { TiptapAlignCenterIcon, TiptapAlignJustifyIcon, TiptapAlignLeftIcon, TiptapAlignRightIcon } from '#components'

type TextAlign = 'left' | 'center' | 'right' | 'justify'

const props = withDefaults(defineProps<{
  align: TextAlign
  hideWhenUnavailable?: boolean
  onAligned?: () => void
  className?: string
  showTooltip?: boolean
  shortcutKeys?: string
  showShortcut?: boolean
  text?: string
}>(), {
  hideWhenUnavailable: false,
  showShortcut: false,
})

const emit = defineEmits<{
  (e: 'click', event: MouseEvent): void
}>()

const attrs = useAttrs()
const slots = useSlots()
const { editor } = useEditorStore()!
const { isVisible, isActive, canAlign, label, Icon, handleTextAlign } = useTextAlign()

function handleClick(event: MouseEvent) {
  emit('click', event)

  if (event.defaultPrevented) {
    return
  }

  handleTextAlign()
}

function useTextAlign() {
  const textAlignIcons = {
    left: TiptapAlignLeftIcon,
    center: TiptapAlignCenterIcon,
    right: TiptapAlignRightIcon,
    justify: TiptapAlignJustifyIcon,
  }

  const textAlignLabels: Record<TextAlign, string> = {
    left: 'Align left',
    center: 'Align center',
    right: 'Align right',
    justify: 'Align justify',
  }

  const TEXT_ALIGN_SHORTCUT_KEYS: Record<TextAlign, string> = {
    left: 'mod+shift+l',
    center: 'mod+shift+e',
    right: 'mod+shift+r',
    justify: 'mod+shift+j',
  }

  const [isVisible, setIsVisible] = useToggle()
  const canAlign = computed(() => canSetTextAlign(editor.value, props.align))
  const isActive = computed(() => isTextAlignActive(editor.value, props.align))

  onMounted(() => {
    handleSelectionUpdate()
    editor.value?.on('selectionUpdate', handleSelectionUpdate)
  })

  onBeforeUnmount(() => {
    editor.value?.off('selectionUpdate', handleSelectionUpdate)
  })

  function handleSelectionUpdate() {
    setIsVisible(shouldShowButton({
      editor: editor.value,
      hideWhenUnavailable: props.hideWhenUnavailable,
      align: props.align,
    }))
  }

  function canSetTextAlign(editor: Editor | undefined, align: TextAlign) {
    if (!editor || !editor.isEditable) {
      return false
    }
    if (!isExtensionAvailable(editor, ['textAlign']) || isNodeTypeSelected(editor, ['image', 'horizontalRule'])) {
      return false
    }
    return editor.can().setTextAlign(align)
  }

  function hasSetTextAlign(commands: ChainedCommands): commands is ChainedCommands & {
    setTextAlign: (align: TextAlign) => ChainedCommands
  } {
    return 'setTextAlign' in commands
  }

  function isTextAlignActive(editor: Editor | undefined, align: TextAlign) {
    if (!editor || !editor.isEditable) {
      return false
    }
    return editor.isActive({ textAlign: align })
  }

  function setTextAlign(editor: Editor | undefined, align: TextAlign) {
    if (!editor || !editor.isEditable) {
      return false
    }
    if (!canSetTextAlign(editor, align)) {
      return false
    }
    const chain = editor.chain().focus()
    if (hasSetTextAlign(chain)) {
      return chain.setTextAlign(align).run()
    }
    return false
  }

  function shouldShowButton(props: {
    editor: Editor | undefined
    hideWhenUnavailable: boolean
    align: TextAlign
  }) {
    const { editor, hideWhenUnavailable, align } = props
    if (!editor || !editor.isEditable) {
      return false
    }
    if (!isExtensionAvailable(editor, 'textAlign')) {
      return false
    }
    if (hideWhenUnavailable && !editor.isActive('code')) {
      return canSetTextAlign(editor, align)
    }
    return true
  }

  function handleTextAlign() {
    if (!editor.value) {
      return false
    }
    const success = setTextAlign(editor.value, props.align)
    if (success) {
      props.onAligned?.()
    }
    return success
  }

  return {
    isVisible,
    isActive,
    canAlign,
    label: textAlignLabels[props.align],
    shortcutKeys: TEXT_ALIGN_SHORTCUT_KEYS[props.align],
    Icon: textAlignIcons[props.align],
    handleTextAlign,
  }
}
</script>

<template>
  <TiptapButton
    v-if="isVisible"
    type="button"
    data-style="ghost"
    :data-disabled="!canAlign"
    :disabled="!canAlign"
    :data-active-state="`${isActive ? 'on' : 'off'}`"
    v-bind="attrs"
    @click="handleClick"
  >
    <template #tooltip>
      {{ label }}
    </template>
    <slot v-if="slots.default" />
    <template v-else>
      <component :is="Icon" class="tiptap-button-icon" />
      <span v-if="text" class="tiptap-button-text">{{ text }}</span>
    </template>
  </TiptapButton>
</template>
