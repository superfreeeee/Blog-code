import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  incrementAction,
  incrementActionAsync,
  resetAction,
  resetActionAsync,
} from '../timer/actions'

function useTimer() {
  const count = useSelector((state) => state)
  const dispatch = useDispatch()

  const increment = () => dispatch(incrementAction())
  const reset = () => dispatch(resetAction())
  const incrementAsync = () => dispatch(incrementActionAsync())
  const resetAsync = () => dispatch(resetActionAsync())

  return {
    count,
    increment,
    reset,
    incrementAsync,
    resetAsync,
  }
}

export default function Hook() {
  const { count, increment, reset, incrementAsync, resetAsync } =
    useTimer()

  return (
    <div>
      <h2>Usage in React Hook</h2>
      <div>count: {count}</div>
      <div>
        <button onClick={increment}>increment</button>
        <button onClick={reset}>reset</button>
      </div>
      <div>
        <button onClick={incrementAsync}>incrementAsync</button>
        <button onClick={resetAsync}>resetAsync</button>
      </div>
    </div>
  )
}
