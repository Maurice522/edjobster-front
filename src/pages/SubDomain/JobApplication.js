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


function JobApplication() {
  return (
    <div>
        <Stack sx={{
            display:"flex",
            flexDirection:"row",
            
        }}>
            <ArrowBackIcon color="secondary" />
            <h1>Job Title</h1>
        </Stack>
        
    </div>
  )
}

export default JobApplication