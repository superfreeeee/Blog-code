import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';

export interface ITimerState {
  count: number;
}

export enum ETimerActionType {
  INCREMENT = 'INCREMENT',
  RESET = 'RESET',
  INCREMENT_ASYNC = 'INCREMENT_ASYNC',
  RESET_ASYNC = 'RESET_ASYNC',
}

export interface ITimerAction extends Action<ETimerActionType> {}

export interface ITimerAsyncAction
  extends ThunkAction<Promise<ITimerState>, ITimerState, {}, ITimerAction> {}

const initTimerState = {
  count: 0,
};

/**
 * 计数器
 * @param state
 * @param action
 * @returns
 */
const timerReducer = (
  state: ITimerState = initTimerState,
  action: ITimerAction
) => {
  switch (action.type) {
    case ETimerActionType.INCREMENT:
      return { count: state.count + 1 };
    case ETimerActionType.RESET:
      return { count: 0 };
    default:
      return state;
  }
};

export { timerReducer };
