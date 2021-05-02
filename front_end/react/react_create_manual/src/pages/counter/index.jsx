import React, { useState } from 'react'
import { connect } from 'react-redux'
import { incrementAction, resetAction } from '@/store/CounterAction'
import { toggleVisibleAction } from '../../store/CounterAction'

// function Counter() {
//   const [count, setCount] = useState(0)
//   const increment = () => setCount(count + 1)
//   const reset = () => setCount(0)
//   return (
//     <div>
//       <h2>Counter Page</h2>
//       <h4>count: {count}</h4>
//       <button onClick={increment}>Increment</button>
//       <button onClick={reset}>Reset</button>
//     </div>
//   )
// }

function Counter({
  count,
  visible,
  incrementAction,
  resetAction,
  toggleVisibleAction,
}) {
  return (
    <div>
      <h2>Counter Page</h2>
      <h4>count: {visible ? count : 'invisible'}</h4>
      <button onClick={incrementAction}>Increment</button>&nbsp;
      <button onClick={resetAction}>Reset</button>&nbsp;
      <button onClick={toggleVisibleAction}>{visible ? 'hide' : 'show'}</button>
    </div>
  )
}

const mapStateToProps = (state) => {
  const { count, visible } = state
  return { count, visible }
}

const mapDispatchToProps = (dispatch) => {
  return {
    incrementAction: () => dispatch(incrementAction()),
    resetAction: () => dispatch(resetAction()),
    toggleVisibleAction: () => dispatch(toggleVisibleAction()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Counter)
