import React, { Component } from 'react'
import Single from './Single'
import Separate from './Separate'
import Together from './Together'
import LiftingState from './LiftingState'

class StateLiftingSample extends Component {
  constructor(props) {
    super(props)
    this.singleRef = React.createRef()
  }

  componentDidMount() {
    console.log(this.singleRef.current)
    console.log(this.singleRef.current.state)
    console.log(this.singleRef.current.handleTemperatureChange)
  }

  render() {
    return (
      <div>
        <h1>状态提升</h1>
        <Single ref={this.singleRef} />
        <Single otherRef={this.singleRef} />
        <Separate />
        <Together />
        <LiftingState />
      </div>
    )
  }
}

export default StateLiftingSample
