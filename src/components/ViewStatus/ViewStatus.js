import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { LoadingButton } from '@mui/lab';
import ListItemIcon from '@mui/material';

const ViewStatus = (props) => {
  const { open, handleclose } = props;
  // const [counter, setCounter] = useState(0);
  // const [couterDelete, setCouterDelete] = useState(0);
  const [formValues, setFormValues] = useState([{ name: '', email: '' }]);

  const modalCloseHandler = () => {
    handleclose(true);
  };

  const addFormFields = () => {
    setFormValues([...formValues, { name: '', email: '' }]);
  };

  const removeFormFields = (i) => {
    const newFormValues = [...formValues];
    newFormValues.splice(i, 1);
    setFormValues(newFormValues);
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={() => {
          handleclose(false);
        }}
        fullWidth
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{'Status Details'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <Grid container style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Grid col-md={12}>
                <LoadingButton onClick={() => addFormFields()} variant="contained">
                  Add Status
                </LoadingButton>
              </Grid>
            </Grid>
            <Grid container>
              {formValues.map((element, index) => (
                <>
                  <Grid item md={9} key={index}>
                    <TextField id="standard-basic" fullWidth label="Add Status" variant="standard" {...props} />
                  </Grid>
                  <Grid item md={3} style={{ display: 'flex', alignItems: 'end', justifyContent: 'end' }}>
                    {index !== 0 ? (
                      <LoadingButton onClick={() => removeFormFields(index)} variant="contained">
                        Remove
                      </LoadingButton>
                    ) : null}
                  </Grid>
                </>
              ))}
            </Grid>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={modalCloseHandler} autoFocus variant="outlined" style={{ marginRight: 5 }}>
            Cancel
          </Button>
          <LoadingButton variant="contained">Add</LoadingButton>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ViewStatus;
