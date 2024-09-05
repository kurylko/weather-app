'use client'

import './global.css'

import { Manrope } from 'next/font/google'
import { useEffect, useState } from 'react'

import Footer from '@/components/Footer'
import Header from '@/components/Header'

import StoreProvider from './../state/StoreProvider'

const manrope = Manrope({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
})

export default function RootLayout({ children }) {
  const [theme, setTheme] = useState('light')

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme')
    const systemPrefersDark = window.matchMedia(
      '(prefers-color-scheme: dark)'
    ).matches

    if (storedTheme) {
      setTheme(storedTheme)
    } else if (systemPrefersDark) {
      setTheme('dark')
    }
  }, [])

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [theme])

  return (
    <html lang="en" className={theme}>
      <head>
        <title>Weather</title>
        <meta name="description" content="Weather App" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className={manrope.className}>
        <StoreProvider>
          <Header />
          <main>{children}</main>
        </StoreProvider>
        <Footer />
      </body>
    </html>
  )
}
