import React, { Component } from 'react'

class Other extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: 'Alice',
    }
    this.boundFunction = this.boundFunction.bind(this)
  }

  unboundFunction() {
    console.log('this is an unbound function')
  }

  boundFunction() {
    console.log('this is a bound function')
  }

  render() {
    return (
      <div>
        <h3>Other React Component</h3>
      </div>
    )
  }
}

export default Other
