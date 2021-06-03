import React, { Component } from 'react'
import ClassVersion from './ClassVersion'
import FunctionVersion from './FunctionVersion'

class UseContextSample extends Component {
  render() {
    return (
      <div>
        <h2>useContext 示例</h2>
        <ClassVersion />
        <FunctionVersion />
      </div>
    )
  }
}

export default UseContextSample
