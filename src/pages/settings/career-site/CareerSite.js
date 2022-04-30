import React from 'react';
import Button from '@mui/material/Button';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import FileUpload from 'react-material-file-upload';

const CareerSite = () => {
  const [files, setFiles] = React.useState([]);
  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4" gutterBottom>
          Career Site
        </Typography>
      </Stack>
      <DialogContent>
        <Card sx={{ minWidth: 275, p: 4 }} variant="outlined">
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={3} justifyContent="center">
              <Grid item xs={7}>
                <TextField
                  autoFocus
                  margin="dense"
                  variant="outlined"
                  fullWidth
                  name="InstituteName"
                  // value={textValue.name}
                  label="Institute Name"
                  // onChange={onInputChangeHandler}
                />
              </Grid>
              <Grid item xs={7}>
                <FileUpload value={files} onChange={setFiles} />
              </Grid>
              <Grid item xs={7}>
                <TextField
                  autoFocus
                  margin="dense"
                  variant="outlined"
                  fullWidth
                  name="InstituteWebsite"
                  // value={textValue.name}
                  label="Institute Website"
                  // onChange={onInputChangeHandler}
                />
              </Grid>
              <Grid item xs={7}>
                <TextField
                  autoFocus
                  margin="dense"
                  variant="outlined"
                  fullWidth
                  name="InstituteAddress"
                  // value={textValue.name}
                  label="Institute Address"
                  // onChange={onInputChangeHandler}
                />
              </Grid>
              <Grid item xs={7}>
                <TextField
                  autoFocus
                  margin="dense"
                  variant="outlined"
                  fullWidth
                  // value={textValue.address}
                  label="Address Landmark"
                  // onChange={onInputChangeHandler}
                />
              </Grid>

              <Grid item xs={7}>
                <FormControl variant="outlined" sx={{ minWidth: '100%' }}>
                  <InputLabel id="demo-simple-select-outlined-label">Country</InputLabel>
                  <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    //   value={textValue.country}
                    //   onChange={handleChange}
                    label="Country"
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
              <Grid item xs={7}>
                <FormControl variant="outlined" sx={{ minWidth: '100%' }}>
                  <InputLabel id="demo-simple-select-outlined-label">State</InputLabel>
                  <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    //   value={textValue.state}
                    //   onChange={handleChange}
                    label="State"
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
              <Grid item xs={7}>
                <FormControl variant="outlined" sx={{ minWidth: '100%' }}>
                  <InputLabel id="demo-simple-select-outlined-label">City</InputLabel>
                  <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    //   value={textValue.city}
                    //   onChange={handleChange}
                    label="City"
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
              <Grid item xs={7}>
                <TextField
                  autoFocus
                  margin="dense"
                  variant="outlined"
                  label="Pincode"
                  fullWidth
                  // value={textValue.pincode}
                  // onChange={onInputChangeHandler}
                />
              </Grid>
              <Grid item xs={7}>
                <Box style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <Button autoFocus variant="outlined" style={{ marginRight: 20 }}>
                    Cancel
                  </Button>
                  <Button variant="contained"> Create </Button>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Card>
      </DialogContent>
    </Container>
  );
};

export default CareerSite;
