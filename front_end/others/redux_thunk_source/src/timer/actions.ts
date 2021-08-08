import { ActionCreator, Dispatch } from 'redux';
import { ETimerActionType, ITimerAction, ITimerAsyncAction } from './reducers';

export const increment: ActionCreator<ITimerAction> = () => ({
  type: ETimerActionType.INCREMENT,
});

export const reset: ActionCreator<ITimerAction> = () => ({
  type: ETimerActionType.RESET,
});

export const incrementAsync: ActionCreator<ITimerAsyncAction> =
  (delay: number) => (dispatch, getState, args) =>
    new Promise((resolve, reject) => {
      setTimeout(() => {
        dispatch(increment());
        resolve(getState());
      }, delay);
    });

export const resetAsync: ActionCreator<ITimerAsyncAction> =
  (delay: number) => (dispatch, getState, args) =>
    new Promise((resolve, reject) => {
      setTimeout(() => {
        dispatch(reset());
        resolve(getState());
      }, delay);
    });
