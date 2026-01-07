import type { Editor } from '@tiptap/vue-3'
import type { ShallowRef } from 'vue'
import { TiptapHeadingFiveIcon, TiptapHeadingFourIcon, TiptapHeadingOneIcon, TiptapHeadingSixIcon, TiptapHeadingThreeIcon, TiptapHeadingTwoIcon } from '#components'
import { NodeSelection, TextSelection } from '@tiptap/pm/state'

export type Level = 1 | 2 | 3 | 4 | 5 | 6

export interface UseHeadingConfig {
  level: Level
  hideWhenUnavailable?: boolean
  onToggled?: () => void
}

export type UseHeadingConfigGetter = ToGetter<UseHeadingConfig>

export const headingIcons = {
  1: TiptapHeadingOneIcon,
  2: TiptapHeadingTwoIcon,
  3: TiptapHeadingThreeIcon,
  4: TiptapHeadingFourIcon,
  5: TiptapHeadingFiveIcon,
  6: TiptapHeadingSixIcon,
}

export const HEADING_SHORTCUT_KEYS: Record<Level, string> = {
  1: 'ctrl+alt+1',
  2: 'ctrl+alt+2',
  3: 'ctrl+alt+3',
  4: 'ctrl+alt+4',
  5: 'ctrl+alt+5',
  6: 'ctrl+alt+6',
}

export function canToggle(editor: Editor | undefined, level?: Level, turnInto: boolean = true) {
  if (!editor || !editor.isEditable)
    return false
  if (
    !isNodeInSchema('heading', editor)
    || isNodeTypeSelected(editor, ['image'])
  ) {
    return false
  }

  if (!turnInto) {
    return level
      ? editor.can().setNode('heading', { level })
      : editor.can().setNode('heading')
  }

  try {
    const view = editor.view
    const state = view.state
    const selection = state.selection

    if (selection.empty || selection instanceof TextSelection) {
      const pos = findNodePosition({
        editor,
        node: state.selection.$anchor.node(1),
      })?.pos
      if (!isValidPosition(pos))
        return false
    }

    return true
  }
  catch {
    return false
  }
}

export function isHeadingActive(editor: Editor | undefined, level?: Level | Level[]): boolean {
  if (!editor || !editor.isEditable)
    return false

  if (Array.isArray(level)) {
    return level.some(l => editor.isActive('heading', { level: l }))
  }

  return level
    ? editor.isActive('heading', { level })
    : editor.isActive('heading')
}

export function toggleHeading(editor: Editor | undefined, level: Level | Level[]): boolean {
  if (!editor || !editor.isEditable)
    return false

  const levels = Array.isArray(level) ? level : [level]
  const toggleLevel = levels.find(l => canToggle(editor, l))

  if (!toggleLevel)
    return false

  try {
    const view = editor.view
    let state = view.state
    let tr = state.tr

    // No selection, find the cursor position
    if (state.selection.empty || state.selection instanceof TextSelection) {
      const pos = findNodePosition({
        editor,
        node: state.selection.$anchor.node(1),
      })?.pos
      if (!isValidPosition(pos))
        return false

      tr = tr.setSelection(NodeSelection.create(state.doc, pos))
      view.dispatch(tr)
      state = view.state
    }

    const selection = state.selection
    let chain = editor.chain().focus()

    // Handle NodeSelection
    if (selection instanceof NodeSelection) {
      const firstChild = selection.node.firstChild?.firstChild
      const lastChild = selection.node.lastChild?.lastChild

      const from = firstChild
        ? selection.from + firstChild.nodeSize
        : selection.from + 1

      const to = lastChild
        ? selection.to - lastChild.nodeSize
        : selection.to - 1

      chain = chain.setTextSelection({ from, to }).clearNodes()
    }

    const isActive = levels.some(l =>
      editor.isActive('heading', { level: l }),
    )

    const toggle = isActive
      ? chain.setNode('paragraph')
      : chain.setNode('heading', { level: toggleLevel })

    toggle.run()

    editor.chain().focus().selectTextblockEnd().run()

    return true
  }
  catch {
    return false
  }
}

export function shouldShowButton(props: {
  editor: Editor | undefined
  level?: Level | Level[]
  hideWhenUnavailable: boolean
}) {
  const { editor, level, hideWhenUnavailable } = props

  if (!editor || !editor.isEditable) {
    return false
  }
  if (!isNodeInSchema('heading', editor)) {
    return false
  }
  if (hideWhenUnavailable && !editor.isActive('code')) {
    if (Array.isArray(level)) {
      return level.some(l => canToggle(editor, l))
    }
    return canToggle(editor, level)
  }

  return true
}

export function useHeading(config: UseHeadingConfigGetter & {
  editor: ShallowRef<Editor | undefined>
}) {
  const { editor, level, hideWhenUnavailable, onToggled } = config
  const [isVisible, setIsVisible] = useToggle(true)
  const canToggleState = computed(() => canToggle(editor.value, toValue(level)))
  const isActive = computed(() => isHeadingActive(editor.value, toValue(level)))

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
      level: toValue(level),
      hideWhenUnavailable: toValue(hideWhenUnavailable) ?? false,
    }))
  }

  function handleToggle() {
    if (!editor) {
      return false
    }

    const success = toggleHeading(editor.value, toValue(level))
    if (success) {
      onToggled?.()
    }
    return success
  }

  return {
    isVisible,
    isActive,
    canToggle: canToggleState,
    label: computed(() => `Heading ${toValue(level)}`),
    shortcutKeys: computed(() => HEADING_SHORTCUT_KEYS[toValue(level)]),
    Icon: computed(() => headingIcons[toValue(level)]),
    handleToggle,
  }
}
