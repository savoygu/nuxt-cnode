import type { Editor } from '@tiptap/vue-3'
import type { Component, ShallowRef } from 'vue'
import type { ListType } from '../list-button/useList'
import { TiptapListIcon, TiptapListOrderedIcon, TiptapListTodoIcon } from '#components'
import { canToggleList, isListActive, listIcons } from '../list-button/useList'

export interface UseListDropdownMenuConfig {
  types?: ListType[]
  hideWhenUnavailable?: boolean
}

export type UseListDropdownMenuConfigGetter = ToGetter<UseListDropdownMenuConfig>

export interface ListOption {
  label: string
  type: ListType
  icon: Component
}

export const listOptions: ListOption[] = [
  {
    label: 'Bullet List',
    type: 'bulletList',
    icon: TiptapListIcon,
  },
  {
    label: 'Ordered List',
    type: 'orderedList',
    icon: TiptapListOrderedIcon,
  },
  {
    label: 'Task List',
    type: 'taskList',
    icon: TiptapListTodoIcon,
  },
]

export function canToggleAnyList(
  editor: Editor | undefined,
  listTypes: ListType[],
): boolean {
  if (!editor || !editor.isEditable)
    return false
  return listTypes.some(type => canToggleList(editor, type))
}

export function isAnyListActive(
  editor: Editor | undefined,
  listTypes: ListType[],
): boolean {
  if (!editor || !editor.isEditable)
    return false
  return listTypes.some(type => isListActive(editor, type))
}

export function getFilteredListOptions(
  availableTypes: ListType[],
): typeof listOptions {
  return listOptions.filter(
    option => !option.type || availableTypes.includes(option.type),
  )
}

export function shouldShowListDropdown(params: {
  editor: Editor | undefined
  listTypes: ListType[]
  hideWhenUnavailable: boolean
  listInSchema: boolean
  canToggleAny: boolean
}): boolean {
  const { editor, hideWhenUnavailable, listInSchema, canToggleAny } = params

  if (!listInSchema || !editor) {
    return false
  }

  if (hideWhenUnavailable && !editor.isActive('code')) {
    return canToggleAny
  }

  return true
}

export function getActiveListType(
  editor: Editor | undefined,
  availableTypes: ListType[],
): ListType | undefined {
  if (!editor || !editor.isEditable)
    return undefined
  return availableTypes.find(type => isListActive(editor, type))
}

export function useListDropdownMenu(config?: UseListDropdownMenuConfigGetter & {
  editor: ShallowRef<Editor | undefined>
}) {
  const { editor, types = () => ['bulletList', 'orderedList', 'taskList'], hideWhenUnavailable = () => false } = config ?? {}
  const [isVisible, setIsVisible] = useToggle(true)

  const listInSchema = computed(() => toValue(types)?.some(type => isNodeInSchema(type, editor?.value)))

  const filteredLists = computed(() => getFilteredListOptions(toValue(types) ?? []))

  const canToggleAny = computed(() => canToggleAnyList(editor?.value, toValue(types) ?? []))
  const isAnyActive = computed(() => isAnyListActive(editor?.value, toValue(types) ?? []))
  const activeType = computed(() => getActiveListType(editor?.value, toValue(types) ?? []))
  const activeList = computed(() => filteredLists.value.find(option => option.type === activeType.value))

  onMounted(() => {
    handleSelectionUpdate()
    editor?.value?.on('selectionUpdate', handleSelectionUpdate)
  })

  onBeforeUnmount(() => {
    editor?.value?.off('selectionUpdate', handleSelectionUpdate)
  })

  function handleSelectionUpdate() {
    setIsVisible(shouldShowListDropdown({
      editor: editor?.value,
      listTypes: toValue(types) ?? [],
      hideWhenUnavailable: toValue(hideWhenUnavailable) ?? false,
      listInSchema: listInSchema.value ?? false,
      canToggleAny: canToggleAny.value,
    }))
  }

  return {
    isVisible,
    activeType,
    isActive: isAnyActive,
    canToggle: canToggleAny,
    types: computed(() => toValue(types) ?? []),
    filteredLists,
    label: 'List',
    Icon: computed(() => activeList.value ? listIcons[activeList.value.type] : TiptapListIcon),
  }
}
