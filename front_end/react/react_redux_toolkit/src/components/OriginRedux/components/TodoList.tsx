import React, { useEffect } from 'react';
import { shallowEqual } from 'react-redux';
import { useAppDispatch, useAppSelector } from '../features/hooks';
import { fetchTodos } from '../features/todos/todosSlice';
import TodoListItem from './TodoListItem';

const TodoList = () => {
  // const todos = useAppSelector((state) => state.todos);
  const todoIds = useAppSelector(
    (state) => state.todos.map((todo) => todo.id),
    shallowEqual
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchTodos);
  }, []);

  const items = todoIds.map((id) => <TodoListItem key={id} id={id} />);

  return <ul className="todo-list">{items}</ul>;
};

export default TodoList;
