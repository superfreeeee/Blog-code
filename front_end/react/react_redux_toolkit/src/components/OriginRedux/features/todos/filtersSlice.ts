import { ETodoStatus, IFiltersSliceState } from '@/types/todo';
import { AnyAction } from 'redux';

const initialState: IFiltersSliceState = {
  status: ETodoStatus.All,
  colors: [],
};

export default function filtersReducer(
  state: IFiltersSliceState = initialState,
  action: AnyAction
): IFiltersSliceState {
  switch (action.type) {
    case 'filters/statusFilterChanged': {
      return {
        ...state,
        status: action.payload,
      };
    }
    default:
      return state;
  }
}
