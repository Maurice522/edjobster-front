import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Editor } from 'react-draft-wysiwyg';
import RichTextEditer from '../Rich-text-editer/RichTextEditer';

const EmailModalTemplates = (props) => {
  const { open, handleClose } = props;
  const [textValue, setTextValue] = useState({
    category: '',
    subject: '',
    variables: '',
    body: '',
  });

  const handleChange = () => {};

  const modalCloseHandler = () => {
    handleClose(false);
  };

  const onInputChangeHandler = (e) => {
    // console.log(e.target.name);
    // console.log(e.target.value);
    setTextValue(e.target.value);
    const myObj = {};
    myObj[e.target.name] = e.target.value;
  };

  return (
    <>
      <Dialog
        open={open}
        fullWidth
        maxWidth="sm"
        onClose={() => {
          handleClose(false);
        }}
        aria-labelledby="alertmodalCloseHandler-dialog-title"
        aria-describedby="alert-dialog-description"
        BackdropProps={{ style: { background: 'rgba(0, 0, 0, 0.5)' } }}
      >
        <div>
          <DialogTitle>Create an Email Templates</DialogTitle>
          <DialogContent>
            <Box sx={{ flexGrow: 1 }}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <FormControl variant="standard" sx={{ mt: 1, minWidth: '100%' }}>
                    <InputLabel id="demo-simple-select-standard-label">Category</InputLabel>
                    <Select
                      labelId="demo-simple-select-standard-label"
                      id="demo-simple-select-standard"
                      value={textValue.category}
                      onChange={handleChange}
                      label="Category"
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
                <Grid item xs={6} display="flex" alignItems="flex-end">
                  <FormControl>
                    <RadioGroup row aria-labelledby="demo-row-radio-buttons-group-label" name="row-radio-buttons-group">
                      <FormControlLabel value="candidate" control={<Radio />} label="Candidate" />
                      <FormControlLabel value="internal" control={<Radio />} label="Internal" />
                    </RadioGroup>
                  </FormControl>
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    autoFocus
                    margin="dense"
                    variant="standard"
                    fullWidth
                    name="subject"
                    value={textValue.subject}
                    label="Subject"
                    onChange={onInputChangeHandler}
                  />
                </Grid>
                <Grid item xs={6}>
                  <FormControl variant="standard" sx={{ mt: 1, minWidth: '100%' }}>
                    <InputLabel id="demo-simple-select-standard-label">Variables</InputLabel>
                    <Select
                      labelId="demo-simple-select-standard-label"
                      id="demo-simple-select-standard"
                      value={textValue.variables}
                      onChange={handleChange}
                      label="Variables"
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
                <Grid item xs={12}>
                  <RichTextEditer
                    toolbarCustomButtons={[
                      <FormControl variant="standard" sx={{ mt: 1, minWidth: '100%' }}>
                        <InputLabel id="demo-simple-select-standard-label">Variables</InputLabel>
                        <Select
                          labelId="demo-simple-select-standard-label"
                          id="demo-simple-select-standard"
                          value={textValue.variables}
                          onChange={handleChange}
                          label="Variables"
                        >
                          <MenuItem value="">
                            <em>None</em>
                          </MenuItem>
                          <MenuItem value={10}>Ten</MenuItem>
                          <MenuItem value={20}>Twenty</MenuItem>
                          <MenuItem value={30}>Thirty</MenuItem>
                        </Select>
                      </FormControl>,
                    ]}
                  />
                </Grid>
              </Grid>
            </Box>
          </DialogContent>
          <DialogActions>
            <Box>
              <Button onClick={modalCloseHandler} autoFocus variant="outlined" style={{ marginRight: 5 }}>
                Cancel
              </Button>
              <Button onClick={modalCloseHandler} variant="contained">
                Add Template
              </Button>
            </Box>
          </DialogActions>
        </div>
      </Dialog>
    </>
  );
};

export default EmailModalTemplates;
