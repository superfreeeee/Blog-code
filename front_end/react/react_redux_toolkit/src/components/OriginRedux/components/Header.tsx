import React, { KeyboardEvent } from 'react';
import { useAppDispatch } from '../features/hooks';
import { useInput } from '../hooks';
import { ETodoActionType } from '@/types/todo';

const Header = () => {
  const [text, onTextChange, { setInput: setText }] = useInput('');
  const dispatch = useAppDispatch();

  const onTextKeyDown = (e) => {
    const trimmedText = e.target.value.trim();
    if (e.key === 'Enter' && trimmedText) {
      dispatch({ type: ETodoActionType.TodoAdded, payload: trimmedText });
      setText('');
    }
  };

  return (
    <input
      type="text"
      placeholder="What needs to be done?"
      autoFocus
      value={text}
      onChange={onTextChange}
      onKeyDown={onTextKeyDown}
    />
  );
};

export default Header;
