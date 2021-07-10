export type TimerState = number

export type TimerActionType = 'INCREMENT' | 'RESET'

export type TimerAction = {
  type: TimerActionType
  payload?: Object
}

export const timerReducer = (
  state: TimerState = 0,
  action: TimerAction
) => {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1
    case 'RESET':
      return 0
    default:
      return state
  }
}
