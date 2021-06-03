import React, { Component } from 'react'
import { LanguageContext, ThemeContext } from './context'
import withContexts from './withContexts'

class ClassVersion extends Component {
  render() {
    return (
      <ThemeContext.Consumer>
        {({ theme, toggleTheme }) => (
          <LanguageContext.Consumer>
            {({ language, toggleLanguage }) => (
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
            )}
          </LanguageContext.Consumer>
        )}
      </ThemeContext.Consumer>
    )
  }
}

export default withContexts(ClassVersion, 'In Class Component')
