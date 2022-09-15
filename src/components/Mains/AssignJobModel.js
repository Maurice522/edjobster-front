import React, { useState, forwardRef } from 'react'
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, Grid, Typography, TextField } from '@mui/material/';
import DialogTitle from '@mui/material/DialogTitle';
import Iconify from '../Iconify';



const AssignJobModel = (props) => {
    const { open, handleClose } = props;


    return (
        <>

            <Dialog open={open} onClose={handleClose} >
                <DialogTitle>Assign a candidate to a job</DialogTitle>
                <DialogContent style={{ width: "600px" }}>
                    <Grid container sx={{ mt: 3 }} style={{ display: "flex", alignItems: "center" }}>
                        <Grid item md={4}>
                            <Typography variant='subtitle1'>Search for Job</Typography>
                        </Grid>
                        <Grid item md={8} >
                            <TextField id="outlined-basic" label="Tpye a Job title" variant="outlined" fullWidth placeholder='Tpye a Job title...' />
                        </Grid>
                        <Grid item md={4} sx={{ mt: 2 }}>
                            <Typography variant='subtitle1'>Hiring Stage</Typography>
                        </Grid>
                        <Grid item md={8} sx={{ mt: 2 }}>
                            <TextField id="outlined-basic" label="Choose the hiring stage" variant="outlined" fullWidth placeholder='Choose the hiring stage...' />
                        </Grid>
                        <Grid item md={4} sx={{ mt: 2 }}>
                            <Typography variant='subtitle1'>Notes</Typography>
                        </Grid>
                        <Grid item md={8} sx={{ mt: 2 }} >
                            <TextField id="outlined-basic" label="Notes" variant="outlined" fullWidth placeholder='Notes...' />
                        </Grid>
                    </Grid>

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} variant="outlined">Add</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default AssignJobModel
