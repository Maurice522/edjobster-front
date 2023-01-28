import * as Yup from 'yup';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Stack, Button, TextField, Container, CircularProgress } from '@mui/material';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useFormik as useForm, Form, FormikProvider } from 'formik';
// eslint-disable-next-line import/no-unresolved
import { showToast } from 'src/utils/toast';
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
  const [value, setValue] = React.useState(dayjs('2014-08-18T21:11:54'));
  const [birthvalue, setbirthValue] = React.useState(dayjs('2014-08-18T21:11:54'));
  const [admissionvalue, setadmissionValue] = React.useState(dayjs('2014-08-18T21:11:54'));
  const [graduationvalue, setgraduationValue] = React.useState(dayjs('2014-08-18T21:11:54'));
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


  // const formData = useForm({
  //   initialValues: {
  //     job_id: 1,
  //     first_name: '',
  //     last_name: "",
  //     mobile: "",
  //     email: "",
  //     gender: "",
  //     date_of_birth: value,
  //     pincode: "",
  //     street: "",
  //     city: "",
  //     state: "",
  //     country: "",
  //     exp_months: 0,
  //     exp_years: 0,
  //     marital_status: "",
  //     institute: ""
  //   },
  //   validationSchema: NewCandidateSchema,
  //   onSubmit: async (values) => {
  //     console.log({ ...values, date_of_birth: value })
  //     await AddCandidate({ ...values, date_of_birth: value });
  //   },
  //   validateOnChange: (value) => {
  //     NewCandidateSchema.validateSync(value)
  //   }
  // })

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
  const [UploadedFileName,setUploadedFileName]=useState("")
  const [Uploaded,setUploaded]= useState(false);
  const { data: jobData, refetch: jobDataRefetch } = useGetJobListQuery();
  const [job,setJob] = useState(0);
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
    institute: "",
    admission_date: `${value.get("year")}-${String(value.get("month") + 1).padStart(2, 0)}`,
    graduation_date: `${value.get("year")}-${String(value.get("month") + 1).padStart(2, 0)}`,
    // resume: "",
  })
  const handleChangeFormData = (name, value) => {
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
                // {...getFieldProps("last_name")}
                variant="standard"
                // error={Boolean(errors.last_name && touched.last_name)}
                // helperText={errors.last_name && touched.last_name}
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
                // {...getFieldProps("email")}
                variant="standard"
                name="email"
                onChange={(e) => handleChangeFormData(e.target.name, e.target.value)}
              // error={Boolean(errors.email && touched.email)}
              // helperText={errors.email && touched.email}
              />
              <TextField
                sx={{
                  width: '60%',
                }}
                required
                id="standard-required"
                label="Mobile Number"
                // {...getFieldProps("mobile")}
                variant="standard"
                name="mobile"
                onChange={(e) => handleChangeFormData(e.target.name, e.target.value)}
              // error={Boolean(errors.mobile && touched.mobile)}
              // helperText={errors.mobile && touched.mobile}
              />
            </Stack>
            <Stack direction="row" alignItems="center" justifyContent="flex-start" gap={10} mb={5} ml={0} mr={0}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DesktopDatePicker sx={{
                  width: "60%"
                }}
                  label="Date of Birth"
                  inputFormat="YYYY-MM-DD"
                  value={value}
                  onChange={e => {
                    handleChangeBirth(e)
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
                name="street"
                onChange={(e) => handleChangeFormData(e.target.name, e.target.value)}
              // {...getFieldProps("street")}
              // error={Boolean(errors.street && touched.street)}
              // helperText={errors.street && touched.street}
              />
              <TextField
                sx={{
                  width: '60%',
                }}
                required
                id="standard-select-currency-native"
                // select
                label="Country"
                SelectProps={{
                  native: true,
                }}
                // // helperText="Please select your country"
                variant="standard"
                name="country"
                onChange={(e) => handleChangeFormData(e.target.name, e.target.value)}
              // onChange={handleChangeCountry}
              // value={country}
              // {...getFieldProps("country")}
              // error={Boolean(errors.country && touched.country)}
              />
            </Stack>
            <Stack direction="row" alignItems="center" justifyContent="flex-start" gap={10} mb={5} ml={0} mr={0}>
              <TextField
                sx={{
                  width: '50%',
                }}
                required
                // select
                id="standard-required"
                label="State"
                variant="standard"
                name="state"
                onChange={(e) => handleChangeFormData(e.target.name, e.target.value)}
                // value={currentState}
                // onChange={handleChangeState}
                SelectProps={{
                  native: true,
                }}
              // {...getFieldProps("state")}
              // error={Boolean(errors.state && touched.state)}
              />
              {/* <option
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
              </TextField> */}
              <TextField
                sx={{
                  width: '15%',
                }}
                required
                id="standard-required"
                // select
                label="City"
                variant="standard"
                name="city"
                onChange={(e) => handleChangeFormData(e.target.name, e.target.value)}
                // onChange={handleChangeCity}
                SelectProps={{
                  native: true,
                }}
              // value={city}
              // {...getFieldProps("city")}
              // error={Boolean(errors.city && touched.city)}
              />
              {/* <option
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
              </TextField> */}
              <TextField
                sx={{
                  width: '20%',
                }}
                required
                id="standard-required"
                label="Zip-code"
                variant="standard"
                name="pincode"
                onChange={(e) => handleChangeFormData(e.target.name, e.target.value)}
              // {...getFieldProps("pincode")}
              // error={Boolean(errors.pincode && touched.pincode)}
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
                name="institute"
              // {...getFieldProps("institute")}
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
                    views={['year', 'month','day']}
                    inputFormat="DD/MM/YYYY"
                    value={admissionvalue}
                    name="admission_date"
                    id="admission"
                    onChange={e => {
                      handleChangeAdmission(e)
                      const dateadmission = dayjs(e)
                      handleChangeFormData("admission_date", `${dateadmission.get("year")}-${String(dateadmission.get("month") + 1).padStart(2, 0)}`)
                    }}                                  
                    renderInput={(params) => 
                    <TextField {...params} />}
                  />
                  <DesktopDatePicker
                    label="To"
                    inputFormat="DD/MM/YYYY"
                    views={['year', 'month','day']}
                    value={graduationvalue}
                    id="graduation"
                    onChange={e => {
                      handleChangeGraduation(e)
                      const dategraduation = dayjs(e)
                      handleChangeFormData("graduation_date", `${dategraduation.get("year")}-${String(dategraduation.get("month") + 1).padStart(2, 0)}`)
                    }}                                  name="graduation_date"
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
              {/* <Button
                sx={{
                  width:"40%"
                }}
                variant="contained"
                component="label"
              >
                {Uploaded ? UploadedFileName : "Upload Resume" }
                {/* Upload Resume */}
                {/* <input
                  type="file"
                  hidden
                  name='resume'
                  accept='application/pdf'
                  onChange={(e)=>  setUploaded(true) &
                  setUploadedFileName(e?.target?.value.split("\\").slice(-1)) &
                  handleChangeFormData(e?.target?.name, e?.target.files[0])
                }
                />
              </Button> */}

            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </div>
  );
}

export default NewcreateCandidate;
