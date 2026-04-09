import type { Editor } from '@tiptap/vue-3'
import type { ShallowRef } from 'vue'
import { TiptapImagePlusIcon } from '#components'
import { useHotkeys } from 'vue-use-hotkeys'

export const IMAGE_UPLOAD_SHORTCUT_KEY = 'mod+shift+i'

export interface UseImageUploadConfig {
  hideWhenUnavailable?: boolean
  onInserted?: () => void
}

export type UseImageUploadConfigGetter = ToGetter<UseImageUploadConfig>

export function canInsertImage(editor: Editor | undefined): boolean {
  if (!editor || !editor.isEditable)
    return false
  if (
    !isExtensionAvailable(editor, 'imageUpload')
    || isNodeTypeSelected(editor, ['image'])
  ) {
    return false
  }

  return editor.can().insertContent({ type: 'imageUpload' })
}

export function isImageActive(editor: Editor | undefined): boolean {
  if (!editor || !editor.isEditable)
    return false
  return editor.isActive('imageUpload')
}

export function insertImage(editor: Editor | undefined): boolean {
  if (!editor || !editor.isEditable)
    return false
  if (!canInsertImage(editor))
    return false

  try {
    return editor
      .chain()
      .focus()
      .insertContent({
        type: 'imageUpload',
      })
      .run()
  }
  catch {
    return false
  }
}

export function shouldShowButton(props: {
  editor: Editor | undefined
  hideWhenUnavailable: boolean
}): boolean {
  const { editor, hideWhenUnavailable } = props

  if (!editor || !editor.isEditable)
    return false
  if (!isExtensionAvailable(editor, 'imageUpload'))
    return false

  if (hideWhenUnavailable && !editor.isActive('code')) {
    return canInsertImage(editor)
  }

  return true
}

export function useImageUpload(config: UseImageUploadConfigGetter & {
  editor: ShallowRef<Editor | undefined>
}) {
  const { editor, hideWhenUnavailable, onInserted } = config

  const breakpoints = useBreakpoints({
    mobile: 768,
  })

  const [isVisible, setIsVisible] = useToggle(true)
  const canInsert = computed(() => canInsertImage(editor.value))
  const isActive = computed(() => isImageActive(editor.value))

  const handleImage = async () => {
    if (!editor.value)
      return false

    const success = insertImage(editor.value)
    if (success) {
      onInserted?.()
    }
    return success
  }

  // Setup hotkey
  useHotkeys(IMAGE_UPLOAD_SHORTCUT_KEY, (e) => {
    e.preventDefault()
    handleImage()
  }, {
    enabled: computed(() => isVisible.value && canInsert.value),
    enableOnContentEditable: !breakpoints.mobile.value,
  })

  onMounted(() => {
    handleSelectionUpdate()

    editor.value?.on('selectionUpdate', handleSelectionUpdate)
  })

  onBeforeUnmount(() => {
    if (editor) {
      editor.value?.off('selectionUpdate', handleSelectionUpdate)
    }
  })

  function handleSelectionUpdate() {
    setIsVisible(shouldShowButton({ editor: editor.value, hideWhenUnavailable: toValue(hideWhenUnavailable) ?? false }))
  }

  return {
    isVisible,
    isActive,
    handleImage,
    canInsert,
    label: 'Add image',
    shortcutKeys: IMAGE_UPLOAD_SHORTCUT_KEY,
    Icon: TiptapImagePlusIcon,
  }
}
