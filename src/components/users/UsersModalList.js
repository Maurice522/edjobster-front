import React, { useState, useEffect } from 'react';

// eslint-disable-next-line import/no-unresolved
import { useDepartmentGetQuery } from 'src/redux/services/settings/DepartmentService';
// eslint-disable-next-line import/no-unresolved
import { useDesignationGetQuery } from 'src/redux/services/settings/DesignationService';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
// eslint-disable-next-line import/no-unresolved



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

const UserModalList = (props) => {
  const { open, handleClose, onsubmit, type, formData } = props;
  const { data: departmentData } = useDepartmentGetQuery();
  const { data: designationData } = useDesignationGetQuery();
  const departmentResponse = departmentData?.data;
  const desginationResponse = designationData?.data;
  const [textValue, setTextValue] = useState(formData);
  const [departmentId, setDepartmentId] = useState(null);
  const [designationId, setDesignationId] = useState(null);






  useEffect(() => {
    if (formData?.account_id) {
      const departmentArr = departmentResponse;
      const designationArr = desginationResponse;
      const foundDepartment = departmentArr?.find((departmentFound) => departmentFound?.name === formData?.department);
      const foundDesignation = designationArr?.find(
        (designationFound) => designationFound?.name === formData?.designation
      );
      setDepartmentId(foundDepartment?.id);
      setDesignationId(foundDesignation?.id);
      setTextValue({
        ...formData,
        department: foundDepartment?.id,
        designation: foundDesignation?.id,
      });
    } else {
      setTextValue(formData);
      setDepartmentId(null);
      setDesignationId(null);
    }
  }, [formData, type, departmentResponse, desginationResponse]);

  const clickHandler = () => {
    onsubmit(textValue);
  };

  const modalCloseHandler = () => {
    handleClose(false);
  };

  const onInputChangeHandler = (e) => {
    setTextValue({ ...textValue, [e.target.name]: e.target.value });
  };

  const userLogoChangeHandler = (file) => {
    setTextValue({ ...textValue, photo: file });
  };

  const [value, setValue] = React.useState(null);

  return (
    <>
      <Dialog
        open={open}
        fullWidth
        // maxWidth="sm"
        onClose={() => {
          handleClose(false);
        }}
        aria-labelledby="alertmodalCloseHandler-dialog-title"
        aria-describedby="alert-dialog-description"
        BackdropProps={{ style: { background: 'rgba(0, 0, 0, 0.5)' } }}
      >
        <div>
          <DialogTitle sx={{
            display:"flex",
            justifyContent: "center",
          }} className="dialogueTitle">
            {type === 'Add' ? 'Create User Profile' : 'Update User'}
          </DialogTitle>
          <DialogContent>
            <Box sx={{ flexGrow: 1 }}>
              {/* <Grid container> */}
                {/* <Grid item md={4}>
                  <ImagePreview
                    logo={textValue.photo}
                    // eslint-disable-next-line no-undef
                    onFileSelectSuccess={(file) => userLogoChangeHandler(file)}
                    onFileSelectError={({ error }) => console.log('error', error)}
                  />
                </Grid> */}
                {/* <Grid item md={8}>
                  <TextField
                    autoFocus
                    margin="dense"
                    variant="standard"
                    fullWidth
                    name="first_name"
                    value={textValue.first_name}
                    label="First Name"
                    onChange={onInputChangeHandler}
                  />
                  <TextField
                    autoFocus
                    margin="dense"
                    variant="standard"
                    fullWidth
                    name="last_name"
                    value={textValue.last_name}
                    label="Last Name"
                    onChange={onInputChangeHandler}
                  />
                </Grid>
              </Grid>

              <Grid container spacing={2}> */}
                
                {/* <Grid item xs={6}>
                  <TextField
                    autoFocus
                    margin="dense"
                    variant="standard"
                    label="Email"
                    name="email"
                    fullWidth
                    value={textValue.email}
                    onChange={onInputChangeHandler}
                    disabled={formData?.email_desable}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    autoFocus
                    type="number"
                    margin="dense"
                    variant="standard"
                    label="Phone Number"
                    fullWidth
                    value={textValue.mobile}
                    onChange={onInputChangeHandler}
                    name="mobile"
                  />
                </Grid>
                <Grid item xs={6}>
                  <FormControl variant="standard" sx={{ mt: 1, minWidth: '100%' }}>
                    <InputLabel id="department-label">Department</InputLabel>
                    <Select
                      labelId="department-label"
                      id="department"
                      name="department"
                      value={textValue.department}
                      onChange={onInputChangeHandler}
                      label="Department"
                    >
                      {departmentResponse?.length > 0 &&
                        departmentResponse?.map((department) => (
                          <MenuItem key={department?.id} value={department?.id}>
                            {department.name}
                          </MenuItem>
                        ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={6}>
                  <FormControl variant="standard" sx={{ mt: 1, minWidth: '100%' }}>
                    <InputLabel id="designation-label">Designation</InputLabel>
                    <Select
                      labelId="designation-label"
                      id="designation"
                      name="designation"
                      value={textValue.designation}
                      onChange={onInputChangeHandler}
                      label="Designation"
                    >
                      {desginationResponse?.length > 0 &&
                        desginationResponse?.map((designation) => (
                          <MenuItem key={designation?.id} value={designation?.id}>
                            {designation?.name}
                          </MenuItem>
                        ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={6} sx={{ mt: 2 }}>
                  <FormControl>
                    <FormLabel id="role-label">Role</FormLabel>
                    <RadioGroup
                      row
                      aria-labelledby="role-label"
                      name="role"
                      onChange={onInputChangeHandler}
                      value={textValue.role}
                    >
                      <FormControlLabel value="A" control={<Radio />} label="Admin" />
                      <FormControlLabel value="U" control={<Radio />} label="HR" />
                    </RadioGroup>
                  </FormControl>
                </Grid> */}
                
              {/* </Grid> */}

                {/* Below code written by Kundan for add user form */}


            

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
             
              display:"flex",
              flexDirection:"row",
              justifyContent:"center",
              gap:"10%"
             }}>
                  <FormControl sx={{ minWidth: '100%' }}>
                    {/* <InputLabel id="demo-simple-select-autowidth-label">Experience</InputLabel> */}
                    <TextField
                        required
                        id="standard-required"
                        label="Required"
                        defaultValue="Hello Worcld"
                        variant="standard"
                     />
                  </FormControl>    
            </Stack>
            <Stack sx={{
              
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



















            </Box>
          </DialogContent>
          <DialogActions>
            <Box>
              <Button onClick={modalCloseHandler} autoFocus variant="outlined" style={{ marginRight: 5 }}>
                Cancel
              </Button>
              <Button onClick={clickHandler} variant="contained">
                {type === 'Add' ? 'Add user' : 'Update List'}
              </Button>
            </Box>
          </DialogActions>
        </div>
      </Dialog>
    </>
  );
};

export default UserModalList;
