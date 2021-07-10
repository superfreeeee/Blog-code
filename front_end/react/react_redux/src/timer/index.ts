import { applyMiddleware, createStore, Middleware } from 'redux'
import thunk from 'redux-thunk'
import { middlewareSample } from './middlewares'
import { timerReducer } from './reducer'

export const createTimerStore = (withThunk: boolean = false) => {
  const middlewares: Middleware[] = withThunk ? [thunk] : []
  middlewares.push(middlewareSample)
  const enhancer = applyMiddleware(...middlewares)
  return createStore(timerReducer, enhancer)
}
