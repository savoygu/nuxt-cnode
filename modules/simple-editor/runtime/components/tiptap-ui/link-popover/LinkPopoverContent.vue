<script setup lang="ts">
interface LinkPopoverContentProps {
  /**
   * The URL to set for the link.
   */
  url?: string
  /**
   * Function to update the URL state.
   */
  onUpdateUrl?: (value: string) => void
  /**
   * Whether the link is currently active in the editor.
   */
  isActive?: boolean
  /**
   * Whether the popover is currently open.
   */
  isOpen?: boolean
}

const { url = '', onUpdateUrl, isActive = false, isOpen = false } = defineProps<LinkPopoverContentProps>()

const emit = defineEmits<{
  'update:url': [value: string]
  'setLink': []
  'removeLink': []
  'openLink': []
}>()

const inputRef = useTemplateRef('input')

function handleKeyDown(event: KeyboardEvent) {
  if (event.key === 'Enter') {
    event.preventDefault()
    emit('setLink')
  }
}

function handleUpdateUrl(value: string) {
  onUpdateUrl?.(value)
  emit('update:url', value)
}

watch(() => isOpen, (open) => {
  if (open) {
    nextTick(() => {
      inputRef.value?.$el.focus()
    })
  }
})
</script>

<template>
  <TiptapCard>
    <TiptapCardBody>
      <TiptapCardItemGroup orientation="horizontal">
        <TiptapInputGroup>
          <TiptapInput
            ref="input"
            type="url"
            placeholder="Paste a link..."
            class="tiptap-input"
            :value="url"
            autocomplete="off"
            autocorrect="off"
            autocapitalize="off"
            @input="handleUpdateUrl(($event.target as HTMLInputElement).value)"
            @keydown="handleKeyDown"
          />
        </TiptapInputGroup>

        <TiptapButtonGroup orientation="horizontal">
          <TiptapButton
            type="button"
            data-style="ghost"
            title="Apply link"
            :disabled="!url && !isActive"
            @click="emit('setLink')"
          >
            <TiptapCornerDownLeftIcon class="tiptap-button-icon" />
          </TiptapButton>
        </TiptapButtonGroup>

        <TiptapSeparator />

        <TiptapButtonGroup orientation="horizontal">
          <TiptapButton
            type="button"
            data-style="ghost"
            title="Open in new window"
            :disabled="!url && !isActive"
            @click="emit('openLink')"
          >
            <TiptapExternalLinkIcon class="tiptap-button-icon" />
          </TiptapButton>

          <TiptapButton
            type="button"
            data-style="ghost"
            title="Remove link"
            :disabled="!url && !isActive"
            @click="emit('removeLink')"
          >
            <TiptapTrashIcon class="tiptap-button-icon" />
          </TiptapButton>
        </TiptapButtonGroup>
      </TiptapCardItemGroup>
    </TiptapCardBody>
  </TiptapCard>
</template>

<style>
.tiptap-input {
  --tt-input-bg-color: var(--white);
  --tt-input-border-color: var(--tt-gray-light-a-200);
  --tt-input-text-color: var(--tt-gray-light-a-900);
  --tt-input-placeholder-color: var(--tt-gray-light-a-600);

  .dark & {
    --tt-input-bg-color: var(--tt-gray-dark-100);
    --tt-input-border-color: var(--tt-gray-dark-a-200);
    --tt-input-text-color: var(--tt-gray-dark-a-900);
    --tt-input-placeholder-color: var(--tt-gray-dark-a-600);
  }

  width: 240px;
  padding: 0.375rem 0.5rem;
  border-radius: var(--tt-radius-md);
  background-color: var(--tt-input-bg-color);
  border: 1px solid var(--tt-input-border-color);
  color: var(--tt-input-text-color);
  font-size: 0.875rem;
  transition: border-color 0.2s ease;

  &:focus {
    outline: none;
    border-color: var(--tt-brand-color);
    box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.1);
  }

  &::placeholder {
    color: var(--tt-input-placeholder-color);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
}
</style>
