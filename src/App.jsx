import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TodoList from './components/TodoList';
import AddTodoForm from './components/AddTodoForm';


function App() {
  const [todoList, setTodoList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [todoTitle, setTodoTitle] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');

  const fetchData = async () => {
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_AIRTABLE_API_TOKEN}`
      }
    };

    const url = `https://api.airtable.com/v0/${import.meta.env.VITE_AIRTABLE_BASE_ID}/${import.meta.env.VITE_TABLE_NAME}?view=Grid%20view&sort[0][field]=title&sort[0][direction]=${sortOrder}`

    try {
      const response = await fetch(url, options);

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      
      const data = await response.json();

      // data.records.sort((objectA, objectB) => {
      //   const titleA = objectA.fields.title.toLowerCase();
      //   const titleB = objectB.fields.title.toLowerCase();

      //   if (titleA < titleB) return -1;
      //   if (titleA > titleB) return 1;
      //   return 0
      // });

      // data.records.sort((objectA, objectB) => {
      //   const titleA = objectA.fields.title.toLowerCase();
      //   const titleB = objectB.fields.title.toLowerCase();

      //   if (titleA < titleB) return 1;
      //   if (titleA > titleB) return -1;
      //   return 0
      // });

      const todos = data.records.map((todo) => ({
          title: todo.fields.title,
          id: todo.id,
          createdTime: todo.fields.createdTime || new Date().toISOString()
      }));

      todos.sort((a, b) => {
        if (sortOrder === 'asc') {
          return a.title.toLowerCase() < b.title.toLowerCase() ? -1 : a.title.toLowerCase() > b.title.toLowerCase() ? 1 : 0
        } else {
          return a.title.toLowerCase() < b.title.toLowerCase() ? 1 : a.title.toLowerCase() > b.title.toLowerCase() ? -1 : 0
        }
      });

    setTodoList(todos);
    setIsLoading(false);

    } catch (error) {
      console.log(`Error fetching data: ${error.message}`);
    }
  };

  useEffect(() => {
    fetchData();
  }, [sortOrder]);

  useEffect(() => {
    if (!isLoading) {
    localStorage.setItem("savedTodoList", JSON.stringify(todoList));
    }
  }, [todoList, isLoading]);


  const addTodo = (newTodo) => {
    setTodoList((prevTodoList) => {
      const updatedList = [...prevTodoList, newTodo];
      updatedList.sort((a, b) => {
        if (sortOrder === 'asc') {
          return a.title.toLowerCase() < b.title.toLowerCase() ? -1 : a.title.toLowerCase() > b.title.toLowerCase() ? 1 : 0
        } else {
          return a.title.toLowerCase() < b.title.toLowerCase() ? 1 : a.title.toLowerCase() > b.title.toLowerCase() ? -1 : 0
        }
      });
      return updatedList
      })
  };

  const removeTodo = (id) => {
    const updatedTodoList = todoList.filter(todo => todo.id !== id);
    setTodoList(updatedTodoList)
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