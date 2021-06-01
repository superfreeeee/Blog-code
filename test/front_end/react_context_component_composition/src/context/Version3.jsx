import React, { Component } from 'react'
import { ThemeContext } from './ThemeContext'
import themes from './themes'
import { UserContext } from './UserContext'
import users from './users'

// multiple context
function ToolBar(props) {
  const { toggleTheme, signIn } = props
  return (
    <>
      <ThemeContext.Consumer>
        {(theme) => (
          <button
            onClick={toggleTheme}
            style={{
              backgroundColor: theme.background,
              color: theme.foreground,
            }}
          >
            Change theme
          </button>
        )}
      </ThemeContext.Consumer>
      <br />
      <button onClick={() => signIn(users.donovan)}>
        Sign in as Donovan
      </button>
      <button onClick={() => signIn(users.alice)}>
        Sign in as Alice
      </button>
      <button onClick={() => signIn(null)}>Sign out</button>
      <UserContext.Consumer>
        {(user) => {
          return (
            <div>
              <h3 style={{ margin: '5px 0' }}>
                User: {user ? `${user.name}, ${user.age}` : ''}
              </h3>
            </div>
          )
        }}
      </UserContext.Consumer>
    </>
  )
}

class Version3 extends Component {
  constructor(props) {
    super(props)
    this.state = {
      theme: themes.light,
      user: users.donovan,
    }
    this.toggleTheme = this.toggleTheme.bind(this)
    this.signIn = this.signIn.bind(this)
  }

  toggleTheme() {
    this.setState({
      theme:
        this.state.theme === themes.light
          ? themes.dark
          : themes.light,
    })
  }

  signIn(user) {
    this.setState({ user })
  }

  render() {
    return (
      <div>
        <ThemeContext.Provider value={this.state.theme}>
          <UserContext.Provider value={this.state.user}>
            <ToolBar
              toggleTheme={this.toggleTheme}
              signIn={this.signIn}
            />
          </UserContext.Provider>
        </ThemeContext.Provider>
      </div>
    )
  }
}

export default Version3
