import { useState } from 'react';

function AddTodoForm({ onAddTodo }) {
    const [todoTitle, setTodoTitle] = useState('');

    const handleAddTodo = (event) =>  {
        event.preventDefault();
        onAddTodo(todoTitle);
        setTodoTitle('');
    };

    return (
        <div>
            <h2>Add Todo</h2>
            <form onSubmit={handleAddTodo}>
                <label htmlFor="todoTitle">Title</label>
                <input type="text" id="todoTitle" name="todoTitle" 
                value={todoTitle} onChange={(e) => setTodoTitle(e.target.value)} required/>
                <button type="submit">Add</button>
            </form>
        </div>
    );
};

export default AddTodoForm;