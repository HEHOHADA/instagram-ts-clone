import React, { FC } from 'react'

export type IconProps = {
  className?: string
  iconName: string
}

export const Icon: FC<IconProps> = ({ className, iconName }) => {
  return (
    <i className={ `material-icons${ className??'' }` }>
      { iconName }
    </i>
  )
}
