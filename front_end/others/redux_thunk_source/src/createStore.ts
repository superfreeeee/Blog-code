import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import { timerReducer } from './timer/reducers';

export default () => createStore(timerReducer, applyMiddleware(thunk));
