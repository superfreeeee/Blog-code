import React, { Component } from 'react'

import JSXSample from './JSX'
import ComponentSample from './Component'
import PropsSample from './Props'
import StateSample from './State'
import EventsSample from './Events'
import FormSample from './Form'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showStateSample: true,
    }
  }

  // componentDidMount() {
  //   setTimeout(() => {
  //     this.setState({ showStateSample: false })
  //     setTimeout(() => {
  //       this.setState({ showStateSample: true })
  //     }, 2000)
  //   }, 2000)
  // }

  render() {
    const obj = { a: 123 }
    const otherProps = {
      b: 456,
      c: 789,
    }
    return (
      <>
        <h1>React 基础特性演示</h1>
        <h4>Hello World</h4>
        <JSXSample></JSXSample>
        <ComponentSample></ComponentSample>
        <PropsSample
          title="Title from App"
          dynamic={obj}
          {...otherProps}
        ></PropsSample>
        {this.state.showStateSample && <StateSample></StateSample>}
        <EventsSample></EventsSample>
        <FormSample></FormSample>
      </>
    )
  }
}

export default App
