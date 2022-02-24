import { Button, Stack, TextField, Typography } from '@mui/material'
import { Dispatch, FC, SetStateAction, useCallback, useEffect, useMemo, useState } from 'react'
import { stackFlexRow } from 'tr-utils-la'
import { useActions } from '../../hooks/useActions'
import ModalBase from './Base'

type props = {
  title: string | string[],
  text?: string | string[],
  onConfirm?: (value: string) => void,
  onCancel?: () => void,
  onChange?: (value: string, setValue: Dispatch<SetStateAction<string>>) => void,
  // onKeypress?: () => void,
  // onKeydown?: () => void,
  InputProps?: {
    palceholder?: string,
    defaultValue?: string
  },
  confirmButtonText?: string,
  cancelButtonText?: string,
  closeOnConfirm?: boolean,
  closeOnCancel?: boolean
}

const Prompt: FC<props> = ({
  title,
  text,
  onConfirm,
  onCancel,
  onChange,
  InputProps,
  confirmButtonText = 'Confirmar',
  cancelButtonText = 'Cancelar',
  closeOnConfirm = true,
  closeOnCancel = true
}) => {

  const { modal } = useActions()
  const [ inputValue, setInputValue ] = useState<string>(InputProps?.defaultValue ?? '')
  const titles: string[] = useMemo(() => typeof title === 'string' ? [ title ] : title , [ title ])
  const texts: string[] = useMemo(
    () => 
    !!text ? 
    typeof text === 'string' ? [ text ] : text :
    [], 
  [ text ])

  const handleConfirm = useCallback(() => {
    if(onConfirm){
      onConfirm(inputValue)
    }
    if(closeOnConfirm){
      modal.hide()
    }
  }, [ onConfirm, closeOnConfirm, modal, inputValue ])

  const handleCancel = useCallback(() => {
    if(onCancel){
      onCancel()
    }
    if(closeOnCancel){
      modal.hide()
    }
  }, [ onCancel, closeOnCancel, modal ])

  useEffect(() => {
    if(onChange){
      onChange(inputValue, setInputValue)
    }
  }, [ onChange, inputValue ])

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
      <TextField
        fullWidth
        value={ inputValue }
        onChange={(e) => setInputValue(e.target.value)}
      />
      <Stack { ...stackFlexRow('flex-end', 'center') } sx={{ width: '100%' }} spacing={ 2 }>
        <Button onClick={ handleCancel } color='secondary'>{ cancelButtonText }</Button>
        <Button onClick={ handleConfirm }>{ confirmButtonText }</Button>
      </Stack>
    </ModalBase>
  )
}

export default Prompt