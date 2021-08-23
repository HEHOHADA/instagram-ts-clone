import React from 'react'
import styled from 'styled-components'

export interface BaseButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  width?: string;
  height?: string;
  color?: string;
}

export const BaseButton = styled.button<BaseButtonProps>`
  width: ${ ({ width }) => width };
  height: ${ ({ height }) => height };
  cursor: pointer;
  appearance: none;
  padding: 0;
  margin: 0; /* reset for default iOS Safari style */
  font-family: inherit;
  font-size: inherit;
  line-height: inherit;
  background: none;
  border: none;
  outline: none;
  color: ${ ({ color }) => color || 'inherit' };
`
