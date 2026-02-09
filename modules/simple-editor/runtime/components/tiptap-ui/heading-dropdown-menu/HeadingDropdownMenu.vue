<script setup lang="ts">
import type { ButtonProps } from '../../tiptap-ui-primitive/Button.vue'
import type { UseHeadingDropdownMenuConfig } from './useHeadingDropdownMenu'
import { useHeadingDropdownMenu } from './useHeadingDropdownMenu'

interface HeadingDropdownMenuProps extends /* @vue-ignore */ Omit<ButtonProps, 'type' | 'disabled'>, UseHeadingDropdownMenuConfig {
  // portal?: boolean
  onOpenChange?: (isOpen: boolean) => void
}

const { levels = [1, 2, 3, 4, 5, 6], hideWhenUnavailable = false, onOpenChange, ...buttonProps } = defineProps<HeadingDropdownMenuProps>()
const emit = defineEmits<{
  openChange: [isOpen: boolean]
}>()

const { editor, appendTo } = useEditorStore()!
const [_, setIsOpen] = useToggle(false)
const { isVisible, isActive, canToggle, Icon } = useHeadingDropdownMenu({
  editor,
  levels: () => levels,
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
        Heading
      </template>
      <component :is="Icon" class="tiptap-button-icon" />
      <TiptapChevronDownIcon class="tiptap-button-dropdown-small" />
    </TiptapButton>
    <template #dropdown>
      <ElDropdownMenu class="!p-1.5">
        <ElDropdownItem v-for="level in levels" :key="`heading-${level}`" class="!p-0">
          <TiptapHeadingButton :level="level" :text="`Heading ${level}`" :show-tooltip="false" />
        </ElDropdownItem>
      </ElDropdownMenu>
    </template>
  </ElDropdown>
</template>
