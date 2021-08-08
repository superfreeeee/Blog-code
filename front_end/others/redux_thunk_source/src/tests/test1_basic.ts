import createStore from '../createStore';
import { increment, reset } from '../timer/actions';
import { bindLogStore } from '../utils';

const store = createStore();

const logStore = bindLogStore(store);

logStore('init');

store.dispatch(increment());

logStore();

store.dispatch(increment());
store.dispatch(increment());
store.dispatch(increment());

logStore();

store.dispatch(reset());

logStore();
