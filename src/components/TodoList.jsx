import React from 'react';
import TodoItem from './TodoItem';

function TodoList({ todos, onEdit, onDelete, onToggleCompletion }) {
  return (
    <ul>
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onEdit={onEdit}
          onDelete={onDelete}
          onToggleCompletion={onToggleCompletion}
        />
      ))}
    </ul>
  );
}

export default TodoList;
