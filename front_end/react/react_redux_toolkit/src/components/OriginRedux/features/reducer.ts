import { combineReducers } from 'redux';
import filtersReducer from './todos/filtersSlice';
import todosReducer from './todos/todosSlice';

const rootReducer = combineReducers({
  todos: todosReducer,
  filters: filtersReducer,
});

export default rootReducer;
