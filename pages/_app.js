import { useEffect, useState } from 'react'
import Nav from '../components/nav'
import '../styles/globals.css'
import '../styles/nprogress.css'
import nProgress from 'nprogress'
import { Router } from 'next/router'
import { Toaster } from 'react-hot-toast'

nProgress.configure({ showSpinner: false })

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    const handleStart = () => nProgress.start()
    const handleStop = () => nProgress.done()
    Router.events.on('routeChangeStart', handleStart)
    Router.events.on('routeChangeComplete', handleStop)
    Router.events.on('routeChangeError', handleStop)

    return () => {
      Router.events.off('routeChangeStart', handleStart)
      Router.events.off('routeChangeComplete', handleStop)
      Router.events.off('routeChangeError', handleStop)
    }
  }, [])

  return (
    <>
      <Nav />
      <main>
        <Component {...pageProps} />
      </main>
      <Toaster />
    </>
  )
}

export default MyApp
