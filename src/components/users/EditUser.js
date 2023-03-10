// import { Link as RouterLink } from 'react-router-dom';
import { number } from 'prop-types';
import { Formik, Form, useField, ErrorMessage, useFormik, isInteger } from "formik";
import { object, string, ref } from "yup";
// eslint-disable-next-line import/no-unresolved
// eslint-disable-next-line import/no-unresolved
// eslint-disable-next-line import/no-unresolved
import { useNavigate } from 'react-router-dom';

import {
    Button,
    Card, Stack
} from '@mui/material';
import Iconify from '../Iconify';



const RegisterValidation = object().shape({
    firstname: string().required("Required"),
    lastname: string().required("Required"),
    department: string().required("Required"),
    designation: string().required("Required"),
    role: string().required("Required"),
    email: string()
      .required("Valid email required")
      .email("Valid email required"),
    
});


const Input = ({ name, label, ...props }) => {
    const [field, meta] = useField(name);
    return (
      <div className="mb-4">
        <label htmlFor={field.name} className="block text-gray-700 text-sm font-bold">
          {label}
        </label>
        <input
          className={`${
            meta.error && meta.touched ? "border-red-500" : ""
          } shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
          {...field}
          {...props}
        />
        <ErrorMessage
          name={field.name}
          component="div"
          className="text-red-500 text-xs"
        />
      </div>
    );
  };

function EditUser() {

    const navigate = useNavigate();
    const navigateToPassword = () => {
        navigate('/dashboard/user/adduser/createpassword');
      };
    const cancelProcess = () => {
        navigate('/dashboard/user/');
      };
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
        },
        validate,
        onSubmit: (values) => {
          alert(JSON.stringify(values, null, 2))
        },
      })
      const handleSubmit = (values) => {
        console.log(values);
      };

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
              marginTop:"1%",
              display:"flex",
              flexDirection:"row",
              justifyContent:"center",
              gap:"2%"
              }}>              
             <h2 className='dialogueTitle'>Edit User Profile</h2> 
            </Stack>
            
            <div className="h-screen flex items-center justify-center flex-col bg-gray-100">
      <Formik
        initialValues={{
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
        }}
        onSubmit={handleSubmit}
        validationSchema={RegisterValidation}
      >
        {() => (
          <Form className="bg-white w-6/12 shadow-md rounded px-8 pt-6 pb-8">
            <div className='divrow'>
              <Input className="inutbar"name="firstname" label="First Name" />
              <Input className="inutbar"name="lastnamename" label="Last Name" />
            </div>
            <div className='divrow emailphone'>
              <Input className="inutbar" name="email" label="Email" />
              <Input className="inutbar" name="phone" label="Phone Number" />
            </div>    
            <div className='divrow'>  
              <Input className="inutbar" name="department" label="Department" />
              <Input className="inutbar" name="designation" label="Designation" />
            </div>
            <div className='divrow'>
              <Input className="inutbar" name="role" label="Role" />
            </div>
            <div className="divrow flex items-center justify-between">
              <button
              //   component={RouterLink}
                onClick={navigateToPassword}
                to="/dashboard/users/list"
                className="registerbutton1 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Save
              </button>
            </div>
            <div className="divrow flex items-center justify-between">
              <Button
                      variant="contained"
                      // component={RouterLink}
                      onClick={cancelProcess}
                      to="/dashboard/users/list"
                      startIcon={<Iconify icon="eva:plus-fill" />}
                  >
                      Cancel
                </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
                                        
            
        </Card>
    </div>
  )
}

export default EditUser