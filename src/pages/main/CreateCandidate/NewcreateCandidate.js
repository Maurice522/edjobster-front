import React from 'react'
import { Link } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { DataGrid } from '@mui/x-data-grid';
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
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import Back from "../../../assets/images/back.svg"

function NewcreateCandidate() {

  const [value, setValue] = React.useState(dayjs('2014-08-18T21:11:54'));

  const handleChange = (newValue) => {
    setValue(newValue);
  };


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
                <TextField sx={{
                  width: "60%"
                }}
                  required
                  id="standard-select-currency-native"
                  select
                  label="country"
                  SelectProps={{
                    native: true,
                  }}
                  // helperText="Please select your country"
                  variant="standard"
                />

              </Stack>
              <Stack direction="row" alignItems="center" justifyContent="flex-start"  gap={10} mb={5} ml={0} mr={0}>
                <TextField sx={{
                  width: "50%"
                }}
                  required
                  select
                  id="standard-required"
                  label="State"
                  variant="standard"
                />
                <TextField sx={{
                  width: "15%"
                }}
                  required
                  id="standard-required"
                  select
                  label="City"
                  variant="standard"
                />
                <TextField sx={{
                  width: "20%"
                }}
                  required
                  id="standard-required"
                  select
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
                  label="Add"
                  variant="standard"
                />
              </Stack>
              <Stack direction="row" alignItems="center" justifyContent="flex-start" width={400} gap={10} mb={5} ml={0} mr={0}>
                <TextField sx={{
                  width: "100%"
                }}
                  required
                  id="standard-required"
                  label="General Questions"
                  variant="standard"
                />
              </Stack>
            </Stack>
          </Stack>
        </Stack>
    </div>
  )
}

export default NewcreateCandidate