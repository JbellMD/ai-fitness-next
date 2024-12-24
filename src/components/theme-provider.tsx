'use client'

import * as React from 'react'
import { ThemeProvider as NextThemesProvider, useTheme } from 'next-themes'

const ThemeContext = React.createContext<{
  theme?: string
  toggleTheme: () => void
  setTheme: (theme: string) => void
}>({
  toggleTheme: () => {},
  setTheme: () => {},
})

export interface ThemeProviderProps {
  children: React.ReactNode
  attribute?: string
  defaultTheme?: string
  enableSystem?: boolean
  disableTransitionOnChange?: boolean
}

export function ThemeProvider({
  children,
  ...props
}: ThemeProviderProps) {
  const [mounted, setMounted] = React.useState(false)
  const { theme, setTheme } = useTheme()

  React.useEffect(() => {
    setMounted(true)
  }, [])

  const toggleTheme = React.useCallback(() => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }, [theme, setTheme])

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      <NextThemesProvider {...props}>
        {mounted && children}
      </NextThemesProvider>
    </ThemeContext.Provider>
  )
}

function useThemeContext() {
  const { theme, setTheme } = useTheme()
  
  const toggleTheme = React.useCallback(() => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }, [theme, setTheme])

  return {
    theme,
    setTheme,
    toggleTheme,
  }
}

export { useThemeContext as useTheme }
