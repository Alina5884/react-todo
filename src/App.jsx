import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TodoList from './components/TodoList';
import AddTodoForm from './components/AddTodoForm';


function App() {
  const [todoList, setTodoList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [todoTitle, setTodoTitle] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [error, setError] = useState(null);

  const API_URL = `https://api.airtable.com/v0/${import.meta.env.VITE_AIRTABLE_BASE_ID}/${import.meta.env.VITE_TABLE_NAME}`;
  const headers = {
    Authorization: `Bearer ${import.meta.env.VITE_AIRTABLE_API_TOKEN}`,
    'Content-Type': 'application/json'
  };

  const fetchData = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_URL}?view=Grid%20view&sort[0][field]=title&sort[0][direction]=${sortOrder}`, {
        method: 'GET',
        headers
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      
      const data = await response.json();

      const todos = data.records.map((todo) => ({
          title: todo.fields.title,
          id: todo.id,
          createdTime: todo.fields.createdTime || new Date().toISOString()
      }));

      setTodoList(todos);

    } catch (error) {
      setError(error.message)
    } finally {
      setIsLoading(false)
    }
  };

  useEffect(() => {
    fetchData();
  }, [sortOrder]);

  useEffect(() => {
}, [todoList]);


  const addTodo = async () => {
    if (!todoTitle.trim()) return;

    setIsLoading(true);
    setError(null);

    const newTodo = {
      fields: {
        title: todoTitle
      }
    };

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers,
        body: JSON.stringify(newTodo)
      });

      if (!response.ok) {
        throw new Error(`Error ${response.status}`)
      }

      await fetchData();
      setTodoTitle('');

    } catch(error) {
      setError(error.message)
    } finally {
      setIsLoading(false)
    }
  };

  const removeTodo = async (id) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
        headers
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`)
      };

      setTodoList((prevTodoList) => prevTodoList.filter(todo => todo.id !== id));

    } catch (error) {
        setError(error.message)
    }
  };
  
  const handleTitleChange = (event) => {
    setTodoTitle(event.target.value)
  };

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <>
            <h1>Todo List</h1>
            <button onClick={toggleSortOrder}>
              Switch to {sortOrder === 'asc' ? 'Descending' : 'Ascending'} Order
            </button>
            {isLoading ? (
              <p>Loading...</p>
            ) : (
              <>
                <AddTodoForm 
                    onAddTodo={addTodo}
                    todoTitle={todoTitle}
                    handleTitleChange={handleTitleChange}
                    isLoading={isLoading}
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