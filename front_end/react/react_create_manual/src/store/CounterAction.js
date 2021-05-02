export const CounterActionType = {
  INC: Symbol('increment'),
  RESET: Symbol('reset'),
  TOGGLE: Symbol('toggle'),
}

export const incrementAction = () => ({ type: CounterActionType.INC })

export const resetAction = () => ({ type: CounterActionType.RESET })

export const toggleVisibleAction = () => ({ type: CounterActionType.TOGGLE })
