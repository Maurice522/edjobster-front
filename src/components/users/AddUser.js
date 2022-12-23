import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';

// eslint-disable-next-line import/no-unresolved
import { useDepartmentGetQuery } from 'src/redux/services/settings/DepartmentService';
// eslint-disable-next-line import/no-unresolved
import { useDesignationGetQuery } from 'src/redux/services/settings/DesignationService';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import FormGroup from '@mui/material/FormGroup';
import Checkbox from '@mui/material/Checkbox';
// eslint-disable-next-line import/no-unresolved
import ImagePreview from 'src/components/imagePreview/ImagePreview';


import { useFormik } from 'formik';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import {
  Button,
  Card,
  Grid,
  TextField,
  Stack
} from '@mui/material';
import GroupsIcon from '@mui/icons-material/Groups';
import Iconify from '../Iconify';

function AddUser() {

    const validate = (values) => {
        const errors = {}
      
        if (!values.email) {
          errors.email = 'Required'
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
          errors.email = 'Invalid email address'
        }
      
        return errors
      }



    const formik = useFormik({
        initialValues: {
          email: '',
        },
        validate,
        onSubmit: (values) => {
          alert(JSON.stringify(values, null, 2))
        },
      })


  return (
    <div>
        <Card sx={{
            position:"relative",
            marginLeft:"auto",
            marginRight:"auto",
            width: "90%",
            backgroundColor:"#fff",
            height :"80vh",
            boxShadow: '0px 3px 1px -2px rgb(145 158 171 / 20%), 0px 2px 2px 0px rgb(145 158 171 / 14%), 0px 1px 5px 0px rgb(145 158 171 / 12%)',
            borderRadius:'16px',
            }}>
            <Stack sx={{
              marginTop:"5%",
              display:"flex",
              flexDirection:"row",
              justifyContent:"center",
              gap:"2%"
              }}>              
             <h1 className='dialogueTitle'>Create User Profile</h1> 
            </Stack>
            <Stack sx={{
              marginTop:"3%",
              display:"flex",
              flexDirection:"colum",
              justifyContent:"center",
              gap:"10%"
             }}>
                <Stack className="stackrow"sx={{
                    color: "#2A72DE",
                    display:"flex",
                    flexDirection:"row",
                    justifyContent:"center",
                    gap:"10%"
                        }}>
                    <form>
                        <label className='formlabel' htmlFor="text">
                            Last name
                            <textarea type="text" />
                        </label>
                    </form>
                    <form>
                        <label className='formlabel' htmlFor="text">
                            First name
                            <textarea type="text" />
                        </label>
                    </form>
                </Stack>
                <Stack className="stackrow" sx={{
             
                    display:"flex",
                    flexDirection:"row",
                    justifyContent:"center",
                    gap:"10%"
                        }}>
                    <form onSubmit={formik.handleSubmit}>
                            <label htmlFor="email" className='formlabel'>
                                Email
                            <input type="email" name="email" id="email"
                                onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} />
                            {formik.touched.email && formik.errors.email && (
                                <span>{formik.errors.email}</span>
                            )}
                            </label>
                            <button type='submit'>Submit</button>
                    </form>
                    <form>
                        <label className='formlabel' htmlFor="number">
                            Phone
                            <input type="number" />
                        </label>
                    </form>
                </Stack>
                <Stack className="stackrow" sx={{             
                    display:"flex",
                    flexDirection:"row",
                    justifyContent:"center",
                    gap:"10%"
                        }}>
                    <form>
                        <label className='formlabel' htmlFor="text">
                            Department
                            <textarea type="text" />
                        </label>
                    </form>
                    <form>
                        <label className='formlabel' htmlFor="text">
                            Designation
                            <textarea type="text" />
                        </label>
                    </form>
                </Stack>
                <Stack className="stackrow" sx={{            
                    display:"flex",
                    flexDirection:"row",
                    justifyContent:"center",
                    gap:"10%"
                        }}>
                    <form>
                        <label className='formlabel' htmlFor="text">
                            Role
                            <textarea type="text" />
                        </label>
                    </form>
                </Stack>
                <Stack sx={{            
                    display:"flex",
                    flexDirection:"row",
                    justifyContent:"center",
                    gap:"10%"
                        }}>
                    <form>
                        <label htmlFor="text">
                            <input type="checkbox"/>
                            is Active
                            
                        </label>
                    </form>
                </Stack>
                <Stack direction="colum" alignItems="center" justifyContent="center" mb={5}>           
                    <Button
                        variant="contained"
                        component={RouterLink}
                        to="/dashboard/candidates/newcreate"
                        sx={{
                            color:"#2A72DE",
                            backgroundColor:"rgba(0, 0, 0, 0.25)",
                            width:"479px",
                            height:"50px",
                            borderRadius:"80px",
                            fontSize:"24px",
                        }}
                    >
                        Proceed
                    </Button>
                </Stack>
                <Stack direction="colum" alignItems="center" justifyContent="center" mb={5}>           
                    <Button
                        variant="contained"
                        component={RouterLink}
                        to="/dashboard/users/list"
                        startIcon={<Iconify icon="eva:plus-fill" />}
                    >
                        Cancel
                    </Button>
                </Stack>
         </Stack>
                                        
            
        </Card>
    </div>
  )
}

export default AddUser