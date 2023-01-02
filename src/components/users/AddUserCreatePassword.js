import { useNavigate } from 'react-router-dom';
import {
  Button,
  Card, Stack
} from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { Formik, Form, useField, ErrorMessage } from "formik";
import { object, string, ref } from "yup";
import Iconify from '../Iconify';

const RegisterValidation = object().shape({
    password: string().min(8, "Required").required("Required"),
    confirmPassword: string()
      .required("Please confirm your password")
      .oneOf([ref("password")], "Passwords do not match"),
  });
  
  const Input = ({ name, label, ...props }) => {
    const [field, meta] = useField(name);
    return (
      <div className="mb-4">
        <label htmlFor={field.name}className="block text-gray-700 text-sm font-bold">
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


function AddUserCreatePassword() {

   
  const navigate = useNavigate();
  const cancelProcess = () => {
    navigate('/dashboard/users/list/');
  };
 
  const goBack = () => {
      navigate('/dashboard/user/adduser');
    };


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
            boxShadow: '0px 3px 1px -2px rgb(145 158 171 / 20%), 0px 2px 2px 0px rgb(145 158 171 / 14%), 0px 1px 5px 0px rgb(145 158 171 / 12%)',
            borderRadius:'16px',
            }}>
            <div className="backbutton tt-back">
              <ArrowBackIosIcon onClick={goBack} sx={{cursor:"pointer"}}/>   
                        
            </div>
            <Stack sx={{
              marginTop:"5%",
              display:"flex",
              flexDirection:"row",
              justifyContent:"center",
              gap:"2%"
              }}>              
             <h1 className='dialogueTitle'>Create Password</h1> 
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
                    
                    <div className="h-screen flex items-center justify-center flex-col bg-gray-100">
                        <Formik
                            initialValues={{
                            password: "",
                            confirmPassword: "",
                            }}
                            onSubmit={handleSubmit}
                            validationSchema={RegisterValidation}
                        >
                            {() => {
                            return (
                                <Form className="bg-white w-6/12 shadow-md rounded px-8 pt-6 pb-8">
                                <Input className="passwordbar2" name="password" label="Enter    Password" type="password" />
                                <Input sx={{
                                    marginTop:"2%"
                                  }}
                                    className="passwordbar"
                                    name="confirmPassword"
                                    label="Confirm Password"
                                    type="password"
                                />
                                <div className="flex items-center justify-between">
                                    
                                    <button
                                    className="registerbutton bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                    type="submit"
                                    >
                                    Register
                                    </button>
                            </div>
                        </Form>
                        );
                        }}
                    </Formik>
                </div>
                </Stack>
                <Stack sx={{
                    marginTop:"5%",
                    display:"flex",
                    flexDirection:"row",
                    justifyContent:"center",
                    gap:"2%"
                    }}>
                    <ul>
                        <li className='listitems'>Atlease 8 characters long</li>
                        <li className='listitems'>A combination of uppercase letters, lowercase letters, numbers, and symbols</li>
                        <li className='listitems'>Atlease 8 characters long</li>
                        <li className='listitems'>Atlease 8 characters long</li>
                    </ul>
                </Stack>
                <Stack alignItems="center" justifyContent="center" mb={5}>           
                    <Button
                        variant="contained"
                        onClick={cancelProcess}
                        // component={RouterLink}
                        // to="/dashboard/users/list"
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

export default AddUserCreatePassword