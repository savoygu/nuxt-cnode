import type { Editor } from '@tiptap/vue-3'
import type { ShallowRef } from 'vue'
import { TiptapHighlighterIcon } from '#components'
import { useHotkeys } from 'vue-use-hotkeys'

export interface UseColorHighlightConfig {
  highlightColor?: string
  label?: string
  hideWhenUnavailable?: boolean
  onApplied?: ({ color, label }: { color: string, label: string }) => void
}

export type UseColorHighlightConfigGetter = ToGetter<UseColorHighlightConfig, false>

export const COLOR_HIGHLIGHT_SHORTCUT_KEY = 'mod+shift+h'

export const HIGHLIGHT_COLORS = [
  {
    label: 'Default background',
    value: 'var(--tt-bg-color)',
    border: 'var(--tt-bg-color-contrast)',
  },
  {
    label: 'Gray background',
    value: 'var(--tt-color-highlight-gray)',
    border: 'var(--tt-color-highlight-gray-contrast)',
  },
  {
    label: 'Brown background',
    value: 'var(--tt-color-highlight-brown)',
    border: 'var(--tt-color-highlight-brown-contrast)',
  },
  {
    label: 'Orange background',
    value: 'var(--tt-color-highlight-orange)',
    border: 'var(--tt-color-highlight-orange-contrast)',
  },
  {
    label: 'Yellow background',
    value: 'var(--tt-color-highlight-yellow)',
    border: 'var(--tt-color-highlight-yellow-contrast)',
  },
  {
    label: 'Green background',
    value: 'var(--tt-color-highlight-green)',
    border: 'var(--tt-color-highlight-green-contrast)',
  },
  {
    label: 'Blue background',
    value: 'var(--tt-color-highlight-blue)',
    border: 'var(--tt-color-highlight-blue-contrast)',
  },
  {
    label: 'Purple background',
    value: 'var(--tt-color-highlight-purple)',
    border: 'var(--tt-color-highlight-purple-contrast)',
  },
  {
    label: 'Pink background',
    value: 'var(--tt-color-highlight-pink)',
    border: 'var(--tt-color-highlight-pink-contrast)',
  },
  {
    label: 'Red background',
    value: 'var(--tt-color-highlight-red)',
    border: 'var(--tt-color-highlight-red-contrast)',
  },
]

export type HighlightColor = (typeof HIGHLIGHT_COLORS)[number]

export function pickHighlightColorsByValue(values: string[]) {
  const colorMap = new Map(HIGHLIGHT_COLORS.map(color => [color.value, color]))
  return values
    .map(value => colorMap.get(value))
    .filter((color): color is HighlightColor => !!color)
}

export function canColorHighlight(editor: Editor | undefined): boolean {
  if (!editor || !editor.isEditable)
    return false
  if (
    !isMarkInSchema('highlight', editor)
    || isNodeTypeSelected(editor, ['image'])
  ) {
    return false
  }

  return editor.can().setMark('highlight')
}

export function isColorHighlightActive(
  editor: Editor | undefined,
  highlightColor?: string,
): boolean {
  if (!editor || !editor.isEditable)
    return false
  return highlightColor
    ? editor.isActive('highlight', { color: highlightColor })
    : editor.isActive('highlight')
}

export function removeHighlight(editor: Editor | undefined): boolean {
  if (!editor || !editor.isEditable)
    return false
  if (!canColorHighlight(editor))
    return false

  return editor.chain().focus().unsetMark('highlight').run()
}

export function shouldShowButton(props: {
  editor: Editor | undefined
  hideWhenUnavailable: boolean
}): boolean {
  const { editor, hideWhenUnavailable } = props

  if (!editor || !editor.isEditable)
    return false
  if (!isMarkInSchema('highlight', editor))
    return false

  if (hideWhenUnavailable && !editor.isActive('code')) {
    return canColorHighlight(editor)
  }

  return true
}

export function useColorHighlight(config: UseColorHighlightConfigGetter & {
  editor: ShallowRef<Editor | undefined>
}) {
  const { editor, label, highlightColor, hideWhenUnavailable, onApplied } = config
  const breakpoints = useBreakpoints({
    mobile: 768,
  })
  const [isVisible, setIsVisible] = useToggle(true)
  const canColorHighlightState = computed(() => canColorHighlight(editor.value))
  const isActive = computed(() => isColorHighlightActive(editor.value, toValue(highlightColor)))

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
      hideWhenUnavailable: toValue(hideWhenUnavailable) ?? false,
    }))
  }

  function handleColorHighlight() {
    if (!editor.value || !canColorHighlightState || !toValue(highlightColor) || !toValue(label))
      return false

    if (editor.value.state.storedMarks) {
      const highlightMarkType = editor.value.schema.marks.highlight
      if (highlightMarkType) {
        editor.value.view.dispatch(
          editor.value.state.tr.removeStoredMark(highlightMarkType),
        )
      }
    }

    setTimeout(() => {
      if (!editor.value)
        return false

      const success = editor.value
        .chain()
        .focus()
        .toggleMark('highlight', { color: toValue(highlightColor) })
        .run()
      if (success) {
        onApplied?.({ color: toValue(highlightColor) ?? '', label: toValue(label) ?? '' })
      }
      return success
    }, 0)

    return true
  }

  function handleRemoveHighlight() {
    const success = removeHighlight(editor.value)
    if (success) {
      onApplied?.({ color: '', label: 'Remove highlight' })
    }
    return success
  }

  useHotkeys(
    COLOR_HIGHLIGHT_SHORTCUT_KEY,
    (event) => {
      event.preventDefault()
    },
    {
      enabled: computed(() => isVisible.value && canColorHighlightState.value),
      enableOnContentEditable: !breakpoints.mobile.value,
    },
  )

  return {
    isVisible,
    isActive,
    handleColorHighlight,
    handleRemoveHighlight,
    canColorHighlight: canColorHighlightState,
    label: computed(() => toValue(label) || `Highlight`),
    shortcutKeys: COLOR_HIGHLIGHT_SHORTCUT_KEY,
    Icon: TiptapHighlighterIcon,
  }
}
