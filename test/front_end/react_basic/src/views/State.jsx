import React from 'react'

class State extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      date: new Date(),
    }
  }

  tick() {
    this.setState({ date: new Date() })
  }

  // componentDidMount() {
  //   console.log('[StateSample.LifeCycle] componentDidMount')
  //   this.timer = setInterval(() => this.tick(), 1000)
  // }

  // componentWillUnmount() {
  //   console.log('[StateSample.LifeCycle] componentWillUnmount')
  //   clearInterval(this.timer)
  // }

  stop() {
    console.log('timer stop')
    clearInterval(this.timer)
    this.stop = () => {}
  }

  render() {
    return (
      <>
        <h2>4. State 组件内部状态</h2>
        <h3>date: {this.state.date.toLocaleString()}</h3>
        <button onClick={() => this.stop()}>别跑了</button>
      </>
    )
  }
}

export default State
