import { useState, useEffect } from "react";
import {
    Card, Stack, Button, Container,
    Typography, ListItemIcon,
    Chip, TextField, Divider
} from '@mui/material';
import { showToast } from '../../../utils/toast';

const dataTypes = [
    "Short Text",
    "Paragraph",
    "Number",
    "Phone",
    "Email",
    "Single Choice",
    "Multiple Choice"
]

function Editable(props) {
    const { children, value, handleChange, multiLine, placeholder } = props
    console.log(multiLine, placeholder)
    const [editable, setEditable] = useState(false)
    return (
        editable?(
            <Container sx={{display: "flex", justifyContent: "space-between"}}>
                <TextField 
                    id="outlined-basic" 
                    label="Outlined" 
                    variant="outlined" 
                    value={value} 
                    onChange={handleChange}
                    multiline={multiLine}
                    maxRows={6}
                    placeholder={placeholder}
                />
                <Button variant="contained" onClick={() => setEditable(false)} sx={{
                    padding: "0 2rem"
                }}>
                    Save
                </Button>
            </Container>
        ):(
            <Container sx={{display: "flex", justifyContent: "space-between"}}>
                {children}
                <Button variant="outlined" onClick={() => setEditable(true)}>
                    Edit
                </Button>
            </Container>
        )
    )
}

export default function CreateWebform() {
    const [formTitle, setFormTitle] = useState("New Form");
    const handleChangeFormTitle = (e) => setFormTitle(e.target.value.trim())
    const [formData, setFormData] = useState([{
        name: "Personal Details",
        description: "",
        fields: [
            {
                name: "First Name",
                type: dataTypes[0]
            },
            {
                name: "Last Name",
                type: dataTypes[0]
            },
            {
                name: "Phone",
                type: dataTypes[dataTypes.indexOf("Phone")]
            },
            {
                name: "Email",
                type: dataTypes[dataTypes.indexOf("Email")]
            }
        ]
    }])
    const [sections, setSections] = useState([])
    const [currentSection, setCurrentSection] = useState(-1)
    const addSection = (name, description, fields) => {
        setFormData(prev => {
            if(!sections.includes(name.toLowerCase())) {
                setSections(pre => [...pre, name.toLowerCase()]);
                return [...prev, {name, description, fields}]
            }
            showToast("error", "Section with the same already exists.");
            return prev
        })
    }
    const updateSectionName = (name, newName) => {
        if(sections.includes(name.toLowerCase())) {
            setSections(prev => {
                prev[sections.indexOf(name)] = newName.toLowerCase()
                return prev
            })
            setFormData(prev => {
                prev[sections.indexOf(name)] = {...prev[sections.indexOf(name)], name: newName}
            })
        }
    }
    const updateSectionFields = (name, fields) => {
        if(sections.includes(name.toLowerCase())) {
            setFormData(prev => {
                prev[sections.indexOf(name)] = {...prev[sections.indexOf(name)], fields}
            })
        }
    }
    const updateSectionDescription = (name, des) => {
        if(sections.includes(name.toLowerCase())) {
            setFormData(prev => {
                prev[sections.indexOf(name)] = {...prev[sections.indexOf(name)], description: des}
            })
        }
    }
    return (
        <Container sx={{gap: "1rem", display: "flex", flexDirection: "column"}}>
            <Typography variant="h3" textAlign={"center"} bgcolor={"Background"}>
                Create Webform
            </Typography>
            <Container sx={{
                gap: "1rem", 
                display: "flex", 
                flexDirection: "column", 
                bgcolor: "Background", 
                borderRadius: "1rem", 
                padding: "1rem 2rem"
            }}>
                <Typography variant="h4">
                    Datatypes
                </Typography>
                <Container sx={{gap: "1rem", display: "flex", flexDirection: "row"}}>
                    {dataTypes.map((e, i) => <Chip key={i} label={e} />)}
                </Container>
            </Container>
            <Container sx={{gap: "1rem", display: "flex", flexDirection: "column"}}>
                <Container sx={{gap: "1rem", display: "flex", flexDirection: "row"}}>
                    <Editable
                        value={formTitle}
                        handleChange={handleChangeFormTitle}
                        multiLine
                        placeholder={"Edit Form Title"}
                    >
                        <Typography variant="h4">{formTitle}</Typography>
                    </Editable>
                </Container>
                {/* <TextField label="Standard" variant="standard" value={formTitle} onChange={(e) => setFormTitle(e.target.value.trim())}/> */}
                {formData.map((e, i) => (
                    <Container key={i}>
                        <Divider orientation="horizontal" flexItem>
                            {e.name}
                        </Divider>
                    </Container>
                ))}
            </Container>
        </Container>
    )
}