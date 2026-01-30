import type { Editor } from '@tiptap/vue-3'
import type { ShallowRef } from 'vue'
import { TiptapListIcon, TiptapListOrderedIcon, TiptapListTodoIcon } from '#components'
import { NodeSelection, TextSelection } from '@tiptap/pm/state'

export type ListType = 'bulletList' | 'orderedList' | 'taskList'

export interface UseListConfig {
  type: ListType
  hideWhenUnavailable?: boolean
  onToggled?: () => void
}

export type UseListConfigGetter = ToGetter<UseListConfig>

export const listIcons = {
  bulletList: TiptapListIcon,
  orderedList: TiptapListOrderedIcon,
  taskList: TiptapListTodoIcon,
}

export const listLabels: Record<ListType, string> = {
  bulletList: 'Bullet List',
  orderedList: 'Ordered List',
  taskList: 'Task List',
}

export const LIST_SHORTCUT_KEYS: Record<ListType, string> = {
  bulletList: 'mod+shift+8',
  orderedList: 'mod+shift+7',
  taskList: 'mod+shift+9',
}

export function canToggleList(editor: Editor | undefined, type: ListType, turnInto: boolean = true) {
  if (!editor || !editor.isEditable)
    return false
  if (
    !isNodeInSchema('heading', editor)
    || isNodeTypeSelected(editor, ['image'])
  ) {
    return false
  }

  if (!turnInto) {
    switch (type) {
      case 'bulletList':
        return editor.can().toggleBulletList()
      case 'orderedList':
        return editor.can().toggleOrderedList()
      case 'taskList':
        return editor.can().toggleTaskList()
      default:
        return false
    }
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

export function isListActive(editor: Editor | undefined, type: ListType): boolean {
  if (!editor || !editor.isEditable)
    return false

  switch (type) {
    case 'bulletList':
      return editor.isActive('bulletList')
    case 'orderedList':
      return editor.isActive('orderedList')
    case 'taskList':
      return editor.isActive('taskList')
    default:
      return false
  }
}

function toggleList(editor: Editor | undefined, type: ListType): boolean {
  if (!editor || !editor.isEditable) {
    return false
  }

  if (!canToggleList(editor, type)) {
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

    if (editor.isActive(type)) {
      // Unwrap list
      chain
        .liftListItem('listItem')
        .lift('bulletList')
        .lift('orderedList')
        .lift('taskList')
        .run()
    }
    else {
      // Wrap in specific list type
      const toggleMap: Record<ListType, () => typeof chain> = {
        bulletList: () => chain.toggleBulletList(),
        orderedList: () => chain.toggleOrderedList(),
        taskList: () => chain.toggleList('taskList', 'taskItem'),
      }

      const toggle = toggleMap[type]
      if (!toggle)
        return false

      toggle().run()
    }

    editor.chain().focus().selectTextblockEnd().run()

    return true
  }
  catch {
    return false
  }
}

export function shouldShowButton(props: {
  editor: Editor | undefined
  type: ListType
  hideWhenUnavailable: boolean
}) {
  const { editor, type, hideWhenUnavailable } = props

  if (!editor || !editor.isEditable) {
    return false
  }
  if (!isNodeInSchema(type, editor)) {
    return false
  }
  if (hideWhenUnavailable && !editor.isActive('code')) {
    return canToggleList(editor, type)
  }

  return true
}

export function useList(config: UseListConfigGetter & {
  editor: ShallowRef<Editor | undefined>
}) {
  const { editor, type, hideWhenUnavailable, onToggled } = config
  const [isVisible, setIsVisible] = useToggle(true)
  const canToggleState = computed(() => canToggleList(editor.value, toValue(type)))
  const isActive = computed(() => isListActive(editor.value, toValue(type)))

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

  function handleToggle() {
    if (!editor) {
      return false
    }

    const success = toggleList(editor.value, toValue(type))
    if (success) {
      onToggled?.()
    }
    return success
  }

  return {
    isVisible,
    isActive,
    canToggle: canToggleState,
    label: computed(() => listLabels[toValue(type)]),
    shortcutKeys: computed(() => LIST_SHORTCUT_KEYS[toValue(type)]),
    Icon: computed(() => listIcons[toValue(type)]),
    handleToggle,
  }
}
