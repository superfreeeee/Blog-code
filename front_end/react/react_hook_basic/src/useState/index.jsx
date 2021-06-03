import React, { Component } from 'react'
import ClassVersion from './ClassVersion'
import FunctionVersion from './FunctionVersion'

class UseStateSample extends Component {
  render() {
    return (
      <div>
        <h2>useState 示例</h2>
        <ClassVersion />
        <FunctionVersion />
      </div>
    )
  }
}

export default UseStateSample
