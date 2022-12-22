import React, { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import { Link as RouterLink } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { Box, FormControl, InputLabel, Select, DialogActions, TextField, MenuItem } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
// import FileUpload from 'react-material-file-upload';

const InterviewDetails = () => {
  const [textValue, setTextValue] = useState({
    interviewName: '',
    date: '',
    startTime: '',
    endTime: '',
    interviewer: '',
    selectCandidate: '',
    selectTemplate: '',
    subject: '',
    emailBody: '',
  });

  const handleChange = () => {};

  const onInputChangeHandler = (e) => {
    setTextValue(e.target.value);
    const myObj = {};
    myObj[e.target.name] = e.target.value;
  };

  //   const [files, setFiles] = React.useState([]);
  return (
    <>
          <Grid container spacing={2} padding="20px">
            <Grid item xs={6} display="flex">
              <Grid>
                <IconButton edge="start" color="inherit" component={RouterLink} to="/dashboard/interviews"  aria-label="close">
                  <CloseIcon />
                </IconButton>
              </Grid>
              <Grid>
                <Typography variant="h4" gutterBottom>
                  Interview Details
                </Typography>
              </Grid>
            </Grid>
          </Grid>

          <Grid container>
            <Grid item xs={6}>
              <Card variant="outlined" style={{ padding: 20, margin: 20 }}>
                <Grid item xs={12}>
                  <TextField
                  id="standard"
                    autoFocus
                    margin="dense"
                    variant="standard"
                    placeholder="Type interview name..."
                    // fullWidth
                    name="interviewName"
                    value={textValue.interviewName}
                    label="Name"
                    onChange={onInputChangeHandler}
                    inputProps={
                        { readOnly: true, }
                    }
                  />
                </Grid>
                <Grid item xs={12} margin="20px 0 10px 0">
                  <FormGroup style={{ display: 'flex', flexDirection: 'row' }}>
                    <FormControlLabel control={<Checkbox defaultChecked />} label="In person" />
                    <FormControlLabel control={<Checkbox defaultChecked />} label="Telephonic" />
                    <FormControlLabel control={<Checkbox defaultChecked />} label="Video" />
                  </FormGroup>
                </Grid>
                <Grid item xs={12} marginBottom="10px">
                  <TextField
                    autoFocus
                    margin="dense"
                    variant="standard"
                    placeholder="3 November 2021"
                    fullWidth
                    name="date"
                    value={textValue.date}
                    label="Date"
                    onChange={onInputChangeHandler}
                    inputProps={
                        { readOnly: true, }
                    }
                  />
                </Grid>
                <Grid item xs={12} marginBottom="10px">
                  <TextField
                    autoFocus
                    margin="dense"
                    variant="standard"
                    placeholder="10:00 AM"
                    fullWidth
                    name="startTime"
                    value={textValue.startTime}
                    label="Start Time"
                    onChange={onInputChangeHandler}
                    inputProps={
                        { readOnly: true, }
                    }
                  />
                </Grid>
                <Grid item xs={12} marginBottom="10px">
                  <TextField
                    autoFocus
                    margin="dense"
                    variant="standard"
                    placeholder="45 Minutes"
                    fullWidth
                    name="endTime"
                    value={textValue.endTime}
                    label="End Time"
                    onChange={onInputChangeHandler}
                    inputProps={
                        { readOnly: true, }
                    }
                  />
                </Grid>
                <Grid item xs={12} marginBottom="10px">
                  <FormControl variant="standard" sx={{ mt: 1, minWidth: '100%' }}>
                    <InputLabel id="demo-simple-select-standard-label">Location</InputLabel>
                    <Select
                      labelId="demo-simple-select-standard-label"
                      id="demo-simple-select-standard"
                      value={textValue.department}
                      onChange={handleChange}
                      label="Department"
                      inputProps={
                        { readOnly: true, }
                    }
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value={10}>Ten</MenuItem>
                      <MenuItem value={20}>Twenty</MenuItem>
                      <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} marginBottom="10px">
                  <TextField
                    autoFocus
                    margin="dense"
                    variant="standard"
                    placeholder="Search for team members..."
                    fullWidth
                    name="interviewer"
                    value={textValue.interviewer}
                    label="Interviewer"
                    onChange={onInputChangeHandler}
                    inputProps={
                        { readOnly: true, }
                    }
                  />
                </Grid>
              </Card>
            </Grid>
            <Grid item xs={6}>
              <Card variant="outlined" style={{ padding: 20, margin: 20 }}>
                <Grid item xs={12}>
                  <TextField
                    autoFocus
                    margin="dense"
                    variant="standard"
                    placeholder="HOD-Civil"
                    fullWidth
                    name="selectCandidate"
                    value={textValue.selectCandidate}
                    label="Select Candidate"
                    onChange={onInputChangeHandler}
                    inputProps={
                        { readOnly: true, }
                    }
                  />
                </Grid>
                <Grid item xs={12} marginBottom="10px">
                  <FormControl variant="standard" sx={{ mt: 1, minWidth: '100%' }}>
                    <InputLabel id="demo-simple-select-standard-label">Select Job</InputLabel>
                    <Select
                      labelId="demo-simple-select-standard-label"
                      id="demo-simple-select-standard"
                      value={textValue.department}
                      onChange={handleChange}
                      label="Department"
                      inputProps={
                        { readOnly: true, }
                    }
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value={10}>Ten</MenuItem>
                      <MenuItem value={20}>Twenty</MenuItem>
                      <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} marginBottom="10px">
                  <TextField
                    autoFocus
                    margin="dense"
                    variant="standard"
                    placeholder="Email template subject will come here..."
                    fullWidth
                    name="selectTemplate"
                    value={textValue.selectTemplate}
                    label="Select Template"
                    onChange={onInputChangeHandler}
                    inputProps={
                        { readOnly: true, }
                    }
                  />
                </Grid>
                <Grid item xs={12} marginBottom="10px">
                  <TextField
                    autoFocus
                    margin="dense"
                    variant="standard"
                    placeholder="HOD-Civil"
                    fullWidth
                    name="subject"
                    value={textValue.subject}
                    label="Subject"
                    onChange={onInputChangeHandler}
                    inputProps={
                        { readOnly: true, }
                    }
                  />
                </Grid>
                <Grid item xs={12} marginBottom="10px">
                  <TextField
                    autoFocus
                    margin="dense"
                    variant="standard"
                    placeholder="Type interview name..."
                    fullWidth
                    name="emailBody"
                    value={textValue.emailBody}
                    label="Email Body"
                    onChange={onInputChangeHandler}
                    inputProps={
                        { readOnly: true, }
                    }
                  />
                </Grid>
              </Card>
            </Grid>
          </Grid>

    </>
  );
};

export default InterviewDetails;
