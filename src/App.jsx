import { useState, useEffect } from 'react';
import TodoList from './TodoList';
import AddTodoForm from './AddTodoForm';

function App() {
  const [todoList, setTodoList] = useState(() => {
    const savedList = localStorage.getItem("savedTodoList");
    return savedList ? JSON.parse(savedList) : [];
  });

  const [isLoading, setIsLoading] = useState(true);
  const [todoTitle, setTodoTitle] = useState('');

  useEffect(() => {
    const fetchTodoList = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({
          data: {
            todoList: []
          }
        });
      }, 2000);
    });

    fetchTodoList.then((result) => {
      setTodoList((prevTodoList) => prevTodoList.length ? prevTodoList : result.data.todoList);
      setIsLoading(false);
    }).catch((error) => {
      console.error(error);
      setIsLoading(false);
    });

  }, []);

  useEffect(() => {
    if (!isLoading) {
    localStorage.setItem("savedTodoList", JSON.stringify(todoList));
    }
  }, [todoList, isLoading]);


  const addTodo = (newTodo) => {
    setTodoList((prevTodoList) => [...prevTodoList, newTodo])
  };

  const removeTodo = (id) => {
    const updatedTodoList = todoList.filter(todo => todo.id !== id);
    setTodoList(updatedTodoList);
  };

  const handleTitleChange = (event) => {
    setTodoTitle(event.target.value);
  };

  return (
    <>
      <h1>Todo List</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <AddTodoForm 
              onAddTodo={addTodo}
              todoTitle={todoTitle}
              handleTitleChange={handleTitleChange}
          />
          <TodoList 
              todoList={todoList}
              onRemoveTodo={removeTodo}
          />
        </>
      )}
    </>
  );
};

export default App;