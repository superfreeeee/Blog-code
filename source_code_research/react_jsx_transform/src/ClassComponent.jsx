import React from 'react'

class Clock extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      time: new Date(),
    }
  }

  componentDidMount() {
    this.timer = setInterval(() => {
      this.setState({ time: new Date() })
    }, 1000)
  }

  componentWillUnmount() {
    clearInterval(this.timer)
  }

  render() {
    return (
      <div>
        <h1>Clock Component</h1>
        <div>current time: {this.state.time.toLocaleString()}</div>
      </div>
    )
  }
}

export default Clock
