import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { Button, Container, MenuItem, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
// import { useForm } from "react-hook-form";

import ReactQuill from 'react-quill';
import { useNavigate, useParams } from 'react-router-dom';
// eslint-disable-next-line import/no-unresolved
import { showToast } from 'src/utils/toast';
import FileUploadComponent from '../../../components/FileUploadComponent';

import { useGetEmailCategoryQuery } from "../../../redux/services/settings/EmailCategoryService";
import { useAddEmailTemplateMutation, useUpdateEmailTemplateMutation, useGetEmailTemplateByIdQuery } from "../../../redux/services/settings/EmailTamplateService";



const modules = {
    toolbar: [
        [{ 'font': [] }],
        [{ 'size': ['small', false, 'large', 'huge'] }],
        ['bold', 'italic', 'underline'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        [{ 'align': [] }],
        [{ 'color': [] }, { 'background': [] }],
        ['clean']
    ]
};

const formats = [
    'font',
    'size',
    'bold', 'italic', 'underline',
    'list', 'bullet',
    'align',
    'color', 'background'
];

const state = {
    comments: ''
}


function CreateEmail() {
    const { id } = useParams()
    const navigate = useNavigate()
    const { data: emailTemplateData, refetch: emailTemplateDataRefetch } = useGetEmailTemplateByIdQuery(id)
    console.log(emailTemplateData)
    useEffect(() => emailTemplateDataRefetch(), [])
    const { data: emailCategoryData, refetch } = useGetEmailCategoryQuery()
    const [addEmailTemplate, addEmailTemplateInfo] = useAddEmailTemplateMutation()
    const {updateEmailTemplate, updateEmailTemplateInfo} = useUpdateEmailTemplateMutation()
    console.log(emailCategoryData)
    const navigateCancel = () => {
        navigate("/dashboard/email-templates/templates")
    }
    const [UploadedFileName, setUploadedFileName] = useState("")
    const [Uploaded, setUploaded] = useState(false);

    const initialValues = {
        // from: "",
        // client_name: "",
        name: "",
        subject: "",
        attachment: "",
        category: 0,
        message: "",
        type: ""
    }
    const [formData, setFormData] = useState(emailTemplateData || initialValues)
    const handleChangeFormData = (name, value) => {
        setFormData(prev => ({ ...prev, [name]: value }))
        console.log(formData)
    }
    const handleSubmit = async () => {
        console.log(formData)
        await addEmailTemplate(formData)
    }
    useEffect(() => {
        if (addEmailTemplateInfo.isError) {
            console.log(addEmailTemplateInfo.error)
            showToast("error", "Error occurred while adding email template.")
        }
        if (addEmailTemplateInfo.isSuccess) {
            showToast("success", "Successfully added email template.")
            setFormData(initialValues)
            navigate("/dashboard/email-templates/templates", { replace: true })
        }
    }, [addEmailTemplateInfo, navigate])


    return (
        <Container>
            {/* <Card sx={{
            position:"relative",
            marginLeft:"auto",
            marginRight:"auto",
            width: "90%",
            backgroundColor:"#fff",
            boxShadow: '0px 3px 1px -2px rgb(145 158 171 / 20%), 0px 2px 2px 0px rgb(145 158 171 / 14%), 0px 1px 5px 0px rgb(145 158 171 / 12%)',
            borderRadius:'16px',
            }}> */}
            <Container
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center"
                }}
            >
                <div className="backbutton tt-back" style={{ width: "10%", display: "flex" }} >
                    <ArrowBackIosIcon onClick={navigateCancel} sx={{
                        cursor: "pointer"
                    }} />
                </div>
                <h1>
                    Create Email Template
                </h1>
            </Container>
            <div>
                <div className='divrowmid'>
                    {/* <TextField
                        fullWidth
                        label="From"
                        {...getFieldProps('first_name')}
                        error={Boolean(touched.firstName && errors.firstName)}
                        helperText={touched.firstName && errors.firstName}
                    /> */}
                </div>
                <div className='midrow' style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center"
                }}>
                    <Container>
                        <div className='divstack'>
                            <TextField
                                fullWidth
                                label="Template Name"
                                name="name"
                                value={formData.name}
                                onChange={(event) => handleChangeFormData(event.target.name, event.target.value)}
                            />
                        </div>
                        <div className='divstack'>
                            <TextField
                                fullWidth
                                label="Subject"
                                name="subject"
                                value={formData.subject}
                                onChange={(event) => handleChangeFormData(event.target.name, event.target.value)}
                            />
                        </div>
                        <div className='divstack'>
                            <TextField
                                name="category"
                                fullWidth
                                label="Email Category"
                                select
                                onChange={(event) => handleChangeFormData(event.target.name, +event.target.value)}
                                value={formData.category}
                            >
                                {emailCategoryData && emailCategoryData?.data?.map((e, i) => (
                                    <MenuItem key={i} value={e.id}>
                                        {e.name}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </div>
                        <div className='divstack'>
                            <TextField
                                name="type"
                                fullWidth
                                label="Template Type"
                                select
                                onChange={(event) => handleChangeFormData(event.target.name, event.target.value)}
                                value={formData.type}
                            >
                                {["Internal", "Candidate"].map((e, i) => (
                                    <MenuItem key={i} value={e[0]}>
                                        {e}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </div>

                    </Container>
                    <Container className='fileup' style={{
                        padding: "2rem",
                    }}>
                        <p>Add attachment</p>
                        <Button
                            variant="contained"
                            component="label"
                        >
                            Upload File
                            <input
                                type="file"
                                hidden
                                name="attachment"
                                onChange={(e) => setUploaded(true) &&
                                    setUploadedFileName(e?.target?.value.split("\\").slice(-1)) &&
                                    handleChangeFormData("attachment", e?.target.files[0])
                                }
                            />
                        </Button>
                        <div style={{}}>
                            <FileUploadComponent />
                        </div>
                    </Container>
                </div>
                <h4 style={{ marginLeft: "20%", marginTop: "5%", marginBottom: "2%" }}>Body</h4>
                <div className='editor'>
                    <ReactQuill sx={{ outerWidth: "80vw" }} theme="snow"
                        modules={modules}
                        formats={formats}
                        value={formData.message || ''}
                        onChange={(e) => handleChangeFormData("message", e)}
                    />
                </div>
                <div className='btns'>
                    <Button className='emailcancel' onClick={navigateCancel}>
                        Cancel
                    </Button>
                    <Button className='emailsubmit' type='submit' onClick={handleSubmit}>
                        Submit
                    </Button>
                </div>
            </div>
            {/* </Card> */}
        </Container>
    )
}

export default CreateEmail