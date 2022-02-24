import { Container, Modal, ThemeProvider } from '@mui/material'
import { HelmetProvider } from 'react-helmet-async'
import { flexColumn } from 'tr-utils-la'
import Notification from './components/Notification/Notification'
import { useStore } from './hooks/useStore'
import Routes from './routes'
import theme, { withTheme } from './theme'

const modalContainer = withTheme((theme) => ({
  ...flexColumn('center', 'center'),
  height: '100vh',
  maxWidth: 'none !important'
}))

const App = () => {

  const { modal, notification } = useStore()

  return (
    <HelmetProvider>
      <ThemeProvider theme={theme}>
        <Routes/>
        { notification.showing && <Notification text={ notification.text }/> }
        <Modal open={modal.open}>
          <Container sx={ modalContainer }>
            { modal.component }
          </Container>
        </Modal>
      </ThemeProvider>
    </HelmetProvider>
  )
}

export default App
