import Router from 'next/router'
import NProgress from 'nprogress'

let timer: NodeJS.Timeout
let state: string
let activeRequests = 0
const delay = 250
NProgress.configure({easing: 'ease', speed: 500})

function load() {
  if (state === 'loading') {
    return
  }

  state = 'loading'

  // @ts-ignore
  timer = setTimeout(function () {
    NProgress.start()
  }, delay) // only show progress bar if it takes longer than the delay
}

function stop() {
  if (activeRequests > 0) {
    return
  }

  state = 'stop'

  clearTimeout(timer)
  NProgress.done()
}

Router.events.on('routeChangeStart', load)
Router.events.on('routeChangeComplete', stop)
Router.events.on('routeChangeError', stop)

const originalFetch = window.fetch
window.fetch = async function (...args) {
  if (activeRequests === 0) {
    load()
  }

  activeRequests++

  try {
    return await originalFetch(...args)
  } catch (error) {
    return Promise.reject(error)
  } finally {
    activeRequests -= 1
    if (activeRequests === 0) {
      stop()
    }
  }
}

function TopProgressBar() {
  return null
}

export default TopProgressBar
