<script setup lang="ts">
import type { ButtonProps } from '../../tiptap-ui-primitive/Button.vue'
import type { UseLinkPopoverConfig } from './useLinkPopover'
import { useLinkPopover } from './useLinkPopover'

interface LinkPopoverProps extends /* @vue-ignore */ Omit<ButtonProps, 'type' | 'disabled'>, UseLinkPopoverConfig {
  /**
   * Callback for when the popover opens or closes.
   */
  onOpenChange?: (isOpen: boolean) => void
  /**
   * Whether to automatically open the popover when a link is active.
   * @default true
   */
  autoOpenOnLinkActive?: boolean
}

const { hideWhenUnavailable = false, onSetLink, onOpenChange, autoOpenOnLinkActive = true, ...buttonProps } = defineProps<LinkPopoverProps>()

const emit = defineEmits<{
  click: [event: MouseEvent]
  openChange: [isOpen: boolean]
}>()

const { editor, appendTo } = useEditorStore()!
const [isOpen, setIsOpen] = useToggle(false)

const { isVisible, canSet, isActive, url, setUrl, setLink, removeLink, openLink, label, Icon } = useLinkPopover({
  editor,
  hideWhenUnavailable: () => hideWhenUnavailable,
  onSetLink,
})

function handleOnOpenChange(nextIsOpen: boolean) {
  setIsOpen(nextIsOpen)
  emit('openChange', nextIsOpen)
  onOpenChange?.(nextIsOpen)
}

function handleSetLink() {
  setLink()
  setIsOpen(false)
}

function handleClick(event: MouseEvent) {
  emit('click', event)
  if (event.defaultPrevented) {
    return
  }
  setIsOpen(!isOpen.value)
}

watch(() => isActive.value, (active) => {
  if (autoOpenOnLinkActive && active) {
    setIsOpen(true)
  }
  else if (!active) {
    setIsOpen(false)
  }
}, { immediate: true })
</script>

<template>
  <ElPopover
    v-if="isVisible"
    :visible="isOpen"
    :disabled="!canSet"
    :append-to="appendTo"
    width="auto"
    :popper-style="{
      '--el-popover-padding': 0,
      '--el-popover-bg-color': 'transparent',
      '--el-popover-border-color': 'transparent',
      '--el-box-shadow-light': 'none',
    }"
    @show="handleOnOpenChange(true)"
    @hide="handleOnOpenChange(false)"
  >
    <template #reference>
      <TiptapLinkPopoverButton
        :disabled="!canSet"
        :data-active-state="isActive ? 'on' : 'off'"
        :data-disabled="!canSet"
        v-bind="buttonProps"
        @click="handleClick"
      >
        <template #tooltip>
          {{ label }}
        </template>
        <component :is="Icon" class="tiptap-button-icon" />
      </TiptapLinkPopoverButton>
    </template>
    <TiptapLinkPopoverContent
      :url="url"
      :is-active="isActive"
      :is-open="isOpen"
      @update:url="setUrl"
      @set-link="handleSetLink"
      @remove-link="removeLink"
      @open-link="openLink"
    />
  </ElPopover>
</template>
