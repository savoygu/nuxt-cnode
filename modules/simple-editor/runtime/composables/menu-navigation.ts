import type { Editor } from '@tiptap/vue-3'

type Orientation = 'horizontal' | 'vertical' | 'both'

interface UseMenuNavigationConfig<T> {
  /**
   * The Tiptap editor instance, if using with a Tiptap editor.
   */
  editor?: Editor | undefined
  /**
   * Reference to the container element for handling keyboard events.
   */
  containerRef?: Ref<HTMLElement | null>
  /**
   * Search query that affects the selected item.
   */
  query?: string
  /**
   * Array of items to navigate through.
   */
  items: T[]
  /**
   * Callback fired when an item is selected.
   */
  onSelect?: (item: T) => void
  /**
   * Callback fired when the menu should close.
   */
  onClose?: () => void
  /**
   * The navigation orientation of the menu.
   * @default 'vertical'
   */
  orientation?: Orientation
  /**
   * Whether to automatically select the first item when the menu opens.
   * @default true
   */
  autoSelectFirstItem?: boolean
}

export function useMenuNavigation<T>(config: UseMenuNavigationConfig<T>) {
  const {
    editor,
    containerRef,
    query,
    items,
    onSelect,
    onClose,
    orientation = 'vertical',
    autoSelectFirstItem = true,
  } = config

  const selectedIndex = ref<number>(autoSelectFirstItem ? 0 : -1)

  const setSelectedIndex = (index: number) => {
    selectedIndex.value = index
  }

  watch(
    () => query,
    () => {
      setSelectedIndex(autoSelectFirstItem ? 0 : -1)
    },
  )

  onMounted(() => {
    setupEventListener()
  })

  onUnmounted(() => {
    cleanupEventListener()
  })

  let targetElement: HTMLElement | null = null

  function setupEventListener() {
    if (editor) {
      targetElement = editor.view.dom
    }
    else if (containerRef?.value) {
      targetElement = containerRef.value
    }

    if (targetElement) {
      targetElement.addEventListener('keydown', handleKeyboardNavigation, true)
    }
  }

  function cleanupEventListener() {
    if (targetElement) {
      targetElement.removeEventListener('keydown', handleKeyboardNavigation, true)
    }
  }

  function handleKeyboardNavigation(event: KeyboardEvent) {
    if (!items.length)
      return

    const moveNext = () => {
      setSelectedIndex((selectedIndex.value + 1) % items.length)
    }

    const movePrev = () => {
      setSelectedIndex((selectedIndex.value - 1 + items.length) % items.length)
    }

    switch (event.key) {
      case 'ArrowUp': {
        if (orientation === 'horizontal')
          return
        event.preventDefault()
        movePrev()
        break
      }

      case 'ArrowDown': {
        if (orientation === 'horizontal')
          return
        event.preventDefault()
        moveNext()
        break
      }

      case 'ArrowLeft': {
        if (orientation === 'vertical')
          return
        event.preventDefault()
        movePrev()
        break
      }

      case 'ArrowRight': {
        if (orientation === 'vertical')
          return
        event.preventDefault()
        moveNext()
        break
      }

      case 'Tab': {
        event.preventDefault()
        if (event.shiftKey) {
          movePrev()
        }
        else {
          moveNext()
        }
        break
      }

      case 'Home': {
        event.preventDefault()
        setSelectedIndex(0)
        break
      }

      case 'End': {
        event.preventDefault()
        setSelectedIndex(items.length - 1)
        break
      }

      case 'Enter': {
        if (event.isComposing)
          return
        event.preventDefault()
        if (selectedIndex.value !== -1 && items[selectedIndex.value]) {
          onSelect?.(items[selectedIndex.value] as T)
        }
        break
      }

      case 'Escape': {
        event.preventDefault()
        onClose?.()
        break
      }
    }
  }

  return {
    selectedIndex: computed(() => (items.length ? selectedIndex.value : undefined)),
    setSelectedIndex,
  }
}
