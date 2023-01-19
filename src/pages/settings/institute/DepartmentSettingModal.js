import React from 'react';
import { Formik, Form, useField, ErrorMessage, useFormik, isInteger } from "formik";
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { LoadingButton } from '@mui/lab';

const baseUrl= "http://127.0.0.1:8000";

const DepartmentSettingsModal = (props) => {
  const navigate= useNavigate()
  // eslint-disable-next-line react/prop-types
  const { open, handleClose, addClickHandler, loadingBtn,onChangeHandle, textboxlabel, buttonlabel, value } = props;

  return (
  <>
      <Dialog
        open={open}
        fullWidth
        maxWidth="xs"
        onClose={handleClose}
        aria-labelledby="alertmodalCloseHandler-dialog-title"
        aria-describedby="alert-dialog-description"
        BackdropProps={{ style: { background: 'rgba(0, 0, 0, 0.5)' } }}
      >
        <div>
          <DialogTitle>{textboxlabel ?? 'Department'}</DialogTitle>
          <DialogContent>
            <Box sx={{ flexGrow: 1 }}>
              <Grid container spacing={2} mt={1}>
                <Grid item xs={12}>
                  <TextField
                    id="Departments"
                    label="Department Name"
                    variant="outlined"
                    onChange={onChangeHandle}
                    name="name"
                    fullWidth
                    value={value}
                  />
                </Grid>
              </Grid>
            </Box>
            <Box>
              {/* {console.log('DepartmentData', DepartmentData)} */}
              <FormControl sx={{ mt: 5, width: 390 }}>
                {/* <InputLabel id="Department label">Add  Department</InputLabel> */}
                <Select
                  labelId="Department label"
                  id="Department"
                  name="Department"
                  multiple
                  fullWidth
                  value=''
                />
                
              </FormControl>
            </Box>
          </DialogContent>
          <DialogActions>
            <Box>
              <Button onClick={handleClose} autoFocus variant="outlined" style={{ marginRight: 5 }}>
                Cancel
              </Button>
              <LoadingButton onClick={addClickHandler} variant="contained" loading={loadingBtn}>
                {buttonlabel}
              </LoadingButton>
            </Box>
          </DialogActions>
        </div>
      </Dialog>
    </>
  );

};

export default DepartmentSettingsModal;
