import React, { useState } from 'react'
import { TextField, MenuItem, Box, Button } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux';
import { setWebFormProperty, setResume } from '../../../redux/Client/JobApplyWebformReducer';
import { useAddCandidateResumeMutation } from '../../../redux/services/candidate/CandidateServices';

const WebformFillup = () => {
  const selectedWebform = useSelector((state) => state.selectedJob.job);
  const webFormData = useSelector((state) => state.jobApplyWebFormData);
  const [ uploadResume, { isLoading, isSuccess }] = useAddCandidateResumeMutation();
  const dispatch = useDispatch();

  const onInputChange = (e) => {
    dispatch(setWebFormProperty({key: e.target.name, value: e.target.value}));
  }
    return (
    <div>
      <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
     >
      {selectedWebform && selectedWebform.webform && selectedWebform.webform.form.map((item, index) => {
        if(item.type === 'text'){
          return <TextField type={'text'} key={item.value} name={item.value} label={item.name} value={webFormData[item.value] ?? ''} required onChange={onInputChange} />
        } 
        if(item.type === 'select'){
          return <TextField
          id="outlined-select-currency"
          select
          name={item.value}
          label={item.name}
          // value={currency}
          onChange={onInputChange}
          >
            {item.options && item.options.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
        }
        if(item.type === 'file'){
          return (
          <Button
            variant="contained"
            component="label"
            key={index} name={item.value} 
          >
            {item.name}
            <input
              type="file"
              hidden
              onChange={(e) => {
                // uploadResume(formData);
                dispatch(setResume({value: e.target.files[0]}));
              }}
            />
          </Button>)
          // <TextField type={'file'} 
          // key={index} name={item.value} 
          // onChange={(file) => uploadResume(file)}
          // value={webFormData[item.value] ?? ''} 
          // label={item.name} required 
          // InputLabelProps={{
          //   shrink: true,
          // }} />
        } 
        return null;
        
      })}
     </Box>
    </div>
  )
}

export default WebformFillup;