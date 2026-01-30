import type { Editor } from '@tiptap/vue-3'
import type { ShallowRef } from 'vue'
import { TiptapBlockquoteIcon } from '#components'
import { NodeSelection, TextSelection } from '@tiptap/pm/state'

export interface UseBlockquoteConfig {
  hideWhenUnavailable?: boolean
  onToggled?: () => void
}

export type UseBlockquoteConfigGetter = ToGetter<UseBlockquoteConfig>

export const BLOCKQUOTE_SHORTCUT_KEY = 'mod+shift+b'

export function canToggleBlockquote(editor: Editor | undefined, turnInto: boolean = true) {
  if (!editor || !editor.isEditable) {
    return false
  }
  if (!isNodeInSchema('blockquote', editor) || isNodeTypeSelected(editor, ['image'])) {
    return false
  }

  if (!turnInto) {
    return editor.can().toggleWrap('blockquote')
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

export function isBlockquoteActive(editor: Editor | undefined) {
  if (!editor || !editor.isEditable) {
    return false
  }
  return editor.isActive('blockquote')
}

export function toggleBlockquote(editor: Editor | undefined) {
  if (!editor || !editor.isEditable) {
    return false
  }
  if (!canToggleBlockquote(editor)) {
    return false
  }

  try {
    const view = editor.view
    let state = view.state
    let tr = state.tr

    // No selection, find the the cursor position
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

    const toggle = editor.isActive('blockquote')
      ? chain.lift('blockquote')
      : chain.wrapIn('blockquote')

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
  hideWhenUnavailable: boolean
}) {
  const { editor, hideWhenUnavailable } = props
  if (!editor || !editor.isEditable) {
    return false
  }
  if (!isNodeInSchema('blockquote', editor)) {
    return false
  }
  if (hideWhenUnavailable && !editor.isActive('code')) {
    return canToggleBlockquote(editor)
  }
  return true
}

export function useBlockquote(config: UseBlockquoteConfigGetter & {
  editor: ShallowRef<Editor | undefined>
}) {
  const { editor, hideWhenUnavailable, onToggled } = config
  const [isVisible, setIsVisible] = useToggle(true)
  const canToggle = computed(() => canToggleBlockquote(editor.value))
  const isActive = computed(() => isBlockquoteActive(editor.value))

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

  function handleToggle() {
    if (!editor.value) {
      return false
    }
    const success = toggleBlockquote(editor.value)
    if (success) {
      onToggled?.()
    }
    return success
  }

  return {
    isVisible,
    canToggle,
    isActive,
    label: 'Blockquote',
    shortcutKeys: BLOCKQUOTE_SHORTCUT_KEY,
    Icon: TiptapBlockquoteIcon,
    handleToggle,
  }
}
