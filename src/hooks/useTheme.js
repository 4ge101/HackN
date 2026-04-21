import { useState, useEffect } from 'react'

export function useTheme() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('hn_theme') || 'dark'
  })

  // Initialize accent color from localStorage on first load
  useEffect(() => {
    const savedAccent = localStorage.getItem('hn_accent') || '#ff8500'
    document.documentElement.style.setProperty('--primary-color', savedAccent)
  }, [])

  useEffect(() => {
    localStorage.setItem('hn_theme', theme)
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  function toggle() {
    setTheme(t => t === 'dark' ? 'light' : 'dark')
  }

  return { theme, toggle, isDark: theme === 'dark' }
}