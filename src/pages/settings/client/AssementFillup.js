import React from 'react';
import { useSelector } from 'react-redux';
import { Box, FormControl, Grid, RadioGroup, Divider, Radio, FormGroup, FormControlLabel, Checkbox, Typography, TextField, MenuItem, Card, CardContent, CardHeader } from  '@mui/material';
import { useGetAssesmentQuestionsQuery } from '../../../redux/services/main/AssesmentQuestionsService';

const AssementFillup = () => {
  const selectedWebform = useSelector((state) => state.selectedJob.job);
  const { data: AssessmentData } = useGetAssesmentQuestionsQuery(selectedWebform.assesment.id);

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
      {AssessmentData && AssessmentData.questions && AssessmentData.questions.map((item, _idx) => {
        if(item.type === 'C'){
          return (
          <Card variant="outlined" sx={{ width: '60%', marginLeft: '20%', marginBottom: '3%' }} key={_idx}>
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={4}>
                  <Typography>Question {_idx + 1}</Typography>
                </Grid>
                <Grid item xs={6}>
                  {}
                </Grid>
                <Grid item xs={2}>
                  <Typography>Mark: { item.marks}</Typography>
                </Grid>
              </Grid>
              <Divider /><br />
              <Typography variant="h5" component="div">
                {item.question}
              </Typography>
              <FormGroup>
                {item.options && item.options.map((option, index) => 
                <FormControlLabel control={<Checkbox />} label={option} key={index} />)
              }
              </FormGroup>
            </CardContent>
          </Card>)
        } 
        if(item.type === 'R'){
          return (
          <Card variant="outlined" sx={{ width: '60%', marginLeft: '20%', marginBottom: '3%' }} key={_idx}>
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={4}>
                  <Typography>Question {_idx + 1}</Typography>
                </Grid>
                <Grid item xs={6}>
                  {}
                </Grid>
                <Grid item xs={2}>
                  <Typography>Mark: { item.marks}</Typography>
                </Grid>
              </Grid>
              <Divider /><br />
              <Typography variant="h5" component="div">
                {item.question}
              </Typography>
              <TextField
              id="outlined-select-currency"
              select
              label={"Select Answer"}
              // onChange={onInputChange}
              >
                {item.options && item.options.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
            </CardContent>
          </Card>)
        }
        if(item.type === 'S'){
          return (
          <Card variant="outlined" sx={{ width: '60%', marginLeft: '20%', marginBottom: '3%' }} key={_idx}>
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={4}>
                  <Typography>Question {_idx + 1}</Typography>
                </Grid>
                <Grid item xs={6}>
                  {}
                </Grid>
                <Grid item xs={2}>
                  <Typography>Mark: { item.marks}</Typography>
                </Grid>
              </Grid>
              <Divider /><br />
              <Typography variant="h5" component="div">
                {item.question}
              </Typography>
              <FormControl>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  name="radio-buttons-group"
                >
                  {item.options && item.options.map((option, index) => 
                    <FormControlLabel key={index} value={option} control={<Radio />} label={option} />)
                  }
                </RadioGroup>
              </FormControl>
            </CardContent>
          </Card>)
        }
        if(item.type === 'T'){
          return (
          <Card variant="outlined" sx={{ width: '60%', marginLeft: '20%', marginBottom: '3%' }} key={_idx}>
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={4}>
                  <Typography>Question {_idx + 1}</Typography>
                </Grid>
                <Grid item xs={6}>
                  {}
                </Grid>
                <Grid item xs={2}>
                  <Typography>Mark: { item.marks}</Typography>
                </Grid>
              </Grid>
              <Divider />
              <br />
              <Typography variant="h5" component="div">
                {item.question}
              </Typography>
              <TextField
              id="outlined-select-currency" label={"Write Answer"}
              type='text' />
            </CardContent>
          </Card>)
        }

        return null;
        
      })}
     </Box>
    </div>
  )
}

export default AssementFillup;