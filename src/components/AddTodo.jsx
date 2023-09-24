import React, { useState } from 'react';

function AddTodo({ onAdd }) {
  const [newTodo, setNewTodo] = useState('');

  const handleAdd = () => {
    if (newTodo.trim() !== '') {
      onAdd(newTodo);
      setNewTodo('');
    }
  };

  return (
    <div className="add-todo">
      <input
        type="text"
        placeholder="Add a new todo"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
      />
      <button onClick={handleAdd}>Add</button>
    </div>
  );
}

export default AddTodo;
