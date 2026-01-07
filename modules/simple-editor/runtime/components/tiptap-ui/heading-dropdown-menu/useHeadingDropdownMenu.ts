import type { Editor } from '@tiptap/vue-3'
import type { ShallowRef } from 'vue'
import type { Level } from '../heading-button/useHeading'
import { TiptapHeadingIcon } from '#components'
import { canToggle, headingIcons, isHeadingActive, shouldShowButton } from '../heading-button/useHeading'

export interface UseHeadingDropdownMenuConfig {
  levels?: Level[]
  hideWhenUnavailable?: boolean
}

export type UseHeadingDropdownMenuConfigGetter = ToGetter<UseHeadingDropdownMenuConfig>

export function getActiveHeadingLevel(
  editor: Editor | undefined,
  levels: Level[] = [1, 2, 3, 4, 5, 6],
): Level | undefined {
  if (!editor || !editor.isEditable)
    return undefined
  return levels.find(level => isHeadingActive(editor, level))
}

export function useHeadingDropdownMenu(config?: UseHeadingDropdownMenuConfigGetter & {
  editor: ShallowRef<Editor | undefined>
}) {
  const { editor, levels = () => [1, 2, 3, 4, 5, 6], hideWhenUnavailable = () => false } = config ?? {}
  const [isVisible, setIsVisible] = useToggle(true)
  const activeLevel = computed(() => getActiveHeadingLevel(editor?.value, toValue(levels)))
  const isActive = computed(() => isHeadingActive(editor?.value))
  const canToggleState = computed(() => canToggle(editor?.value))

  onMounted(() => {
    handleSelectionUpdate()
    editor?.value?.on('selectionUpdate', handleSelectionUpdate)
  })

  onBeforeUnmount(() => {
    editor?.value?.off('selectionUpdate', handleSelectionUpdate)
  })

  function handleSelectionUpdate() {
    setIsVisible(shouldShowButton({
      editor: editor?.value,
      level: toValue(levels),
      hideWhenUnavailable: toValue(hideWhenUnavailable) ?? false,
    }))
  }

  return {
    isVisible,
    activeLevel,
    isActive,
    canToggle: canToggleState,
    levels: computed(() => toValue(levels)),
    label: 'Heading',
    Icon: computed(() => activeLevel.value ? headingIcons[activeLevel.value] : TiptapHeadingIcon),
  }
}
