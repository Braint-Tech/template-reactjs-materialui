import { Theme, ThemeOptions } from "@mui/material"
import { getButtonOverrides } from "./button"

export const getOverrides = (theme: Theme): ThemeOptions["components"] => ({
  ...getButtonOverrides(theme)
})