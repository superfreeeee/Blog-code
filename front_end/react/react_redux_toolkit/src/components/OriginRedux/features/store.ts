import { applyMiddleware, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducer';
import todosReducer from './todos/todosSlice';
import filtersReducer from './todos/filtersSlice';

const composedEnhancer = applyMiddleware(thunkMiddleware);
const store = createStore(rootReducer, composedEnhancer);

// const store2 = configureStore({
//   reducer: {
//     todos: todosReducer,
//     filters: filtersReducer,
//   },
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware().concat(thunkMiddleware),
// });

export default store;
