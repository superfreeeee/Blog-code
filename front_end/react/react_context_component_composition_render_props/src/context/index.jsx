import React, { Component } from 'react'
import Version1 from './version1'
import Version2 from './version2'
import Version3 from './Version3'
import Version4 from './Version4'

class Context extends Component {
  render() {
    return (
      <div>
        <h1>React Context 上下文</h1>
        <Version1 />
        <Version2 />
        <Version3 />
        <Version4 />
      </div>
    )
  }
}

export default Context
