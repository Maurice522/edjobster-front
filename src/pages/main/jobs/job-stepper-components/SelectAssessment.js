import React, { useState, useEffect } from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { useDispatch, useSelector } from 'react-redux';
import { jobAction } from '../../../../redux/job/JobReducer';
import { useGetAssesmentQuery } from '../../../../redux/services/main/AssesmentService';
import { useGetWebformQuery } from '../../../../redux/services/settings/WebformService'

const SelectAssessment = () => {
  const dispatch = useDispatch();
  const job = useSelector((state) => state.job.job);
  const { data: selectAssesmentData } = useGetAssesmentQuery();
  const { data: selectWebFormData } = useGetWebformQuery();
  console.log(selectAssesmentData)

  const [textValue, setTextValue] = useState({
    assesment: job.assesment,
    webform: job.webform
  });
 

  const onInputChangeHandler = (e) => {
    const myObj = { ...textValue };
    myObj[e.target.name] = e.target.value;
    setTextValue({ ...myObj });
  };
  

  useEffect(
    () => () => {
      dispatch(jobAction(textValue));
    },
    [dispatch, textValue]
  );
  return (
    <Container style={{ padding: 50, margin: 10 }}>
      <Box sx={{ flexGrow: 1, gap: "4rem", display: "flex", flexDirection: "row"}}>
        <Grid container justifyContent="center">
          <Grid item xs={8}>
            <InputLabel id="demo-simple-select-standard-label">Select Assessment</InputLabel>
            <FormControl variant="standard" sx={{ mt: 1, minWidth: '100%' }}>
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                value={textValue.assesment}
                onChange={onInputChangeHandler}
                label="Select Assessment"
                name="assesment"
              >
                {/* <MenuItem value="">
                  <em>None</em>
                </MenuItem> */}
                {selectAssesmentData &&
                  selectAssesmentData?.data?.map((item) => (
                    <MenuItem key={item.id} value={item.id}>
                      {item?.name}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <Grid container justifyContent="center">
          <Grid item xs={8}>
            <InputLabel id="demo-simple-select-standard-label">Select Webform</InputLabel>
            <FormControl variant="standard" sx={{ mt: 1, minWidth: '100%' }}>
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                value={textValue.webform}
                onChange={onInputChangeHandler}
                label="Select Webform"
                name="webform"
              >
                {/* <MenuItem value="">
                  <em>None</em>
                </MenuItem> */}
                {selectWebFormData &&
                  selectWebFormData?.data?.map((item) => (
                    <MenuItem key={item.id} value={item.id}>
                      {item?.name}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default SelectAssessment;
