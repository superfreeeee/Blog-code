import {
  connectRouter,
  routerMiddleware,
} from 'connected-react-router'
import { History } from 'history'
import {
  applyMiddleware,
  combineReducers,
  compose,
  createStore,
} from 'redux'
import timerReducer from './timerReducer'

export default function configureStore(history: History) {
  return createStore(
    combineReducers({
      router: connectRouter(history),
      timer: timerReducer,
    }),
    compose(applyMiddleware(routerMiddleware(history)))
  )
}
