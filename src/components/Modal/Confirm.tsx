import { Button, Stack, Typography } from '@mui/material'
import { FC, useCallback, useMemo } from 'react'
import { stackFlexRow } from 'tr-utils-la'
import { useActions } from '../../hooks/useActions'
import ModalBase from './Base'

type props = {
  title: string | string[],
  text?: string | string[],
  onConfirm?: () => void,
  onCancel?: () => void,
  onEither?: () => void,
  confirmButtonText?: string,
  cancelButtonText?: string,
  closeOnConfirm?: boolean,
  closeOnCancel?: boolean
}

const Confirm: FC<props> = ({
  title,
  text,
  onConfirm,
  onCancel,
  onEither,
  confirmButtonText = 'Confirmar',
  cancelButtonText = 'Cancelar',
  closeOnConfirm = true,
  closeOnCancel = true
}) => {

  const { modal } = useActions()
  const titles: string[] = useMemo(() => typeof title === 'string' ? [ title ] : title , [ title ])
  const texts: string[] = useMemo(
    () => 
    !!text ? 
    typeof text === 'string' ? [ text ] : text :
    [], 
  [ text ])

  const handleConfirm = useCallback(() => {
    if(onConfirm){
      onConfirm()
      if(onEither) onEither()
    }
    if(closeOnConfirm){
      modal.hide()
    }
  }, [ onConfirm, closeOnConfirm, modal, onEither ])

  const handleCancel = useCallback(() => {
    if(onCancel){
      onCancel()
      if(onEither) onEither()
    }
    if(closeOnCancel){
      modal.hide()
    }
  }, [ onCancel, closeOnCancel, modal, onEither ])

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
      <Stack { ...stackFlexRow('flex-end', 'center') } sx={{ width: '100%' }} spacing={ 2 }>
        <Button onClick={ handleCancel } color='secondary'>{ cancelButtonText }</Button>
        <Button onClick={ handleConfirm }>{ confirmButtonText }</Button>
      </Stack>
    </ModalBase>
  )
}

export default Confirm