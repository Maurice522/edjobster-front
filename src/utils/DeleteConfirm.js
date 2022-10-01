import { Title } from "@mui/icons-material";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import React from "react";
import Typography from "../theme/overrides/Typography";

const DeleteConfirm =(props)=>{
    const {open}=props;
    return(

<Dialog open={open}>
    <DialogTitle  >
        <Typography variant='h6'>Are you sure</Typography>
    </DialogTitle>
    {/* <DialogContent>
       {subTitle}
    </DialogContent> */}
    <DialogActions>
        <Button color="error">yes</Button>
        <Button color="success">no</Button>
    </DialogActions>
</Dialog>
    )
}
export default DeleteConfirm
