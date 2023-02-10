import React from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';

function ToDoList({ todos, setTodos}) {
    const handleComplete = (todo) => {
        setTodos(
            todos.map((item) => {
                if((item.id)===todo.id){
                    return {...item,completed: !item.completed}
                }
                return item;
            })
        )
    }
    const handleDelete = ({ id }) => {
        setTodos(todos.filter((todo)=> todo.id !==id ))
    }
  return (
    <div>
        {todos.map((todo) => (
            <li className="list-item" key={todo.id}>
                <input
                    type="text"
                    value={todo.title}
                    className={`list ${todo.completed ? "complete" : ""}`}
                    onChange={(event) => event.preventDefault()}
                 />
                 <div className='btnstodo'>
                    <CheckIcon onClick={() => handleComplete(todo)} sx={{
                        cursor:"pointer"
                    }}/>
                    {/* <button className='button-edit task-button'>
                        <i className='fa fa-edit' />
                    </button> */}
                    <DeleteIcon onClick={() => handleDelete(todo)} sx={{
                        cursor:"pointer"
                    }}/>
                 </div>
            </li>
        ))}
    </div>
  )
}

export default ToDoList