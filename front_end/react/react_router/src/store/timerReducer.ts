export type TimerAction =
  | { type: 'INCREMENT' }
  | { type: 'RESET' }
  | { type: '' }

export default function timerReducer(
  state: number = 0,
  action: TimerAction = { type: '' }
) {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1
    case 'RESET':
      return 0
    default:
      return state
  }
}
