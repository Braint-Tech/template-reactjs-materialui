import { Button, Stack, Typography } from '@mui/material'
import { FC, useCallback, useMemo } from 'react'
import { stackFlexColumn } from 'tr-utils-la'
import { useActions } from '../../hooks/useActions'
import ModalBase from './Base'

type props = {
  title: string | string[],
  text?: string | string[],
  onConfirm?: () => void,
  confirmButtonText?: string,
  closeOnConfirm?: boolean
}

const Alert: FC<props> = ({ 
  title,
  text,
  onConfirm,
  confirmButtonText = 'Ok',
  closeOnConfirm = true
}) => {

  const { modal$ } = useActions()
  const titles: string[] = useMemo(() => typeof title === 'string' ? [ title ] : title , [ title ])
  const texts: string[] = useMemo(() => {
    if(text){
      return typeof text === 'string' ? [ text ] : text
    }
    return []
  }, [ text ])

  const handleConfirmation = useCallback(() => {
    if(onConfirm){
      onConfirm()
    }
    if(closeOnConfirm){
      modal$.hide()
    }
  }, [ onConfirm, closeOnConfirm, modal$ ])

  return (
    <ModalBase>
      {
        titles.map(
          (_title, index) => (
            <Typography
              variant="h2"
              key={`alert_title_${index}`}
              sx={{ width: '100%' }}
            >
              { _title }
            </Typography>
          )
        )
      }
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
      <Stack { ...stackFlexColumn('flex-end', 'center') } sx={{ width: '100%' }}>
        <Button onClick={ handleConfirmation }>{ confirmButtonText }</Button>
      </Stack>
    </ModalBase>
  )
}

export default Alert