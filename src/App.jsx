import { useState } from 'react';
import TodoList from './TodoList';
import AddTodoForm from './AddTodoForm';

function App() {
  const [todoList, setTodoList] = useState([]);
  const [todoTitle, setTodoTitle] = useState('');

  const addTodo = (newTodo) => {
    setTodoList((prevTodoList) => [...prevTodoList, newTodo])
  };

  const handleTitleChange = (event) => {
    setTodoTitle(event.target.value);
  };

  return (
    <div>
      <h1>Todo List</h1>
      <AddTodoForm onAddTodo={addTodo} 
      todoTitle={todoTitle}
      handleTitleChange={handleTitleChange}/>
      <TodoList todoList={todoList}/>
    </div>
  );
};

export default App;