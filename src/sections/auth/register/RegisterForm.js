import * as Yup from 'yup';
import React, { useState, useEffect } from 'react';
import { useFormik, Form, FormikProvider } from 'formik';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
// material
import { Stack, TextField, IconButton, InputAdornment, Divider } from '@mui/material';
import { LoadingButton, YearPicker } from '@mui/lab';
// component
import Iconify from '../../../components/Iconify';
import { useAddRegisterMutation } from '../../../redux/services/register/registerService';
import { authTokenAction, authAction } from '../../../redux/auth/AuthReducer';
import { showToast } from '../../../utils/toast';




export default function RegisterForm() {
  const navigate = useNavigate();
  const dispatch =useDispatch();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [AddRegister, AddRegisterInfo] = useAddRegisterMutation();
  
  const [availableCities, setAvailableCities] = useState([]);

  
  if (AddRegisterInfo.isError) {
    showToast("error", AddRegisterInfo.error.data.msg);
    AddRegisterInfo.reset();
  }
  const successToast = async () => {
    await showToast("success", "Welcome to Edjobster!!")
  }
  useEffect(() => {
    if (AddRegisterInfo.isSuccess) {
      dispatch(authTokenAction(AddRegisterInfo.data.access));
      console.log(AddRegisterInfo.data);
      successToast()
      navigate('/dashboard/app', { replace: true });
    }
  }, [AddRegisterInfo, dispatch, navigate])
  
  

  const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
  const RegisterSchema = Yup.object().shape({
    firstName: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('First name required'),
    lastName: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Last name required'),
    mobile: Yup.string().matches(phoneRegExp, 'Phone number is not valid'),
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
    confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required('Re-enter your Password'),
    address: Yup.string().required("Address is required").min(10, "Too Short!"),
    landmark: Yup.string().required("Address is required").min(5, "Too Short!"),
    city: Yup.string().required("Address is required").min(5, "Too Short!"),
    pincode: Yup.string().matches(/^[1-9]{6}$/, "Pincode is invalid").required("Pincode is required"),
  });

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      mobile:'',

      companyName: '',

      password: '',
      confirmPassword: '',

      address: '',
      landmark: '',
      city: '',
      pincode: '',
    },
    validationSchema: RegisterSchema,
    onSubmit: (values) => {
      AddRegister({
        first_name: values.firstName,
        last_name: values.lastName,
        email: values.email,
        password: values.password,
        mobile: `+91${values.mobile}`,
        company: values.companyName,
        city: values.city
      })
      dispatch(authAction(true))
      // navigate('/dashboard', { replace: true });
    },
  });

  const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;

  const [phoneNumber, setPhoneNumber] = useState("")
  const [phoneBoolean, setPhoneBoolean] = useState(null)
  const handleChangePhoneNumber = (e) => {
    if(e.target.value.length < 11) {
      setPhoneBoolean(true)
      setPhoneNumber(e.target.value)
    }
    else if(e.target.value > 11) {
      setPhoneBoolean(true)
    }
    else {
      setPhoneBoolean(false)
      setPhoneNumber(e.target.value)
    }
  }

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>

          <Divider orientation="horizontal" flexItem>
            Personal Details
          </Divider>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <TextField
              fullWidth
              label="First name"
              {...getFieldProps('firstName')}
              error={Boolean(touched.firstName && errors.firstName)}
              helperText={touched.firstName && errors.firstName}
            />

            <TextField
              fullWidth
              label="Last name"
              {...getFieldProps('lastName')}
              error={Boolean(touched.lastName && errors.lastName)}
              helperText={touched.lastName && errors.lastName}
            />
          </Stack>
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

          <Divider orientation="horizontal" flexItem>
            Address
          </Divider>
          <TextField
            fullWidth
            autoComplete="companyName"
            type="string"
            label="Company Name"
            {...getFieldProps('email')}
            // error={Boolean(touched.email && errors.email)}
            // helperText={touched.email && errors.email}
          />
          <TextField
            fullWidth
            autoComplete="address"
            type="string"
            label="Address"
            {...getFieldProps('companyName')}
            // error={Boolean(touched.email && errors.email)}
            // helperText={touched.email && errors.email}
          />
          <TextField
            fullWidth
            autoComplete="landmark"
            type="string"
            label="Landmark"
            {...getFieldProps('landmark')}
            // error={Boolean(touched.email && errors.email)}
            // helperText={touched.email && errors.email}
          />
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <TextField
              fullWidth
              autoComplete="city"
              type="string"
              label="City"
              {...getFieldProps('city')}
              // error={Boolean(touched.email && errors.email)}
              // helperText={touched.email && errors.email}
            />
            <TextField
              fullWidth
              autoComplete="pincode"
              type="string"
              label="Pincode"
              {...getFieldProps('pincode')}
              // error={Boolean(touched.email && errors.email)}
              // helperText={touched.email && errors.email}
            />
          </Stack>

          <Divider orientation="horizontal" flexItem>
            Password
          </Divider>
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
          <TextField
            fullWidth
            autoComplete="current-password"
            type={showConfirmPassword ? 'text' : 'password'}
            label="Confirm Password"
            {...getFieldProps('confirmPassword')}
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

          <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
            Register
          </LoadingButton>
        </Stack>
      </Form>
    </FormikProvider>
  );
}
