import React, { useState } from 'react';

function TodoItem({ todo, onEdit, onDelete, onToggleCompletion }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(todo.title);

  const handleToggleCompletion = () => {
    if (!isEditing) {
      onToggleCompletion(todo.id, !todo.completed);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSaveEdit = () => {
    // Check if the edited title is not empty
    if (editedTitle.trim() !== "") {
      onEdit(todo.id, editedTitle);
      setIsEditing(false);

      // Automatically mark a completed todo as uncompleted when edited
      if (todo.completed) {
        onToggleCompletion(todo.id, false);
      }
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedTitle(todo.title);
  };

  return (
    <li className="todo">
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={handleToggleCompletion}
      />
      {isEditing ? (
        <>
          <input
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
          />
          <button onClick={handleSaveEdit}>Save</button>
          <button onClick={handleCancelEdit}>Cancel</button>
        </>
      ) : (
        <>
          {todo.completed ? (
            <del>{todo.title}</del>
          ) : (
            <span>{todo.title}</span>
          )}
          <button onClick={handleEdit}>Edit</button>
        </>
      )}
      <button onClick={() => onDelete(todo.id)}>Delete</button>
    </li>
  );
}

export default TodoItem;
