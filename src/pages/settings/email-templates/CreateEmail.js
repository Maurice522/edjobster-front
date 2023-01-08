import React from 'react'
import { useFormik } from "formik";
import { useNavigate } from 'react-router-dom';
import ReactQuill from 'react-quill';
import {
    Button,
    Card, Stack
  } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

const modules = {
    toolbar: [
      [{ 'font': [] }],
      [{ 'size': ['small', false, 'large', 'huge'] }],
      ['bold', 'italic', 'underline'],
      [{'list': 'ordered'}, {'list': 'bullet'}],
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
        navigate('#')
    }


    const formik = useFormik({
        inititalValues:{
            from:"",
            email_template:"",
            client_name:"",
            subject:"",
            attachment:"",
        },
    })
  return (
    <div>
        {/* <Card sx={{
            position:"relative",
            marginLeft:"auto",
            marginRight:"auto",
            width: "90%",
            backgroundColor:"#fff",
            boxShadow: '0px 3px 1px -2px rgb(145 158 171 / 20%), 0px 2px 2px 0px rgb(145 158 171 / 14%), 0px 1px 5px 0px rgb(145 158 171 / 12%)',
            borderRadius:'16px',
            }}> */}
              <div className="backbutton tt-back">
                <ArrowBackIosIcon onClick={navigatecancel} sx={{
                  cursor:"pointer"
                }}/>
              </div>

            <div>
                <form>
                    <div className='divrowmid'>
                        <label className="" htmlFor='Status'>From                 
                            {formik.touched.from && formik.errors.from ? <div>{formik.errors.role}</div> : null}
                        </label>
                        <input 
                            className="emailinutbar"
                            id="from"
                            name="from"
                            type="email"
                        />
                    </div>
                    <div className='midrow'>
                        <Stack sx={{marginRight:"0"}}>
                            <div className='divstack'>
                                <label className="" htmlFor='Status'>Email Template          
                                    {formik.touched.email_template && formik.errors.email_template ? <div>{formik.errors.role}</div> : null}
                                </label>
                                <input 
                                    className="emailinutbar2"
                                    id="email_template"
                                    name="email_template"
                                    type="email"
                                />
                            </div>
                            <div className='divstack'>
                                <label className="" htmlFor='Status'>Client Name              
                                    {formik.touched.client_name && formik.errors.client_name ? <div>{formik.errors.role}</div> : null}
                                </label>
                                <input 
                                    className="emailinutbar2"
                                    id="client_name"
                                    name="client_name"
                                    type="text"
                                />
                            </div>
                            <div className='divstack'>
                                <label className="" htmlFor='Status'>Subject            
                                    {formik.touched.subject && formik.errors.subject ? <div>{formik.errors.role}</div> : null}
                                </label>
                                <input 
                                    className="emailinutbar2"
                                    id="subject"
                                    name="subject"
                                    type="subject"
                                />
                            </div>
                        </Stack>
                        <div className='fileup'>
                            <label className="" htmlFor='Status'>Add Attachment           
                                {formik.touched.attachment && formik.errors.attachment ? <div>{formik.errors.role}</div> : null}
                            </label>
                            <input 
                                className=""
                                id="attachment"
                                name="attachment"
                                type="file"
                            />
                        </div>
                    </div>
                    <h3 className='variables'>Variables</h3>
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
                    </div>
                    <h4>Body</h4>
                    <div className='editor'>
                    <ReactQuill sx={{outerWidth:"80vw"}}theme="snow" 
                    modules={modules}
                        formats={formats} value={state.comments || ''}
                        />
                    </div>
                    <div className='btns'>
                        <button className='emailcancel'>
                            Cancel
                        </button>
                        <button className='emailsubmit' type='submit'>
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        {/* </Card> */}
    </div>
  )
}

export default CreateEmail