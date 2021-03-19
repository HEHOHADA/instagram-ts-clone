import { useEffect } from 'react'
import { Router } from 'next/router'

export const useRouterEvent = (
  callback: (url: string) => void,
  canceled = false,
  eventName = 'routeChangeStart'
) => {
  useEffect(() => {
    if (canceled) {
      return
    }
    const handleRouteChange = (url: string) => {
      callback(url)
    }
    Router.events.on(eventName, handleRouteChange)

    return () => {
      Router.events.off(eventName, handleRouteChange)
    }
  }, [canceled, callback, eventName])
}
