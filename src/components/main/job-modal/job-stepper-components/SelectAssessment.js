import React, { useState } from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';

const SelectAssessment = () => {
  const [textValue, setTextValue] = useState({
    selectAssessment: '',
  });

  const handleChange = () => {};

  return (
    <Container style={{ padding: 50, margin: 10 }}>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container justifyContent="center">
          <Grid item xs={8}>
            <FormControl variant="standard" sx={{ mt: 1, minWidth: '100%' }}>
              <InputLabel id="demo-simple-select-standard-label">Select Assessment</InputLabel>
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                value={textValue.selectAssessment}
                onChange={handleChange}
                label="Select Assessment"
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
        </Grid>
      </Box>
    </Container>
  );
};

export default SelectAssessment;
