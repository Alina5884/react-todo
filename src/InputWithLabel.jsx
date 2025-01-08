import { useRef, useEffect } from 'react';

const InputWithLabel = ({ todoTitle, handleTitleChange, id, children }) => {
    const inputRef = useRef(null);

    useEffect(() => {
        inputRef.current.focus();
    }, []);
    
    return (
        <>
          <label htmlFor={id}>{children}</label>
            <input
                type="text" 
                id={id}
                name={id}
                value={todoTitle} 
                onChange={handleTitleChange} 
                required
                ref={inputRef}
            />
        </>
    );
};

export default InputWithLabel;