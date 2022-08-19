import React, { useState } from 'react';
import Card from '@mui/material/Card';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { Stack } from '@mui/material';
import Box from '@mui/material/Box';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { Link as RouterLink } from 'react-router-dom';
import Button from '@mui/material/Button';

const JobPreview = () => {
  const [textValue, setTextValue] = useState({
    jobTitle: '',
    numberofVacancies: '',
    department: '',
    jobOwner: '',
    teamMember: '',
    type: '',
    jobNature: '',
    education: '',
    majorSpeciality: '',
    workMin: '',
    workMax: '',
    salaryMin: '',
    salaryMax: '',
    currency: '',
    salaryType: '',
    country: '',
    city: '',
    jobDescription: '',
  });

  const handleChange = () => {};

  const onInputChangeHandler = (e) => {
    setTextValue(e.target.value);
    const myObj = {};
    myObj[e.target.name] = e.target.value;
  };

  return (
    <Card sx={{ p: 4, m: 2 }} variant="outlined">
      <Stack direction="row" alignItems="center"  mb={5}>
        <IconButton edge="start" color="inherit" aria-label="close" component={RouterLink} to="/dashboard/jobs">
          <CloseIcon />
        </IconButton>
        <Typography variant="h4" gutterBottom>
          Preview | Assistant Professor - Mechanical Engineering
        </Typography>
        <Button variant="contained" component={RouterLink} to="#" style={{ marginLeft: 120 }}>
          Publish
        </Button>
      </Stack>
      <Grid container overflow="scroll" >
        <Grid item xs={12} display ={'flex'}>
            <Grid item xs={8} borderRight={'1px solid #ADB5BD'}>
            <Card sx={{ p: 4, m: 2 }} variant="outlined">
      <Container>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={4}>
            <Grid item xs={6}>
              <TextField
                autoFocus
                margin="dense"
                variant="standard"
                fullWidth
                name="jobTitle"
                value={textValue.jobTitle}
                label="Job Title"
                onChange={onInputChangeHandler}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                autoFocus
                margin="dense"
                variant="standard"
                fullWidth
                name="numberofVacancies"
                value={textValue.numberofVacancies}
                label="Number of Vacancies"
                onChange={onInputChangeHandler}
              />
            </Grid>

            <Grid item xs={6}>
              <FormControl variant="standard" sx={{ mt: 1, minWidth: '100%' }}>
                <InputLabel id="demo-simple-select-standard-label">Department</InputLabel>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  value={textValue.department}
                  onChange={handleChange}
                  label="Department"
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
            <Grid item xs={6}>
              <TextField
                autoFocus
                margin="dense"
                variant="standard"
                fullWidth
                name="jobOwner"
                value={textValue.jobOwner}
                label="Job Owner"
                onChange={onInputChangeHandler}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                autoFocus
                margin="dense"
                variant="standard"
                fullWidth
                name="teamMember"
                value={textValue.teamMember}
                label="Team Member"
                onChange={onInputChangeHandler}
              />
            </Grid>
            <Grid item xs={6}>
              <FormControl variant="standard" sx={{ mt: 1, minWidth: '100%' }}>
                <InputLabel id="demo-simple-select-standard-label">Type</InputLabel>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  value={textValue.type}
                  onChange={handleChange}
                  label="Type"
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
            <Grid item xs={6}>
              <FormControl variant="standard" sx={{ mt: 1, minWidth: '100%' }}>
                <InputLabel id="demo-simple-select-standard-label">Job Nature</InputLabel>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  value={textValue.jobNature}
                  onChange={handleChange}
                  label="Job Nature"
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
            <Grid item xs={6}>
              <FormControl variant="standard" sx={{ mt: 1, minWidth: '100%' }}>
                <InputLabel id="demo-simple-select-standard-label">Education</InputLabel>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  value={textValue.education}
                  onChange={handleChange}
                  label="Education"
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
            <Grid item xs={6}>
              <FormControl variant="standard" sx={{ mt: 1, minWidth: '100%' }}>
                <InputLabel id="demo-simple-select-standard-label">Major/Speciality</InputLabel>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  value={textValue.majorSpeciality}
                  onChange={handleChange}
                  label="Major/Speciality"
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
            <Grid item xs={3}>
              <FormControl variant="standard" sx={{ mt: 1, minWidth: '100%' }}>
                <InputLabel id="demo-simple-select-standard-label">Work Ex. min. (years)</InputLabel>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  value={textValue.workMin}
                  onChange={handleChange}
                  label="Work Ex. min. (years)"
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
            <Grid item xs={3}>
              <FormControl variant="standard" sx={{ mt: 1, minWidth: '100%' }}>
                <InputLabel id="demo-simple-select-standard-label">Work Ex. max. (years)</InputLabel>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  value={textValue.workMax}
                  onChange={handleChange}
                  label="Work Ex. max. (years)"
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
            <Grid item xs={3}>
              <TextField
                autoFocus
                margin="dense"
                variant="standard"
                fullWidth
                name="salaryMin"
                value={textValue.salaryMin}
                label="Salary Minimum"
                onChange={onInputChangeHandler}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                autoFocus
                margin="dense"
                variant="standard"
                fullWidth
                name="salaryMax"
                value={textValue.salaryMax}
                label="Salary Maximum"
                onChange={onInputChangeHandler}
              />
            </Grid>
            <Grid item xs={3}>
              <FormControl variant="standard" sx={{ mt: 1, minWidth: '100%' }}>
                <InputLabel id="demo-simple-select-standard-label">Currency</InputLabel>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  value={textValue.currency}
                  onChange={handleChange}
                  label="Currency"
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
            <Grid item xs={3}>
              <FormControl variant="standard" sx={{ mt: 1, minWidth: '100%' }}>
                <InputLabel id="demo-simple-select-standard-label">Salary Type</InputLabel>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  value={textValue.salaryType}
                  onChange={handleChange}
                  label="Salary Type"
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
            <Grid item xs={6}>
              <TextField
                autoFocus
                margin="dense"
                variant="standard"
                fullWidth
                name="country"
                value={textValue.country}
                label="Country"
                onChange={onInputChangeHandler}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                autoFocus
                margin="dense"
                variant="standard"
                fullWidth
                name="city"
                value={textValue.city}
                label="City"
                onChange={onInputChangeHandler}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                autoFocus
                margin="dense"
                variant="standard"
                fullWidth
                name="jobDescription"
                value={textValue.jobDescription}
                label="Job Description"
                onChange={onInputChangeHandler}
              />
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Card>
            </Grid>
            
            <Grid item xs={4} marginLeft={'35px'} container>
                <h6>Assessments</h6>
            </Grid>

        </Grid>

      </Grid>
    </Card>
  );
};

export default JobPreview;
