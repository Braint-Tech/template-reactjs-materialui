import { flexRow } from 'tr-utils-la'
import { withTheme } from '../../theme'

export const alertBoxContainer = withTheme((theme) => ({
  ...flexRow('space-between', 'center'),
  width: '90%',
  maxWidth: '450px',
  padding: theme.spacing(1.5),
  height: 'auto',
  minHeight: '60px',
  maxHeight: '120px',
  ...theme.shape,
  boxShadow: theme.shadows[2],
  background: 'black',
  color: 'white',
  position: 'fixed',
  bottom: '30px',
  left: '30px',
}))