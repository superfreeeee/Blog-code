import React, { Component } from 'react'
import {
  LanguageContext,
  languages,
  ThemeContext,
  themes,
} from './context'

const withContexts = (WrappedComponent, title) => {
  return class extends Component {
    constructor(props) {
      super(props)
      this.state = {
        theme: themes.light,
        language: languages.chinese,
      }
      this.toggleTheme = this.toggleTheme.bind(this)
      this.toggleLanguage = this.toggleLanguage.bind(this)
    }

    toggleTheme() {
      this.setState({
        theme:
          this.state.theme === themes.light
            ? themes.dark
            : themes.light,
      })
    }

    toggleLanguage() {
      this.setState({
        language:
          this.state.language === languages.chinese
            ? languages.english
            : languages.chinese,
      })
    }

    render() {
      const { theme, language } = this.state
      const themeData = {
        theme,
        toggleTheme: this.toggleTheme,
      }
      const languageData = {
        language,
        toggleLanguage: this.toggleLanguage,
      }
      return (
        <div>
          <h3>{title}</h3>
          <ThemeContext.Provider value={themeData}>
            <LanguageContext.Provider value={languageData}>
              <WrappedComponent />
            </LanguageContext.Provider>
          </ThemeContext.Provider>
        </div>
      )
    }
  }
}

export default withContexts
