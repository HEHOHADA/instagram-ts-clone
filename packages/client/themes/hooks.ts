import { useContext } from 'react'
import { ThemeContext } from 'styled-components'
import { rgba } from 'polished'

export const useThemeColor = (colorName?: string) => {
  const theme = useContext(ThemeContext)
  return colorName ? theme.colors[colorName] : colorName
}

export const useThemeColors = (colorNames: string[]) => {
  const theme = useContext(ThemeContext)
  return colorNames.map((name) => theme.colors[name] || name)
}

export const useRGBA = (color: string, alpha: number) => rgba(useThemeColor(color) ?? color, alpha)
