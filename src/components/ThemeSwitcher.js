import sun from '@public/icons/empty-sun.png'
import moon from '@public/icons/new-moon.png'
import Image from 'next/image'
import { useEffect, useState } from 'react'

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
      >
        <Image
          style={{
            width: '15px',
            height: '15px',
            filter: theme === 'light' && 'invert(100%)',
          }}
          src={theme === 'light' ? sun : moon}
          alt="mode-icon"
        />
      </span>
    </button>
  )
}

export default ThemeSwitcher
