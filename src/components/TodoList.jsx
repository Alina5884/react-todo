import TodoListItem from './TodoListItem';
import PropTypes from 'prop-types';

const TodoList = ({ todoList, onRemoveTodo }) => {
    return (
        <div>
            <ul>
                {todoList.map((todo) => (
                    <TodoListItem 
                        key={todo.id} 
                        todo={todo}
                        onRemoveTodo={onRemoveTodo} 
                        />
                ))}
            </ul>
        </div>
    );
};

TodoList.propTypes = {
    todoList: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        title: PropTypes.string.isRequired
    })).isRequired,
    onRemoveTodo: PropTypes.func.isRequired
};

export default TodoList;