import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import DialogContent from '@mui/material/DialogContent';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';

const Billing = () => {
  function createData(feature, basic, advance, premium) {
    return { feature, basic, advance, premium };
  }
  const rows = [
    createData('Feature 1', <DoneIcon />, <DoneIcon />, <DoneIcon />),
    createData('Feature 2', <CloseIcon />, <DoneIcon />, <DoneIcon />),
  ];
  const [textValue, setTextValue] = useState({
    firstName: '',
    lastname: '',
    email: '',
    mobileNumber: '',
    alternateEmail: '',
    alternateMobNum: '',
    address: '',
    country: '',
    state: '',
    city: '',
    zipcode: '',
    highestDegree: '',
    totalExp: '',
    institute: '',
    Degree: '',
  });

  const handleChange = () => {};

  const onInputChangeHandler = (e) => {
    // console.log(e.target.name);
    // console.log(e.target.value);
    setTextValue(e.target.value);
    const myObj = {};
    myObj[e.target.name] = e.target.value;
  };

  return (
    <>
      
        <Box sx={{ flexGrow: 1 }}>
          <Card style={{ padding: 40 }}>
            <Grid container spacing={2} justifyContent="center">
              <Grid item xs={12} style={{ marginBottom: 40 }} textAlign="center">
                <Typography variant="h6" gutterBottom>
                  Your Current Plan
                </Typography>
              </Grid>
              <Divider style={{ width: '100%' }} />
              <Card sx={{ minWidth: 275, mt: 2 }}>
                <CardContent sx={{ textAlign: 'center' }}>
                  <Typography sx={{ fontSize: 40 }} gutterBottom>
                    $15/Month
                  </Typography>
                  <Typography variant="h5">Basic</Typography>
                  <Typography sx={{ mb: 2.5 }} color="text.secondary">
                    10 users inculded
                    <br />
                    2GB of storage
                    <br />
                    Email support
                    <br />
                    Help center access
                    <br />
                    Sign Up for Free
                  </Typography>
                  <CardActions sx={{ justifyContent: 'center' }}>
                    <Button
                      style={{ backgroundColor: '#FF4E50', background: 'linear-gradient(to right, #F9D423, #FF4E50)' }}
                      size="small"
                      variant="contained"
                    >
                      UPGRADE
                    </Button>
                  </CardActions>
                </CardContent>
              </Card>
            </Grid>
            <Divider style={{ width: '100%', marginTop: 40, marginBottom: 20 }} />
            <Grid container spacing={2} justifyContent="space-evenly">
              <Grid item xs={12} style={{ marginBottom: 20 }} textAlign="center">
                <Typography sx={{ fontSize: 30 }} gutterBottom>
                  Select Plan
                </Typography>
              </Grid>
              <Divider style={{ width: '100%' }} />
              <Card sx={{ minWidth: 275, mt: 2 }}>
                <CardContent sx={{ textAlign: 'center' }}>
                  <Typography sx={{ fontSize: 40 }} gutterBottom>
                    $15/Month
                  </Typography>
                  <Typography variant="h5">Basic</Typography>
                  <Typography sx={{ mb: 2.5 }} color="text.secondary">
                    10 users inculded
                    <br />
                    2GB of storage
                    <br />
                    Email support
                    <br />
                    Help center access
                    <br />
                    Sign Up for Free
                  </Typography>
                  <CardActions sx={{ justifyContent: 'center' }}>
                    <Button size="small" variant="contained" disabled>
                      CURRENT PLAN
                    </Button>
                  </CardActions>
                </CardContent>
              </Card>
              <Card sx={{ minWidth: 275, mt: 2 }}>
                <CardContent sx={{ textAlign: 'center' }}>
                  <Typography sx={{ fontSize: 40 }} gutterBottom>
                    $35/Month
                  </Typography>
                  <Typography variant="h5">Advanced</Typography>
                  <Typography sx={{ mb: 2.5 }} color="text.secondary">
                    15 users inculded
                    <br />
                    5GB of storage
                    <br />
                    Email/Call support
                    <br />
                    Help center access
                    <br />
                    Sign Up for Free
                  </Typography>
                  <CardActions sx={{ justifyContent: 'center' }}>
                    <Button
                      style={{ backgroundColor: '#FF4E50', background: 'linear-gradient(to right, #F9D423, #FF4E50)' }}
                      size="small"
                      variant="contained"
                    >
                      UPGRADE
                    </Button>
                  </CardActions>
                </CardContent>
              </Card>
              <Card sx={{ minWidth: 275, mt: 2 }}>
                <CardContent sx={{ textAlign: 'center' }}>
                  <Typography sx={{ fontSize: 40 }} gutterBottom>
                    $65/Month
                  </Typography>
                  <Typography variant="h5">Premium</Typography>
                  <Typography sx={{ mb: 2.5 }} color="text.secondary">
                    30 users inculded
                    <br />
                    20GB of storage
                    <br />
                    Priority support
                    <br />
                    Help center access
                    <br />
                    Sign Up for Free
                  </Typography>
                  <CardActions sx={{ justifyContent: 'center' }}>
                    <Button
                      style={{ backgroundColor: '#FF4E50', background: 'linear-gradient(to right, #F9D423, #FF4E50)' }}
                      size="small"
                      variant="contained"
                    >
                      UPGRADE
                    </Button>
                  </CardActions>
                </CardContent>
              </Card>
            </Grid>
            <TableContainer component={Paper} sx={{marginTop:"5%",marginBottom:"5%"}}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{fontSize:"larger"}}>Features</TableCell>
                            <TableCell sx={{fontSize:"large"}} align="right">Basic</TableCell>
                            <TableCell sx={{fontSize:"large"}} align="right">Advanced&nbsp;</TableCell>
                            <TableCell sx={{fontSize:"large"}} align="right">Premium&nbsp;</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {rows.map((row) => (
                        <TableRow
                        key={row.feature}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                        <TableCell component="th" scope="row">
                            {row.feature}
                        </TableCell>
                            <TableCell align="right">{row.basic}</TableCell>
                            <TableCell align="right">{row.advance}</TableCell>
                            <TableCell align="right">{row.premium}</TableCell>
                            <TableCell align="right">{row.dummy}</TableCell>
                            <TableCell align="right">{row.dummy}</TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>                        
          </Card>
        </Box>
     
    </>
  );
};

export default Billing;
