/* eslint-disable camelcase */
import { useFormik } from "formik";
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
  
  // const [first_name, setFirst_Name] = useState('');
  // const [last_name, setLast_Name] = useState('');
  // const [email, setEmail] = useState('');
  // const [mobile, setmobile] = useState('');
  // const [department, setDepartment] = useState('');
  // const [designation, setDesignation] = useState('');
  // const [role, setRole] = useState('');
  // const [password, setPassword] = useState('');
  // const [confirmpassword, setConfirmPassword] = useState('');

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
          password: "",
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
                {/* <RouterLink to="/dashboard/users/list"> */}
                  {/* <img src={Back} alt="" onClick={navigatecancel} /> */}
                {/* </RouterLink> */}
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
                  Register
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


