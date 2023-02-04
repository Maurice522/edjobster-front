import React, { useState, useEffect } from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import { useDispatch, useSelector } from 'react-redux';
import { jobAction } from '../../../../redux/job/JobReducer';
import { useGetAssesmentQuery } from '../../../../redux/services/main/AssesmentService';
import { useGetWebformQuery } from '../../../../redux/services/settings/WebformService'

const SelectAssessment = () => {
  const dispatch = useDispatch();
  const job = useSelector((state) => state.job.job);
  const { data: selectAssesmentData } = useGetAssesmentQuery();
  console.log("assesment", selectAssesmentData)
  const { data: selectWebFormData } = useGetWebformQuery();
  const [assesmentOptions, setAssesmentOptions] = useState([]);
  console.log(assesmentOptions)

  const [textValue, setTextValue] = useState({
    assesment: job.assesment,
    webform: job.webform
  });
  console.log(textValue)
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

  const renderMultiSelectValues = (selected) => {
    let allNames = '';
    for (let index = 0; index < selected.length; index += 1) {
      const element = selected[index];
      allNames = `${allNames}  ${element.name},`;
    }
    // return textValue.member_names;
    return allNames;
  };

  const onInputChangeHandler = (e) => {
    const myObj = { ...textValue };
    if(e.target.name === "assesment") {
      myObj[e.target.name] = [...myObj.assesment, e.target.value];
    }
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
      <Box sx={{ flexGrow: 1, gap: "4rem", display: "flex", flexDirection: "row" }}>
        <Grid container justifyContent="center">
          <Grid item xs={8}>
            <InputLabel id="demo-simple-select-standard-label">Select Assessment</InputLabel>
            <FormControl variant="standard" sx={{ mt: 1, minWidth: '100%' }}>
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                //  multiple
                value={textValue.assesment}
                onChange={onInputChangeHandler}
                label="Select Assessment"
                name="assesment"
                // renderValue={renderMultiSelectValues}
                //  MenuProps={MenuProps}

              >
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
