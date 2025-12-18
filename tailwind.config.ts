import type { Config } from 'tailwindcss'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import typography from '@tailwindcss/typography'
import { parse } from 'postcss'
import { objectify } from 'postcss-js'
import plugin from 'tailwindcss/plugin'

// DSM https://semi.design/dsm/web_console/tokens?dsmID=26207
export default <Partial<Config>>{
  theme: {
    extend: {
      colors: {
        'white': 'var(--semi-color-white)',
        'black': 'var(--semi-color-black)',
        'primary': 'var(--semi-color-primary)',
        'primary-hover': 'var(--semi-color-primary-hover)',
        'primary-active': 'var(--semi-color-primary-active)',
        'primary-disabled': 'var(--semi-color-primary-disabled)',
        'primary-light-default': 'var(--semi-color-primary-light-default)',
        'primary-light-hover': 'var(--semi-color-primary-light-hover)',
        'primary-light-active': 'var(--semi-color-primary-light-active)',
        'secondary': 'var(--semi-color-secondary)',
        'secondary-hover': 'var(--semi-color-secondary-hover)',
        'secondary-active': 'var(--semi-color-secondary-active)',
        'secondary-disabled': 'var(--semi-color-secondary-disabled)',
        'secondary-light-default': 'var(--semi-color-secondary-light-default)',
        'secondary-light-hover': 'var(--semi-color-secondary-light-hover)',
        'secondary-light-active': 'var(--semi-color-secondary-light-active)',
        'tertiary': 'var(--semi-color-tertiary)',
        'tertiary-hover': 'var(--semi-color-tertiary-hover)',
        'tertiary-active': 'var(--semi-color-tertiary-active)',
        'tertiary-light-default': 'var(--semi-color-tertiary-light-default)',
        'tertiary-light-hover': 'var(--semi-color-tertiary-light-hover)',
        'tertiary-light-active': 'var(--semi-color-tertiary-light-active)',
        'default': 'var(--semi-color-default)',
        'default-hover': 'var(--semi-color-default-hover)',
        'default-active': 'var(--semi-color-default-active)',
        'info': 'var(--semi-color-info)',
        'info-hover': 'var(--semi-color-info-hover)',
        'info-active': 'var(--semi-color-info-active)',
        'info-disabled': 'var(--semi-color-info-disabled)',
        'info-light-default': 'var(--semi-color-info-light-default)',
        'info-light-hover': 'var(--semi-color-info-light-hover)',
        'info-light-active': 'var(--semi-color-info-light-active)',
        'success': 'var(--semi-color-success)',
        'success-hover': 'var(--semi-color-success-hover)',
        'success-active': 'var(--semi-color-success-active)',
        'success-disabled': 'var(--semi-color-success-disabled)',
        'success-light-default': 'var(--semi-color-success-light-default)',
        'success-light-hover': 'var(--semi-color-success-light-hover)',
        'success-light-active': 'var(--semi-color-success-light-active)',
        'danger': 'var(--semi-color-danger)',
        'danger-hover': 'var(--semi-color-danger-hover)',
        'danger-active': 'var(--semi-color-danger-active)',
        'danger-light-default': 'var(--semi-color-danger-light-default)',
        'danger-light-hover': 'var(--semi-color-danger-light-hover)',
        'danger-light-active': 'var(--semi-color-danger-light-active)',
        'warning': 'var(--semi-color-warning)',
        'warning-hover': 'var(--semi-color-warning-hover)',
        'warning-active': 'var(--semi-color-warning-active)',
        'warning-light-default': 'var(--semi-color-warning-light-default)',
        'warning-light-hover': 'var(--semi-color-warning-light-hover)',
        'warning-light-active': 'var(--semi-color-warning-light-active)',
        'focus-border': 'var(--semi-color-focus-border)',
        'disabled-text': 'var(--semi-color-disabled-text)',
        'disabled-border': 'var(--semi-color-disabled-border)',
        'disabled-bg': 'var(--semi-color-disabled-bg)',
        'disabled-fill': 'var(--semi-color-disabled-fill)',
        'shadow': 'var(--semi-color-shadow)',
        'link': 'var(--semi-color-link)',
        'link-hover': 'var(--semi-color-link-hover)',
        'link-active': 'var(--semi-color-link-active)',
        'link-visited': 'var(--semi-color-link-visited)',
        'border': 'var(--semi-color-border)',
        'nav-bg': 'var(--semi-color-nav-bg)',
        'overlay-bg': 'var(--semi-color-overlay-bg)',
        'fill-0': 'var(--semi-color-fill-0)',
        'fill-1': 'var(--semi-color-fill-1)',
        'fill-2': 'var(--semi-color-fill-2)',
        'bg-0': 'var(--semi-color-bg-0)',
        'bg-1': 'var(--semi-color-bg-1)',
        'bg-2': 'var(--semi-color-bg-2)',
        'bg-3': 'var(--semi-color-bg-3)',
        'bg-4': 'var(--semi-color-bg-4)',
        'text-0': 'var(--semi-color-text-0)',
        'text-1': 'var(--semi-color-text-1)',
        'text-2': 'var(--semi-color-text-2)',
        'text-3': 'var(--semi-color-text-3)',
        'highlight-bg': 'var(--semi-color-highlight-bg)',
        'highlight': 'var(--semi-color-highlight)',
        'data-0': 'var(--semi-color-data-0)',
        'data-1': 'var(--semi-color-data-1)',
        'data-2': 'var(--semi-color-data-2)',
        'data-3': 'var(--semi-color-data-3)',
        'data-4': 'var(--semi-color-data-4)',
        'data-5': 'var(--semi-color-data-5)',
        'data-6': 'var(--semi-color-data-6)',
        'data-7': 'var(--semi-color-data-7)',
        'data-8': 'var(--semi-color-data-8)',
        'data-9': 'var(--semi-color-data-9)',
        'data-10': 'var(--semi-color-data-10)',
        'data-11': 'var(--semi-color-data-11)',
        'data-12': 'var(--semi-color-data-12)',
        'data-13': 'var(--semi-color-data-13)',
        'data-14': 'var(--semi-color-data-14)',
        'data-15': 'var(--semi-color-data-15)',
        'data-16': 'var(--semi-color-data-16)',
        'data-17': 'var(--semi-color-data-17)',
        'data-18': 'var(--semi-color-data-18)',
        'data-19': 'var(--semi-color-data-19)',
      },
      // 字体排版
      fontSize: {
        'extra-small': '10px',
        'small': 'var(--semi-font-size-small)',
        'regular': 'var(--semi-font-size-regular)',
        'header-6': 'var(--semi-font-size-header-6)',
        'header-5': 'var(--semi-font-size-header-5)',
        'header-4': 'var(--semi-font-size-header-4)',
        'header-3': 'var(--semi-font-size-header-3)',
        'header-2': 'var(--semi-font-size-header-2)',
        'header-1': 'var(--semi-font-size-header-1)',
      },
      fontWeight: {
        light: 'var(--semi-font-weight-light)',
        regular: 'var(--semi-font-weight-regular)',
        bold: 'var(--semi-font-weight-bold)',
      },
      // 圆角
      borderRadius: {
        small: 'var(--semi-border-radius-small)',
        medium: 'var(--semi-border-radius-medium)',
        large: 'var(--semi-border-radius-large)',
        circle: 'var(--semi-border-radius-circle)',
        full: 'var(--semi-border-radius-full)',
      },
      // 阴影
      boxShadow: {
        0: 'var(--semi-shadow-0)',
        1: 'var(--semi-shadow-1)',
        2: 'var(--semi-shadow-2)',
        knob: 'var(--semi-shadow-knob)',
        elevated: 'var(--semi-shadow-elevated)',
      },
      // 尺寸
      width: {
        'icon-extra-small': 'var(--semi-width-icon-extra-small)',
        'icon-small': 'var(--semi-width-icon-small)',
        'icon-medium': 'var(--semi-width-icon-medium)',
        'icon-large': 'var(--semi-width-icon-large)',
        'icon-extra-large': 'var(--semi-width-icon-extra-large)',
      },
      height: {
        'control-small': 'var(--semi-height-control-small)',
        'control-default': 'var(--semi-height-control-default)',
        'control-large': 'var(--semi-height-control-large)',
      },
      // 间距
      spacing: {
        'none': 'var(--semi-spacing-none)',
        'super-tight': 'var(--semi-spacing-super-tight)',
        'extra-tight': 'var(--semi-spacing-extra-tight)',
        'tight': 'var(--semi-spacing-tight)',
        'base-tight': 'var(--semi-spacing-base-tight)',
        'base': 'var(--semi-spacing-base)',
        'base-loose': 'var(--semi-spacing-base-loose)',
        'loose': 'var(--semi-spacing-loose)',
        'extra-loose': 'var(--semi-spacing-extra-loose)',
        'super-loose': 'var(--semi-spacing-super-loose)',
      },
      // z-index
      zIndex: {
        'portal': 'var(--semi-z-portal)',
        'affix': 'var(--semi-z-affix)',
        'backtop': 'var(--semi-z-backtop)',
        'badge': 'var(--semi-z-badge)',
        'modal': 'var(--semi-z-modal)',
        'modal-mask': 'var(--semi-z-modal-mask)',
        'toast': 'var(--semi-z-toast)',
        'notification': 'var(--semi-z-notification)',
        'popover': 'var(--semi-z-popover)',
        'tooltip': 'var(--semi-z-tooltip)',
        'image-preview': 'var(--semi-z-image-preview)',
      },
      // 动画
      transitionDuration: {
        slowest: 'var(--semi-transition_duration-slowest)',
        slower: 'var(--semi-transition_duration-slower)',
        slow: 'var(--semi-transition_duration-slow)',
        normal: 'var(--semi-transition_duration-normal)',
        fast: 'var(--semi-transition_duration-fast)',
        faster: 'var(--semi-transition_duration-faster)',
        fastest: 'var(--semi-transition_duration-fastest)',
        none: 'var(--semi-transition_duration-none)',
      },
      transitionTimingFunction: {
        easeIn: 'var(--semi-transition_function-easeIn)',
        linear: 'var(--semi-transition_function-linear)',
        easeOut: 'var(--semi-transition_function-easeOut)',
        easeInOut: 'var(--semi-transition_function-easeInOut)',
      },
      screens: {
        xs: '375px',
        sm: '420px',
        md: '768px',
        lg: '992px',
      },
      listStyleType: {
        circle: 'circle',
      },
      lineHeight: {
        3.5: '14px',
        7.5: '30px',
      },
    },
  },
  plugins: [
    typography,
    fromCssFile(resolve(__dirname, './assets/css/tailwind.css')),
  ],
}

function fromCssFile(filename: string) {
  const css = readFileSync(filename, 'utf-8')
  const root = parse(css)
  const jss = objectify(root)

  return plugin(({ addBase, addComponents, addUtilities }) => {
    if (jss['@layer utilities'])
      addUtilities(jss['@layer utilities'])
    if (jss['@layer components'])
      addComponents(jss['@layer components'])
    if (jss['@layer base'])
      addBase(jss['@layer base'])
  })
}
