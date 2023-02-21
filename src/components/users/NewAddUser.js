/* eslint-disable camelcase */
import * as Yup from 'yup';
import { useFormik, Form, FormikProvider } from 'formik';
import { useNavigate } from 'react-router-dom';
import { 
  TextField, 
  IconButton, 
  InputAdornment, 
  Divider,  
  Button,
  Card, 
  Stack } from '@mui/material';
import { LoadingButton} from '@mui/lab';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useEffect } from 'react';



function AddUser() {
  const baseUrl= "http://127.0.0.1:8000";

  const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
  const RegisterSchema = Yup.object().shape({
    first_Name: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('First name required'),
    last_Name: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Last name required'),
    mobile: Yup.string().matches(phoneRegExp, 'Phone number is not valid').required("Phone Number is required"),
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    department: Yup.string().required("Company Name is required").min(5, "Too Short!"),
    designation: Yup.string().required("Address is required").min(10, "Too Short!"),
    role: Yup.string().required("Address is required"),
  });

  const formData = useFormik({
      initialValues: {
        first_name: "",
        last_name: "",
        department: 0,
        designation: 0,
        role: "U",
        email: "",
        mobile: "",
      },
      validationSchema: RegisterSchema,
      onSubmit: async (values) => {
        const {
          first_name,
          last_name,
          department,
          designation,
          role,
          email,
          mobile,
        } = values;
      
        const res = await fetch(`${baseUrl}/account/members/`,{
          method:"POST",
          headers:{
            "Content-Type":"application/json"
          },
          body:JSON.stringify({
            first_name,
            last_name,
            department,
            designation,
            role,
            email,
            mobile,
          })
        });
    
        const data = await res.json();
        if(res.status === 422 || !data){
          window.alert("Invalid Registeration");
          console.log("Invalid Registeration");
        }else{
          window.alert("Registeration Successfull");
          console.log("Registeration Successfull");
        }


        
        alert(JSON.stringify(values, null, 2));
        console.log(values);
        // history.push("/dashboard/user/adduser/createpassword");
      //  navigate('/dashboard/user/adduser/createpassword')
        
      },
  });
    
  const navigate = useNavigate()
  const navigatecancel=()=>{
    navigate('/dashboard/user')
  }
  const { errors, touched, handleSubmit, isSubmitting, getFieldProps, setSubmitting } = formData;

  return (
      <div>
        <Card sx={{
            position:"relative",
            marginLeft:"auto",
            marginRight:"auto",
            width: "90%",
            backgroundColor:"#f9fafb",
            // height :"80vh",
            boxShadow: '0px 3px 1px -2px rgb(145 158 171 / 20%), 0px 2px 2px 0px rgb(145 158 171 / 14%), 0px 1px 5px 0px rgb(145 158 171 / 12%)',
            borderRadius:'16px',
            }}>
              <div className="backbutton tt-back">
                <ArrowBackIosIcon onClick={navigatecancel} sx={{
                  cursor:"pointer"
                }}/>
              </div>
            <div className="filldetailspag">
                <Stack sx={{
                marginTop:"1%",
                display:"flex",
                flexDirection:"row",
                justifyContent:"center",
                gap:"2%"
                }}>              
                    <h1 className='dialogueTitle'>Create User Profile</h1> 
                </Stack>   
                <Stack>
                    <div className='filldetailspage'>
                        <FormikProvider value={formData} sx={{
                            width:'60%'
                        }}>
                            <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
                                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{
                                    marginBottom:"5%",
                                }}>
                                    <TextField
                                        fullWidth
                                        label="First name"
                                        {...getFieldProps('firstName')}
                                        error={Boolean(touched.first_name && errors.first_name)}
                                        helperText={touched.first_name && errors.first_name}
                                    /> 

                                    <TextField
                                        fullWidth
                                        label="Last name"
                                        {...getFieldProps('lastName')}
                                        error={Boolean(touched.last_name && errors.last_name)}
                                        helperText={touched.last_name && errors.last_name}
                                    />
                                </Stack>
                                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}  sx={{
                                    marginBottom:"5%"
                                }}>
                                    <TextField
                                        fullWidth
                                        autoComplete="username"
                                        type="email"
                                        label="Email address"
                                        {...getFieldProps('email')}
                                        error={Boolean(touched.email && errors.email)}
                                        helperText={touched.email && errors.email}
                                    />
                                    <TextField
                                        fullWidth
                                        type="number"
                                        length={10}
                                        label="Phone Number"
                                        {...getFieldProps('mobile')}
                                        error={Boolean(touched.mobile && errors.mobile)}
                                        helperText={touched.mobile && errors.mobile}
                                    />
                                </Stack>
                                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{
                                    marginBottom:"5%"
                                }}>
                                    <TextField
                                    fullWidth
                                    label="Department"
                                    {...getFieldProps('department')}
                                    error={Boolean(touched.department && errors.department)}
                                    helperText={touched.department && errors.department}
                                    />

                                    <TextField
                                    fullWidth
                                    label="Designation"
                                    {...getFieldProps('designation')}
                                    error={Boolean(touched.designation && errors.designation)}
                                    helperText={touched.designation && errors.designation}
                                    />
                                </Stack>
                                <TextField
                                    fullWidth
                                    label="Role"
                                    {...getFieldProps('role')}
                                    error={Boolean(touched.role && errors.role)}
                                    helperText={touched.role && errors.role}
                                />
                                {/* <div className='divrowcb'>
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
                                </div> */}
                                <div className="divrow flex items-center justify-between">
                                    <button
                                    // onClick={proceed}
                                    className="registerbutton1 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                    >
                                    Proceed
                                    </button>
                                </div>
                                <div className="divrow flex items-center justify-between">
                                    <Button
                                    type='sub'
                                    variant="contained"
                                    onClick={navigatecancel}
                                    sx={{
                                    marginBottom:"2%"
                                        }}
                                    >
                                    Cancel
                                    </Button>
                                </div>
                            </Form>
                        </FormikProvider> 
                    </div>
                </Stack>  
            </div>        
        </Card>
      </div>
  )
}

export default AddUser


