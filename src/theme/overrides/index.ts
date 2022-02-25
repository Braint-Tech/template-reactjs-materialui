import { Theme, ThemeOptions } from "@mui/material"
import { getButtonOverride } from "./button"
import { getTypographyOverride } from './typography'

export const getOverrides = (theme: Theme): ThemeOptions["components"] => ({
  ...getButtonOverride(theme),
  ...getTypographyOverride(theme)
})