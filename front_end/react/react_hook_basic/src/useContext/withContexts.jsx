import React, { Component, useState } from 'react'
import {
  LanguageContext,
  languages,
  ThemeContext,
  themes,
} from './context'

const withContexts = (WrappedComponent, title) => {
  return () => {
    const [theme, setTheme] = useState(themes.light)
    const [language, setLanguage] = useState(languages.chinese)

    const toggleTheme = () => {
      setTheme(theme === themes.light ? themes.dark : themes.light)
    }

    const toggleLanguage = () => {
      setLanguage(
        language === languages.chinese
          ? languages.english
          : languages.chinese
      )
    }

    return (
      <div>
        <h3>{title}</h3>
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
          <LanguageContext.Provider
            value={{ language, toggleLanguage }}
          >
            <WrappedComponent />
          </LanguageContext.Provider>
        </ThemeContext.Provider>
      </div>
    )
  }
}

export default withContexts
