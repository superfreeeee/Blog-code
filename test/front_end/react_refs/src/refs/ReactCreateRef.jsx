import React, { Component } from 'react'
import { group, log } from '../utils/console'
import Other from './Other'

class ReactCreateRef extends Component {
  constructor(props) {
    super(props)

    this.refEl1 = React.createRef()
    this.refEl2 = React.createRef()
  }

  componentDidMount() {
    group('ReactCreateRef', () => {
      log('this.refEl1.current', this.refEl1.current)
      log('this.refEl2.current', this.refEl2.current)
    })
  }

  render() {
    return (
      <div className="block">
        <h2>React.createRef - Refs API</h2>
        <div ref={this.refEl1}>this is a simple dom element</div>
        <Other ref={this.refEl2} />
      </div>
    )
  }
}

export default ReactCreateRef
