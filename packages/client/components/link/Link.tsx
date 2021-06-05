import { routes } from '@/helpers/routing/routes'
import NextLink, { LinkProps as NextLinkProps } from 'next/link'
import React, { FC, PropsWithChildren, useMemo } from 'react'

export interface LinkProps extends Omit<NextLinkProps, 'href'> {
  /** route name static routes */
  to?: keyof typeof routes
  href?: NextLinkProps['href']
  children?: React.ReactChild | null | Record<string, any>;
  onClick?: React.MouseEventHandler
  wrapper?: 'a' | React.FC
  hash?: string
  params?: { [key: string]: string }
}

const DefaultWrapper = 'a'

export const Link = React.forwardRef<HTMLAnchorElement, PropsWithChildren<LinkProps>>(({
  to,
  href,
  passHref = true,
  wrapper: Wrapper = DefaultWrapper,
  onClick,
  hash = '',
  children,
  params,
  ...restProps
},ref) => {
  const paramsString = useMemo(() => {
    return params && Object.keys(params).length > 0
      ? `?${ Object.keys(params)
                   .map((key) => `${ key }=${ params[key] }`)
                   .join('&') }`
      : ''
  }, [params])

  return (
    <NextLink
      href={ href ?? `${ routes[to ?? 'home'] }${ paramsString }${ hash && `#${ hash }` }` }
      passHref={ passHref }
      { ...restProps }>
      { React.isValidElement(children) ? (
        React.cloneElement(children, {
          ref,
          onClick: (event: React.MouseEvent) => {
            onClick?.(event)
            if (children.props && typeof children.props.onClick === 'function') {
              children.props.onClick(event)
            }
          }
        })
      ) : (
        <Wrapper ref={ref}>{ children }</Wrapper>
      ) }
    </NextLink>
  )
})
