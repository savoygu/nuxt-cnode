import type { Config } from 'tailwindcss'
import typography from '@tailwindcss/typography'

export default <Partial<Config>>{
  theme: {
    extend: {
      colors: {
        'primary': 'rgb(var(--color-primary))',
        'info': 'rgb(var(--color-info))',
        'success': 'rgb(var(--color-success))',
        'error': 'rgb(var(--color-error))',
        'color-primary': 'rgb(var(--text-color-primary))',
        'color-regular': 'rgb(var(--text-color-regular))',
        'color-secondary': 'rgb(var(--text-color-secondary))',
        'color-placeholder': 'rgb(var(--text-color-placeholder))',
        'color-disabled': 'rgb(var(--text-color-disabled))',
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
      fontSize: {
        10: '10px',
        11: '11px',
      },
      lineHeight: {
        3.5: '14px',
        7.5: '30px',
      },
      borderRadius: {
        3: '3px',
      },
    },
  },
  plugins: [
    typography,
  ],
}
