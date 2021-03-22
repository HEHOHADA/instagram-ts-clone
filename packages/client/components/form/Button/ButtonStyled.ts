import { ColorName, SizeMap, WithTheme } from '@/themes'
import { mix } from 'polished'
import styled, { css } from 'styled-components'
import { ButtonProps } from './Button'

export interface ButtonWidthMap {
  [key: string]: string;

  auto: string;
  full: string;
}

export type ButtonSizeMap = SizeMap;

export const paddingSizeMap: ButtonSizeMap = {
  small: '3px 16px',
  medium: '4px 16px',
  big: '6px 16px'
}

export const heightSizeMap: ButtonSizeMap = {
  small: '24px',
  medium: '32px',
  big: '40px'
}

export const widthMap: ButtonWidthMap = {
  auto: 'auto',
  full: '100%'
}

export const sizeMap: SizeMap<number> = {
  small: 16,
  medium: 20,
  big: 24
}

export interface ButtonActionBackgroundMap {
  [key: string]: string;
}

export const actionBackgroundMap: ButtonActionBackgroundMap = {
  primary: 'rgba(255, 45, 89, 1)' // #ff2d59
}

// avoid passing down to HTML attributes (currently only "loading"), and solve this error:
// "Warning: Received `true` for a non-boolean attribute `loading`"
interface StyledButtonProps extends Omit<ButtonProps, 'loading'>, WithTheme {
  isLoading?: boolean;
}

export const setDisabledStyles = (
  backgroundColor: string,
  foregroundColor: string,
  borderColor: string,
  opacity?: number
) => ({ theme }: WithTheme) => {
  return css`
    &:disabled,
    &[disabled] {
      cursor: not-allowed;
      background-color: ${ theme.colors[backgroundColor as ColorName] || backgroundColor };
      border-color: ${ theme.colors[borderColor as ColorName] || borderColor };
      color: ${ theme.colors[foregroundColor as ColorName] || foregroundColor };
      fill: ${ theme.colors[foregroundColor as ColorName] || foregroundColor };
      opacity: ${ opacity };
    }
  `
}

export type IconWrapperProps = Pick<ButtonProps, 'size'>;

const indentBySize: SizeMap<number> = {
  big: 18,
  medium: 8,
  small: 8
}

export const IconWrapper = styled.span<IconWrapperProps>(
  ({ size }) => css`
    display: flex;
    align-items: center;
    justify-content: center;
    height: ${ sizeMap[size] }px;
    width: ${ sizeMap[size] }px;

    svg {
      width: 100%;
      height: 100%;
    }
  `
)

export const ButtonContentWrapper = styled.span<{ isLoading: boolean }>`
  display: flex;
  align-items: center;
  overflow: hidden;
  height: ${ ({ isLoading }) => (isLoading ? '0' : '100%') };
`

export const ButtonStyled = styled.button((props: StyledButtonProps) => {
  const { theme, color, textColor, width, size, align, isLoading, outlined } = props
  let backgroundColor = theme.colors[color] || color
  let actionBgColor = isLoading
    ? backgroundColor
    : actionBackgroundMap[color] || mix(0.1, '#000', backgroundColor)
  let disabledBackgroundColor = isLoading ? backgroundColor : theme.colors['platinum']
  let foregroundColor = theme.colors[textColor] || textColor
  let hoverForegroundColor = foregroundColor
  let disabledForegroundColor = isLoading ? foregroundColor : theme.colors['greyLight']
  let disabledBorderColor = ''
  const altColorValue = props.altColor ? theme.colors[props.altColor] : '#000'
  const mirroredIconStyles = css`
    svg {
      [dir='ltr'] & {
        transform: scaleX(-1);
      }
    }
  `

  if (outlined) {
    foregroundColor = props.isLoading ? altColorValue : foregroundColor
    backgroundColor = actionBgColor = disabledBackgroundColor = '#fff'
    disabledForegroundColor = disabledBorderColor = props.isLoading
      ? altColorValue
      : theme.colors['greyLight']
    hoverForegroundColor = altColorValue
  }

  return css`
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: ${ align };
    overflow: hidden;
    box-sizing: border-box; /* for cases when "as" prop is used -> no button defaults */
    border: none;
    border-radius: 4px;
    line-height: 1.5;
    cursor: pointer;
    font-size: ${ theme.fonts.sizes[size] };
    outline: none;
    padding: ${ paddingSizeMap[size] };
    width: ${ widthMap[width] || width };
    height: ${ heightSizeMap[size] };
    color: ${ foregroundColor };
    fill: ${ foregroundColor };
    background-color: ${ backgroundColor };
    white-space: ${ props.noWrap && 'nowrap' };

    &:focus {
      color: ${ foregroundColor };
      fill: ${ foregroundColor };
      background-color: ${ actionBgColor };

      &:not(:active) {
        box-shadow: ${ props.focusShadow &&
        `0px 0px 3px 1px ${ theme.colors.brandeisBlue }` };
      }
    }

    &:hover,
    &:active {
      border-color: ${ hoverForegroundColor };
      color: ${ hoverForegroundColor };
      fill: ${ hoverForegroundColor };
      background-color: ${ actionBgColor };
    }

    ${ setDisabledStyles(
            disabledBackgroundColor,
            disabledForegroundColor,
            disabledBorderColor
    ) }
    ${ props.mirroredIcon && mirroredIconStyles }
    ${ outlined &&
    css`
      border: 2px solid ${ foregroundColor };
    ` }
    ${ ButtonContentWrapper } {
      justify-content: ${ align };
    }
  `
})

export const setGreyDisabledStyles = setDisabledStyles(
  'platinum',
  'greyLight',
  'platinum'
)

export const setWhiteDisabledStyles = setDisabledStyles(
  'white',
  'greyLight',
  'greyLight'
)
