import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Card from '@mui/material/Card';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import ReactQuill from 'react-quill';

import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { useGetLocationQuery } from '../../../../redux/services/settings/LocationService';
import { jobAction } from '../../../../redux/job/JobReducer';
import { useDegreeGetQuery } from '../../../../redux/services/settings/DegreeService';
import { useGetUsersApiQuery } from '../../../../redux/services/settings/UserService';
import { useDepartmentGetQuery } from '../../../../redux/services/settings/DepartmentService';
import { useGetStateQuery, useGetCityQuery } from '../../../../redux/services/settings/CountryStateCityService';
import { useGetPipelineQuery } from '../../../../redux/services/settings/PipelineService';
import { useDesignationGetQuery } from '../../../../redux/services/settings/DesignationService';

const FillDetails = () => {
  const dispatch = useDispatch();
  const textValue = useSelector((state) => state.job.job);
  console.log('Jobdata', textValue);

  const { data: jobDegreeData } = useDegreeGetQuery();
  const { data: jobGetuserData } = useGetUsersApiQuery();
  const { data: jobGetDepartmentData } = useDepartmentGetQuery();
  const { data: jobAddressData } = useGetLocationQuery();
  const { data: jobGetPipelineData } = useGetPipelineQuery();
  const { data: jobGetDesignationData } = useDesignationGetQuery();

  const experienceArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
  //  const [textValue, setTextValue] = useState(job);
  const [teamMemberOptions, setTeamMemberOptions] = useState([]);
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

    const modules = {
      toolbar: [
        [{ 'font': [] }],
        [{ 'size': ['small', false, 'large', 'huge'] }],
        ['bold', 'italic', 'underline'],
        [{'list': 'ordered'}, {'list': 'bullet'}],
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

  const onInputChangeHandler = (name, value) => {
    console.log(name,value)
    const myObj = { ...textValue };
    // if (e.target.name === 'education') {
    //   myObj[e.target.name] = [e.target.value];
    // } else if (e.target.name === 'member_names') {
     if (name === 'member_names') {
      console.log('Member name', value);
      // myObj.member_names = typeof value === 'string' ? value.split(',') : value;
      const newValue = typeof value === 'string' ? value.split(',') : value;
      console.log('new value is', newValue);
      myObj[name] = newValue;
      // myObj.member_names = [];
      const newMemberId = [];
      // eslint-disable-next-line no-plusplus
      for (let index = 0; index < newValue.length; index++) {
        const mId = newValue[index];
        // const foundId = jobGetuserData?.list?.find((user) => `${user.first_name} ${user.last_name}` === mId);
        // if (foundId) {
        //   myObj.member_names.push(`${foundId.first_name} ${foundId.last_name}`);
        // }
        newMemberId.push(mId.account_id);
      }
      myObj.member_ids = newMemberId;
      // console.log('name membrer name', myObj.member_names);
      // myObj.member_name = typeof value === 'string' ? value.split(',') : value;
    } else if (
      name === 'vacancies' ||
      name === 'department' ||
      name === 'assesment' ||
      name === 'exp_min' ||
      name === 'exp_max'
    ) {

     console.log(Number.isNaN(value),value,"vacn")
      if(Number.isNaN(value) || value===""){
        myObj[name] = value;
      }
      else{
        myObj[name] = parseInt(value, 10);
      }
    } else {
      myObj[name] = value;
    }

    dispatch(jobAction({ ...myObj }));
  };
  const renderMultiSelectValues = (selected) => {
    let allNames = '';
    for (let index = 0; index < selected.length; index += 1) {
      const element = selected[index];
      allNames = `${allNames}  ${element.first_name},`;
    }
    // return textValue.member_names;
    return allNames;
  };

  useEffect(() => {
    console.log(jobGetuserData?.list);
  }, []);

  console.log(textValue);
  console.log("thisis",jobAddressData)


  return (
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
                name="title"
                value={textValue.title}
                label="Job Title"
                onChange={(e)=> onInputChangeHandler(e?.target?.name, e?.target?.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                margin="dense"
                variant="standard"
                fullWidth
                name="vacancies"
                value={textValue.vacancies}
                label="Number of Vacancies"
                onChange={(e)=> onInputChangeHandler(e?.target?.name, e?.target?.value)}
              />
            </Grid>

            <Grid item xs={6}>
              <FormControl variant="standard" sx={{ mt: 1, minWidth: '100%' }}>
                <InputLabel id="demo-simple-select-standard-label">Department</InputLabel>
                <Select
                  required
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  value={textValue.department}
                  onChange={(e)=> onInputChangeHandler(e?.target?.name, e?.target?.value)}
                  label="Select the Department"
                  name="department"
                >
                  {jobGetDepartmentData &&
                    jobGetDepartmentData?.data?.map((item) => (
                      <MenuItem key={item.id} name="department" value={item.id}>
                        {item?.name}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl variant="standard" sx={{ mt: 1, minWidth: '100%' }}>
                <InputLabel id="demo-simple-select-standard-label">owner</InputLabel>
                <Select

                  margin="dense"
                  variant="standard"
                  fullWidth
                  name="owner"
                  value={textValue.owner}
                  label="owner"
                  onChange={(e)=> onInputChangeHandler(e?.target?.name, e?.target?.value)}
                >
                  {jobGetuserData &&
                    jobGetuserData?.list?.map((item) => (
                      <MenuItem key={item.id} value={item.account_id}>
                        {item?.first_name}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl variant="standard" sx={{ mt: 1, minWidth: '100%' }}>
                <InputLabel id="demo-multiple-checkbox-label">Team Member</InputLabel>
                <Select
                  labelId="team-members"
                  id="team-members"
                  multiple
                  value={textValue.member_names}
                  name="member_names"
                  fullWidth
                  onChange={(e)=> onInputChangeHandler(e?.target?.name, e?.target?.value)}
                  renderValue={renderMultiSelectValues}
                  MenuProps={MenuProps}
                  
                >
                  {jobGetuserData &&
                    jobGetuserData?.list?.map((item) => (
                      <MenuItem key={item} value={item}>
                        {/* <Checkbox checked={textValue?.member_ids?.find((x) => x === item?.account_id) !== undefined} /> */}
                        <ListItemText primary={`${item.first_name} ${item.last_name}`} />
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl variant="standard" sx={{ mt: 1, minWidth: '100%' }}>
                <InputLabel id="demo-simple-select-standard-label">Type</InputLabel>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  value={textValue.type}
                  onChange={(e)=> onInputChangeHandler(e?.target?.name, e?.target?.value)}
                  label="Type"
                  name="type"
                >
                  <MenuItem value={'F'}>Full Time</MenuItem>
                  <MenuItem value={'P'}>Part Time</MenuItem>
                  {/* <MenuItem value={'C'}>Contract</MenuItem> */}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl variant="standard" sx={{ mt: 1, minWidth: '100%' }}>
                <InputLabel id="demo-simple-select-standard-label">Job Nature</InputLabel>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  value={textValue.nature}
                  onChange={(e)=> onInputChangeHandler(e?.target?.name, e?.target?.value)}
                  label="on site"
                  name="nature"
                >
                  <MenuItem value={'P'}>Physical</MenuItem>
                  <MenuItem value={'R'}>Remote</MenuItem>
                  {/* <MenuItem value={30}>Thirty</MenuItem> */}
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
                  onChange={(e)=> onInputChangeHandler(e?.target?.name, e?.target?.value)}
                  label="Choose Degree"
                  name="education"
                >
                  <MenuItem value={1}>High School</MenuItem>
                  <MenuItem value={2}>Junior College</MenuItem>
                  <MenuItem value={3}>Bachelors</MenuItem>
                  <MenuItem value={4}>Masters</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl variant="standard" sx={{ mt: 1, minWidth: '100%' }}>
                <TextField
                autoFocus
                margin="dense"
                variant="standard"
                fullWidth
                name="speciality"
                value={textValue.speciality}
                label="Speciality"
                onChange={(e)=> onInputChangeHandler(e?.target?.name, e?.target?.value)}
              />
              </FormControl>
            </Grid>
            <Grid item xs={3}>
              <FormControl variant="standard" sx={{ mt: 1, minWidth: '100%' }}>
                <InputLabel id="demo-simple-select-standard-label">Work Ex. min. (years)</InputLabel>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  value={textValue.exp_min}
                  onChange={(e)=> onInputChangeHandler(e?.target?.name, e?.target?.value)}
                  label="Work Ex. min. (years)"
                  name="exp_min"
                >
                  {experienceArray.map((item) => (
                    <MenuItem key={`min-${item}`} name="min" value={item}>
                      {item}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={3}>
              <FormControl variant="standard" sx={{ mt: 1, minWidth: '100%' }}>
                <InputLabel id="demo-simple-select-standard-label">Work Ex. max. (years)</InputLabel>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  value={textValue.exp_max}
                  onChange={(e)=> onInputChangeHandler(e?.target?.name, e?.target?.value)}
                  label="Work Ex. max. (years)"
                  name="exp_max"
                >
                  {/* <MenuItem value="">
                    <em>None</em>
                  </MenuItem> */}
                  {experienceArray.map((item) => (
                    <MenuItem key={`max-${item}`} value={item}>
                      {item}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={3}>
              <TextField
                margin="dense"
                variant="standard"
                fullWidth
                name="salary_min"
                value={textValue.salary_min}
                label="Salary Minimum"
                onChange={(e)=> onInputChangeHandler(e?.target?.name, e?.target?.value)}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                margin="dense"
                variant="standard"
                fullWidth
                name="salary_max"
                value={textValue.salary_max}
                label="Salary Maximum"
                onChange={(e)=> onInputChangeHandler(e?.target?.name, e?.target?.value)}
              />
            </Grid>
            <Grid item xs={3}>
              <FormControl variant="standard" sx={{ mt: 1, minWidth: '100%' }}>
                <InputLabel id="demo-simple-select-standard-label">Currency</InputLabel>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  value={textValue.currency}
                  onChange={(e)=> onInputChangeHandler(e?.target?.name, e?.target?.value)}
                  label="Currency"
                  name="currency"
                >
                  <MenuItem value={'INR'}>INR</MenuItem>
                  <MenuItem value={'US'}>US Dollar</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={3}>
              <FormControl variant="standard" sx={{ mt: 1, minWidth: '100%' }}>
                <InputLabel id="demo-simple-select-standard-label">Salary Type</InputLabel>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  value={textValue.salary_type}
                  onChange={(e)=> onInputChangeHandler(e?.target?.name, e?.target?.value)}
                  label="Salary Type"
                  name="salary_type"
                >
                  <MenuItem value={'Y'}>Yearly</MenuItem>
                  <MenuItem value={'M'}>Monthly</MenuItem>
                  <MenuItem value={'W'}>Weekly</MenuItem>
                  <MenuItem value={'D'}>Daily</MenuItem>

                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl variant="standard" sx={{ mt: 1, minWidth: '100%' }}>
                <InputLabel id="demo-simple-select-standard-label">Address</InputLabel>
                <Select
                  margin="dense"
                  variant="standard"
                  fullWidth
                  name="location_id"
                  value={textValue.location}
                  label="Address (name)"
                  onChange={(e)=> onInputChangeHandler(e?.target?.name, e?.target?.value)}
                >
                  {jobAddressData && jobAddressData?.data?.map((item)=>(
                    <MenuItem key={item.id} value={item.id}>
                    {item?.name}
                  </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl variant="standard" sx={{ mt: 1, minWidth: '100%' }}>
                <InputLabel id="demo-simple-select-standard-label">Pipeline</InputLabel>
                <Select
                  margin="dense"
                  variant="standard"
                  fullWidth
                  name="pipeline"
                  value={textValue.pipeline}
                  label="pipeline"
                  onChange={(e)=> onInputChangeHandler(e?.target?.name, e?.target?.value)}
                >
                  {jobGetPipelineData &&
                    jobGetPipelineData?.data?.map((item) => (
                      <MenuItem key={item.id} value={item.id}>
                        {item?.name}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
            <InputLabel id="demo-simple-select-standard-label">Job Description</InputLabel>
              <ReactQuill 
                    theme="snow"
                    style={{width:"100%"}}
                    modules={modules}
                    formats={formats}
                    label="Job Description"
                    value={textValue?.description}
                    //  value={state.comments || ''}
                    name="description"
                    onChange={(e)=>{
                      console.log(e)
                      onInputChangeHandler("description", e)
                    }}
              />
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Card>
  );
};

export default FillDetails;
