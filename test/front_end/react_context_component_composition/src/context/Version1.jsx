import React, { Component } from 'react'
import { ThemeContext } from './ThemeContext'
import themes from './themes'

class StyledButton extends Component {
  render() {
    console.log('styled button 1')
    const { children, ...props } = this.props
    return <button {...props}>{children}</button>
  }
}

function StyledButton2(props) {
  console.log('styled button 2')
  const { children, ...rest } = props
  return <button {...rest}>{children}</button>
}

class ThemedButton extends Component {
  render() {
    const { children, onClick } = this.props
    return (
      <ThemeContext.Consumer>
        {(theme) => {
          const props = {
            children,
            onClick,
            style: {
              backgroundColor: theme.background,
              color: theme.foreground,
            },
          }
          return <StyledButton {...props} />
          return <StyledButton2 {...props} />
        }}
      </ThemeContext.Consumer>
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

class Version1 extends Component {
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

export default Version1
