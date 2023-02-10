import * as Yup from 'yup';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Stack, Button, TextField, Container, CircularProgress, ListItem, Grid, FormControl, InputLabel, Select } from '@mui/material';
import AddForm from './AddForm';
import ToDoList from './ToDoList';


function ToDoApp() {
    const [input, setInput] = useState("");
    const [todos, setTodos] = useState([]);

    return (
        <div>
            <AddForm
                input={input}
                setInput={setInput}
                todos={todos}
                setTodos={setTodos}
            />
            <ToDoList
                todos={todos}
                setTodos={setTodos}
            />
        </div>
    )
}

export default ToDoApp