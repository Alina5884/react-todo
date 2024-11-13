import * as React from "react";
const AddTodoForm = () => {
    return (
        <div>
            <h2>Add Todo</h2>
            <form>
                <label htmlFor="todoTitle">Title</label>
                <input type="text" id="todoTitle" name="todoTitle"/>
                <button type="submit">Add</button>
            </form>
        </div>
    );
};

export default AddTodoForm;