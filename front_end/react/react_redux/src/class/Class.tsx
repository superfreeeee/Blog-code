import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux'
import { TimerAction, TimerState } from '../timer/reducer'
import {
  incrementAction,
  incrementActionAsync,
  resetAction,
  resetActionAsync,
} from '../timer/actions'
import { ThunkDispatch } from 'redux-thunk'

interface TimerProps {
  count: number
  increment: () => void
  reset: () => void
  incrementAsync: () => void
  resetAsync: () => void
}

class Class extends Component<TimerProps> {
  render() {
    const { count, increment, reset, incrementAsync, resetAsync } =
      this.props

    return (
      <div>
        <h2>Usage in class Component</h2>
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

const mapStateToProps = (state: TimerState) => {
  return { count: state }
}
const mapDispatchToProps = (
  dispatch: ThunkDispatch<TimerState, {}, TimerAction>
) => {
  return {
    increment: () => {
      dispatch(incrementAction())
    },
    reset: () => {
      dispatch(resetAction())
    },
    incrementAsync: bindActionCreators(
      incrementActionAsync,
      dispatch
    ),
    // incrementAsync: () => incrementActionAsync()(dispatch),
    // incrementAsync: () => dispatch(incrementActionAsync()),
    resetAsync: bindActionCreators(resetActionAsync, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Class)
