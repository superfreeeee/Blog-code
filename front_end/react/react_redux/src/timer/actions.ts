import { Dispatch } from 'react'
import { ActionCreator } from 'redux'
import { TimerAction } from './reducer'

// action creators
export const incrementAction: ActionCreator<TimerAction> = () => ({
  type: 'INCREMENT',
})

export const resetAction: ActionCreator<TimerAction> = () => ({
  type: 'RESET',
})

// async action creators
export const incrementActionAsync =
  () => async (dispatch: Dispatch<TimerAction>) => {
    console.log('increment after 1 sec')
    setTimeout(() => {
      dispatch({ type: 'INCREMENT' })
    }, 1000)
  }

export const resetActionAsync =
  () => async (dispatch: Dispatch<TimerAction>) => {
    console.log('reset after 1 sec')
    setTimeout(() => {
      dispatch({ type: 'RESET' })
    }, 1000)
  }
