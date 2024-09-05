import { useEffect, useState } from 'react'
import Image from "next/image";
import sunny from '@public/icons/sunny.png'

const ThemeSwitcher = () => {
  const [theme, setTheme] = useState('light')

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme) {
      setTheme(savedTheme)
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme('dark')
    }
  }, [])

  useEffect(() => {
    document.documentElement.classList.remove('light', 'dark')
    document.documentElement.classList.add(theme)
  }, [theme])

  const toggleTheme = () => {
    if (theme === 'dark') {
      setTheme('light')
      localStorage.setItem('theme', 'light')
    } else {
      setTheme('dark')
      localStorage.setItem('theme', 'dark')
    }
  }

  return (
    <button className="theme-toggle" onClick={toggleTheme}>
      <span
        className={`toggle-circle ${theme === 'dark' ? 'toggle-circle-dark' : ''}`}
      ><Image style={{width: '18px', height: '18px'}} src={sunny} alt='day'/>
      </span>
    </button>
  )
}

export default ThemeSwitcher
