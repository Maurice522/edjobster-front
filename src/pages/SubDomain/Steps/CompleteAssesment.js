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
import { useParams } from 'react-router-dom';

function CompleteAssesment() {
  const assesment = localStorage.getItem("assesment")
  console.log(assesment)
  return (
    <div className='ApplicationSteps'>
           <Container>
            <Card sx={{
              width:"60%",
              marginLeft:"auto",
              marginRight:"auto",
              height: "220px"
            }}>
              Assesment question and use ansers with checkbox
            </Card>
            <Button>
              Submit
            </Button>
           </Container>
    </div>
  )
}

export default CompleteAssesment