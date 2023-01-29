import { useNavigate } from "react-router-dom";
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
import EditableSection from "../../../components/webform/WebformEditableSection"
import { useAddWebformFieldsMutation } from '../../../redux/services/settings/FieldServices';

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
    const navigate = useNavigate()
    const [addWebfromFields, addWebformFieldsInfo] = useAddWebformFieldsMutation();
    const [modalOpen, setModalOpen] = useState(false)
    const [sectionFieldsModalOpen, setSectionFieldsModalOpen] = useState(false)
    const [addByTypeModalOpen, setAddByTypeModalOpen] = useState(false)
    const [modalData, setModalData] = useState({})
    const handleChangeModalData = (name, value) => setModalData(prev => {
        prev[name] = value
        return prev
    })
    const [currentSection, setCurrentSection] = useState(0)
    const [formTitle, setFormTitle] = useState("New Form");
    const handleChangeFormTitle = (e) => setFormTitle(e.target.value.trim())
    const initialValues = [{
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
    }]
    const [formData, setFormData] = useState(initialValues)
    const resetForm = () => {
        setFormData(initialValues)
        setFormTitle("New Form")
    }
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
        if(sections.includes(sectionName)) {
            if(sections.length === 1) {
                showToast("error", "Atleast one section is required.")
                return
            }
            setFormData(prev => {
                prev.splice(sections.indexOf(sectionName), 1)
                setSections(prev.map(e => e.name))
                return prev
            })
            return  
        }
        showToast("error", "Section with the name does not exist.");
    }
    const handleSubmit = async () => {
        await addWebfromFields({
            name: formTitle,
            form: formData
        })
    }
    useEffect(() => {
        if(addWebformFieldsInfo.isError) {
            showToast("error", addWebformFieldsInfo.error.message || addWebformFieldsInfo.error.error || "Failed Adding webform");
            console.log(addWebformFieldsInfo.error)
        }
        if(addWebformFieldsInfo.isSuccess) {
            showToast("success", "Successfully added weform")
            resetForm()
            navigate("/dashboard/candidate-settings/webforms", {replace: true})
        }
    }, [addWebformFieldsInfo, navigate])

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
                    <Button variant="contained" onClick={handleSubmit}>Submit</Button>
                </Container>
            </Container>
            {/* <Container sx={{
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
            </Container> */}
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
                            deletable={sections.length > 1}
                            handleDelete={() => deleteSection(e.name)}
                            fullWidth
                        >
                            <Typography variant="h4">{e.name}</Typography>
                        </Editable>
                        <Container sx={{display: "flex", borderRadius: "1rem", flexDirection: "column", gap: "2rem"}}>
                            {e.fields.map((elem, j) => (
                                <Container key={j} sx={{display: "flex", flexDirection: "column", gap: "1rem"}}>
                                    <EditableSection 
                                        value={elem.name}
                                        placeholder={elem.name}
                                        handleChange={(event) => {
                                            // eslint-disable-next-line prefer-const
                                            let { fields, name } = e
                                            fields[j].name = event.target.value.trim()
                                            updateSectionFields(name, elem.name, fields)
                                        }}
                                        deletable
                                        handleDelete={() => {
                                            // eslint-disable-next-line prefer-const
                                            let { fields, name } = e
                                            fields.splice(j, 1)
                                            updateSectionFields(name, "fields", fields)
                                        }}
                                        types={dataTypes}
                                        currentType={elem.type}
                                        handleChangeType={(event) => {
                                            // eslint-disable-next-line prefer-const
                                            let { fields, name } = e
                                            fields[j].type = event.target.value
                                            updateSectionFields(name, "fields", fields)
                                        }}
                                    >
                                        <TextField
                                            placeholder={elem.name}
                                            variant="filled"
                                            label={elem.name}
                                            disabled
                                        />
                                        <TextField
                                            placeholder={elem.name}
                                            variant="filled"
                                            label={elem.type}
                                            disabled
                                        />
                                    </EditableSection>
                                </Container>
                            ))}
                        </Container>
                        <Button
                            variant="text"
                            onClick={() => {setSectionFieldsModalOpen(true); setModalData({}); setCurrentSection(i)}}
                        >
                            Add Field
                        </Button>
                    </Container>
                ))}
            </Container>
            <Modal
                handleClose={() => {setModalOpen(false); setModalData({})}}
                open={modalOpen}
                handleSubmit={() => {addSection(modalData.name, modalData.fields); setModalData({}); setModalOpen(false)}}
            >
                <Container 
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                        gap: "5rem"
                    }}
                >
                    <Typography variant="h4">Create Section</Typography>
                    <Button 
                        variant="contained"
                        onClick={() => {
                            console.log(!Object.keys(modalData).includes("fields"))
                            if(!Object.keys(modalData).includes("fields")) {
                                handleChangeModalData("fields", [])
                                console.log(modalData)
                            }
                            setModalData(prev => ({...prev, fields: [...prev.fields, {
                                name: "",
                                type: ""
                            }]}))
                        }}
                    >
                        Add Field
                    </Button>
                </Container>
                <TextField 
                    name="name"
                    onChange={(e) => {handleChangeModalData(e.target.name, e.target.value); console.log(modalData)}}
                    label="Section Name"
                    placeholder="Section Name"
                />
                {modalData.fields && modalData.fields.length && <Divider flexItem>Fields</Divider>}
                <Container
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "2rem"
                    }}
                >
                    {modalData.fields?.map((e, i) => (
                        <Container 
                            key={i}
                            sx={{
                                display: "flex",
                                flexDirection: "row",
                                gap: "2rem"
                            }}
                        >
                            <TextField 
                                name="fields"
                                onChange={(event) => {
                                    // eslint-disable-next-line prefer-const
                                    let { fields } = modalData
                                    fields[i].name = event.target.value.trim()
                                    setModalData(prev => ({...prev, fields}))
                                }}
                                label="Field Name"
                                placeholder="Field Name"
                            />
                            <TextField 
                                name="fields"
                                onChange={(event) => {
                                    // eslint-disable-next-line prefer-const
                                    let { fields } = modalData
                                    fields[i].type = event.target.value
                                    setModalData(prev => ({...prev, fields}))
                                }}
                                label="Field Type"
                                placeholder="Field Type"
                                select
                                SelectProps={{
                                    native: true,
                                    defaultValue: ""
                                }}
                            >
                                {dataTypes.map(e => <option key={e} value={e}>{e}</option>)}
                            </TextField>
                        </Container>
                    ))}
                </Container>
            </Modal>
            <Modal
                handleClose={() => {setSectionFieldsModalOpen(false); setModalData({})}}
                open={sectionFieldsModalOpen}
                handleSubmit={() => {
                    if(!Object.keys(modalData).includes("fields")) {
                        showToast("error", "Select a field type.")
                        return
                    }
                    updateSectionFields(sections[currentSection], "fields", [...formData[currentSection].fields, modalData])
                    setSectionFieldsModalOpen(false)
                    setModalData({})
                }}
            >
                <Typography variant="h4">Add Field</Typography>
                <TextField 
                    name="name"
                    onChange={(e) => {handleChangeModalData(e.target.name, e.target.value); console.log(modalData)}}
                    label="Name"
                    placeholder="Field Name"
                    fullWidth
                />
                <TextField 
                    name="type"
                    onChange={(e) => {handleChangeModalData(e.target.name, e.target.value); console.log(modalData)}}
                    label="Type"
                    placeholder="Type"
                    fullWidth
                    select
                    SelectProps={{
                        native: true,
                        defaultValue: dataTypes[0]
                    }}
                >
                    <option key={-1} style={{
                        fontStyle: "italic"
                    }}>Type</option>
                    {dataTypes.map(e => <option key={e} value={e} id={e}>{e}</option>)}
                </TextField>
            </Modal>
            {/* <Modal
                handleClose={() => {addByTypeModalOpen(false); setModalData({})}}
                open={addByTypeModalOpen}
                handleSubmit={() => {
                    addSection()
                    addByTypeModalOpen(false)
                    setModalData({})
                }}
            >
                <Typography variant="h4">Add Field</Typography>
                <TextField 
                    name="name"
                    onChange={(e) => {handleChangeModalData(e.target.name, e.target.value); console.log(modalData)}}
                    label="Field Name"
                    placeholder="Field Name"
                    fullWidth
                />
                <TextField 
                    name="type"
                    onChange={(e) => {handleChangeModalData(e.target.name, e.target.value); console.log(modalData)}}
                    label="Section Name"
                    placeholder="Section Name"
                    fullWidth
                    select
                    SelectProps={{
                        native: true
                    }}
                >
                    {dataTypes.map(e => <option key={e} value={e} id={e}>{e}</option>)}
                </TextField>
            </Modal> */}
        </Container>
    )
}