import { routes } from '@/helpers/routing/routes'
import NextLink, { LinkProps as NextLinkProps } from 'next/link'
import React, { FC, PropsWithChildren, useMemo } from 'react'

export interface LinkProps extends Omit<NextLinkProps, 'href'> {
  /** route name static routes */
  to?: keyof typeof routes;
  href?: NextLinkProps['href'];
  children?: React.ReactChild | null | Record<string, any>;
  onClick?: React.MouseEventHandler;
  wrapper?: 'a' | React.FC;
  hash?: string;
  params?: { [key: string]: string };
}

const DefaultWrapper = 'a'

export const Link: FC<PropsWithChildren<LinkProps>> = ({
  to,
  href,
  passHref = true,
  wrapper: Wrapper = DefaultWrapper,
  onClick,
  hash = '',
  children,
  params,
  ...restProps
}) => {
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
          onClick: (event: React.MouseEvent) => {
            onClick?.(event)
            if (children.props && typeof children.props.onClick === 'function') {
              children.props.onClick(event)
            }
          }
        })
      ) : Wrapper === 'a' ? (
        <a>{ children }</a>
      ) : (
        <Wrapper>{ children }</Wrapper>
      ) }
    </NextLink>
  )
}
