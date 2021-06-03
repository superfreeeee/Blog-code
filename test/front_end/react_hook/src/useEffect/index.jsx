import React, { Component } from 'react'
import ClassVersion from './ClassVersion'
import FunctionVersion from './FunctionVersion'

class UseEffectSample extends Component {
  render() {
    return (
      <div>
        <h2>useEffect 示例</h2>
        <ClassVersion />
        <FunctionVersion />
      </div>
    )
  }
}

export default UseEffectSample
