<script setup lang="ts">
import type { Editor } from '@tiptap/vue-3'
import type { DefineComponent } from 'vue'
import { TiptapBoldIcon, TiptapItalicIcon } from '#components'

type Mark
  = | 'bold'
    | 'italic'
    | 'strike'
    | 'code'
    | 'underline'
    | 'superscript'
    | 'subscript'

const props = withDefaults(defineProps<{
  type: Mark
  hideWhenUnavailable?: boolean
  onToggled?: () => void
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
const { isVisible, canToggle, isActive, label, shortcutKeys, Icon, handleMark } = useMark()

function handleClick(event: MouseEvent) {
  emit('click', event)

  if (event.defaultPrevented) {
    return
  }

  handleMark()
}

function useMark() {
  const markIcons = {
    bold: TiptapBoldIcon,
    italic: TiptapItalicIcon,
  } as Record<Mark, DefineComponent>

  const MARK_SHORTCUT_KEYS: Record<Mark, string> = {
    bold: 'mod+b',
    italic: 'mod+i',
    underline: 'mod+u',
    strike: 'mod+shift+s',
    code: 'mod+e',
    superscript: 'mod+.',
    subscript: 'mod+,',
  }

  const [isVisible, setIsVisible] = useToggle()

  const canToggle = computed(() => {
    return canToggleMark(editor.value, props.type)
  })
  const isActive = computed(() => {
    if (!editor.value || !editor.value.isEditable) {
      return false
    }
    return editor.value.isActive(props.type)
  })

  onMounted(() => {
    handleSelectionUpdate()
    editor.value?.on('selectionUpdate', handleSelectionUpdate)
  })

  onBeforeUnmount(() => {
    editor.value?.off('selectionUpdate', handleSelectionUpdate)
  })

  function handleSelectionUpdate() {
    setIsVisible(shouldShowButton())
  }

  function shouldShowButton() {
    if (!editor.value || !editor.value.isEditable) {
      return false
    }
    if (!isMarkInSchema(props.type, editor.value)) {
      return false
    }

    if (props.hideWhenUnavailable && !editor.value.isActive('code')) {
      return canToggleMark(editor.value, props.type)
    }

    return true
  }

  function canToggleMark(editor: Editor | undefined, type: Mark) {
    if (!editor || !editor.isEditable) {
      return false
    }
    if (!isMarkInSchema(type, editor) || isNodeTypeSelected(editor, ['image'])) {
      return false
    }
    return editor.can().toggleMark(type)
  }

  function getFormattedMarkName(type: Mark) {
    return type.charAt(0).toUpperCase() + type.slice(1)
  }

  function toggleMark(editor: Editor | undefined, type: Mark): boolean {
    if (!editor || !editor.isEditable)
      return false
    if (!canToggleMark(editor, type))
      return false

    return editor.chain().focus().toggleMark(type).run()
  }

  function handleMark() {
    if (!editor.value) {
      return false
    }

    const success = toggleMark(editor.value, props.type)
    if (success) {
      props.onToggled?.()
    }
    return success
  }

  return {
    isVisible,
    canToggle,
    isActive,
    label: getFormattedMarkName(props.type),
    shortcutKeys: MARK_SHORTCUT_KEYS[props.type],
    Icon: markIcons[props.type],
    handleMark,
  }
}
</script>

<template>
  <TiptapButton v-if="isVisible" type="button" :disabled="!canToggle" data-style="ghost" :data-active-state="`${isActive ? 'on' : 'off'}`" :data-disabled="!canToggle" v-bind="attrs" @click="handleClick">
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
