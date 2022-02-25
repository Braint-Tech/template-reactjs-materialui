import { Theme, ThemeOptions } from '@mui/material'
import { changeHexColorBrightness } from '../palette'

export const getTypographyOverride = (theme: Theme): ThemeOptions['components'] => ({
  MuiTypography: {
    styleOverrides: {
      h1: {
        fontSize: '1.875rem',
        fontWeight: 'bold'
      },
      h2: {
        fontSize: '1.7rem',
        fontWeight: 'normal'
      },
      h3: {
        fontSize: '1.5rem',
        fontWeight: 'normal'
      },
      body1: {
        fontSize: '1.075rem',
        fontWeight: 'normal',
        color: changeHexColorBrightness(theme.palette.secondary.main, 20)
      },
      body2: {
        fontSize: '0.95rem',
        fontWeight: 'normal',
        color: changeHexColorBrightness(theme.palette.secondary.main, 40)
      }
    }
  }
})