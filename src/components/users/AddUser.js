import { number } from 'prop-types';
import { Formik, Form, useField, ErrorMessage, useFormik, isInteger } from "formik";
import * as yup from 'yup';
import axios from "axios"; 
// import { useNavigate } from 'react-router-dom';
import { Link as RouterLink } from 'react-router-dom';
import { useState } from 'react';
import {
    Button,
    Card, Stack
} from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import Iconify from '../Iconify';
import Back from '../../assets/images/back.svg';



function AddUser() {
  
  const [firstname, setFirstName] = useState('');
  const [lastname, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [department, setDepartment] = useState('');
  const [designation, setDesignation] = useState('');
  const [role, setRole] = useState('');

      // const Input = ({ name, label, ...props }) => {
      //   const [field, meta] = useField(name);
      //   return (
      //     <div className="mb-4">
      //       <label htmlFor={field.name} className="block text-gray-700 text-sm font-bold">
      //         {label}
      //       </label>
      //       <input
      //         className={`${
      //           meta.error && meta.touched ? "border-red-500" : ""
      //         } shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
      //         {...field}
      //         {...props}
      //       />
      //       <ErrorMessage
      //         name={field.name}
      //         component="div"
      //         className="text-red-500 text-xs"
      //       />
      //     </div>
      //   );
      // };

    const validate = (values) => {
        const errors = {}
      
        if (!values.email) {
          errors.email = 'Required'
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
          errors.email = 'Invalid email address'
        }
        if (!values.firstname) {
          errors.firstname = 'Required'
        }
        
        if (!values.lastname) {
          errors.lastname = 'Required'
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
        if (!values.phone) {
          errors.department = 'Required'
        }
      
        return errors
      }
    const formik = useFormik({
        initialValues: {
          firstname: "",
          lastname: "",
          department: "",
          designation: "",
          role: "",
          email: "",
          phone: "",
        },
        validate,
        onSubmit:values => {
          alert(JSON.stringify(values, null, 2));
          console.log(values)
        },
      });
    

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
              <div className="backbutton tt-back">
                <RouterLink to="/dashboard/users/list">
                  <img src={Back} alt="" />
                </RouterLink>
              </div>

            <Stack sx={{
              marginTop:"1%",
              display:"flex",
              flexDirection:"row",
              justifyContent:"center",
              gap:"2%"
              }}>              
             <h1 className='dialogueTitle'>Create User Profile</h1> 
            </Stack>
            
          <div className="h-screen flex items-center justify-center flex-col bg-gray-100">
      

            <form onSubmit={formik.handleSubmit} className="bg-white w-6/12 shadow-md rounded px-8 pt-6 pb-8">
              <div className='divrow'>
                <label htmlFor='firstname'>First Name
                  <input
                      className="inutbar"
                      id="firstname"
                      name="firstname"
                      type="text"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.firstname}
                  />
                  {formik.touched.firstname && formik.errors.firstname ? <div>{formik.errors.firstname}</div> : null}
                </label>
                
                <label htmlFor='lastname'>Last Name
                  <input
                      className="inutbar"
                      id="lastname"
                      name="lastname"
                      type="text"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.lastname}
                  />
                  {formik.touched.lastname && formik.errors.lastname ? <div>{formik.errors.lastname}</div> : null}
                </label>
                
              </div>
              <div className='divrow emailphone'>
                <label htmlFor='email'>Email
                  <input
                      className="inutbar"
                      id="email"
                      name="email"
                      type="email"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.email}
                  />
                  {formik.touched.email && formik.errors.email ? <div>{formik.errors.email}</div> : null}
                </label>
                
                <label htmlFor='phone'>Phone Number
                  <input
                      className="inutbar"
                      id="phone"
                      name="phone"
                      type="text"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.phone}
                  />
                  {formik.touched.phone && formik.errors.phone ? <div>{formik.errors.phone}</div> : null}
                </label>
                
              </div>
              <div className='divrow'>
                <label htmlFor='department'>Department
                  <input
                      className="inutbar"
                      id="department"
                      name="department"
                      type="text"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.department}
                  />
                  {formik.touched.department && formik.errors.department ? <div>{formik.errors.department}</div> : null}
                </label>
                
                <label htmlFor='designation'>Designation
                  <input
                      className="inutbar"
                      id="designation"
                      name="designation"
                      type="text"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.designation}
                  />
                  {formik.touched.designation && formik.errors.designation ? <div>{formik.errors.designation}</div> : null}
                </label>
                
              </div>
              <div className='divrow'>
                <label htmlFor='role'>Role
                  <input
                      className="inutbar"
                      id="role"
                      name="role"
                      type="text"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.role}
                  />
                  {formik.touched.role && formik.errors.role ? <div>{formik.errors.role}</div> : null}
                </label>
                
              </div>
              <div className="divrow flex items-center justify-between">
                <button
                  component={RouterLink}
                  to="/dashboard/user/adduser/createpassword"
                  className="registerbutton1 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="submit"
                >
                  Register
                </button>
              </div>
              <div className="divrow flex items-center justify-between">
                <Button
                        type='sub'
                        variant="contained"
                        component={RouterLink}
                        to="/dashboard/users/list"
                    >
                        Cancel
                 </Button>
              </div>
            </form>
          </div>           
        </Card>
      </div>
  )
}

export default AddUser


