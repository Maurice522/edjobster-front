import * as Yup from 'yup';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Stack, Button, TextField, Container, CircularProgress, ListItem, Grid, FormControl, InputLabel, Select } from '@mui/material';
import dayjs from 'dayjs';
import MenuItem from '@mui/material/MenuItem';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useFormik as useForm, Form, FormikProvider } from 'formik';
// eslint-disable-next-line import/no-unresolved
import { showToast } from 'src/utils/toast';
import { skipToken } from '@reduxjs/toolkit/dist/query';
import { useAddCandidateMutation, useAddCandidateWithResumeMutation } from '../../../redux/services/candidate/CandidateServices';
import {
  useGetCountryQuery,
  useGetStateQuery,
  useGetCityQuery,
} from '../../../redux/services/settings/CountryStateCityService';
import { useGetAssesmentCategoryQuery } from '../../../redux/services/main/AssesmentCatagoriesservice';
import { useGetJobListQuery } from '../../../redux/services/jobs/JobListService';
import Back from '../../../assets/images/back.svg';

function NewcreateCandidate() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false)
  const [AddCandidate, AddCandidateInfo] = useAddCandidateMutation()
  const [value, setValue] = React.useState(dayjs('2002-08-18T21:11:54'));
  const [birthvalue, setbirthValue] = React.useState(dayjs('2014-08-18T21:11:54'));
  const [admissionvalue, setadmissionValue] = React.useState(dayjs('2016-08-18T21:11:54'));
  const [graduationvalue, setgraduationValue] = React.useState(dayjs('2020-08-18T21:11:54'));


  const handleChangeBirth = (newValue) => {
    setValue(newValue);
  };
  const handleChangeAdmission = (newValue) => {
    setadmissionValue(newValue);
    console.log("changed admission")
  };
  const handleChangeGraduation = (newValue) => {
    setgraduationValue(newValue);
  };


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
    city: Yup.string().required('City is required'),
    state: Yup.string().required('State is required'),
    country: Yup.string().required('Country is required'),
    exp_months: Yup.number().required("Experience Months is required"),
    exp_years: Yup.number().required("Experience Years is required"),
    marital_status: Yup.string().matches(/^((u|U)n)?(m|M)arried$/, 'Marital Status format invalid').required('Marital Status is required'),
    institute: Yup.string().required("Institute is required")
  });


  useEffect(() => {
    if (AddCandidateInfo.isError) {
      console.log(AddCandidateInfo.error)
      showToast("error", "Error adding candidate")
    }
    if (AddCandidateInfo.isSuccess) {
      showToast("success", "Successfully added candidate")
      navigate("/dashboard/candidates")
    }
  }, [AddCandidateInfo, navigate])

  const { data: assessmentData, refetch: assessmentDataRefetech } = useGetAssesmentCategoryQuery();
  const [assessment, setAssessment] = useState(1);
  const handleChangeAssessment = (e) => setAssessment(e.target.value);
  const [UploadedFileName, setUploadedFileName] = useState("")
  const [Uploaded, setUploaded] = useState(false);

  const { data: jobData, refetch: jobDataRefetch } = useGetJobListQuery();
  const [job, setJob] = useState(0);
  const handleChangeJob = (e) => setJob(e.target.value);

  const [formData, setFormData] = useState({
    job_id: 1,
    first_name: "",
    last_name: "",
    mobile: "",
    email: "",
    gender: "Male",
    date_of_birth: `${value.get("year")}-${String(value.get("month") + 1).padStart(2, 0)}-${String(value.get("date")).padStart(2, 0)}`,
    pincode: "",
    street: "",
    city: "",
    state: "",
    country: "",
    exp_months: 0,
    exp_years: 0,
    marital_status: "",
    institute: ""
  })
  const [countryId, setCountryId] = useState(skipToken)
  const [stateId, setStateId] = useState(skipToken)
  // const { data: jobData, refetch: jobDataRefetch } = useGetJobListQuery();
  const { data: countryData, refetch: countryDataRefetch } = useGetCountryQuery()
  const { data: cityData, refetch: cityDataRefetch } = useGetCityQuery(stateId)
  const { data: stateData, refetch: stateDataRefetch } = useGetStateQuery(countryId)



  // const [job,setJob] = useState(0);
  // const handleChangeJob = (e) => setJob(e.target.value);

  useEffect(() => {
    stateDataRefetch()
  }, [countryId])

  useEffect(() => {
    cityDataRefetch()
  }, [stateId])

  // useEffect(()=>{
  //   console?.log("hii")
  //   stateDataRefetch()
  // },[formData?.country])
  useEffect(() => {
    countryDataRefetch()
  }, [])

  const handleChangeFormData = (name, value) => {
    if (name === "country") {
      setCountryId(value)
    } if (name === "state") {
      setStateId(value)
    }
    setFormData(prev => {
      prev[name] = value
      return prev
    })
    console.log(formData)
  }

  const handleSubmit = async () => {
    console.log(formData)
    await AddCandidate(formData)
  }

  useEffect(() => {
    console.log(AddCandidateInfo.data)
    if (AddCandidateInfo.isError) {
      console.log(AddCandidateInfo.error.error)
      showToast("error", "Error has occurred")
    }
    if (AddCandidateInfo.isSuccess) {
      showToast("success", "Successfully added candidate")
      navigate("/dashboard/candidates/");
    }
  }, [AddCandidateInfo, navigate])

  if (isLoading) {
    return (
      <Container sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        <CircularProgress />
      </Container>
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
                variant="standard"
                name="first_name"
                onChange={(e) => handleChangeFormData(e.target.name, e.target.value)}
              />
              <TextField
                sx={{
                  width: '60%',
                }}
                required
                id="standard-required"
                label="Last Name"
                variant="standard"
                name="last_name"
                onChange={(e) => handleChangeFormData(e.target.name, e.target.value)}
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
                variant="standard"
                name="email"
                onChange={(e) => handleChangeFormData(e.target.name, e.target.value)}
              />
              <TextField
                sx={{
                  width: '60%',
                }}
                required
                id="standard-required"
                label="Mobile Number"
                variant="standard"
                name="mobile"
                onChange={(e) => handleChangeFormData(e.target.name, e.target.value)}
              />
            </Stack>
            <Stack direction="row" alignItems="center" justifyContent="flex-start" gap={12} mb={5} ml={0} mr={0}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DesktopDatePicker sx={{
                  width: "60%"
                }}
                  label="Date of Birth"
                  inputFormat="YYYY-MM-DD"
                  value={value}
                  onChange={e => {
                    // handleChange(e)
                    const date = dayjs(e)
                    handleChangeFormData("date_of_birth", `${date.get("year")}-${String(date.get("month") + 1).padStart(2, 0)}-${String(date.get("date")).padStart(2, 0)}`)
                  }}
                  renderInput={(params) =>
                    <TextField
                      {...params}
                    />
                  }
                />
              </LocalizationProvider>
              <TextField
                sx={{
                  width: '45%',
                  marginRight:"0"
                }}
                required
                id="standard-required"
                label="Street"
                variant="standard"
                name="street"
                onChange={(e) => handleChangeFormData(e.target.name, e.target.value)}
              />
            </Stack>
            <Stack direction="row" alignItems="center" justifyContent="flex-start" gap={8} mb={5} ml={0} mr={0}>
              <FormControl variant="standard" sx={{ minWidth: '45%'}}>
                <InputLabel id="demo-simple-select-standard-label">Country</InputLabel>
                <Select sx={{
                  width:"100%"
                }}
                  margin="dense"
                  variant="standard"
                  fullWidth
                  name="country"
                  label="country"
                  onChange={(e) => handleChangeFormData(e?.target?.name, e?.target?.value)}
                >
                  {countryData &&
                    countryData?.countries?.map((item) => (
                      <MenuItem key={item.id} value={item.id}>
                        {item?.name}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
              <FormControl variant="standard" sx={{ m: 1, minWidth: '45%' }}>
                <InputLabel id="select-state">State</InputLabel>
                <Select
                  labelId="select-state"
                  id="state"
                  onChange={(e) => handleChangeFormData(e?.target?.name, e?.target?.value)}
                  label="State"
                  name="state"
                >
                  {stateData ? stateData?.states?.map((state) => <MenuItem key={state.id} value={state.id}>{state.name}</MenuItem>) : <MenuItem value="">
                    <em>None</em>
                  </MenuItem>}
                </Select>
              </FormControl>
            </Stack>
            <Stack direction="row" alignItems="center" justifyContent="flex-start" gap={8} mb={5} ml={0} mr={0}>
              <FormControl variant="standard" sx={{ m: 1, minWidth: '45%' }}>
                <InputLabel id="select-city">Select City</InputLabel>
                <Select
                  labelId="select-city"
                  id="city"
                  name="city"
                  onChange={(e) => handleChangeFormData(e?.target?.name, e?.target?.value)}
                  label="Select City"
                >
                  {cityData ? cityData?.cities?.map((city) =>
                    <MenuItem key={city.id} value={city.id}>{city.name}
                    </MenuItem>) : <MenuItem value="">
                    <em>None</em>
                  </MenuItem>}
                </Select>
              </FormControl>
                <TextField
                  sx={{
                    width: '200%',
                  }}
                  required
                  id="standard-required"
                  label="Zip-code"
                  variant="standard"
                  name="pincode"
                  onChange={(e) => handleChangeFormData(e.target.name, e.target.value)}
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
                name="exp_years"
                onChange={(e) => handleChangeFormData(e.target.name, +e.target.value)}
              />
              <TextField
                sx={{
                  width: '50%',
                }}
                required
                id="standard-required"
                label="Month of Experience"
                variant="standard"
                name="exp_months"
                onChange={(e) => handleChangeFormData(e.target.name, +e.target.value)}
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
                    views={['year', 'month']}
                    inputFormat="MM/YYYY"
                    value={value}
                    renderInput={(params) => <TextField {...params} />}
                  />
                  <DesktopDatePicker
                    label="To"
                    inputFormat="MM/YYYY"
                    views={['year', 'month']}
                    value={value}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </Stack>
              </LocalizationProvider>
            </Stack>
          </Stack>
        </Stack>
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
              SelectProps={{
                native: true,
              }}
              name="job_id"
              onChange={(e) => {
                handleChangeJob(e)
                handleChangeFormData(e.target.name, +e.target.value)
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
              {jobData && jobData?.map((e, i) => (
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
              {assessmentData && assessmentData.data?.map((e, i) => (
                <option key={i} value={e.id}>
                  {e.name}
                </option>
              ))}
            </TextField>
          </Stack>
          <Stack>
          <Button
                sx={{
                  width:"40%"
                }}
                variant="contained"
                component="label"
                name
               >
                Upload Resume
                <input
                  type="file"
                  hidden
                />
              </Button>
          </Stack>
        </Stack>
      </Stack>
    </div>
  );
}

export default NewcreateCandidate;
