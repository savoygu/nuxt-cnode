import type { ChainedCommands, Editor } from '@tiptap/vue-3'
import type { ShallowRef } from 'vue'
import { TiptapAlignCenterIcon, TiptapAlignJustifyIcon, TiptapAlignLeftIcon, TiptapAlignRightIcon } from '#components'

export type TextAlign = 'left' | 'center' | 'right' | 'justify'

export interface UseTextAlignConfig {
  align: TextAlign
  hideWhenUnavailable?: boolean
  onAligned?: () => void
}

export type UseTextAlignConfigGetter = ToGetter<UseTextAlignConfig>

export const textAlignIcons = {
  left: TiptapAlignLeftIcon,
  center: TiptapAlignCenterIcon,
  right: TiptapAlignRightIcon,
  justify: TiptapAlignJustifyIcon,
}

export const textAlignLabels: Record<TextAlign, string> = {
  left: 'Align left',
  center: 'Align center',
  right: 'Align right',
  justify: 'Align justify',
}

export const TEXT_ALIGN_SHORTCUT_KEYS: Record<TextAlign, string> = {
  left: 'mod+shift+l',
  center: 'mod+shift+e',
  right: 'mod+shift+r',
  justify: 'mod+shift+j',
}

export function canSetTextAlign(editor: Editor | undefined, align: TextAlign) {
  if (!editor || !editor.isEditable) {
    return false
  }
  if (!isExtensionAvailable(editor, ['textAlign']) || isNodeTypeSelected(editor, ['image', 'horizontalRule'])) {
    return false
  }
  return editor.can().setTextAlign(align)
}

export function hasSetTextAlign(commands: ChainedCommands): commands is ChainedCommands & {
  setTextAlign: (align: TextAlign) => ChainedCommands
} {
  return 'setTextAlign' in commands
}

export function isTextAlignActive(editor: Editor | undefined, align: TextAlign) {
  if (!editor || !editor.isEditable) {
    return false
  }
  return editor.isActive({ textAlign: align })
}

export function setTextAlign(editor: Editor | undefined, align: TextAlign) {
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

export function shouldShowButton(props: {
  editor: Editor | undefined
  align: TextAlign
  hideWhenUnavailable: boolean
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

export function useTextAlign(config: UseTextAlignConfigGetter & {
  editor: ShallowRef<Editor | undefined>
}) {
  const { editor, align, hideWhenUnavailable, onAligned } = config
  const [isVisible, setIsVisible] = useToggle(true)
  const canAlign = computed(() => canSetTextAlign(editor.value, toValue(align)))
  const isActive = computed(() => isTextAlignActive(editor.value, toValue(align)))

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
      align: toValue(align),
      hideWhenUnavailable: toValue(hideWhenUnavailable) ?? false,
    }))
  }

  function handleTextAlign() {
    if (!editor.value) {
      return false
    }
    const success = setTextAlign(editor.value, toValue(align))
    if (success) {
      onAligned?.()
    }
    return success
  }

  return {
    isVisible,
    isActive,
    canAlign,
    label: computed(() => textAlignLabels[toValue(align)]),
    shortcutKeys: computed(() => TEXT_ALIGN_SHORTCUT_KEYS[toValue(align)]),
    Icon: computed(() => textAlignIcons[toValue(align)]),
    handleTextAlign,
  }
}
