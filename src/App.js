// App.js
import React, { useEffect, useState } from 'react';
import './App.css';
import TodoList from './components/TodoList';
import AddTodo from './components/AddTodo';

function App() {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState('All'); // Default filter is 'All'

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos?_limit=10')
      .then((response) => response.json())
      .then((data) => setTodos(data))
      .catch((error) => console.error(error));
  }, []);

  const handleEdit = (id, newText) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, title: newText } : todo
    );
    setTodos(updatedTodos);
  };

  const handleDelete = (id) => {
    const filteredTodos = todos.filter((todo) => todo.id !== id);
    setTodos(filteredTodos);
  };

  const handleAdd = (newText, completed) => {
    const newTodo = {
      userId: 1, // You can set a specific user ID here
      id: Date.now(),
      title: newText,
      completed: completed,
    };
    setTodos([...todos, newTodo]);
  };

  const toggleCompletion = (id) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id
        ? { ...todo, completed: !todo.completed }
        : todo
    );
    setTodos(updatedTodos);
  };

  const uncheckCompleted = () => {
    const updatedTodos = todos.map((todo) =>
      todo.completed ? { ...todo, completed: false } : todo
    );
    setTodos(updatedTodos);
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === 'Completed') {
      return todo.completed;
    } else if (filter === 'Uncompleted') {
      return !todo.completed;
    } else {
      return true; // 'All' filter, show all todos
    }
  });

  return (
    <div className="App">
      <h1>Todo App</h1>
      <div className="tabs">
        <button onClick={() => setFilter('All')}>All</button>
        <button onClick={() => setFilter('Completed')}>Completed</button>
        <button onClick={() => setFilter('Uncompleted')}>Uncompleted</button>
        {filter === 'Completed' && (
          <button onClick={uncheckCompleted}>Uncheck Completed</button>
        )}
      </div>
      <AddTodo onAdd={(newText, completed) => handleAdd(newText, completed)} />
      <TodoList
        todos={filteredTodos}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onToggleCompletion={toggleCompletion}
        />

    </div>
  );
}

export default App;
