import { useState } from 'react';

function AddTodoForm({ onAddTodo }) {
    const [todoTitle, setTodoTitle] = useState('');

    const handleTitleChange = (event) => {
        const newTodoTitle = event.target.value;
        setTodoTitle(newTodoTitle);
    };

    const handleAddTodo = (event) =>  {
        event.preventDefault();
        
        const newTodo = {
            id: Date.now(),
            title: todoTitle
        };

        onAddTodo(newTodo);

        setTodoTitle('');
    };

    return (
        <div>
            <h2>Add Todo</h2>
            <form onSubmit={handleAddTodo}>
                <label htmlFor="todoTitle">Title</label>
                <input type="text" 
                id="todoTitle" 
                name="todoTitle" 
                value={todoTitle} 
                onChange={handleTitleChange} 
                required/>
                <button type="submit">Add</button>
            </form>
        </div>
    );
};

export default AddTodoForm;