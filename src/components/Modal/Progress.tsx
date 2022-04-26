import { Box, Button, Stack, SxProps, Typography } from '@mui/material'
import { FC, useCallback, useEffect, useMemo, useState } from 'react'
import { stackFlexRow } from 'tr-utils-la'
import { useActions } from '../../hooks'
import { withTheme } from '../../theme'
import ModalBase from './Base'

const defaultContainerStyles = withTheme((theme) => ({
  width: '100%',
  height: '50px',
  background: theme.palette.primary.light
}))

const getFillStyles = (percentage: number) => withTheme((theme) => ({
  width: `${percentage >= 0 && percentage <= 100 ? percentage : 0}%`,
  height: '50px',
  background: theme.palette.primary.main,
  transition: '.3s ease'
}))

type props = {
  title: string | string[],
  percentage: number,
  text?: string | string[],
  onClose?: () => void,
  closeButtonText?: string,
  closeOnReaching100Percent?: boolean,
  delayToCloseMS?: number,
  ProgressBarProps?: {
    container?: {
      sx?: SxProps
    },
    fill?: {
      sx?: SxProps
    }
  }
}

const Progress: FC<props> = ({
  title,
  percentage,
  text,
  onClose,
  closeButtonText = 'Fechar',
  ProgressBarProps,
  closeOnReaching100Percent = true,
  delayToCloseMS = 600
}) => {

  const { modal$ } = useActions()
  const [ _percentage, setPercentage ] = useState<number>(percentage)
  const titles: string[] = useMemo(() => typeof title === 'string' ? [ title ] : title , [ title ])
  const texts: string[] = useMemo(
    () => 
    !!text ? 
    typeof text === 'string' ? [ text ] : text :
    [], 
  [ text ])

  useEffect(() => {
    setPercentage(percentage)
  }, [ percentage ])

  // console.log('p:', modal.modalProgressPercentage)

  // useEffect(() => {
  //   if(closeOnReaching100Percent && percentage >= 100){
  //     setTimeout(() => modal.hide(), delayToCloseMS)
  //   }
  // }, [closeOnReaching100Percent, modal, percentage, delayToCloseMS])

  const handleClose = useCallback(() => {
    if(onClose) onClose()
    modal$.hide()
  }, [ onClose, modal$ ])

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
      <Box
        sx={{
          ...defaultContainerStyles,
          ...(
            !!ProgressBarProps && !!ProgressBarProps.container && !!ProgressBarProps.container.sx ?
            (ProgressBarProps.container.sx as any) :
            {}
          )
        }}
      > 
        <Box sx={{
          ...getFillStyles(_percentage),
          ...(
            !!ProgressBarProps && !!ProgressBarProps.fill && !!ProgressBarProps.fill.sx ?
            (ProgressBarProps.fill.sx as any) :
            {}
          )
        }}>

        </Box>
      </Box>
      <Stack { ...stackFlexRow('flex-end', 'center') } sx={{ width: '100%' }} spacing={ 2 }>
        <Button onClick={ handleClose }>{ closeButtonText }</Button>
      </Stack>
    </ModalBase>
  )
}

export default Progress