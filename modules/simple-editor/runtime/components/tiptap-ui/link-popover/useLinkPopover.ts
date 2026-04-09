import type { Editor } from '@tiptap/vue-3'
import type { ShallowRef } from 'vue'
import { TiptapLinkIcon } from '#components'

export interface UseLinkPopoverConfig {
  /**
   * Whether to hide the link popover when not available.
   * @default false
   */
  hideWhenUnavailable?: boolean
  /**
   * Callback function called when the link is set.
   */
  onSetLink?: () => void
}

export type UseLinkPopoverConfigGetter = ToGetter<UseLinkPopoverConfig, false>

/**
 * Checks if a link can be set in the current editor state
 */
export function canSetLink(editor: Editor | undefined): boolean {
  if (!editor || !editor.isEditable) {
    return false
  }
  return editor.can().setMark('link')
}

/**
 * Checks if a link is currently active in the editor
 */
export function isLinkActive(editor: Editor | undefined): boolean {
  if (!editor || !editor.isEditable) {
    return false
  }
  return editor.isActive('link')
}

/**
 * Determines if the link button should be shown
 */
export function shouldShowLinkButton(props: {
  editor: Editor | undefined
  hideWhenUnavailable: boolean
}): boolean {
  const { editor, hideWhenUnavailable } = props

  const linkInSchema = isMarkInSchema('link', editor)

  if (!linkInSchema || !editor) {
    return false
  }

  if (hideWhenUnavailable && editor.isActive('code')) {
    return false
  }

  return true
}

/**
 * Custom composable for handling link operations in a Tiptap editor
 */
export function useLinkHandler(config: {
  editor: ShallowRef<Editor | undefined>
  onSetLink?: () => void
}) {
  const { editor, onSetLink } = config
  const [url, setUrl] = useToggle<string | null>(null)

  const updateLinkState = () => {
    const { href } = editor.value!.getAttributes('link')
    setUrl(href || '')
  }

  onMounted(() => {
    if (!editor.value) {
      return
    }

    // Get URL immediately on mount
    const { href } = editor.value.getAttributes('link')

    if (isLinkActive(editor.value) && url.value === null) {
      setUrl(href || '')
    }

    // Listen for selection updates
    editor.value.on('selectionUpdate', updateLinkState)
  })

  onBeforeUnmount(() => {
    editor.value?.off('selectionUpdate', updateLinkState)
  })

  const setLink = () => {
    if (!url.value || !editor.value) {
      return
    }

    const { selection } = editor.value.state
    const isEmpty = selection.empty

    let chain = editor.value.chain().focus()

    chain = chain.extendMarkRange('link').setLink({ href: url.value })

    if (isEmpty) {
      chain = chain.insertContent({ type: 'text', text: url.value })
    }

    chain.run()

    setUrl(null)

    onSetLink?.()
  }

  const removeLink = () => {
    if (!editor.value) {
      return
    }
    editor.value
      .chain()
      .focus()
      .extendMarkRange('link')
      .unsetLink()
      .setMeta('preventAutolink', true)
      .run()
    setUrl('')
  }

  const openLink = (target: string = '_blank', features: string = 'noopener,noreferrer') => {
    if (!url.value) {
      return
    }

    const safeUrl = sanitizeUrl(url.value, window?.location.href)
    if (safeUrl !== '#') {
      window?.open(safeUrl, target, features)
    }
  }

  return {
    url: computed(() => url.value || ''),
    setUrl,
    setLink,
    removeLink,
    openLink,
  }
}

/**
 * Custom composable for link popover state management
 */
export function useLinkState(config: {
  editor: ShallowRef<Editor | undefined>
  hideWhenUnavailable?: MaybeRef<boolean> | (() => boolean | undefined)
}) {
  const { editor, hideWhenUnavailable } = config

  const [isVisible, setIsVisible] = useToggle(false)
  const canSet = computed(() => canSetLink(editor.value))
  const isActive = computed(() => isLinkActive(editor.value))

  onMounted(() => {
    handleSelectionUpdate()
    editor.value?.on('selectionUpdate', handleSelectionUpdate)
  })

  onBeforeUnmount(() => {
    editor.value?.off('selectionUpdate', handleSelectionUpdate)
  })

  function handleSelectionUpdate() {
    setIsVisible(shouldShowLinkButton({
      editor: editor.value,
      hideWhenUnavailable: toValue(hideWhenUnavailable) ?? false,
    }))
  }

  return {
    isVisible,
    canSet,
    isActive,
  }
}

/**
 * Main composable that provides link popover functionality for Tiptap editor
 *
 * @example
 * ```vue
 * <script setup lang="ts">
 * const { isVisible, canSet, isActive, Icon, label, url, setLink, removeLink } = useLinkPopover({ editor })
 * </script>
 *
 * <template>
 *   <button v-if="isVisible" :disabled="!canSet">Link</button>
 * </template>
 * ```
 */
export function useLinkPopover(config: UseLinkPopoverConfigGetter & {
  editor: ShallowRef<Editor | undefined>
}) {
  const { editor, hideWhenUnavailable, onSetLink } = config || {}

  const { isVisible, canSet, isActive } = useLinkState({
    editor,
    hideWhenUnavailable,
  })

  const linkHandler = useLinkHandler({
    editor,
    onSetLink,
  })

  return {
    isVisible,
    canSet,
    isActive,
    label: 'Link',
    Icon: TiptapLinkIcon,
    ...linkHandler,
  }
}
