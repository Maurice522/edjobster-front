import React, { useState, forwardRef } from 'react'
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, Grid, Typography, TextField, Select } from '@mui/material';
import DialogTitle from '@mui/material/DialogTitle';
import Iconify from '../Iconify';



const AssignJobModel = (props) => {
    const { open, handleClose, jobs, handleChange, value, handleSubmit } = props;

    console.log(jobs)
    return (
        <>
            <Dialog open={open} onClose={handleClose} >
                <DialogTitle>Assign a candidate to a job</DialogTitle>
                <DialogContent style={{ width: "600px", padding: "0 2rem", paddingTop: "2rem", paddingBottom: "6rem" }}>
                    <TextField 
                        id="outlined-basic" 
                        label="Tpye a Job title" 
                        variant="outlined" 
                        fullWidth 
                        placeholder='Select a Job title...'
                        select
                        SelectProps={{
                            native: true
                        }}
                        value={value}
                        onChange={handleChange}
                    >
                        <option value={-1}>Select a job</option>
                        {jobs?.map(e => (
                            <option value={e.id} key={e.id}>
                                {e.title}
                            </option>
                        ))}
                    </TextField>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => {handleSubmit(); handleClose()}} variant="outlined">Add</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default AssignJobModel
