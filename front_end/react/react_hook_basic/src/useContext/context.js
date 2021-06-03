import React from 'react'

export const themes = {
  light: {
    foreground: '#000000',
    background: '#eeeeee',
  },
  dark: {
    foreground: '#ffffff',
    background: '#222222',
  },
}

export const ThemeContext = React.createContext({
  theme: themes.dark,
  toggleTheme: () => {},
})

export const languages = {
  chinese: '你好',
  english: 'hello',
}

export const LanguageContext = React.createContext({
  language: languages.chinese,
  changeLanguage: () => {},
})
