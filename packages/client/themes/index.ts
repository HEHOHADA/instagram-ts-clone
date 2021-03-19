import { css } from 'styled-components'
import { rgba as polishedRGBA } from 'polished'
import { colors } from './default/colors'
import { fonts } from './default/fonts'

export * from './default'
export * from './hooks'
export * from './AppThemeProvider'

export interface SizeMap<T = string> {
  small: T
  medium: T
  big: T
}

export type Size = keyof SizeMap

export type ColorNames = typeof colors
export type ColorName = keyof ColorNames
export type Colors = ColorNames
export type Fonts = typeof fonts
export type FontSize = keyof Fonts['sizes']

export interface Theme {
  colors: Colors
  fonts: Fonts
}

export interface WithTheme {
  theme: Theme
}

export interface DisabledProp {
  disabled: boolean
}

export const fontSize = (size: FontSize) => ({ theme }: WithTheme) =>
  css`
    font-size: ${theme.fonts.sizes[size]};
  `

export const themeFontSize = (size: FontSize) => ({ theme }: WithTheme) => theme.fonts.sizes[size]

export const themeColor = (color: ColorName) => ({ theme }: WithTheme) => theme.colors[color]

export const rgba = (color: keyof ColorNames, alpha: number) => ({ theme }: WithTheme) =>
  polishedRGBA(theme.colors[color], alpha)

export const setDisabledColor = (disabledColor: ColorName, color: ColorName) =>
  css<DisabledProp>(({ theme, disabled }) => theme.colors[disabled ? disabledColor : color])

export interface ErrorProp {
  error?: boolean
}

type SetColorByStateProps = DisabledProp & ErrorProp & WithTheme

export const setColorByState = (normal: ColorName, disabled?: ColorName, error?: ColorName) => ({
  disabled: isDisabled,
  error: hasError,
  theme
}: SetColorByStateProps) => {
  const color = (isDisabled ? disabled : hasError ? error : normal) ?? normal
  return theme.colors[color]
}
