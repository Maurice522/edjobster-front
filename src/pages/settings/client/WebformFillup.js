import React from 'react'
import {TextField, MenuItem, Box} from '@mui/material'
import { useDispatch, useSelector } from 'react-redux';
import { setWebFormProperty } from '../../../redux/Client/JobApplyWebformReducer';

const WebformFillup = () => {
  const selectedWebform = useSelector((state) => state.selectedJob.job);
  const webFormData = useSelector((state) => state.jobApplyWebFormData);
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
          return <TextField type={'file'} key={index} name={item.value} value={webFormData[item.value] ?? ''} label={item.name} required 
          InputLabelProps={{
            shrink: true,
          }} />
        } 
        return null;
        
      })}
     </Box>
    </div>
  )
}

export default WebformFillup;