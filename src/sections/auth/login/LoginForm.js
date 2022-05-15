import * as Yup from 'yup';
import React, { useState, useEffect } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useFormik, Form, FormikProvider } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
// material
import { Link, Stack, Checkbox, TextField, IconButton, InputAdornment, FormControlLabel } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// component
import Iconify from '../../../components/Iconify';
import { useLoginQuery } from '../../../redux/services/login/LoginService';
import { authTokenAction, authAction } from '../../../redux/auth/AuthReducer';

// ----------------------------------------------------------------------
const customId = "custom-id-yes";
export default function LoginForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const [skip, setSkip] = useState(true);
  const [btnLoader, setBtnLoader] = useState(false);
  const [userData, setUserData] = useState({
    username: "",
    password: ""
  });

  const loginResponse = useLoginQuery(userData, {
    skip,
  });
  console.log("loginResponse", loginResponse);
  // useEffect(() => {

  if (loginResponse.isError) {
    toast.error(loginResponse.error.data.msg, {
      theme: "colored",
      toastId: customId
    });

  }
  if (loginResponse.isSuccess) {
    dispatch(authTokenAction(loginResponse.data.access));
    toast.success("Success !! ", {
      theme: "colored"
    });
    navigate('/dashboard/app', { replace: true });
  }
  // }, [userData, dispatch, loginResponse, navigate, btnLoader, setBtnLoader])

  useEffect(() => {
    if (!skip) {
      setTimeout(() => {
        console.log("skip", skip);

        setSkip(true);
      }, 1000);
    }

  }, [skip])


  const [showPassword, setShowPassword] = useState(false);

  const LoginSchema = Yup.object().shape({
    username: Yup.string().email('Email must be a valid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      remember: true,
    },
    validationSchema: LoginSchema,
    onSubmit: (values) => {
      setUserData({
        username: values.username,
        password: values.password
      })
      setSkip((prev) => !prev);
      dispatch(authAction(true));

    },
    onChange: (e) => {
      console.log("change", e.target.value);
    }
  });

  const { errors, touched, values, isSubmitting, handleChange, handleSubmit, getFieldProps } = formik;

  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <TextField
            fullWidth
            autoComplete="username"
            type="email"
            label="Email address"
            value={values.username}
            onChange={handleChange}
            {...getFieldProps('username')}
            error={Boolean(touched.username && errors.username)}
            helperText={touched.username && errors.username}
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
                  <IconButton onClick={handleShowPassword} edge="end">
                    <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            error={Boolean(touched.password && errors.password)}
            helperText={touched.password && errors.password}
          />
        </Stack>

        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
          <FormControlLabel
            control={<Checkbox {...getFieldProps('remember')} checked={values.remember} />}
            label="Remember me"
          />

          <Link component={RouterLink} variant="subtitle2" to="#" underline="hover">
            Forgot password?
          </Link>
        </Stack>

        <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={loginResponse.isLoading}>
          Login
        </LoadingButton>
      </Form>
    </FormikProvider>
  );
}
