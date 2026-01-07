import type { Editor } from '@tiptap/vue-3'
import type { DefineComponent, ShallowRef } from 'vue'
import { TiptapBoldIcon, TiptapCode2Icon, TiptapItalicIcon, TiptapStrikeIcon, TiptapSubscriptIcon, TiptapSuperscriptIcon, TiptapUnderlineIcon } from '#components'

export type Mark = 'bold' | 'italic' | 'strike' | 'code' | 'underline' | 'superscript' | 'subscript'

export interface UseMarkConfig {
  type: Mark
  hideWhenUnavailable?: boolean
  onToggled?: () => void
}

export type UseMarkConfigGetter = ToGetter<UseMarkConfig>

export const markIcons = {
  bold: TiptapBoldIcon,
  italic: TiptapItalicIcon,
  strike: TiptapStrikeIcon,
  code: TiptapCode2Icon,
  underline: TiptapUnderlineIcon,
  superscript: TiptapSuperscriptIcon,
  subscript: TiptapSubscriptIcon,
} as Record<Mark, DefineComponent>

export const MARK_SHORTCUT_KEYS: Record<Mark, string> = {
  bold: 'mod+b',
  italic: 'mod+i',
  underline: 'mod+u',
  strike: 'mod+shift+s',
  code: 'mod+e',
  superscript: 'mod+.',
  subscript: 'mod+,',
}

export function canToggleMark(editor: Editor | undefined, type: Mark) {
  if (!editor || !editor.isEditable) {
    return false
  }
  if (!isMarkInSchema(type, editor) || isNodeTypeSelected(editor, ['image'])) {
    return false
  }
  return editor.can().toggleMark(type)
}

export function isMarkActive(editor: Editor | undefined, type: Mark) {
  if (!editor || !editor.isEditable) {
    return false
  }
  return editor.isActive(type)
}

export function toggleMark(editor: Editor | undefined, type: Mark): boolean {
  if (!editor || !editor.isEditable) {
    return false
  }
  if (!canToggleMark(editor, type)) {
    return false
  }
  return editor.chain().focus().toggleMark(type).run()
}

export function shouldShowButton(props: {
  editor: Editor | undefined
  type: Mark
  hideWhenUnavailable: boolean
}) {
  const { editor, hideWhenUnavailable, type } = props
  if (!editor || !editor.isEditable) {
    return false
  }
  if (!isMarkInSchema(type, editor)) {
    return false
  }
  if (hideWhenUnavailable && !editor.isActive('code')) {
    return canToggleMark(editor, type)
  }
  return true
}

function getFormattedMarkName(type: Mark) {
  return type.charAt(0).toUpperCase() + type.slice(1)
}

export function useMark(config: UseMarkConfigGetter & {
  editor: ShallowRef<Editor | undefined>
}) {
  const { editor, type, hideWhenUnavailable, onToggled } = config
  const [isVisible, setIsVisible] = useToggle(true)
  const canToggle = computed(() => canToggleMark(editor.value, toValue(type)))
  const isActive = computed(() => isMarkActive(editor.value, toValue(type)))

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
      type: toValue(type),
      hideWhenUnavailable: toValue(hideWhenUnavailable) ?? false,
    }))
  }

  function handleMark() {
    if (!editor.value) {
      return false
    }
    const success = toggleMark(editor.value, toValue(type))
    if (success) {
      onToggled?.()
    }
    return success
  }

  return {
    isVisible,
    canToggle,
    isActive,
    label: computed(() => getFormattedMarkName(toValue(type))),
    shortcutKeys: computed(() => MARK_SHORTCUT_KEYS[toValue(type)]),
    Icon: computed(() => markIcons[toValue(type)]),
    handleMark,
  }
}
