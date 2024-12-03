import { useState } from 'react';
import TodoList from './TodoList';
import AddTodoForm from './AddTodoForm';

function App() {
  const [todos, setTodos] = useState([
    { id: 1, title: "Complete assignment"},
    { id: 2, title: "Cook dinner"},
    { id: 3, title: "Clean the kitchen"},
    { id: 4, title: "Go to the gym"},
  ]);

  const handleAddTodo = (title) => {
    const newTodoObj = {
      id: todos.length + 1, title
    };
    setTodos((prevTodos) => [...prevTodos, newTodoObj]);
  };

  return (
    <div>
      <h1>Todo List</h1>
      <AddTodoForm onAddTodo={handleAddTodo} />
      <TodoList todos={todos}/>
    </div>
  );
};

export default App;