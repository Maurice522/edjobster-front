import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import {
  Button,
  Card, Stack
} from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useFormik, Formik, Form, useField, ErrorMessage } from "formik";
import { object, string, ref } from "yup";
import Iconify from '../Iconify';


function AddUserCreatePassword() {
  const baseUrl= "http://127.0.0.1:8000";
   
  const navigate = useNavigate();
  const cancelProcess = () => {
    navigate('/dashboard/users/list/');
  };
 
  const goBack = () => {
      navigate('/dashboard/user/adduser');
  };

  const RegisterSchema = Yup.object().shape({
    password: Yup.string().required('Password is required'),
    confirmpassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required('Re-enter your Password').min(12,"minimum 8 characters required"),
  });

  const formik = useFormik({
    initialValues: {
      password: "",
      confirmpassword: "",
    },
    validationSchema: RegisterSchema,
    onSubmit: async(values) => {
      // const navigate= useNavigate()
     
      const {
        password,        
      } = values;
    
      const res = await fetch(`${baseUrl}/account/members/`,{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({
          password
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
            boxShadow: '0px 3px 1px -2px rgb(145 158 171 / 20%), 0px 2px 2px 0px rgb(145 158 171 / 14%), 0px 1px 5px 0px rgb(145 158 171 / 12%)',
            borderRadius:'16px',
            }}>
            <div className="backbutton2 tt-back">
              <ArrowBackIosIcon onClick={goBack} sx={{cursor:"pointer"}}/>                          
            </div>
            <Stack sx={{
              marginTop:"5%",
              display:"flex",
              flexDirection:"row",
              justifyContent:"center",
              gap:"2%"
              }}>              
             <h1 className='dialogueTitle2'>Create Password</h1> 
            </Stack>
            <div className="h-screen flex items-center justify-center flex-col bg-gray-100">               
              <form className="bg-white w-6/12 shadow-md rounded px-8 pt-6 pb-8">
                <div className='passwordrow'>
                  <label htmlFor="password">Password
                    <input htmlFor="password"
                      className="userpasswordbar"
                      id="password"
                      name="password"
                      type="password"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.password}
                    />
                     {formik.touched.password && formik.errors.password ? <div>{formik.errors.password}</div> : null}
                  </label>
                </div>
                <div className='passwordrow'>
                  <label htmlFor="confirmpassword">Confirm Password
                    <input htmlFor="confirmpassword"
                      className="userpasswordbar2"
                      id="confirmpassword"
                      name="confirmpassword"
                      type="password"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.confirmpassword}
                    />
                     {formik.touched.confirmpassword && formik.errors.confirmpassword ? <div>{formik.errors.password}</div> : null}
                  </label>
                </div>
                <Stack sx={{
                    marginTop:"5%",
                    display:"flex",
                    flexDirection:"row",
                    justifyContent:"center",
                    gap:"2%"
                    }}>
                    <ul className='ulistBlock'>
                        <li className='listitems'>Atlease 8 characters long.</li>
                        <li className='listitems'>A combination of uppercase letters, lowercase letters, numbers, and symbols.</li>
                        <li className='listitems'>Not a word that can be found in a dictionary or the name of a person, character. product, or organizatopn.</li>
                        <li className='listitems'>Significantly different from your previous passwords.</li>
                        <li className='listitems'>Easy for you to remember but difficult for others to guess. Consider using a memorable phrase like "6MonkeysRLooking^".</li>
                    </ul>
                </Stack>
                <div className="divrow">
                  <button
                    className="registerbutton1 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="submit"
                  >
                    Confirm
                  </button>
                </div>
                <Stack className="divrow" alignItems="center" justifyContent="center" mb={5}>           
                    <Button
                        variant="contained"
                        onClick={cancelProcess}
                    >
                        Cancel
                    </Button>
                </Stack>   
              </form>
            </div>        
        </Card>
    </div>
  )
}

export default AddUserCreatePassword