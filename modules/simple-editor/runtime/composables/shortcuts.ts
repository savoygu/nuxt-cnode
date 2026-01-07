export const MAC_SYMBOLS: Record<string, string> = {
  mod: '⌘',
  command: '⌘',
  meta: '⌘',
  ctrl: '⌃',
  control: '⌃',
  alt: '⌥',
  option: '⌥',
  shift: '⇧',
  backspace: 'Del',
  delete: '⌦',
  enter: '⏎',
  escape: '⎋',
  capslock: '⇪',
} as const

export function isMac(): boolean {
  return (
    typeof navigator !== 'undefined'
    && navigator.platform.toLowerCase().includes('mac')
  )
}

export function parseShortcutKeys(props: UseShortcutsConfig) {
  const { shortcutKeys, delimiter = '+', capitalize = true } = props
  if (!shortcutKeys)
    return []

  return shortcutKeys
    .split(delimiter)
    .map(key => key.trim())
    .map(key => formatShortcutKey(key, isMac(), capitalize))
}

export function formatShortcutKey(key: string, isMac: boolean, capitalize: boolean = true) {
  if (isMac) {
    const lowerKey = key.toLowerCase()
    return MAC_SYMBOLS[lowerKey] || (capitalize ? key.toUpperCase() : key)
  }

  return capitalize ? key.charAt(0).toUpperCase() + key.slice(1) : key
}

export interface UseShortcutsConfig {
  shortcutKeys?: string
  delimiter?: string
  capitalize?: boolean
}

export type UseShortcutsConfigGetter = ToGetter<UseShortcutsConfig, false>

export function useShortcuts(config: UseShortcutsConfigGetter) {
  const shortcuts = computed(() => {
    return parseShortcutKeys(fromGetterConfig(config))
  })

  return {
    shortcuts,
  }
}
