import type { Config } from 'tailwindcss'

export default <Partial<Config>>{
  theme: {
    extend: {
      colors: {
        primary: 'rgb(var(--color-primary))',
        secondary: '#26A69A',
        accent: '#9C27B0',
        error: '#F44336',
        warning: '#FF9800',
        info: 'rgb(var(--color-info))',
        success: 'rgb(var(--color-success))',
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
    },
  },
}
