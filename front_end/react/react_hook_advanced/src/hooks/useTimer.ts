import { useReducer, useState } from 'react'

type TimerAction =
  | { type: 'INCREMENT' }
  | { type: 'RESET' }
  | { type: '' }

const timerReducer = (count: number, action: TimerAction) => {
  switch (action.type) {
    case 'INCREMENT':
      return count + 1
    case 'RESET':
      return 0
    default:
      return count
  }
}

export default function useTimer() {
  const [count, dispatch] = useReducer(timerReducer, 0)

  const increment = () => dispatch({ type: 'INCREMENT' })

  const reset = () => dispatch({ type: 'RESET' })

  return { count, increment, reset }
}
