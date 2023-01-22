import { useState, useEffect } from "react";
import {
    Card, Stack, Button, Container,
    Typography, ListItemIcon,
    Chip, TextField, Divider, Input
} from '@mui/material';
import { showToast } from '../../../utils/toast';

const dataTypes = [
    "Text",
    "Paragraph",
    "Number",
    "Phone",
    "Email",
    // "Single Choice",
    // "Multiple Choice"
]

function Editable(props) {
    const demobutton ={
        // navigate("/")
    }
    const { children, value, handleChange, multiLine, placeholder, fullWidth } = props
    const [editable, setEditable] = useState(false)
    return (
        editable?(
            <Container sx={{display: "flex", justifyContent: "space-between", alignItems: "center", gap: "2rem"}}>
                <TextField
                    id="outlined-basic" 
                    label="Outlined" 
                    variant="outlined" 
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
            },
            {
                name: "Address",
                type: dataTypes[dataTypes.indexOf("Paragraph")]
            }
        ]
    }])
    const [sections, setSections] = useState(["personal details"])
    const [currentSection, setCurrentSection] = useState(-1)
    const addSection = (name, fields) => {
        setFormData(prev => {
            if(!sections.includes(name.toLowerCase())) {
                setSections(pre => [...pre, name.toLowerCase()]);
                return [...prev, {name, fields}]
            }
            showToast("error", "Section with the same already exists.");
            return prev
        })
    }
    const updateSectionFields = (sectionName, fieldName, fields) => {
        console.log(fields)
        if(sections.includes(sectionName.toLowerCase())) {
            setFormData(prev => {
                prev[sections.indexOf(sectionName)] = {...prev[sections.indexOf(fieldName)], fields}
                console.log(prev)
                return prev
            })
        }
    }
    return (
        <Container sx={{gap: "1rem", display: "flex", flexDirection: "column"}}>
            <Container
                sx={{
                    display: "flex",
                    justifyContent: "space-around",
                    alignItems: "center"
                }}
            >
                <h2 variant="h3">
                    Create Webform
                </h2>
                <Container 
                    sx={{
                        display: "flex",
                        justifyContent: "flex-end",
                        gap: "1rem"
                    }}
                >
                    <Button variant="outlined">Add Section</Button>
                    <Button variant="contained">Create Webform</Button>
                </Container>
            </Container>
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
                        fullWidth
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
                        <Container sx={{display: "flex", borderRadius: "1rem", flexDirection: "column", gap: "2rem"}}>
                            {e.fields.map((elem, j) => (
                                <Container key={j} sx={{display: "flex", flexDirection: "column", gap: "1   rem"}}>
                                    <Editable 
                                        value={e.fields[j].name}
                                        placeholder={e.name}
                                        handleChange={(event) => {
                                            // eslint-disable-next-line prefer-const
                                            let { fields } = e
                                            fields[j].name = event.target.value.trim()
                                            console.log(fields[j].name)
                                            updateSectionFields(e.name, e.fields[j].name, fields)
                                        }}

                                    >
                                        <TextField 
                                            // type={`${e.fields[j].type.split(" ").length>0?e.fields[j].type.split(" ")[1].toLowerCase():e.fields[j].type.toLowerCase()}`} 
                                            type={`${e.fields[j].type.toLowerCase()}`}
                                            placeholder={e.fields[j].name}
                                            variant="filled"
                                            label={e.fields[j].type}
                                            disabled
                                        />
                                    </Editable>
                                </Container>
                            ))}
                        </Container>
                    </Container>
                ))}
            </Container>
        </Container>
    )
}