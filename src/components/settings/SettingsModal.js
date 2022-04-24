import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Slide from '@mui/material/Slide';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

const SettingsModal = (props) => {
  const { open, handleClose, label, getInputValue, buttonLabel } = props;
  const [textValue, setTextValue] = useState('');

  const modalCloseHandler = () => {
    handleClose(false);
  };

  const onInputChangeHandler = (e) => {
    // console.log(e.target.name);
    // console.log(e.target.value);
    setTextValue(e.target.value);
    const myObj = {};
    myObj[e.target.name] = e.target.value;
    getInputValue(myObj);
  };

  return (
    <>
      <Dialog
        open={open}
        fullWidth
        maxWidth="xs"
        onClose={() => {
          handleClose(false);
        }}
        aria-labelledby="alertmodalCloseHandler-dialog-title"
        aria-describedby="alert-dialog-description"
        BackdropProps={{ style: { background: 'rgba(0, 0, 0, 0.5)' } }}
      >
        <div>
          <DialogTitle>{label}</DialogTitle>
          <DialogContent>
            <Box sx={{ flexGrow: 1 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    autoFocus
                    margin="dense"
                    variant="standard"
                    fullWidth
                    {...props}
                    value={textValue}
                    onChange={onInputChangeHandler}
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
                {buttonLabel}
              </Button>
            </Box>
          </DialogActions>
        </div>
      </Dialog>
    </>
  );
};

export default SettingsModal;
