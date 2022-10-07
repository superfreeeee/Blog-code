import React from 'react';
import { useAppSelector } from '../features/hooks';

const Footer = () => {
  const todosRemaining = useAppSelector(
    (state) => state.todos.filter((todo) => !todo.completed).length
  );

  return (
    <footer className="footer">
      <div className="actions">
        <h5>Actions</h5>
        <button className="button">Mark All Completed</button>
        <button className="button">Clear Completed</button>
      </div>

      <div>Remaining: {todosRemaining}</div>
    </footer>
  );
};

export default Footer;
