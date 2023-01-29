import React, { useEffect, useState } from 'react';
import { useFormik, Form, FormikProvider } from 'formik';
import { useNavigate } from 'react-router-dom';
import ReactQuill from 'react-quill';
import { Stack, TextField, IconButton, InputAdornment, Divider, Select, MenuItem, Card, Button, Typography, Container } from '@mui/material';

import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

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
    const navigate = useNavigate()

    const navigatecancel = () => {
        navigate('-1')
    }
    const [UploadedFileName,setUploadedFileName]=useState("")
    const [Uploaded,setUploaded]= useState(false);

    const initialValues = {
        from: "",
        email_template: "",
        client_name: "",
        subject: "",
        attachment: "",
    }


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
                <div className="backbutton tt-back" style={{width:"10%", display: "flex"}} >
                    <ArrowBackIosIcon onClick={navigatecancel} sx={{
                        cursor: "pointer"
                    }} />
                </div>
                <h1>
                    Create Email Template
                </h1>
            </Container>
            <div>
                <form>
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
                                />
                            </div>
                            <div className='divstack'>
                                <TextField
                                    fullWidth
                                    label="Subject"
                                />
                            </div>
                        </Container>
                        <Container className='fileup' style={{
                            padding: "2rem"
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
                                    // onChange={(e) => setUploaded(true) &
                                    //     setUploadedFileName(e?.target?.value.split("\\").slice(-1)) &
                                    //     handleChangeFormData(e?.target?.name, e?.target.files[0])
                                    // }
                                />
                            </Button>
                        </Container>
                    </div>
                    {/* <h3 className='variables'>Variables</h3>
                    <div className='variableComponents'>
                        <div className='variablediv'>
                            <label className="variabledivlabel" htmlFor='Status'>Available Merge Fields
                                {formik.touched.client_name && formik.errors.client_name ? <div>{formik.errors.role}</div> : null}
                            </label>
                            <input
                                className="emailinutbar2"
                                id="client_name"
                                name="client_name"
                                type="text"
                            />
                        </div>
                        <div className='variablediv'>
                            <label className="variabledivlabel" htmlFor='Status'>Select Field
                                {formik.touched.client_name && formik.errors.client_name ? <div>{formik.errors.role}</div> : null}
                            </label>
                            <input
                                className="emailinutbar2"
                                id="client_name"
                                name="client_name"
                                type="text"
                            />
                        </div>
                        <div className='variablediv'>
                            <label className="variabledivlabel" htmlFor='Status'>Copy Merge Field Value
                                {formik.touched.client_name && formik.errors.client_name ? <div>{formik.errors.role}</div> : null}
                            </label>
                            <input
                                className="emailinutbar2"
                                id="client_name"
                                name="client_name"
                                type="text"
                            />
                        </div>
                    </div> */}
                    <h4 style={{ marginLeft: "20%", marginTop: "5%", marginBottom: "2%" }}>Body</h4>
                    <div className='editor'>
                        <ReactQuill sx={{ outerWidth: "80vw" }} theme="snow"
                            modules={modules}
                            formats={formats} value={state.comments || ''}
                        />
                    </div>
                    <div className='btns'>
                        <Button className='emailcancel' onClick={navigatecancel}>
                            Cancel
                        </Button>
                        <Button className='emailsubmit' type='submit'>
                            Submit
                        </Button>
                    </div>
                </form>
            </div>
            {/* </Card> */}
        </Container>
    )
}

export default CreateEmail