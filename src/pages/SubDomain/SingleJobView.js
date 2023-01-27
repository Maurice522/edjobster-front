import React from 'react'
import {
    Card,
    Stack,
    Button,
    Container,
    Typography,
    ListItemIcon,
    Grid,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    DialogContent,
    Box,
  } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

function SingleJobView() {
  return (
    <div style={{backgroundColor:"#ffffff",height:"100%"}}>
        <div className='applicationTop'>
            <ArrowBackIcon color="secondary" />
            <div style={{
                width:"142px",
                height:"142px",
                padding:"71px 0px",
                borderRadius:"50%",
                alignItems:"center",
                textAlign:"center",
                marginLeft:"auto",
                marginRight:"auto",
                backgroundColor:"#f9fafb"
                }}>
                Logo
            </div>
        </div>
        <Card sx={{
            marginTop:"5%",
            backgroundColor:"#f9fafb",

        }}>
            <h2 style={{
                display:"flex",
                justifyContent:"center"
             }}>
                Job Position-Title- Department Name
            </h2>

        </Card>
    </div>
  )
}

export default SingleJobView