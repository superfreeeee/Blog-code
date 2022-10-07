import { configureStore, Middleware } from '@reduxjs/toolkit';
import counterSlice from './features/counter/counterSlice';
import { apiSlice } from './features/todo/todoApiSlice';

const loggerMiddleware: Middleware = (store) => (next) => (action) => {
  console.log(`[logger] action dispatch start`, action);
  const res = next(action);
  console.log(`[logger] action dispatch end`, action, res);
  return res;
};

export const store = configureStore({
  reducer: {
    counter: counterSlice,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware).concat(loggerMiddleware),

  // reducer: counterSlice,
});

export type AppDispatch = typeof store.dispatch;
export type IRootState = ReturnType<typeof store.getState>;
