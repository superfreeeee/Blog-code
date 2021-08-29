import { useDispatch } from 'react-redux';
import { createStore, ActionCreator, bindActionCreators } from 'redux';

// State
export interface IAppState {
  title: string;
}

const initAppState: IAppState = {
  title: '',
};

// Actions
enum EAppActionType {
  UpdateTitle,
}

type AppAction = { type: EAppActionType.UpdateTitle; payload: string };

export const updateTitleCreator: ActionCreator<AppAction> = (
  title: string
) => ({
  type: EAppActionType.UpdateTitle,
  payload: title,
});

// Reducer
const globalReducer = (
  prevState: IAppState = initAppState,
  action: AppAction
) => {
  switch (action.type) {
    case EAppActionType.UpdateTitle:
      return { ...prevState, title: action.payload };
    default:
      return prevState;
  }
};

// Store
export const store = createStore(globalReducer);

// hooks
export const useActions = (actions: ActionCreator<AppAction>) => {
  const dispatch = useDispatch();

  const boundActions = bindActionCreators(actions, dispatch);

  return boundActions;
};
