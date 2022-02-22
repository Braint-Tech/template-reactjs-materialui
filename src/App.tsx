import { ThemeProvider } from '@mui/material'
import { HelmetProvider } from 'react-helmet-async'
import Routes from './routes'
import theme from './theme'

const App = () => {
  return (
    <HelmetProvider>
      <ThemeProvider theme={theme}>
        <Routes/>
      </ThemeProvider>
    </HelmetProvider>
  )
}

export default App
