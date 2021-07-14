import React, { useState } from 'react'
import useNothing from '../hooks/useNothing'

const TestUseDebugValue = () => {
  const [state, setState] = useState(false)

  useNothing(state)

  return (
    <div>
      <h2>useDebugValue</h2>
      <button onClick={() => setState(!state)}>Toggle</button>
    </div>
  )
}

export default TestUseDebugValue
