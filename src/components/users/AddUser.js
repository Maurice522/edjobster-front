/* eslint-disable camelcase */
import * as Yup from 'yup';
import { useFormik, Form, FormikProvider } from 'formik';
import { useNavigate } from 'react-router-dom';
// import { useHistory } from "react-router-dom";
// import { Link as RouterLink } from 'react-router-dom';
import { Stack, TextField, IconButton, InputAdornment, Divider, Select, MenuItem, Card, Button } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useEffect, useState } from 'react';
import { showToast } from '../../utils/toast';
import {
  useAddUserMutation
} from "../../redux/services/user/userService"
import Iconify from '../Iconify';


function AddUser() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [AddUser, AddUserInfo] = useAddUserMutation();

  const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
  const RegisterSchema = Yup.object().shape({
    firstName: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('First name required'),
    lastName: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Last name required'),
    mobile: Yup.string().matches(phoneRegExp, 'Phone number is not valid').required("Phone Number is required"),
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    companyName: Yup.string().required("Company Name is required").min(5, "Too Short!"),
    address: Yup.string().required("Address is required").min(10, "Too Short!"),
    landmark: Yup.string().required("Address is required").min(5, "Too Short!"),
    city: Yup.string().required("Address is required"),
    pincode: Yup.string().matches(/^[1-9][0-9]{5}$/, "Pincode is invalid").required("Pincode is required"),
    password: Yup.string().required("Password is required").min(8, "Too Short")
  });

  const navigate = useNavigate()
  const navigatecancel = () => {
    navigate('/dashboard/users/list')
  }
  // const proceed = () =>{
  //   navigate('/dashboard/user/adduser/createpassword')
  // }


  const validate = (values) => {
    const errors = {}

    if (!values.email) {
      errors.email = 'Required'
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
      errors.email = 'Invalid email address'
    }
    if (!values.first_name) {
      errors.first_name = 'Required'
    }

    if (!values.last_name) {
      errors.last_name = 'Required'
    }
    if (!values.designation) {
      errors.designation = 'Required'
    }
    if (!values.role) {
      errors.role = 'Required'
    }

    if (!values.department) {
      errors.department = 'Required'
    }
    if (!values.mobile) {
      errors.department = 'Required'
    }

    return errors
  }
  const formik = useFormik({
    initialValues: {
      first_name: "",
      last_name: "",
      department: "",
      designation: "",
      role: "",
      email: "",
      mobile: "",
      password: ""
      // confirmpassword: "",
    },
    validate,
    onSubmit: async (values) => {
      AddUser(values)
      console.log(values)
    },
  });
  useEffect(() => {
    if (AddUserInfo.isSuccess) {
      showToast("success", "Success User Created")
    }
  })
  const { errors, touched, handleSubmit, isSubmitting, getFieldProps, setSubmitting } = formik;


  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>

        <Card sx={{
          position: "relative",
          marginLeft: "auto",
          marginRight: "auto",
          width: "90%",
          backgroundColor: "#fff",
          // height :"80vh",
          boxShadow: '0px 3px 1px -2px rgb(145 158 171 / 20%), 0px 2px 2px 0px rgb(145 158 171 / 14%), 0px 1px 5px 0px rgb(145 158 171 / 12%)',
          borderRadius: '16px',
        }}>
          <div className="backbutton tt-back">
            <ArrowBackIosIcon onClick={navigatecancel} sx={{
              cursor: "pointer"
            }} />
          </div>
          <Stack sx={{
            marginTop: "1%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            gap: "2%"
          }}>
            <h1 className='dialogueTitle'>Create User Profile</h1>
          </Stack>

          <div className="h-screen flex items-center justify-center flex-col bg-gray-100">


            <div className='divrow'>
              <div className='passwordrow'>

                <TextField
                  fullWidth
                  label="First name"
                  {...getFieldProps('first_name')}
                  error={Boolean(touched.firstName && errors.firstName)}
                  helperText={touched.firstName && errors.firstName}
                />
              </div>
              <div className='passwordrow'>

                <TextField
                  fullWidth
                  label="Last name"
                  {...getFieldProps('last_name')}
                  error={Boolean(touched.last_name && errors.last_name)}
                  helperText={touched.last_name && errors.last_name}
                />
              </div>
            </div>
            <div className='divrow'>
              <div className='passwordrow'>

                <TextField
                  fullWidth
                  label="Email"
                  {...getFieldProps('email')}
                  error={Boolean(touched.email && errors.email)}
                  helperText={touched.email && errors.email}
                />
              </div>
              <div className='passwordrow'>

                <TextField
                  fullWidth
                  label="Mobile"
                  {...getFieldProps('mobile')}
                  error={Boolean(touched.mobile && errors.mobile)}
                  helperText={touched.mobile && errors.mobile}
                />
              </div>

            </div>
            <div className='divrow'>
              <div className='passwordrow'>

                <TextField
                  fullWidth
                  label="Department"
                  {...getFieldProps('department')}
                  error={Boolean(touched.department && errors.department)}
                  helperText={touched.department && errors.department}
                />
              </div>
              <div className='passwordrow'>

                <TextField
                  fullWidth
                  label="Designation"
                  {...getFieldProps('designation')}
                  error={Boolean(touched.designation && errors.designation)}
                  helperText={touched.designation && errors.designation}
                />
              </div>
            </div>
            <div className='divrow'>
              <div className='passwordrow'>
                <TextField
                  fullWidth
                  label="Role"
                  {...getFieldProps('role')}
                  error={Boolean(touched.role && errors.role)}
                  helperText={touched.role && errors.role}
                />
              </div>
            </div>
            <div className='divrow'>
              <div className='passwordrow'>
                <TextField
                  fullWidth
                  autoComplete="current-password"
                  type={showPassword ? 'text' : 'password'}
                  label="Password"
                  {...getFieldProps('password')}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton edge="end" onClick={() => setShowPassword((prev) => !prev)}>
                          <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  error={Boolean(touched.password && errors.password)}
                  helperText={touched.password && errors.password}
                />
              </div>
              <div className='passwordrow'>
                <TextField
                  fullWidth
                  autoComplete="current-password"
                  type={showConfirmPassword ? 'text' : 'password'}
                  label="Confirm Password"
                  {...getFieldProps('confirmpassword')}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton edge="end" onClick={() => setShowConfirmPassword((prev) => !prev)}>
                          <Iconify icon={showConfirmPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  error={Boolean(touched.confirmPassword && errors.confirmPassword)}
                  helperText={touched.confirmPassword && errors.confirmPassword}
                />
              </div>
            </div>
            <div className='divrowcb'>
              <input
                className="inutbarcb"
                id="status"
                name="status"
                type="checkbox"
                checked
              // onChange={formik.handleChange}
              // onBlur={formik.handleBlur}
              // value={formik.values.role}
              />
              <label className="cblabel" htmlFor='Status'>is Active
                {formik.touched.status && formik.errors.status ? <div>{formik.errors.role}</div> : null}
              </label>
            </div>
            <div className="divrow flex items-center justify-between">
              <button
                className="registerbutton1 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type='submit'
              >
                Submit
              </button>
            </div>
            <div className="divrow flex items-center justify-between">
              <Button
                type='sub'
                variant="contained"
                onClick={navigatecancel}
                sx={{
                  marginBottom: "2%"
                }}
              >
                Cancel
              </Button>
            </div>
          </div>
        </Card>
      </Form>

    </FormikProvider >
  )
}

export default AddUser


