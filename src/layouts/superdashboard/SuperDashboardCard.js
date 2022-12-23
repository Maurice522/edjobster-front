import React from 'react'

import { Link as RouterLink } from 'react-router-dom';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import {
  Button,
  Card,
  Grid,
  TextField,
  Stack
} from '@mui/material';
import GroupsIcon from '@mui/icons-material/Groups';


function SuperDashboardCard() {

  const [age, setAge] = React.useState('');

  const [value, setValue] = React.useState(null);

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <div>
      <Card sx={{
        position:"relative",
        marginLeft:"auto",
        marginRight:"auto",
        width: "90%",
        backgroundColor:"#fff",
        height :"80vh",
        boxShadow: '0px 3px 1px -2px rgb(145 158 171 / 20%), 0px 2px 2px 0px rgb(145 158 171 / 14%), 0px 1px 5px 0px rgb(145 158 171 / 12%)',
          borderRadius:'16px',
      }}>
        <Stack sx={{
              marginTop:"5%",
              display:"flex",
              flexDirection:"row",
              justifyContent:"center",
              gap:"2%"
            }}>
        
          {/* <Grid container spacing={2}> */}
              <Grid item xs={4}>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                    
                      label="From Date"
                      value={value}
                      onChange={(newValue) => {
                        setValue(newValue);
                      }}
                      renderInput={(params) => <TextField {...params} sx={{ minWidth: '100%' }} />}
                    />
                  </LocalizationProvider>
              </Grid>
              <h3>To</h3>
              <Grid item xs={4}>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                      label="To Date"
                      value={value}
                      onChange={(newValue) => {
                        setValue(newValue);
                      }}
                      renderInput={(params) => <TextField {...params} sx={{ minWidth: '100%' }} />}
                    />
                  </LocalizationProvider>
              </Grid>
            {/* </Grid> */}
          </Stack>
            <Stack sx={{
              marginTop:"3%",
              display:"flex",
              flexDirection:"row",
              justifyContent:"center",
              gap:"10%"
             }}>
              <Card sx={{
                width:"20%",
                borderRadius:"0px",
                backgroundColor:"#f9fafb"
              }}>
                <Stack sx={{
                  padding:"3%",
                  display:"flex",
                  flexDirection:"row",
                  justifyContent:"space-between"
                }}>
                  <GroupsIcon fontSize='large'/>
                  <Stack>
                    <h6>Active Clients</h6>
                    <h2>15</h2>
                  </Stack>
                </Stack>  
              </Card>
              <Card sx={{
                width:"20%",
                borderRadius:"0px",
                backgroundColor:"#f9fafb"
              }}>
                <Stack sx={{
                  padding:"3%",
                  display:"flex",
                  flexDirection:"row",
                  justifyContent:"space-between"
                }}>
                  <GroupsIcon fontSize='large'/>
                  <Stack>
                    <h6>Financials</h6>
                    <h2>INR 1,27,000</h2>
                  </Stack>
                </Stack>  
              </Card>                           
            </Stack>
            <Stack sx={{
              marginTop:"3%",
              display:"flex",
              flexDirection:"row",
              justifyContent:"center",
              gap:"10%"
             }}>
              <Card sx={{
                width:"20%",
                borderRadius:"0px",
                backgroundColor:"#f9fafb"
              }}>
                <Stack sx={{
                  padding:"3%",
                  display:"flex",
                  flexDirection:"row",
                  justifyContent:"space-between"
                }}>
                  <GroupsIcon fontSize='large'/>
                  <Stack>
                    <h6>Applications</h6>
                    <h2>440</h2>
                  </Stack>
                </Stack>  
              </Card>
              <Card sx={{
                width:"20%",
                borderRadius:"0px",
                backgroundColor:"#f9fafb"
              }}>
                <Stack sx={{
                  padding:"3%",
                  display:"flex",
                  flexDirection:"row",
                  justifyContent:"space-between"
                }}>
                  <GroupsIcon fontSize='large'/>
                  <Stack>
                    <h6>Active Jobs</h6>
                    <h2>85</h2>
                  </Stack>
                </Stack>  
              </Card>                           
            </Stack>
            <Stack sx={{
              marginTop:"3%",
              display:"flex",
              flexDirection:"row",
              justifyContent:"center",
              gap:"10%"
             }}>
              <Card sx={{
                width:"20%",
                borderRadius:"0px",
                backgroundColor:"#f9fafb"
              }}>
                <Stack sx={{
                  padding:"3%",
                  display:"flex",
                  flexDirection:"row",
                  justifyContent:"space-between"
                }}>
                  <GroupsIcon fontSize='large'/>
                  <Stack>
                    <h6>Deactivated Clients</h6>
                    <h2>1</h2>
                  </Stack>
                </Stack>  
              </Card>
              <Card sx={{
                width:"20%",
                borderRadius:"0px",
                backgroundColor:"#f9fafb"
              }}>
                <Stack sx={{
                  padding:"3%",
                  display:"flex",
                  flexDirection:"row",
                  justifyContent:"space-between"
                }}>
                  <GroupsIcon fontSize='large'/>
                  <Stack>
                    <h6>Active Clients</h6>
                    <h2>15</h2>
                  </Stack>
                </Stack>  
              </Card>                           
            </Stack>
      </Card>
    </div>
  )
}

export default SuperDashboardCard