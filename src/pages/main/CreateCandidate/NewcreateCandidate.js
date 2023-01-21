import * as Yup from 'yup';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Stack, Button, TextField, LinearProgress } from '@mui/material';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useFormik as useForm, Form, FormikProvider } from 'formik';
import { useAddCandidateMutation } from '../../../redux/services/candidate/CandidateServices';
import {
  useGetCountryQuery,
  useGetStateQuery,
  useGetCityQuery,
} from '../../../redux/services/settings/CountryStateCityService';
import { useGetAssesmentCategoryQuery } from '../../../redux/services/main/AssesmentCatagoriesservice';
import { useGetJobListQuery } from '../../../redux/services/jobs/JobListService';
import Back from '../../../assets/images/back.svg';

function NewcreateCandidate() {
  const [isLoading, setIsLoading] = useState(true)
  const [AddCandidate, AddCandidateInfo] = useAddCandidateMutation()
  const [value, setValue] = React.useState(dayjs('2014-08-18T21:11:54'));
  const handleChange = (newValue) => {
    setValue(newValue);
  };
  const [country, setCountry] = useState(1);
  const { data: countryData, refetch: countryDataRefetch } = useGetCountryQuery();
  const { data: stateData, refetch: stateDataRefetch } = useGetStateQuery(country);
  const [currentState, setCurrentState] = useState(1);
  const { data: cityData, refetch: cityDataRefetch} = useGetCityQuery(currentState);
  const [city, setCity] = useState(1);
  const handleChangeCountry = (e) => {
    setCountry(e.target.value);
    stateDataRefetch();
    cityDataRefetch();
  };
  const handleChangeState = (e) => {
    setCurrentState(e.target.value);
    cityDataRefetch();
  };
  const handleChangeCity = (e) => setCity(e.target.value);

  const { data: assessmentData, refetch: assessmentDataRefetech } = useGetAssesmentCategoryQuery();
  const [assessment, setAssessment] = useState(0);
  const handleChangeAssessment = (e) => setAssessment(e.target.value);

  const { data: jobData, refetch: jobDataRefetch } = useGetJobListQuery();
  const [job, setJob] = useState(0);
  const handleChangeJob = (e) => setJob(e.target.value);


  const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
  const NewCandidateSchema = Yup.object().shape({
    job_id: Yup.number().required("The job field is required"),
    first_name: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('First name required'),
    last_name: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Last name required'),
    mobile: Yup.string().matches(phoneRegExp, 'Phone number is not valid').required('Phone Number is required'),
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    gender: Yup.string().matches(/^((F|f)e)?(M|m)ale$/, "Gender value invalid").required("Gender value is required"),
    date_of_birth: Yup.string().required("Date of birth is required").matches(/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/, "Date of birth value invalid"),
    pincode: Yup.string().matches(/^[1-9][0-9]{5}$/, 'Pincode is invalid').required('Pincode is required'),
    street: Yup.string().required('Address is required').min(10, 'Too Short!'),
    city: Yup.number().required('City is required'),
    state: Yup.number().required('State is required'),
    country: Yup.number().required('Country is required'),
    exp_months: Yup.number().required("Experience Months is required"),
    exp_years: Yup.number().required("Experience Years is required"),
    marital_status: Yup.string().matches(/^((u|U)n)?(m|M)arried$/, 'Marital Status format invalid').required('Marital Status is required'),
  });

  const formData = useForm({
    initialValues: {
      job_id: 1,
      first_name: '',
      last_name: "",
      mobile: "",
      email: "",
      gender: "",
      date_of_birth: value,
      pincode: "",
      street: "",
      city: 1,
      state: 1,
      country: 1,
      exp_months: 0,
      exp_years: 0,
      marital_status: ""
    },
    validationSchema: NewCandidateSchema,
    onSubmit: (values) => {
      console.log(values)
      AddCandidate(values)
    },
    validateOnChange: (value) => {
      NewCandidateSchema.validateSync(value)
    }
  })
  const { errors, touched, handleSubmit, isSubmitting, getFieldProps, setSubmitting, handleChange: handlFormDataChange } = formData;

  useEffect(() => {
    if(!countryData) {
      countryDataRefetch()
      setIsLoading(true)
    }
    if(!stateData) {
      stateDataRefetch()
      setIsLoading(true)
    }
    if(!cityData) {
      cityDataRefetch()
      setIsLoading(true)
    }
    if(countryData && countryData.countries && stateData && stateData.states && cityData && cityData.cities) {
      setIsLoading(false)
    }
  }, []) 

  if(isLoading) {
    return (
      <LinearProgress />
    )
  }

  return (
    <div>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5} ml={5} mr={5}>
        <Stack
          sx={{
            display: 'flex',
            flexDirection: 'row',
            gap: '5%',
          }}
        >
          <Link to="/dashboard/candidates">
            <img src={Back} alt="Go Back" />
          </Link>
          <h2 style={{ width: '300px' }}>Create a Candidate</h2>
        </Stack>
        <Button variant="contained" onClick={handleSubmit}>
          Create
        </Button>
      </Stack>
      <Stack direction="row" alignItems="flex-start" justifyContent="center" gap={30}>
        <Stack>
          <h3 style={{ marginBottom: '2%' }}>Personal Details</h3>
          <Stack>
            <Stack direction="row" alignItems="center" justifyContent="flex-start" gap={10} mb={5} ml={0} mr={0}>
              <TextField
                sx={{
                  width: '60%',
                }}
                required
                id="standard-required"
                label="First Name"
                {...getFieldProps("first_name")}
                variant="standard"
                error={Boolean(errors.first_name && touched.first_name)}
                helperText={errors.first_name && touched.first_name}
              />
              <TextField
                sx={{
                  width: '60%',
                }}
                required
                id="standard-required"
                label="Last Name"
                {...getFieldProps("last_name")}
                variant="standard"
                error={Boolean(errors.last_name && touched.last_name)}
                helperText={errors.last_name && touched.last_name}
              />
            </Stack>
            <Stack direction="row" alignItems="center" justifyContent="flex-start" gap={10} mb={5} ml={0} mr={0}>
              <TextField
                sx={{
                  width: '60%',
                }}
                required
                id="standard-required"
                label="Email"
                {...getFieldProps("email")}
                variant="standard"
                error={Boolean(errors.email && touched.email)}
                helperText={errors.email && touched.email}
              />
              <TextField
                sx={{
                  width: '60%',
                }}
                required
                id="standard-required"
                label="Mobile Number"
                {...getFieldProps("mobile")}
                variant="standard"
                error={Boolean(errors.mobile && touched.mobile)}
                helperText={errors.mobile && touched.mobile}
              />
            </Stack>
            <Stack direction="row" alignItems="center" justifyContent="flex-start" gap={10} mb={5} ml={0} mr={0}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DesktopDatePicker
                  label="Date of Birth"
                  inputFormat="YYYY-MM-DD"
                  value={value}
                  onChange={handleChange}
                  renderInput={(params) => 
                    <TextField 
                      {...params} 
                      fullWidth
                      error={Boolean(errors.date_of_birth && touched.date_of_birth)} 
                      helperText={errors.date_of_birth && touched.date_of_birth} 
                    />
                  }
                />
              </LocalizationProvider>
            </Stack>
            <Stack direction="row" alignItems="center" justifyContent="flex-start" gap={10} mb={5} ml={0} mr={0}>
              <TextField
                sx={{
                  width: '60%',
                }}
                required
                id="standard-required"
                label="Street"
                variant="standard"
                {...getFieldProps("street")}
                error={Boolean(errors.street && touched.street)}
                helperText={errors.street && touched.street}
              />
              <TextField
                sx={{
                  width: '60%',
                }}
                required
                id="standard-select-currency-native"
                select
                label="Country"
                SelectProps={{
                  native: true,
                }}
                // helperText="Please select your country"
                variant="standard"
                onChange={handleChangeCountry}
                value={country}
                // {...getFieldProps("country")}
              >
                <option
                  value={0}
                  style={{
                    fontStyle: 'italic',
                  }}
                >
                  Country
                </option>
                {countryData.countries && countryData.countries.map((e, i) => (
                  <option key={i} value={e.id}>
                    {e.name}
                  </option>
                ))}
              </TextField>
            </Stack>
            <Stack direction="row" alignItems="center" justifyContent="flex-start" gap={10} mb={5} ml={0} mr={0}>
              <TextField
                sx={{
                  width: '50%',
                }}
                required
                select
                id="standard-required"
                label="State"
                variant="standard"
                value={currentState}
                onChange={handleChangeState}
                SelectProps={{
                  native: true,
                }}
                // {...getFieldProps("state")}
              >
                <option
                  value={0}
                  style={{
                    fontStyle: 'italic',
                  }}
                >
                  State
                </option>
                {stateData.states && stateData.states.map((e, i) => (
                  <option key={i} value={e.id}>
                    {e.name}
                  </option>
                ))}
              </TextField>
              <TextField
                sx={{
                  width: '15%',
                }}
                required
                id="standard-required"
                select
                label="City"
                variant="standard"
                onChange={handleChangeCity}
                SelectProps={{
                  native: true,
                }}
                value={city}
              >
                <option
                  value={0}
                  style={{
                    fontStyle: 'italic',
                  }}
                >
                  City
                </option>
                {cityData.cities && cityData.cities.map((e, i) => (
                  <option key={i} value={e.id}>
                    {e.name}
                  </option>
                ))}
              </TextField>
              <TextField
                sx={{
                  width: '20%',
                }}
                required
                id="standard-required"
                label="Zip-code"
                variant="standard"
              />
            </Stack>
          </Stack>
          <h3 style={{ marginTop: '5%', marginBottom: '2%' }}>Education Details</h3>
          <Stack>
            <Stack direction="row" alignItems="center" justifyContent="flex-start" gap={10} mb={5} ml={0} mr={0}>
              <TextField
                sx={{
                  width: '50%',
                }}
                required
                id="standard-required"
                label="Institute"
                variant="standard"
              />
              <TextField
                sx={{
                  width: '50%',
                }}
                required
                id="standard-required"
                label="Degree"
                variant="standard"
              />
            </Stack>
            <Stack direction="row" alignItems="center" justifyContent="flex-start" gap={10} mb={5} ml={0} mr={0}>
              <TextField
                sx={{
                  width: '50%',
                }}
                required
                id="standard-required"
                label="Years of Experience"
                variant="standard"
              />
              <TextField
                sx={{
                  width: '50%',
                }}
                required
                id="standard-required"
                label="Month of Experience"
                variant="standard"
              />
            </Stack>
            <Stack direction="row" alignItems="center" justifyContent="flex-start" gap={10} mb={5} ml={0} mr={0}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Stack
                  spacing={3}
                  direction="row"
                  alignItems="center"
                  justifyContent="flex-start"
                  gap={10}
                  mb={5}
                  ml={0}
                  mr={0}
                >
                  <DesktopDatePicker
                    label="From"
                    inputFormat="MM/DD/YYYY"
                    value={value}
                    onChange={handleChange}
                    renderInput={(params) => <TextField {...params} />}
                  />
                  <DesktopDatePicker
                    label="To"
                    inputFormat="MM/DD/YYYY"
                    value={value}
                    onChange={handleChange}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </Stack>
              </LocalizationProvider>
            </Stack>
          </Stack>
        </Stack>
        <Stack>
          <Stack mt={7}>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="flex-start"
              width={400}
              gap={10}
              mb={5}
              ml={0}
              mr={0}
            >
              <TextField
                sx={{
                  width: '50%',
                }}
                required
                id="standard-required"
                label="Assign to job"
                variant="standard"
                select
                onChange={handleChangeJob}
                SelectProps={{
                  native: true,
                }}
              >
                <option
                  value={0}
                  style={{
                    fontStyle: 'italic',
                  }}
                >
                  Job
                </option>
                {jobData.map((e, i) => (
                  <option key={i} value={e.id}>
                    {e.title}
                  </option>
                ))}
              </TextField>
            </Stack>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="flex-start"
              width={400}
              gap={10}
              mb={5}
              ml={0}
              mr={0}
            >
              <TextField
                sx={{
                  width: '100%',
                }}
                required
                id="standard-required"
                label="Assessment Questions"
                variant="standard"
                select
                onChange={handleChangeAssessment}
                SelectProps={{
                  native: true,
                }}
              >
                <option
                  value={0}
                  style={{
                    fontStyle: 'italic',
                  }}
                >
                  Assessment Question
                </option>
                {assessmentData.data.map((e, i) => (
                  <option key={i} value={e.id}>
                    {e.name}
                  </option>
                ))}
              </TextField>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </div>
  );
}

export default NewcreateCandidate;
