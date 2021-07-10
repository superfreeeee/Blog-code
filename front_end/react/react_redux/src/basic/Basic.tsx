import React, { Component } from 'react'
import { ThunkDispatch } from 'redux-thunk'
import { createTimerStore } from '../timer'
import {
  incrementActionAsync,
  incrementAction,
  resetAction,
  resetActionAsync,
} from '../timer/actions'
import { TimerAction, TimerState } from '../timer/reducer'

// const store = createTimerStore()
const store = createTimerStore(true)

type ThunkTimerDispatch = ThunkDispatch<TimerState, void, TimerAction>

class Basic extends Component<{}, { count: TimerState }> {
  constructor(props: {}) {
    super(props)
    this.state = { count: store.getState() }

    store.subscribe(() => {
      this.setState({ count: store.getState() })
    })
  }

  increment() {
    store.dispatch(incrementAction())
  }

  reset() {
    store.dispatch(resetAction())
  }

  incrementAsync() {
    ;(store.dispatch as ThunkTimerDispatch)(incrementActionAsync())
  }

  resetAsync() {
    ;(store.dispatch as ThunkTimerDispatch)(resetActionAsync())
  }

  render() {
    const {
      state: { count },
      increment,
      reset,
      incrementAsync,
      resetAsync,
    } = this

    return (
      <div>
        <h2>Basic Usage by Observer</h2>
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
}

export default Basic
