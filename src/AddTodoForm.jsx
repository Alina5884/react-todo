import { useState } from 'react';
import InputWithLabel from './InputWithLabel';

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
                <InputWithLabel
                    id="todoTitle" 
                    todoTitle={todoTitle} 
                    handleTitleChange={handleTitleChange} 
                >
                    Title
                </InputWithLabel>
                <button type="submit">Add</button>
            </form>
        </div>
    );
};

export default AddTodoForm;