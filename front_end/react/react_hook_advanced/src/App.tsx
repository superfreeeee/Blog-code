import React from 'react'
import TestUseCallback from './tests/TestUseCallback'
import TestUseDebugValue from './tests/TestUseDebugValue'
import TestUseImperativeHandle from './tests/TestUseImperativeHandle'
import TestUseLayoutEffect from './tests/TestUseLayoutEffect'
import TestUseMemo from './tests/TestUseMemo'
import TestUseReducer from './tests/TestUseReducer'
import TestUseRef from './tests/TestUseRef'

const App = () => {
  return (
    <div>
      <h1>React Hook 高级API</h1>
      <TestUseReducer />
      <TestUseMemo />
      <TestUseCallback />
      <TestUseRef />
      <TestUseImperativeHandle />
      <TestUseLayoutEffect />
      <TestUseDebugValue />
      <div style={{height: '300px'}}></div>
    </div>
  )
}

export default App
