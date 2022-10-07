import React from 'react';
import { Provider } from 'react-redux';
import Counter from './components/Counter';
import TodoList from './components/TodoList';
import { store } from './store';

const ToolkitRedux = () => {
  return (
    <Provider store={store}>
      <div>
        <h1>ToolkitRedux</h1>
        <Counter />
        <TodoList />
      </div>
    </Provider>
  );
};

export default ToolkitRedux;
