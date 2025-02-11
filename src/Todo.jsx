import React, { useState } from 'react';
import './Todo.css';

const Todo = () => {
    const [inputValue, setInputValue] = useState('');
    const [todos, setTodos] = useState([]);
    const [edit, setEdit] = useState(false);
    const [editId, setEditId] = useState(null);
    const [editValue, setEditValue] = useState('');

    //Create
    const addTodo = () => {
        if (inputValue.trim() !== '') {
            const newTodo = {
                id: new Date().getTime(),
                text: inputValue,
            };

            setTodos([...todos, newTodo]);
            setInputValue('');
        }
    };

    //Delete
    const deleteTodo = (id) => {
        const updatedTodos = todos.filter((todo) => todo.id !== id);
        setTodos(updatedTodos);
    }

    //Update
    const editTodo = (id,text) => {
        setEdit(true);
        setEditId(id);
        setEditValue(text);
    }

    const updateTodo = () => {
        const updatedTodos = todos.map((todo) => {
            if(todo.id === editId){ 
                return {...todo, text: editValue}
            }
            return todo;
        });

        setTodos(updatedTodos);
        setEdit(false);
        setEditId(null);
        setEditValue('');
    }

    return (
        <div className='todo-container'>
            <h2>To-Do List</h2>
            <input
                type='text'
                placeholder='Task Description'
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
            />
            <br />

            {
                edit ? (
                    <div>
                        <input type='text' value={editValue} onChange={(e)=>setEditValue(e.target.value)}></input>
                        <button onClick={updateTodo}>Update</button>
                    </div>
                ):(
                    <button onClick={addTodo}>Add</button>
                )
            }

            <ul>
                {todos.map((todo) => (
                    <li key={todo.id}>{todo.text}
                    <button onClick={()=> deleteTodo(todo.id)}>Delete</button>
                    <button onClick={()=> editTodo(todo.id,todo.text)}>Edit</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Todo;