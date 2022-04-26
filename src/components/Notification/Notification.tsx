import { Close } from '@mui/icons-material'
import { Box, IconButton, Typography } from '@mui/material'
import { FC, useEffect, useMemo } from 'react'
import { useActions } from '../../hooks/useActions'
import { useStore } from '../../hooks/useStore'
import { alertBoxContainer } from './Notification.styles'

type props = {
  text: string | string[]
}

const Notification: FC<props> = ({ text }) => {

  const { notification$ } = useActions()
  const { notification } = useStore()
  const texts: string[] = useMemo(() => (typeof text === 'string' ? [text] : text), [text]);

  useEffect(() => {
    if(notification.showing){
      const timeout = setTimeout(() => {
        notification$.changeVisibility(false)
      }, notification.timeout)
      return () => {
        clearTimeout(timeout)
      }
    }
  }, [ notification, notification$ ])

  return (
    <Box sx={ alertBoxContainer }>
      {
        texts.map(
          (_text, index) => (
            <Typography
              variant="body1"
              key={`alert_title_${index}`}
              sx={{ width: '100%' }}
            > 
              { _text }
            </Typography>
          )
        )
      }
      <IconButton onClick={() => notification$.changeVisibility(false)}>
        <Close sx={{ color: 'white' }}/>
      </IconButton>
    </Box>
  )
}

export default Notification