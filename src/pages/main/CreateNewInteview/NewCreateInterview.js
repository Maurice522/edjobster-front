import React from 'react'
import { Link } from 'react-router-dom';
import {
  Card,
  Stack,
  Button,
  Container,
  Typography,
  ListItemIcon,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  DialogContent,
  Box,
} from '@mui/material';
import ReactQuill from 'react-quill';

import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
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

  return (
    <div>
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
            <Stack direction="row" alignItems="center" justifyContent="flex-start" width={500} gap={5} mb={5} ml={0} mr={0}>
              <FormControlLabel
                value="end"
                control={<Checkbox />}
                label="In Person"
                labelPlacement="end"
              />
              <FormControlLabel
                value="end"
                control={<Checkbox />}
                label="Telephonic"
                labelPlacement="end"
              />
              <FormControlLabel
                value="end"
                control={<Checkbox />}
                label="Video"
                labelPlacement="end"
              />
            </Stack>
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
              {/* <TextField sx={{
                width: "100%"
              }}
                required
                id="standard-required"
                label="Email-Body"
                variant="standard"
              /> */}

              <ReactQuill sx={{
                // outerWidth: "80vw",
                // marginBottom: "20px"
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
                  // style={{visibility:"hidden"}}
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
    </div>
  )
}

export default NewCreateInterview