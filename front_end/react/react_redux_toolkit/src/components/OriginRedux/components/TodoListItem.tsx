import React, { FC } from 'react';
import { ETodoActionType, IRootState, ITodoItem } from '@/types/todo';
import { useAppDispatch, useAppSelector } from '../features/hooks';

const selectTodoById = (state: IRootState, todoId: number) =>
  state.todos.find((todo) => todo.id === todoId);

interface ITodoListItemProps {
  // todo: ITodoItem;
  id: number;
}

const TodoListItem: FC<ITodoListItemProps> = ({ id }) => {
  const todo = useAppSelector((state) => selectTodoById(state, id));

  const { id: todoId, text, completed, color } = todo;

  const dispatch = useAppDispatch();

  const handleCompletedChanged = () => {
    dispatch({ type: ETodoActionType.TodoToggled, payload: todoId });
  };

  return (
    <li>
      <input
        type="checkbox"
        checked={completed}
        onChange={handleCompletedChanged}
      />{' '}
      <span>{text}</span>
    </li>
  );
};

export default TodoListItem;
