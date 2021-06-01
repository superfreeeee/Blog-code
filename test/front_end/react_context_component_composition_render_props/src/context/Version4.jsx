import React, { Component } from 'react'
import { ThemeContext } from './ThemeContext2'
import themes from './themes'

class ThemedButton extends Component {
  static contextType = ThemeContext

  render() {
    const { theme, toggleTheme } = this.context
    return (
      <button
        onClick={toggleTheme}
        style={{
          backgroundColor: theme.background,
          color: theme.foreground,
        }}
      >
        {this.props.children}
      </button>
    )
  }
}

function ToolBar() {
  return <ThemedButton>Change theme</ThemedButton>
}

class Version4 extends Component {
  constructor(props) {
    super(props)

    this.toggleTheme = this.toggleTheme.bind(this)

    this.state = {
      theme: themes.light,
      // 将状态改变也通过 context 上下文传递
      toggleTheme: this.toggleTheme,
    }
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
        <ThemeContext.Provider value={this.state}>
          <ToolBar />
        </ThemeContext.Provider>
      </div>
    )
  }
}

export default Version4
