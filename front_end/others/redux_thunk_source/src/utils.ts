import { Store } from 'redux';
import { ITimerAction, ITimerState } from './timer/reducers';

export const banner = (tag: string = 'test') => {
  console.group(`>>>>> ${tag} <<<<<`);
  return () => {
    console.groupEnd();
  };
};

export const bindLogStore =
  (store: Store<ITimerState, ITimerAction>) =>
  (tag: string = '') => {
    const state = store.getState();
    const prefix = tag ? `[${tag}] ` : '';
    console.log(`${prefix}state`, state);
  };
