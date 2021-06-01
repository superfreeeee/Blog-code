import React, { Component } from 'react'
import { ThemeContext } from './ThemeContext'
import themes from './themes'

class ThemedButton extends Component {
  render() {
    const { children, theme, ...restProps } = this.props
    console.log('children', children)
    console.log('theme', theme)
    console.log('restProps', restProps)
    console.log('context', this.context)
    return (
      <button
        {...restProps}
        // style={{
        //   backgroundColor: theme.background,
        //   color: theme.foreground,
        // }}
      >
        {children}
      </button>
    )
  }
}

ThemedButton.contextType = ThemeContext

function ToolBar(props) {
  console.log('ToolBar props', props.changeTheme)

  return (
    <ThemedButton onClick={props.changeTheme}>
      Change Theme
    </ThemedButton>
    // <ThemeContext.Consumer>
    //   {(theme) => {
    //     console.log('theme', theme)
    //     return (
    //       <ThemedButton theme={theme} onClick={props.changeTheme}>
    //         Change Theme
    //       </ThemedButton>
    //     )
    //   }}
    // </ThemeContext.Consumer>
  )
}

class Version4 extends Component {
  constructor(props) {
    super(props)
    this.state = {
      theme: themes.light,
    }
    this.toggleTheme = this.toggleTheme.bind(this)
  }

  toggleTheme() {
    console.log('toggle theme')
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
          {/* <ThemeContext.Consumer>
            {(value) => {
              console.log('consumer value', value)
              return (
                <div>
                  <div>{value.toString()}</div>
                  <button onClick={this.toggleTheme}>Change</button>
                </div>
              )
            }}
          </ThemeContext.Consumer> */}
          {/* <ThemeContext.Consumer>
            {(theme) => (
              <ThemedButton theme={theme} onClick={this.toggleTheme}>
                Change Theme
              </ThemedButton>
            )}
          </ThemeContext.Consumer> */}
        </ThemeContext.Provider>
      </div>
    )
  }
}

export default Version4
