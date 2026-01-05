<script setup lang="ts">
import type { Editor } from '@tiptap/vue-3'
import { TiptapRedo2Icon, TiptapUndo2Icon } from '#components'

type UndoRedoAction = 'undo' | 'redo'

const props = withDefaults(defineProps<{
  action: UndoRedoAction
  hideWhenUnavailable?: boolean
  onExecuted?: () => void
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
const { isVisible, canExecute, label, Icon, handleAction } = useUndoRedo()

function handleClick(event: MouseEvent) {
  emit('click', event)

  if (event.defaultPrevented) {
    return
  }

  handleAction()
}

function useUndoRedo() {
  const historyIcons = {
    undo: TiptapUndo2Icon,
    redo: TiptapRedo2Icon,
  }

  const historyActionLabels: Record<UndoRedoAction, string> = {
    undo: 'Undo',
    redo: 'Redo',
  }

  const UNDO_REDO_SHORTCUT_KEYS: Record<UndoRedoAction, string> = {
    undo: 'mod+z',
    redo: 'mod+shift+z',
  }

  const [isVisible, setIsVisible] = useToggle()
  const canExecute = computed(() => canExecuteUndoRedoAction(editor.value, props.action))

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
      hideWhenUnavailable: props.hideWhenUnavailable,
      action: props.action,
    }))
  }

  function canExecuteUndoRedoAction(editor: Editor | undefined, action: UndoRedoAction) {
    if (!editor || !editor.isEditable) {
      return false
    }
    if (isNodeTypeSelected(editor, ['image'])) {
      return false
    }
    return action === 'undo' ? editor.can().undo() : editor.can().redo()
  }

  function executeUndoRedoAction(editor: Editor | undefined, action: UndoRedoAction) {
    if (!editor || !editor.isEditable) {
      return false
    }
    if (!canExecuteUndoRedoAction(editor, action)) {
      return false
    }
    const chain = editor.chain().focus()
    return action === 'undo' ? chain.undo().run() : chain.redo().run()
  }

  function shouldShowButton(props: {
    editor: Editor | undefined
    hideWhenUnavailable: boolean
    action: UndoRedoAction
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

  function handleAction() {
    if (!editor.value) {
      return false
    }
    const success = executeUndoRedoAction(editor.value, props.action)
    if (success) {
      props.onExecuted?.()
    }
    return success
  }

  return {
    isVisible,
    canExecute,
    label: historyActionLabels[props.action],
    shortcutKeys: UNDO_REDO_SHORTCUT_KEYS[props.action],
    Icon: historyIcons[props.action],
    handleAction,
  }
}
</script>

<template>
  <TiptapButton
    v-if="isVisible"
    type="button"
    data-style="ghost"
    :data-disabled="!canExecute"
    :disabled="!canExecute"
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
