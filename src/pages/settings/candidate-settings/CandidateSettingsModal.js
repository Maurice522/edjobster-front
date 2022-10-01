
import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { LoadingButton } from '@mui/lab';

const CandidateSettingModal = (props) => {
  // eslint-disable-next-line react/prop-types
  const { open, handleClose, addClickHandler, loadingbtn,onChangeHandle } = props;

  

  return (
  //   <>
  //     <Dialog
  //       open={open}
  //       fullWidth
  //       maxWidth="xs"
  //       onClose={() => {
  //         handleclose(false);
  //       }}
  //       aria-labelledby="alertmodalCloseHandler-dialog-title"
  //       aria-describedby="alert-dialog-description"
  //       BackdropProps={{ style: { background: 'rgba(0, 0, 0, 0.5)' } }}
  //     >
  //       <div>
  //         <DialogTitle>{textboxlabel}</DialogTitle>
  //         <DialogContent>
  //           <Box sx={{ flexGrow: 1 }}>
  //             <Grid container spacing={2}>
  //               <Grid item xs={12}>
  //                 <TextField autoFocus margin="dense" variant="standard" fullWidth {...props} />
  //               </Grid>
  //             </Grid>
  //           </Box>
  //         </DialogContent>
  //         <DialogActions>
  //           <Box>
  //             <Button onClick={handleclose} autoFocus variant="outlined" style={{ marginRight: 5 }}>
  //               Cancel
  //             </Button>
  //             <LoadingButton onClick={ addClickhandler} variant="contained" loading={loadingbtn}>
  //               Add
  //             </LoadingButton>
  //           </Box>
  //         </DialogActions>
  //       </div>
  //     </Dialog>
  //   </>
  // );
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
          <DialogTitle>Assessment Categories</DialogTitle>
          <DialogContent>
            <Box sx={{ flexGrow: 1 }}>
              <Grid container spacing={2} mt={1}>
                <Grid item xs={12}>
                  <TextField
                    id="Assessment Categories"
                    label="Assessment Categories Name"
                    variant="outlined"
                    onChange={onChangeHandle}
                    name="name"
                    fullWidth                  />
                </Grid>
              </Grid>
            </Box>
            <Box>
              {/* {console.log('stageData', stageData)} */}
              <FormControl sx={{ mt: 5, width: 390 }}>
                {/* <InputLabel id="Stage label">Add Designation</InputLabel> */}
                <Select
                  labelId="Stage label"
                  id="Assessment Categories"
                  name="name"
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
                Cance
              </Button>
              <LoadingButton onClick={addClickHandler} variant="contained" loading={loadingbtn}>
                Add
              </LoadingButton>
            </Box>
          </DialogActions>
        </div>
      </Dialog>
    </>
  );
};

export default CandidateSettingModal;
;
