import { useState } from 'react';
import InputWithLabel from './InputWithLabel';
import PropTypes from 'prop-types';

function AddTodoForm({ onAddTodo, todoTitle, handleTitleChange }) {
    const handleAddTodo = async (event) =>  {
        event.preventDefault();

        if (!todoTitle.trim()) return;
        
        await onAddTodo(todoTitle);

        handleTitleChange({ target: { value: '' } });
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

AddTodoForm.propTypes = {
    onAddTodo: PropTypes.func.isRequired
};

export default AddTodoForm;
