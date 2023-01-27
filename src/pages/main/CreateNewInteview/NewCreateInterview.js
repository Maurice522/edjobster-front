import * as Yup from 'yup';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import {
  Stack,
  Button,
  TextField,
  RadioGroup,
  Radio,
  FormLabel
} from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import ReactQuill from 'react-quill';

import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useFormik, Form, FormikProvider, Field } from 'formik';
import dayjs from 'dayjs';
// eslint-disable-next-line import/no-unresolved
import { showToast } from 'src/utils/toast';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { useGetJobListQuery } from "../../../redux/services/jobs/JobListService";
import { useGetEmailTamplateQuery } from '../../../redux/services/settings/EmailTamplateService';
import { useGetUsersApiQuery } from '../../../redux/services/settings/UserService';
import { useGetLocationQuery } from "../../../redux/services/settings/LocationService";
import { useGetCandidateListQuery } from '../../../redux/services/candidate/CandidateServices';
import { useAddInterviewMutation } from "../../../redux/services/interview/InterviewServices"
import Back from "../../../assets/images/back.svg"


function NewCreateInterview() {
  const today = new Date();
  const navigate = useNavigate();
  const [addInterview, addInterviewInfo] = useAddInterviewMutation();
  const label = { inputProps: { 'aria-label': 'Mode' } };
  const [value, setValue] = useState(dayjs(Date.now()));
  const handleChange = (e) => setValue(e)
  const [startTime, setStartTime] = React.useState(dayjs(Date.now()));
  const handleChangeStartTime = (e) => setStartTime(e)
  const [endTime, setEndTime] = React.useState(dayjs(Date.now()));
  const handleChangeEndTime = (e) => setEndTime(e)

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

  const { data: jobData, refetch: jobDataRefetch } = useGetJobListQuery()
  const { data: emailTemplateData, refetch: emailTemplateDataRefetch } = useGetEmailTamplateQuery()
  const { data: candidateData, refetch: candidateDataRefetch } = useGetCandidateListQuery()
  const { data: locationData, refetch: locationDataRefetch } = useGetLocationQuery()
  const { data: interviewerData, refetch: interviewerDataRefetch } = useGetUsersApiQuery()

  const [formData, setFormData] = useState({
    candidate_id: 0,
    job_id: 0,
    date: `${value.get("year")}-${String(value.get("month") + 1).padStart(2, 0)}-${String(value.get("date")).padStart(2, 0)}`,
    time_start: `${startTime.get("hour")}:${startTime.get("minutes")}`,
    time_end: `${endTime.get("hour")}:${endTime.get("minutes")}`,
    location_id: 0,
    type: "",
    interviewers: "",
    email_temp_id: 0,
    email_sub: "",
    email_msg: "",
    title: "",
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
    await addInterview(formData)
  }

  useEffect(() => {
    if (addInterviewInfo.isSuccess) {
      showToast("success", "Interview added successfully")

      navigate("/dashboard/interviews", { replace: true })
    }
    if (addInterviewInfo.isError) {
      console.log(addInterviewInfo.error)
    }
  }, [addInterviewInfo, navigate])

  return (
    <div>
      {/* <FormikProvider>
        <Form autoComplete="off" > */}
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
                name="title"
                onChange={(e) => handleChangeFormData(e.target.name, e.target.value.trim())}
              />
            </Stack>
            <Stack direction="row" alignItems="center" justifyContent="flex-start" width={500} gap={10} mb={5} ml={0} mr={0}>
              <TextField sx={{
                width: "60%"
              }}
                required
                select
                id="standard-required"
                label="Candidate"
                variant="standard"
                name="candidate_id"
                SelectProps={{
                  native: true
                }}
                onChange={(e) => handleChangeFormData(e.target.name, e.target.value)}
              >
                {candidateData && candidateData?.list?.map((e) => (
                  <option id={e.id} key={e.id} value={e.id}>
                    {e.first_name}
                  </option>
                ))}
              </TextField>
            </Stack>
            <FormLabel sx={{ textAlign: "left" }}>Interview Type</FormLabel>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="female"
              name="type"
              onChange={(e) => handleChangeFormData(e.target.name, e.target.value)}
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
                    inputFormat="YYYY-MM-DD"
                    name="date"
                    minDate={today}
                    value={value}
                    onChange={(e) => {
                      handleChange(e)
                      const date = dayjs(e)
                      handleChangeFormData("date", `${date.get("year")}-${String(date.get("month") + 1).padStart(2, 0)}-${String(date.get("date")).padStart(2, 0)}`)
                    }}
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
                    value={startTime}
                    onChange={e => {
                      handleChangeStartTime(e)
                      const date = dayjs(e)
                      handleChangeFormData("time_start", `${date.get("hour")}:${date.get("minutes")}:00`)
                    }}
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
                    value={endTime}
                    onChange={e => {
                      handleChangeStartTime(e)
                      const date = dayjs(e)
                      handleChangeFormData("time_end", `${date.get("hour")}:${date.get("minutes")}:00`)
                    }}
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
                select
                id="standard-required"
                label="Loaction"
                variant="standard"
                name="location_id"
                SelectProps={{
                  native: true
                }}
                onChange={(e) => handleChangeFormData(e.target.name, +e.target.value)}
              >
                {locationData && locationData?.data?.map((e) => (
                  <option id={e.id} key={e.id} value={e.id}>
                    {e.name}
                  </option>
                ))}
              </TextField>
            </Stack>
            <Stack direction="row" alignItems="center" justifyContent="flex-start" width={500} gap={10} mb={5} ml={0} mr={0}>
              <TextField sx={{
                width: "60%"
              }}
                required
                id="standard-required"
                select
                name="interviewers"
                label="Interviewrs"
                variant="standard"
                SelectProps={{
                  native: true
                }}
                onChange={(e) => !formData[e.target.name].includes(e.target.value) ?
                  handleChangeFormData(e.target.name, [...formData[e.target.name], e.target.value]) :
                  handleChangeFormData(e.target.name, formData[e.target.name])
                }
              // onChange={(e) => handleChangeFormData()}
              >
                {interviewerData && interviewerData?.list?.map((e) => (
                  <option id={e.id} key={e.account_id} value={e.account_id}>
                    {e.first_name}
                  </option>
                ))}
              </TextField>
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
                name="email_temp_id"
                SelectProps={{
                  native: true
                }}
                onChange={(e) => handleChangeFormData(e.target.name, +e.target.value)}
              >
                {emailTemplateData && emailTemplateData?.data?.map((e) => (
                  <option id={e.id} key={e.id} value={e.id}>
                    {e.subject}
                  </option>
                ))}
              </TextField>
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
                name="job_id"
                SelectProps={{
                  native: true
                }}
                onChange={(e) => handleChangeFormData(e.target.name, +e.target.value)}
              >
                {jobData && jobData?.map((e) => (
                  <option id={e.id} key={e.id} value={e.id}>
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
                label="Subject"
                variant="standard"
                name="email_sub"
                onChange={e => handleChangeFormData(e.target.name, e.target.value.trim())}
              />
            </Stack>
            <p>Email Body</p>
            <Stack direction="row" alignItems="center" justifyContent="flex-start" width={400} gap={10} mb={5} ml={0} mr={0}>
              <ReactQuill
                theme="snow"
                modules={modules}
                formats={formats} value={state.comments || ''}
                name="email_msg"
                onChange={e => {
                  handleChangeFormData("email_msg", e)
                }}
              />
            </Stack>
            <Stack direction="row" alignItems="center" justifyContent="flex-start" width={400} gap={10} mt={5} mb={5} ml={0} mr={0}>
              <div>Attachment:</div>
              <Button sx={{
                textAlign: "center",
                alignItems: "center",
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
        <Button variant="contained" onClick={handleSubmit}>Schedule</Button>
      </Stack>
      {/* </Form>

      </FormikProvider > */}
    </div>
  )
}

export default NewCreateInterview