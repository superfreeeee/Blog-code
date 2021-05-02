import { CounterActionType } from './CounterAction'

const defaultState = {
  count: 0,
  visible: true,
}

const updateState = (target, source) => Object.assign({}, target, source)

const counterIncrement = (state) => ({ count: state.count + 1 })

const counterReset = () => ({ count: 0 })

const toggleVisible = (state) => ({ visible: !state.visible })

const counterReducer = (state = defaultState, action) => {
  let newState
  switch (action.type) {
    case CounterActionType.INC:
      newState = counterIncrement(state)
      break
    case CounterActionType.RESET:
      newState = counterReset()
      break
    case CounterActionType.TOGGLE:
      newState = toggleVisible(state)
      break
    default:
      newState = state
  }
  return updateState(state, newState)
}

export default counterReducer
