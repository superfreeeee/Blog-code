import React from 'react'
import useTimer from '../hooks/useTimer'

const TestUseReducer = () => {
  const { count, increment, reset } = useTimer()
  return (
    <div>
      <h2>useReducer</h2>
      <h3>count: {count}</h3>
      <div>
        <button onClick={increment}>increment</button>
        <button onClick={reset}>reset</button>
      </div>
    </div>
  )
}

export default TestUseReducer
