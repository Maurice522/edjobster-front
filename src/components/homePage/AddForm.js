import * as Yup from 'yup';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from "uuid";
import { Stack, Button, TextField, Container, CircularProgress, ListItem, Grid, FormControl, InputLabel, Select } from '@mui/material';


function AddForm({ input, setInput, todos, setTodos }) {
    const onInputChange = (event) => {
        setInput(event.target.value);
    };

    const onFormSubmit = (event) => {
        event.preventDefault();
        setTodos([...todos, { id: uuidv4(), title: input, completed: false }]);
        setInput("")
    }
    return (
        <div>
            <h3 style={{margin:"3%"}}>ToDo App</h3>
            <div>
                <form onSubmit={onFormSubmit}>
                    <TextField
                        sx={{
                            width: '60%',
                            marginLeft:'5%',
                            marginTop:'2%'
                        }}
                        type={"text"}
                        placeholder="Enter new task..."
                        value={input}
                        required
                        onChange={onInputChange}
                    />
                    <Button variant="contained" type='submit' sx={{
                        marginLeft:'2%',
                        paddingTop:"2%",
                        marginTop:"2%",
                        paddingBottom:"2%",
                    }}>
                       Add
                    </Button>
                </form>
            </div>
        </div>
    )
}

export default AddForm