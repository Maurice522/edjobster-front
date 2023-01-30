import { useParams } from 'react-router-dom';
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

function FillWebForm() {
  const params = useParams();
  console.log(params)
  return (
    <div className='ApplicationSteps'>

            Fill Web Form
 
    </div>
  )
}

export default FillWebForm