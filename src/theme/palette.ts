import { ThemeOptions } from "@mui/material";

export const palette: ThemeOptions["palette"] = {
  
}

export function changeHexColorBrightness(hexColor: string, percentage: number): string {
  const _percentage = (percentage > 100 ? 
  100 : 
  ( 
    percentage < -100 ?
    -100 : 
    percentage
  )) / 100

  if(hexColor.length < 7){
    console.warn(`Invalid HexColor "${hexColor}"`)
    return hexColor
  }

  try{
    const r = parseInt(hexColor.substring(1, 3), 16)
    const g = parseInt(hexColor.substring(3, 5), 16)
    const b = parseInt(hexColor.substring(5, 7), 16)
    
    const rgb = [ r, g, b ]

    const invalidRGBValues = rgb.filter(v => v > 255 || v < 0)
    if(invalidRGBValues.length > 0){
      console.warn(`Ivalid RGB color (${r}, ${g}, ${b})`)
      return hexColor
    }

    const diffs = rgb.map(v => 255 - v)

    const diffsNormalized = diffs.map(v => Math.floor(v * _percentage))

    const finalValues = diffsNormalized.map((v, i) => v + rgb[i])

    const finalString = finalValues.reduce((res, curr) => 
      res += curr.toString(16).length > 1 ? curr.toString(16) : `0${curr.toString(16)}`, '')

    return `#${finalString}`

  }catch(e){
    console.warn(`Invalid HexColor "${hexColor}"`)
    return hexColor
  }
}