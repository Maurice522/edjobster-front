/* eslint-disable react/prop-types */
import { useState } from "react"
import {
    Card, 
    Stack, 
    Button, 
    Container,
    Typography, 
    ListItemIcon,
    Chip, 
    TextField, 
    Divider, 
    Input
} from '@mui/material';



export default function EditableSection(props) {
    const { children, value, handleChange, multiLine, placeholder, fullWidth, name, deletable, handleDelete, currentType, types, handleChangeType } = props
    const [editable, setEditable] = useState(false)
    return (
        editable?(
            <Container sx={{display: "flex", justifyContent: "space-between", alignItems: "center", gap: "2rem"}}>
                <Container sx={{display: "flex", justifyContent: "flex-start", alignItems: "center", gap: "1rem"}}>
                    <TextField
                        variant="outlined" 
                        name={name}
                        value={value}
                        onChange={handleChange}
                        placeholder={placeholder}
                        fullWidth={fullWidth}
                        multiline={multiLine}
                        label="Field"
                    />
                    <TextField
                        variant="outlined" 
                        name="type"
                        value={currentType}
                        onChange={handleChangeType}
                        placeholder={currentType}
                        fullWidth={fullWidth}
                        multiline={multiLine}
                        select
                        SelectProps={{
                            native: true
                        }}
                        label="Type"
                    >
                        {types.map(e => <option key={e} value={e}>{e}</option>)}
                    </TextField>
                </Container>
                <Container sx={{display: "flex", justifyContent: "flex-end", alignItems: "center", gap: "1rem"}}>
                    <Button variant="contained" onClick={() => setEditable(false)}>
                        Save
                    </Button>
                    {deletable && 
                        <Button variant="contained" color="error" onClick={handleDelete}>
                            Delete
                        </Button>
                    }
                </Container>
            </Container>
        ):(
            <Container sx={{display: "flex", justifyContent: "space-between"}}>
                <Container sx={{display: "flex", gap: "1rem", justifyContent: "flex-start"}}>
                    {children}
                </Container>
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