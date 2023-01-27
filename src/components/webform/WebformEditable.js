import { useState } from "react"
import {
    Card, Stack, Button, Container,
    Typography, ListItemIcon,
    Chip, TextField, Divider, Input
} from '@mui/material';



export default function Editable(props) {
    const { children, value, handleChange, multiLine, placeholder, fullWidth, name, deletable, handleDelete } = props
    const [editable, setEditable] = useState(false)
    return (
        editable?(
            <Container sx={{display: "flex", justifyContent: "space-between", alignItems: "center", gap: "2rem"}}>
                <TextField
                    variant="outlined" 
                    name={name}
                    value={value}
                    onChange={handleChange}
                    placeholder={placeholder}
                    fullWidth={fullWidth}
                    multiline={multiLine}
                />
                <Button variant="contained" onClick={() => setEditable(false)}>
                    Save
                </Button>
            </Container>
        ):(
            <Container sx={{display: "flex", justifyContent: "space-between"}}>
                {children}
                <Container sx={{display: "flex", justifyContent: "flex-end", alignItems: "center", gap: "1rem"}}>
                    <Button variant="outlined" onClick={() => setEditable(true)}>
                        Edit
                    </Button>
                    {deletable && 
                        <Button variant="contained" color="error" onClick={handleDelete}>
                            Delete
                        </Button>
                    }
                </Container>
            </Container>
        )
    )
}