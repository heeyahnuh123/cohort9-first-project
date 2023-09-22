import { useEffect } from "react";
import "./App.css";
import { useState } from "react";

function App() {
    const [todos, setTodos] = useState([]);
    const [editId, setEditId] = useState(null);
    const [newTodo, setNewTodo] = useState("");

    useEffect(() => {
        let canceled = false;
        fetch("https://jsonplaceholder.typicode.com/todos")
            .then((res) => res.json())
            .then((data) => {
                if (!canceled) {
                    setTodos(data.slice(0, 10));
                }
            })
            .catch((err) => {
                console.error(err);
            });

        return () => (canceled = true);
    }, []);

    const handleCheck = (id) => {
        // const targetTodo = todos.find((todo) => todo.id === id);

        // const targetTodoIndex = todos.findIndex((todo) => todo.id === id);

        // if (!targetTodo || targetTodoIndex === -1) return;

        // targetTodo.completed = !targetTodo.completed;

        // const newTodos = [...todos];

        // newTodos[targetTodoIndex] = targetTodo;

        // setTodos(newTodos);

        const newTodos = todos.map((todo) =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
        );
        setTodos(newTodos);
    };

    const handleDelete = (id) => {
        // const newArray = todos.filter((todo) => todo.id !== id);
        // setTodos(newArray);

        const targetTodoIndex = todos.findIndex((todo) => todo.id === id);

        const newTodos = [...todos];
        newTodos.splice(targetTodoIndex, 1);
        setTodos(newTodos);
    };

    const handleEdit = (e) => {
        // const targetTodo = todos.find((todo) => todo.id === editId);

        // const targetTodoIndex = todos.findIndex((todo) => todo.id === editId);

        // if (!targetTodo || targetTodoIndex === -1) return;

        // targetTodo.title = e.target.value;

        // const newTodos = [...todos];

        // newTodos[targetTodoIndex] = targetTodo;

        // setTodos(newTodos);

        const newTodos = todos.map((todo) =>
            todo.id === editId ? { ...todo, title: e.target.value } : todo
        );
        setTodos(newTodos);
    };

    const x = [
        {
            userId: 5,
            id: 23,
            title: "incidunt ut saepe autem",
            completed: true,
        },
        {
            userId: 5,
            id: 87,
            title: "laudantium quae eligendi consequatur quia et vero autem",
            completed: false,
        },
    ];

    const handleAddTodo = () => {
        if (newTodo.trim() !== "") {
          // Create a new to-do item
          const newTodoItem = {
            userId: Math.floor(Math.random() * 10), // Random userId for demonstration
            id: Date.now(), // Unique ID based on timestamp
            title: newTodo,
            completed: false,
          };
    
          // Update the state to include the new to-do item
          setTodos((prevTodos) => [...prevTodos, newTodoItem]);
          setNewTodo(""); // Clear the input field
        }
    };

    return (
        <div className="App">
            <div className="todo-wrapper">
                {/* New input field for adding a to-do */}
                <input
                    type="text"
                    placeholder="Add a new to-do"
                    value={newTodo}
                    onChange={(e) => setNewTodo(e.target.value)}
                />
                <button onClick={handleAddTodo}>Add</button>

                <ul>
                    {!!todos.length &&
                        todos.map((todo) => (
                            <li className="todo" key={todo.id}>
                                <input
                                    type="checkbox"
                                    checked={todo.completed}
                                    onChange={() => handleCheck(todo.id)}
                                />
                                {editId === todo.id ? (
                                    <input
                                        type="text"
                                        value={todo.title}
                                        onChange={handleEdit}
                                    />
                                ) : (
                                    <span
                                        className={`todo-title ${
                                            todo.completed && "checked"
                                        }`}
                                    >
                                        {todo.title}
                                    </span>
                                )}
                                {editId === todo.id ? (
                                    <button onClick={() => setEditId(null)}>
                                        ✅
                                    </button>
                                ) : (
                                    <button
                                        className="del-button"
                                        onClick={() => setEditId(todo.id)}
                                        disabled={todo.completed}
                                    >
                                        ✏️
                                    </button>
                                )}
                                <button
                                    className="del-button"
                                    onClick={() => handleDelete(todo.id)}
                                >
                                    🗑️
                                </button>
                            </li>
                        ))}
                </ul>
            </div>
        </div>
    );

}

export default App;
