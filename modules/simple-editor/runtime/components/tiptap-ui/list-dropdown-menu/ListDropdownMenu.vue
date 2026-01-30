<script setup lang="ts">
import type { ButtonProps } from '../../tiptap-ui-primitive/Button.vue'
import type { UseListDropdownMenuConfig } from './useListDropdownMenu'
import ChevronDownIcon from '../../tiptap-icons/ChevronDownIcon.vue'
import { useListDropdownMenu } from './useListDropdownMenu'

const { types = ['bulletList', 'orderedList', 'taskList'], hideWhenUnavailable = false, onOpenChange, ...buttonProps } = defineProps<ListDropdownMenuProps>()
const emit = defineEmits<{
  openChange: [isOpen: boolean]
}>()

interface ListDropdownMenuProps extends /* @vue-ignore */ Omit<ButtonProps, 'type' | 'disabled'>, UseListDropdownMenuConfig {
  // portal?: boolean
  onOpenChange?: (isOpen: boolean) => void
}

const { editor, appendTo } = useEditorStore()!
const [_, setIsOpen] = useToggle(false)
const { isVisible, isActive, canToggle, filteredLists, Icon } = useListDropdownMenu({
  editor,
  types: () => types,
  hideWhenUnavailable: () => hideWhenUnavailable,
})

function handleOpenChange(open: boolean) {
  if (!editor.value || !canToggle.value) {
    return
  }
  setIsOpen(open)
  emit('openChange', open)
  onOpenChange?.(open)
}
</script>

<template>
  <ElDropdown
    v-if="isVisible"
    trigger="click"
    placement="top-start"
    :disabled="!canToggle"
    :append-to="appendTo"
    @visible-change="handleOpenChange"
  >
    <TiptapButton
      type="button"
      data-style="ghost"
      :data-active-state="isActive ? 'on' : 'off'"
      :data-disabled="!canToggle"
      :disabled="!canToggle"
      v-bind="buttonProps"
    >
      <template #tooltip>
        List
      </template>
      <component :is="Icon" class="tiptap-button-icon" />
      <ChevronDownIcon class="tiptap-button-dropdown-small" />
    </TiptapButton>
    <template #dropdown>
      <ElDropdownMenu class="!p-1.5">
        <ElDropdownItem v-for="option in filteredLists" :key="option.type" class="!p-0">
          <TiptapListButton :type="option.type" :text="option.label" :show-tooltip="false" />
        </ElDropdownItem>
      </ElDropdownMenu>
    </template>
  </ElDropdown>
</template>
