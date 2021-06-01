import React, { Component } from 'react'
import { ThemeContext } from './ThemeContext'
import themes from './themes'

class ThemedButton extends Component {
  render() {
    const { props, context: theme } = this
    return (
      <button
        {...props} // render children
        style={{
          backgroundColor: theme.background,
          color: theme.foreground,
        }}
      />
    )
  }
}

ThemedButton.contextType = ThemeContext

function ToolBar(props) {
  return (
    <ThemedButton onClick={props.changeTheme}>
      Change Theme
    </ThemedButton>
  )
}

class Version3 extends Component {
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

export default Version3
