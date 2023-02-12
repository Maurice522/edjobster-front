import React, { useState, forwardRef } from 'react'
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, Grid, Typography, TextField, Select } from '@mui/material';
import DialogTitle from '@mui/material/DialogTitle';



const AssesmentModal = (props) => {
    const { open, handleClose, data} = props;

    console.log(data)
    return (
        <>
            <Dialog open={open} onClose={handleClose} >
                <DialogTitle>Assesment Response</DialogTitle>
                <DialogContent style={{ width: "600px", padding: "0 2rem", paddingTop: "2rem", paddingBottom: "6rem" }}>
                    {/* <TextField 
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
                        <option value={-1}>Select a {name}</option>
                        {data?.map(e => (
                            <option value={e.id} key={e.id}>
                                {e.title}
                            </option>
                        ))}
                    </TextField> */}
                </DialogContent>
                <DialogActions>
                    {/* <Button onClick={() => {handleSubmit(); handleClose()}} variant="outlined">Add</Button> */}
                </DialogActions>
            </Dialog>
        </>
    )
}

export default AssesmentModal
