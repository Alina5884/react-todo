import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TodoList from './TodoList';
import AddTodoForm from './AddTodoForm';



function App() {
  const [todoList, setTodoList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [todoTitle, setTodoTitle] = useState('');

  const fetchData = async () => {
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_AIRTABLE_API_TOKEN}`
      }
    };

    const url = `https://api.airtable.com/v0/${import.meta.env.VITE_AIRTABLE_BASE_ID}/${import.meta.env.VITE_TABLE_NAME}`

    try {
      const response = await fetch(url, options);

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      
      const data = await response.json();

      const todos = data.records.map((todo) => ({
          title: todo.fields.title,
          id: todo.id
      }));

    setTodoList(todos);
    setIsLoading(false);

    } catch (error) {
      console.log(`Erro fetching data: ${error.message}`);
    }
  };

  useEffect(() => {
    fetchData();
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
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
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
        }
      />
      <Route path="/new" element={<h1>New Todo List</h1>} />
    </Routes>
  </BrowserRouter>
  );
};

export default App;