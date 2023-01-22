import * as Yup from 'yup';
import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import {
  Stack,
  Button,
  TextField,
  RadioGroup,
  Radio,
  FormLabel
} from '@mui/material';
import ReactQuill from 'react-quill';

import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useFormik, Form, FormikProvider } from 'formik';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { useGetJobListQuery } from "../../../redux/services/jobs/JobListService";
import { useGetEmailCategoryQuery } from "../../../redux/services/settings/EmailCategoryService";
import Back from "../../../assets/images/back.svg"


function NewCreateInterview() {

  const label = { inputProps: { 'aria-label': 'Mode' } };
  const [value, setValue] = React.useState(dayjs('2014-08-18T21:11:54'));
  const handleChange = (newValue) => {
    setValue(newValue);
  };

  const modules = {
    toolbar: [
      [{ 'font': [] }],
      [{ 'size': ['small', false, 'large', 'huge'] }],
      ['bold', 'italic', 'underline'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      [{ 'align': [] }],
      [{ 'color': [] }, { 'background': [] }],
      ['clean']
    ]
  };

  const formats = [
    'font',
    'size',
    'bold', 'italic', 'underline',
    'list', 'bullet',
    'align',
    'color', 'background'
  ];

  const state = {
    comments: ''
  }

  const {data: jobData, refetch: jobDataRefetch} = useGetJobListQuery()
  const [job, setJob] = useState(0)
  const handleChangeJob = (e) => setJob(e.target.value)

  const {data: emailTemplateData, refetch: emailTemplateDataRefetch} = useGetEmailCategoryQuery()
  const [emailTemplate, setEmailTemplate] = useState(0)
  const handleChangeEmailTemplate = (e) => setEmailTemplate(e.target.value)

  const RegisterSchema = Yup.object().shape({
    title: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Name required'),
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    street: Yup.string().required("Address is required").min(10, "Too Short!"),
    city: Yup.number().required("City is required"),
    state: Yup.number().required("State is required"),
    country: Yup.number().required("Country is required"),
    pincode: Yup.string().matches(/^[1-9][0-9]{5}$/, "Pincode is invalid").required("Pincode is required"),
    marital_status: Yup.string().matches(/^((F|f)e)?(M|m)ale$/, "Marital Status format invalid").required("Marital Status is required"),
  });


  return (
    <FormikProvider>
      <Form autoComplete="off" >
      <Stack sx={{
        display: "flex",
        flexDirection: "row",
        gap: "5%"
      }} ml={5} mb={5}>
        <Link to="/dashboard/interviews">
          <img src={Back} alt="Go Back" />
        </Link>
        <h2>Schedule Interview</h2>
      </Stack>
      <Stack direction="row" alignItems="flex-start" justifyContent="center">
        <Stack>

          <Stack sx={{ borderRight: '2px solid grey' }}>
            <Stack direction="row" alignItems="center" justifyContent="flex-start" width={500} gap={10} mb={5} ml={0} mr={0}>
              <TextField sx={{
                width: "60%"
              }}
                required
                id="standard-required"
                label="Name"
                variant="standard"
              />
            </Stack>
            <FormLabel sx={{textAlign: "left"}}>Interview Type</FormLabel>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="female"
              name="radio-buttons-group"
            >
              <Stack direction="row" alignItems="center" justifyContent="flex-start" width={500} gap={5} mb={5} ml={0} mr={0}>
                <FormControlLabel
                  value="IP"
                  control={<Radio />}
                  label="In Person"
                  labelPlacement="end"
                />
                <FormControlLabel
                  value="PC"
                  control={<Radio />}
                  label="Telephonic"
                  labelPlacement="end"
                />
                <FormControlLabel
                  value="VC"
                  control={<Radio />}
                  label="Video"
                  labelPlacement="end"
                />
              </Stack>
            </RadioGroup>
            <Stack direction="row" alignItems="center" justifyContent="flex-start" width={500} gap={10} mb={5} ml={0} mr={0}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Stack spacing={3} direction="row" alignItems="center" justifyContent="flex-start">
                  <DesktopDatePicker
                    label="Date"
                    required
                    inputFormat="MM/DD/YYYY"
                    value={value}
                    onChange={handleChange}
                    variant="standard"
                    renderInput={(params) => <TextField {...params} />}
                  />
                </Stack>
              </LocalizationProvider>
            </Stack>
            <Stack direction="row" alignItems="center" justifyContent="flex-start" width={500} gap={10} mb={5} ml={0} mr={0}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Stack spacing={3} direction="row" alignItems="center" justifyContent="flex-start">
                  <TimePicker
                    required
                    label="Start Time"
                    value={value}
                    onChange={handleChange}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </Stack>
              </LocalizationProvider>
            </Stack>
            <Stack direction="row" alignItems="center" justifyContent="flex-start" width={500} gap={10} mb={5} ml={0} mr={0}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Stack spacing={3} direction="row" alignItems="center" justifyContent="flex-start">
                  <TimePicker
                    required
                    label="End Time"
                    value={value}
                    onChange={handleChange}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </Stack>
              </LocalizationProvider>
            </Stack>
            <Stack direction="row" alignItems="center" justifyContent="flex-start" width={500} gap={10} mb={5} ml={0} mr={0}>
              <TextField sx={{
                width: "60%"
              }}
                required
                id="standard-required"
                label="Loaction"
                variant="standard"
              />
            </Stack>
            <Stack direction="row" alignItems="center" justifyContent="flex-start" width={500} gap={10} mb={5} ml={0} mr={0}>
              <TextField sx={{
                width: "60%"
              }}
                required
                id="standard-required"
                select
                label="Interviewrs"
                variant="standard"
              />
            </Stack>
          </Stack>
        </Stack>
        <Stack ml={5}>
          <Stack mt={7}>
            <Stack direction="row" alignItems="center" justifyContent="flex-start" width={400} gap={10} mb={5} ml={0} mr={0}>
              <TextField sx={{
                width: "100%"
              }}
                required
                select
                id="standard-required"
                label="Select Email Template"
                variant="standard"
              />
            </Stack>
            <Stack direction="row" alignItems="center" justifyContent="flex-start" width={400} gap={10} mb={5} ml={0} mr={0}>
              <TextField sx={{
                width: "100%"
              }}
                required
                select
                id="standard-required"
                label="Job"
                variant="standard"
              />
            </Stack>
            <Stack direction="row" alignItems="center" justifyContent="flex-start" width={400} gap={10} mb={5} ml={0} mr={0}>
              <TextField sx={{
                width: "100%"
              }}
                required
                id="standard-required"
                label="Subject"
                variant="standard"
              />
            </Stack>
            <p>Email Body</p>
            <Stack direction="row" alignItems="center" justifyContent="flex-start" width={400} gap={10} mb={5} ml={0} mr={0}>
              <ReactQuill sx={{
              }} theme="snow"
                modules={modules}
                formats={formats} value={state.comments || ''}
              />
            </Stack>
            <Stack direction="row" alignItems="center" justifyContent="flex-start" width={400} gap={10} mt={5} mb={5} ml={0} mr={0}>
              <div>Attachment:</div>
              <Button sx={{
                textAlign:"center",
                alignItems:"center",
              }}>
                <label htmlFor="file-input" flow-btn>
                
                <input
                id="file-input"
                  type="file"
                  accept='.pdf'
                  hidden
                />
                Browse
                </label>
              </Button>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
      <Stack justifyContent="center" alignItems='center' pt={4}>
        <hr style={{ width: '90%', color: 'grey', marginBottom: '5%' }} />
        <Button variant="contained">Schedule</Button>
      </Stack>
      </Form>

</FormikProvider >
  )
}

export default NewCreateInterview