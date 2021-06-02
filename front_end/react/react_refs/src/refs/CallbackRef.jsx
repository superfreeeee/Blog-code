import React, { Component } from 'react'
import { group, log } from '../utils/console'
import Other from './Other'

class CallbackRef extends Component {
  constructor(props) {
    super(props)

    this.setRefEl1 = (element) => {
      this.refEl1 = element
    }

    this.setRefEl2 = (element) => {
      this.refEl2 = element
    }
  }

  componentDidMount() {
    group('CallbackRef', () => {
      log('this.refEl1', this.refEl1)
      log('this.refEl2', this.refEl2)
    })
  }

  render() {
    return (
      <div className="block">
        <h2>Callback Ref - 回调 Refs</h2>
        <div ref={this.setRefEl1}>this is a simple dom element</div>
        <Other ref={this.setRefEl2} />
      </div>
    )
  }
}

export default CallbackRef
