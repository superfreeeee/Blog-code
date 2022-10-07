import React, { FC } from 'react';
import { ITodoItem } from '@/types/todo';
import {
  useFetchTodosQuery,
  useUpdateTodosMutation,
} from '../features/todo/todoApiSlice';

const TodoListItem: FC<{ todo: ITodoItem }> = ({ todo }) => {
  return (
    <li>
      <input
        type="checkbox"
        checked={todo.completed}
        // onChange={todo.handleCompletedChanged}
      />{' '}
      <span>{todo.text}</span>
    </li>
  );
};

const TodoList = () => {
  const { data: todos = [], isFetching } = useFetchTodosQuery();
  // console.log('todos', isFetching, todos);

  const [updateTodos, result] = useUpdateTodosMutation();
  // console.log('mutations', updateTodos, result);

  const items = todos.map((todo) => <TodoListItem key={todo.id} todo={todo} />);

  return <ul className="todo-list">{items}</ul>;
};

export default TodoList;
