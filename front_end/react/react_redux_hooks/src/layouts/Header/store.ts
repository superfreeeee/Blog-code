import React, { DependencyList, useMemo } from 'react';
import {
  createDispatchHook,
  createSelectorHook,
  createStoreHook,
} from 'react-redux';
import { ActionCreator, bindActionCreators, createStore } from 'redux';

// State 类型
interface IUserInfo {
  name: string;
}

export interface IHeaderState {
  title: string;
  userInfo: IUserInfo;
}

const initHeaderState: IHeaderState = {
  title: '',
  userInfo: {
    name: '',
  },
};

// Action 类型
enum EHeaderActionType {
  ResetAll,
  UpdateTitle,
  UpdateUserInfo,
}

type HeaderAction =
  | { type: EHeaderActionType.ResetAll }
  | { type: EHeaderActionType.UpdateTitle; payload: string }
  | { type: EHeaderActionType.UpdateUserInfo; payload: IUserInfo };

// ActionCreators
export const resetCreator: ActionCreator<HeaderAction> = () => ({
  type: EHeaderActionType.ResetAll,
});

export const updateTitleCreator: ActionCreator<HeaderAction> = (
  title: string
) => ({
  type: EHeaderActionType.UpdateTitle,
  payload: title,
});

export const updateUserInfoCreator: ActionCreator<HeaderAction> = (
  userInfo: IUserInfo
) => ({
  type: EHeaderActionType.UpdateUserInfo,
  payload: { ...userInfo },
});

// Reducer
const headerReducer = (
  prevState: IHeaderState = initHeaderState,
  action: HeaderAction
) => {
  switch (action.type) {
    case EHeaderActionType.ResetAll:
      return initHeaderState;
    case EHeaderActionType.UpdateTitle:
      const title = action.payload;
      return { ...prevState, title };
    case EHeaderActionType.UpdateUserInfo:
      const userInfo = action.payload;
      return { ...prevState, userInfo };
    default:
      return prevState;
  }
};

// store
export const store = createStore(headerReducer);

// context
export const headerContext = React.createContext(null);

// hooks
export const useHeaderStore = createStoreHook(headerContext);
export const useHeaderSelector = createSelectorHook(headerContext);
export const useHeaderDispatch = createDispatchHook(headerContext);

export const useHeaderActions = (
  actions: ActionCreator<HeaderAction>,
  deps: DependencyList = []
) => {
  const dispatch = useHeaderDispatch();

  const boundActions = useMemo(() => {
    return bindActionCreators(actions, dispatch);
  }, [dispatch, ...deps]);

  return boundActions;
};
