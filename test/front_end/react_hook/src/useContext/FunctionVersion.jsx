import React, { useContext } from 'react'
import { LanguageContext, ThemeContext } from './context'
import withContexts from './withContexts'

function FunctionVersion() {
  const { theme, toggleTheme } = useContext(ThemeContext)
  const { language, toggleLanguage } = useContext(LanguageContext)

  return (
    <div>
      <div
        style={{
          width: '200px',
          height: '40px',
          backgroundColor: theme.background,
          color: theme.foreground,
        }}
      >
        {language}
      </div>
      <button onClick={toggleTheme}>改变主题</button>
      <button onClick={toggleLanguage}>改变语言</button>
    </div>
  )
}

export default withContexts(FunctionVersion, 'In Function Component')
