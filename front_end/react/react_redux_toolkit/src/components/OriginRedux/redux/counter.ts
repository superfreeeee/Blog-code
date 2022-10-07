import { ECounterAction, ICounterState } from '@/types/counter';
import { Action, createStore, Reducer } from 'redux';

const initialState: ICounterState = {
  value: 0,
};

const counterReducer: Reducer<ICounterState, Action<ECounterAction>> = (
  prevState = initialState,
  action
) => {
  switch (action.type) {
    case ECounterAction.Increment:
      return { ...prevState, value: prevState.value + 1 };
    case ECounterAction.Decrement:
      return { ...prevState, value: prevState.value - 1 };
    default:
      return prevState;
  }
};

const store = createStore(counterReducer);
