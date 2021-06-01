import React, { Component } from 'react'
import { ThemeContext } from './ThemeContext'
import themes from './themes'

class ThemedButton extends Component {
  // 使用 contextType
  static contextType = ThemeContext

  render() {
    const theme = this.context
    const { children, onClick } = this.props
    return (
      <button
        onClick={onClick}
        style={{
          backgroundColor: theme.background,
          color: theme.foreground,
        }}
      >
        {children}
      </button>
    )
  }
}

function ToolBar(props) {
  return (
    <ThemedButton onClick={props.changeTheme}>
      Change theme
    </ThemedButton>
  )
}

class Version2 extends Component {
  constructor(props) {
    super(props)
    this.state = {
      theme: themes.light,
    }
    this.toggleTheme = this.toggleTheme.bind(this)
  }

  toggleTheme() {
    this.setState({
      theme:
        this.state.theme === themes.light
          ? themes.dark
          : themes.light,
    })
  }

  render() {
    return (
      <div>
        <ThemeContext.Provider value={this.state.theme}>
          <ToolBar changeTheme={this.toggleTheme} />
        </ThemeContext.Provider>
      </div>
    )
  }
}

export default Version2
