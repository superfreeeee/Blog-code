import React from 'react';
import { Provider } from 'react-redux';
import Footer from './components/Footer';
import Header from './components/Header';
import TodoList from './components/TodoList';
import store from './features/store';

const OriginRedux = () => {
  return (
    <Provider store={store}>
      <div>
        <h1>OriginRedux</h1>
        <Header />
        <TodoList />
        <Footer />
      </div>
    </Provider>
  );
};

export default OriginRedux;
