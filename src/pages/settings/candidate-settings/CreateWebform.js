import { useState, useEffect } from "react";
import {
    Card, Stack, Button, Container,
    Typography, ListItemIcon,
    Chip, TextField, Divider, Input
} from '@mui/material';
// eslint-disable-next-line import/no-unresolved
import Modal from "src/components/modal/Modal";
import { showToast } from '../../../utils/toast';
import Editable from "../../../components/webform/WebformEditable"

const dataTypes = [
    "Text",
    "Paragraph",
    "Number",
    "Phone",
    "Email",
    // "Single Choice",
    // "Multiple Choice"
]

export default function CreateWebform() {
    const [sectionFieldsModal, setSectionFieldsModal] = useState(false)
    const [modalOpen, setModalOpen] = useState(false)
    const [modalData, setModalData] = useState({})
    const handleChangeModalData = (name, value) => setModalData(prev => {
        prev[name] = value
        return prev
    })
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
    const [sections, setSections] = useState(formData.map(e => e.name))
    const addSection = (name, fields) => {
        setFormData(prev => {
            if(!sections.includes(name)) {
                setSections(pre => [...pre, name]);
                return [...prev, {name, fields}]
            }
            showToast("error", "Section with the same name already exists.");
            return prev
        })
    }
    const updateSectionFields = (sectionName, fieldName, fields) => {
        if(sections.includes(sectionName)) {
            setFormData(prev => {
                prev[sections.indexOf(sectionName)][fieldName] = fields
                setSections(prev.map(e => e.name))
                return prev
            })
        }
    }
    const deleteSection = (sectionName) => {
        if(sections.indexOf(sectionName)) {
            if(sections.length === 1) {
                showToast("error", "Atleast 1 section is required.")
                return
            }
            setFormData(prev => {
                prev.splice(prev.indexOf(sectionName))
                setSections(prev.map(e => e.name))
                return prev
            })
            return  
        }
        showToast("error", "Section with the name does not exist.");
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
                    <Button variant="outlined" onClick={() => setModalOpen(true)}>Add Section</Button>
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
                        placeholder="Edit Form Title"
                        fullWidth
                    >
                        <h2>{formTitle}</h2>
                    </Editable>
                </Container>
                {formData.map((e, i) => (
                    <Container key={i}
                        sx={{
                            backgroundColor: "white",
                            borderRadius: "1rem",
                            padding: "2rem",
                            display: "flex",
                            flexDirection: "column",
                            gap: "2rem"
                        }}
                    >
                        <Editable
                            value={e.name}
                            name="name"
                            handleChange={(event) => updateSectionFields(e.name, event.target.name, event.target.value)}
                            placeholder="Edit Section Name"
                            deletable
                            handleDelete={() => deleteSection(e.name)}
                        >
                            <Typography variant="h4">{e.name}</Typography>
                        </Editable>
                        <Container sx={{display: "flex", borderRadius: "1rem", flexDirection: "column", gap: "2rem"}}>
                            {e.fields.map((elem, j) => (
                                <Container key={j} sx={{display: "flex", flexDirection: "column", gap: "1   rem"}}>
                                    <Editable 
                                        value={e.fields[j].name}
                                        placeholder={e.fields[j].name}
                                        handleChange={(event) => {
                                            // eslint-disable-next-line prefer-const
                                            let { fields, name } = e
                                            fields[j].name = event.target.value.trim()
                                            updateSectionFields(name, e.fields[j].name, fields)
                                        }}
                                        deletable
                                        deleteChange={() => console.log("something")}
                                    >
                                        <TextField
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
                        {/* <Button */}
                    </Container>
                ))}
            </Container>
            <Modal
                handleClose={() => setModalOpen(false)}
                open={modalOpen}
                handleSubmit={() => {addSection(modalData.name, []); setModalData({}); setModalOpen(false)}}
            >
                <Typography variant="h4">Create Section</Typography>
                <TextField 
                    name="name"
                    onChange={(e) => {handleChangeModalData(e.target.name, e.target.value); console.log(modalData)}}
                    label="Section Name"
                    placeholder="Section Name"
                    fullWidth
                />
            </Modal>
            <Modal
                handleClose={() => setSectionFieldsModal(false)}
                open={sectionFieldsModal}
                handleSubmit={() => updateSectionFields()}
            >
                <Typography variant="h4">Create Section</Typography>
                <TextField 
                    name="name"
                    onChange={(e) => {handleChangeModalData(e.target.name, e.target.value); console.log(modalData)}}
                    label="Section Name"
                    placeholder="Section Name"
                    fullWidth
                />
                <TextField 
                    name="fields"
                    onChange={(e) => {handleChangeModalData(e.target.name, e.target.value); console.log(modalData)}}
                    label="Section Name"
                    placeholder="Section Name"
                    fullWidth
                />
            </Modal>
        </Container>
    )
}