import type { Editor } from '@tiptap/vue-3'
import type { ShallowRef } from 'vue'
import { TiptapRedo2Icon, TiptapUndo2Icon } from '#components'

export type UndoRedoAction = 'undo' | 'redo'

export interface UseUndoRedoConfig {
  action: UndoRedoAction
  hideWhenUnavailable?: boolean
  onExecuted?: () => void
}

export type UseUndoRedoConfigGetter = ToGetter<UseUndoRedoConfig>

export const historyIcons = {
  undo: TiptapUndo2Icon,
  redo: TiptapRedo2Icon,
}

export const historyActionLabels: Record<UndoRedoAction, string> = {
  undo: 'Undo',
  redo: 'Redo',
}

export const UNDO_REDO_SHORTCUT_KEYS: Record<UndoRedoAction, string> = {
  undo: 'mod+z',
  redo: 'mod+shift+z',
}

export function canExecuteUndoRedoAction(editor: Editor | undefined, action: UndoRedoAction) {
  if (!editor || !editor.isEditable) {
    return false
  }
  if (isNodeTypeSelected(editor, ['image'])) {
    return false
  }
  return action === 'undo' ? editor.can().undo() : editor.can().redo()
}

export function executeUndoRedoAction(editor: Editor | undefined, action: UndoRedoAction) {
  if (!editor || !editor.isEditable) {
    return false
  }
  if (!canExecuteUndoRedoAction(editor, action)) {
    return false
  }
  const chain = editor.chain().focus()
  return action === 'undo' ? chain.undo().run() : chain.redo().run()
}

export function shouldShowButton(props: {
  editor: Editor | undefined
  action: UndoRedoAction
  hideWhenUnavailable: boolean
}) {
  const { editor, hideWhenUnavailable, action } = props
  if (!editor || !editor.isEditable) {
    return false
  }
  if (hideWhenUnavailable && !editor.isActive('code')) {
    return canExecuteUndoRedoAction(editor, action)
  }
  return true
}

export function useUndoRedo(config: UseUndoRedoConfigGetter & {
  editor: ShallowRef<Editor | undefined>
}) {
  const { editor, action, hideWhenUnavailable, onExecuted } = config
  const [isVisible, setIsVisible] = useToggle(true)
  const canExecute = computed(() => canExecuteUndoRedoAction(editor.value, toValue(action)))

  onMounted(() => {
    handleUpdate()
    editor.value?.on('transaction', handleUpdate)
  })

  onBeforeUnmount(() => {
    editor.value?.off('transaction', handleUpdate)
  })

  function handleUpdate() {
    setIsVisible(shouldShowButton({
      editor: editor.value,
      action: toValue(action),
      hideWhenUnavailable: toValue(hideWhenUnavailable) ?? false,
    }))
  }

  function handleAction() {
    if (!editor.value) {
      return false
    }
    const success = executeUndoRedoAction(editor.value, toValue(action))
    if (success) {
      onExecuted?.()
    }
    return success
  }

  return {
    isVisible,
    canExecute,
    label: computed(() => historyActionLabels[toValue(action)]),
    shortcutKeys: computed(() => UNDO_REDO_SHORTCUT_KEYS[toValue(action)]),
    Icon: computed(() => historyIcons[toValue(action)]),
    handleAction,
  }
}
