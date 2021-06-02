import React, { Component } from 'react'
import { group, log } from '../utils/console'
import Other from './Other'

class StringRef extends Component {
  componentDidMount() {
    group('StringRef', () => {
      log('this.refs.el1', this.refs.el1)
      log('this.refs.el2', this.refs.el2)
    })
  }

  render() {
    return (
      <div className="block">
        <h2>String Ref - 字符串 Refs</h2>
        <div ref="el1">this is a simple dom element</div>
        <Other ref="el2" />
      </div>
    )
  }
}

export default StringRef
