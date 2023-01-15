/* eslint-disable camelcase */
import * as Yup from 'yup';
import { useFormik, Form, FormikProvider } from 'formik';
import { useNavigate } from 'react-router-dom';
// import { useHistory } from "react-router-dom";
// import { Link as RouterLink } from 'react-router-dom';
import {
  Button,
  Card, Stack
} from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';



function AddUser() {
  const baseUrl= "http://127.0.0.1:8000";

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
  });
  
      const navigate= useNavigate()
      const navigatecancel = () =>{
        navigate('/dashboard/users/list')
      }
      const proceed = () =>{
        navigate('/dashboard/user/adduser/createpassword')
      }


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
        // if (!values.password) {
        //   errors.department = 'Required'
        // }
        // if (!values.mobile) {
        //   errors.password = 'Required'
        // }
        // if (values.mobile !== values.confirmpassword) {
        //   errors.password = 'password did not match'
        // }
      
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
          // confirmpassword: "",
        },
        validate,
        onSubmit: async(values) => {
          // const navigate= useNavigate()
         
          const {first_name,
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
            navigate("/dashboard/users/list");
          }


          
          alert(JSON.stringify(values, null, 2));
          console.log(values);
          // history.push("/dashboard/user/adduser/createpassword");
        //  navigate('/dashboard/user/adduser/createpassword')
          
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
            // height :"80vh",
            boxShadow: '0px 3px 1px -2px rgb(145 158 171 / 20%), 0px 2px 2px 0px rgb(145 158 171 / 14%), 0px 1px 5px 0px rgb(145 158 171 / 12%)',
            borderRadius:'16px',
            }}>
              <div className="backbutton tt-back">
                <ArrowBackIosIcon onClick={navigatecancel} sx={{
                  cursor:"pointer"
                }}/>
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
                <label htmlFor='first_name'>First Name
                  <input
                      className="inutbar"
                      id="first_name"
                      name="first_name"
                      type="text"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.first_name}
                  />
                  {formik.touched.first_name && formik.errors.first_name ? <div>{formik.errors.first_name}</div> : null}
                </label>
                
                <label htmlFor='last_name'>Last Name
                  <input
                      className="inutbar"
                      id="last_name"
                      name="last_name"
                      type="text"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.last_name}
                  />
                  {formik.touched.last_name && formik.errors.last_name ? <div>{formik.errors.last_name}</div> : null}
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
                
                <label htmlFor='mobile'>mobile Number
                  <input
                      className="phonenumber"
                      id="mobile"
                      name="mobile"
                      type="text"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.mobile}
                  />
                  {formik.touched.mobile && formik.errors.mobile ? <div>{formik.errors.mobile}</div> : null}
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
                  onClick={proceed}
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
            </form>
          </div>           
        </Card>
      </div>
  )
}

export default AddUser


