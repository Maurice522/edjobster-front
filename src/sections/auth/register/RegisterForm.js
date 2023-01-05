import * as Yup from 'yup';
import React, { useState, useEffect } from 'react';
import { useFormik, Form, FormikProvider } from 'formik';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
// material
import { Stack, TextField, IconButton, InputAdornment } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// component
import Iconify from '../../../components/Iconify';
import { useAddRegisterMutation } from '../../../redux/services/register/registerService';
import { authTokenAction, authAction } from '../../../redux/auth/AuthReducer';
import { showToast } from '../../../utils/toast';

// ----------------------------------------------------------------------

export default function RegisterForm() {
  const navigate = useNavigate();
  const dispatch =useDispatch();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [AddRegister, AddRegisterInfo] = useAddRegisterMutation();

  if (AddRegisterInfo.isError) {
    showToast("error", AddRegisterInfo.error.data.msg);
    AddRegisterInfo.reset();
  }
  const successToast = async () => {
    await showToast("success", "Welcome to edjobster !! ")
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
    phoneNumber: Yup.string().matches(phoneRegExp, 'Phone number is not valid'),
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
    confirmpassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required('Re-enter your Password')
  });

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmpassword:'',
      phonenumber:''
    },
    validationSchema: RegisterSchema,
    onSubmit: (values) => {
      AddRegister({
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        password: values.password
      })
      dispatch(authAction(true))
      navigate('/dashboard', { replace: true });
    },
  });

  const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
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
            type="phonenumber"
            label="Phone Number"
            {...getFieldProps('phonenumber')}
            error={Boolean(touched.phonenumber && errors.phonenumber)}
            helperText={touched.phonenumber && errors.phonenumber}
          />

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
            error={Boolean(touched.confirmpassword && errors.confirmpassword)}
            helperText={touched.confirmpassword && errors.confirmpassword}
          />

          <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
            Register
          </LoadingButton>
        </Stack>
      </Form>
    </FormikProvider>
  );
}
