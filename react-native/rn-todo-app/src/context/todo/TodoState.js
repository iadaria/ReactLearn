import React from 'react';
import { TodoContext } from './todoContext';
import { todoReducer } from './todoReducer';

export const TodoState = ({ children }) => {
    const initialState = {
        todos: [
            { id: "1", title: "Learn React Native"}
        ]
    };
    const [state, dispatch] = React.useReducer(todoReducer, initialState);

    return (
        <TodoContext.Provider value={{ todos: state.todos }}>
            {children}
        </TodoContext.Provider>
    );
};