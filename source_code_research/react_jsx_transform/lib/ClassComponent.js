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
      this.setState({
        time: new Date(),
      })
    }, 1000)
  }

  componentWillUnmount() {
    clearInterval(this.timer)
  }

  render() {
    return /*#__PURE__*/ React.createElement(
      'div',
      null,
      /*#__PURE__*/ React.createElement('h1', null, 'Clock Component'),
      /*#__PURE__*/ React.createElement(
        'div',
        null,
        'current time: ',
        this.state.time.toLocaleString()
      )
    )
  }
}

export default Clock
