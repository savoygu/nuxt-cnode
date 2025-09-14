import type { Config } from 'tailwindcss'

export default <Partial<Config>>{
  theme: {
    extend: {
      colors: {
        primary: '#1E88E5',
        secondary: '#26A69A',
        accent: '#9C27B0',
        error: '#F44336',
        warning: '#FF9800',
        info: '#2196F3',
        success: '#4CAF50',
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
