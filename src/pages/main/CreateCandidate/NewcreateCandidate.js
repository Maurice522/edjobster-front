import * as Yup from 'yup';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Stack,
  Button,
  TextField
} from '@mui/material';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useFormik as useForm, Form, FormikProvider } from 'formik';
import { useAddCandidateMutation } from '../../../redux/services/candidate/CandidateServices';
import { useGetCountryQuery, useGetStateQuery, useGetCityQuery } from "../../../redux/services/settings/CountryStateCityService";
import { useGetAssesmentCategoryQuery } from "../../../redux/services/main/AssesmentCatagoriesservice";
import { useGetJobListQuery } from "../../../redux/services/jobs/JobListService";
import Back from "../../../assets/images/back.svg";

function NewcreateCandidate() {
  const [value, setValue] = React.useState(dayjs('2014-08-18T21:11:54'));
  const handleChange = (newValue) => {
    setValue(newValue);
  };
  const {data: countryData} = useGetCountryQuery()
  const [country, setCountry] = useState(1)
  const {data: stateData, refetch: stateDataRefetch} = useGetStateQuery(country)
  const [currentState, setCurrentState] = useState(1)
  const {data: cityData, refetch: cityDataRefetch} = useGetCityQuery(currentState)
  const [city, setCity] = useState(1)
  const handleChangeCountry = (e) => {
    setCountry(e.target.value)
    stateDataRefetch()
    cityDataRefetch()
  }
  const handleChangeState = (e) => {
    setCurrentState(e.target.value)
    cityDataRefetch()
  }
  const handleChangeCity = (e) => setCity(e.target.value) 
  
  const {data: assessmentData, refetch: assessmentDataRefetech} = useGetAssesmentCategoryQuery()
  const [assessment, setAssessment] = useState(0)
  const handleChangeAssessment = (e) => setAssessment(e.target.value)

  const {data: jobData, refetch: jobDataRefetch} = useGetJobListQuery()
  const [job, setJob] = useState(0)
  const handleChangeJob = (e) => setJob(e.target.value)

  const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
  const RegisterSchema = Yup.object().shape({
    first_name: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('First name required'),
    last_name: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Last name required'),
    mobile: Yup.string().matches(phoneRegExp, 'Phone number is not valid').required("Phone Number is required"),
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    street: Yup.string().required("Address is required").min(10, "Too Short!"),
    city: Yup.number().required("City is required"),
    state: Yup.number().required("State is required"),
    country: Yup.number().required("Country is required"),
    pincode: Yup.string().matches(/^[1-9][0-9]{5}$/, "Pincode is invalid").required("Pincode is required"),
    marital_status: Yup.string().matches(/^((F|f)e)?(M|m)ale$/, "Marital Status format invalid").required("Marital Status is required"),
    
  });


  return (
    <div>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5} ml={5} mr={5}>
          <Stack sx={{
            display: "flex",
            flexDirection: "row",
            gap: "5%"
          }}>
            <Link to="/dashboard/candidates">
              <img src={Back} alt="Go Back" />
            </Link>
            <h2 style={{ width: "300px" }}>Create a Candidate</h2>
          </Stack>
          <Button
            variant="contained"
            to="/dashboard/jobs/create-job"
          >
            Create
          </Button>
        </Stack>
        <Stack direction="row" alignItems="flex-start" justifyContent="center" gap={30}>
          <Stack>
            <h3 style={{ marginBottom: "2%" }}>Personal Details</h3>
            <Stack>
              <Stack direction="row" alignItems="center" justifyContent="flex-start"  gap={10} mb={5} ml={0} mr={0}>
                <TextField sx={{
                  width: "60%"
                }}
                  required
                  id="standard-required"
                  label="First Name"
                  variant="standard"
                />
                <TextField sx={{
                  width: "60%"
                }}
                  required
                  id="standard-required"
                  label="Last Name"
                  variant="standard"
                />
              </Stack>
              <Stack direction="row" alignItems="center" justifyContent="flex-start"  gap={10} mb={5} ml={0} mr={0}>
                <TextField sx={{
                  width: "60%"
                }}
                  required
                  id="standard-required"
                  label="Email"
                  variant="standard"
                />
                <TextField sx={{
                  width: "60%"
                }}
                  required
                  id="standard-required"
                  label="Mobile Number"
                  variant="standard"
                />
              </Stack>
              <Stack direction="row" alignItems="center" justifyContent="flex-start"  gap={10} mb={5} ml={0} mr={0}>
                <TextField sx={{
                  width: "60%"
                }}
                  required
                  id="standard-required"
                  label="Alternate Email"
                  variant="standard"
                />
                <TextField sx={{
                  width: "60%"
                }}
                  required
                  id="standard-required"
                  label="Enter Mobile Number"
                  variant="standard"
                />
              </Stack>
              <Stack direction="row" alignItems="center" justifyContent="flex-start"  gap={10} mb={5} ml={0} mr={0}>
                <TextField sx={{
                  width: "60%"
                }}
                  required
                  id="standard-required"
                  label="Address"
                  variant="standard"
                />
                <TextField 
                  sx={{
                    width: "60%"
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
                >
                  <option 
                    value={0} 
                    style={{
                      fontStyle: "italic"
                    }}
                  >
                    Country
                  </option>
                  {countryData.countries.map((e, i) => (
                    <option key={i} value={e.id}>
                      {e.name}
                    </option>
                  ))}
                </TextField>

              </Stack>
              <Stack direction="row" alignItems="center" justifyContent="flex-start"  gap={10} mb={5} ml={0} mr={0}>
                <TextField 
                  sx={{
                    width: "50%"
                  }}
                  required
                  select
                  id="standard-required"
                  label="State"
                  variant="standard"
                  onChange={handleChangeState}
                  SelectProps={{
                    native: true,
                  }}
                  value={currentState}
                >
                  <option 
                    value={0} 
                    style={{
                      fontStyle: "italic"
                    }}
                  >
                    State
                  </option>
                  {stateData.states.map((e, i) => (
                    <option key={i} value={e.id}>
                      {e.name}
                    </option>
                  ))}
                </TextField>
                <TextField 
                  sx={{
                    width: "15%"
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
                      fontStyle: "italic"
                    }}
                  >
                    City
                  </option>
                  {cityData.cities.map((e, i) => (
                    <option key={i} value={e.id}>
                      {e.name}
                    </option>
                  ))}
                </TextField>
                <TextField sx={{
                  width: "20%"
                }}
                  required
                  id="standard-required"
                  label="Zip-code"
                  variant="standard"
                />
              </Stack>
              <Stack direction="row" alignItems="center" justifyContent="flex-start"  gap={10} mb={5} ml={0} mr={0}>
                <TextField sx={{
                  width: "19%"
                }}
                  required
                  id="standard-required"
                  label="Highest Degree"
                  variant="standard"
                />
                <TextField sx={{
                  width: "19%"
                }}
                  required
                  id="standard-required"
                  label="Total Experience"
                  variant="standard"
                />
              </Stack>
            </Stack>
            <h3 style={{ marginTop: "5%", marginBottom: "2%" }}>Education Details</h3>
            <Stack>
              <Stack direction="row" alignItems="center" justifyContent="flex-start"  gap={10} mb={5} ml={0} mr={0}>
                <TextField sx={{
                  width: "50%"
                }}
                  required
                  id="standard-required"
                  label="Institute"
                  variant="standard"
                />
                <TextField sx={{
                  width: "50%"
                }}
                  required
                  id="standard-required"
                  label="Degree"
                  variant="standard"
                />
              </Stack>
              <Stack direction="row" alignItems="center" justifyContent="flex-start"  gap={10} mb={5} ml={0} mr={0}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <Stack spacing={3} direction="row" alignItems="center" justifyContent="flex-start"  gap={10} mb={5} ml={0} mr={0}>
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
              <Stack direction="row" alignItems="center" justifyContent="flex-start" width={400} gap={10} mb={5} ml={0} mr={0}>
                <TextField sx={{
                  width: "50%"
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
                      fontStyle: "italic"
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
              <Stack direction="row" alignItems="center" justifyContent="flex-start" width={400} gap={10} mb={5} ml={0} mr={0}>
                <TextField sx={{
                  width: "100%"
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
                      fontStyle: "italic"
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
  )
}

export default NewcreateCandidate