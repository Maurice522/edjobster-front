// File Created by Kundan
import React from 'react'
import { Formik, Form, useField, ErrorMessage, useFormik, isInteger } from "formik";
import { object, string, ref } from "yup";
// eslint-disable-next-line import/no-unresolved
// eslint-disable-next-line import/no-unresolved
// eslint-disable-next-line import/no-unresolved
import { useNavigate } from 'react-router-dom';

import {
    Button,
    Card, Stack
} from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
import Iconify from '../../../components/Iconify';

function Bill() {

    function createData(feature, basic, advance, premium) {
        return { feature, basic, advance, premium };
      }
    const rows = [
        createData('Feature 1', <DoneIcon />, <DoneIcon />, <DoneIcon />),
        createData('Feature 2', <CloseIcon />, <DoneIcon />, <DoneIcon />),
      ];


  return (
    <div>
        <Card sx={{
            position:"relative",
            marginLeft:"auto",
            marginRight:"auto",
            width: "90%",
            backgroundColor:"#fff",
            // height :"80vh",
            boxShadow: '0px 3px 1px -2px rgb(145 158 171 / 20%), 0px 2px 2px 0px rgb(145 158 171 / 14%), 0px 1px 5px 0px rgb(145 158 171 / 12%)',
            borderRadius:'16px',
            }}>
            <Stack sx={{
              marginTop:"1%",
              display:"flex",
              flexDirection:"row",
              justifyContent:"center",
              gap:"2%"
              }}>              
             <h2 className='dialogueTitle'>Select Plan</h2> 
             <br />
            </Stack>
            <hr />
            {/* <hr /> */}
            <Stack sx ={{
                marginTop:"30px",
                display:'flex',
                flexDirection:"row",
                justifyContent:"space-between",
                
            }}>
                <Card sx={{
                    marginLeft:"5%",
                    width:"25%",
                    backgroundColor:"#94D2FF",
                }}>
                    <div className='carddiv'>
                        <h1>$15/mo</h1>
                        <h3>Basic</h3>
                        <p className='billbriefs'>10users included</p>
                        <p className='billbriefs'>2GB of storage</p>
                        <p className='billbriefs'>Email support</p>
                        <p className='billbriefs'>Help center access</p>
                        <p className='billbriefs'>Sign Up For Free</p>
                    </div>
                </Card>

                <Card sx={{
                    width:"25%",
                    backgroundColor:"#94D2FF",
                }}>
                    <div className='carddiv'>
                        <h1>$15/mo</h1>
                        <h3>Basic</h3>
                        <p className='billbriefs'>10users included</p>
                        <p className='billbriefs'>2GB of storage</p>
                        <p className='billbriefs'>Email support</p>
                        <p className='billbriefs'>Help center access</p>
                        <p className='billbriefs'>Sign Up For Free</p>
                    </div>
                </Card>
                <Card sx={{
                    marginRight:"5%",
                    width:"25%",
                    backgroundColor:"#94D2FF",
                }}>
                    <div className='carddiv'>
                        <h1>$15/mo</h1>
                        <h3>Basic</h3>
                        <p className='billbriefs'>10users included</p>
                        <p className='billbriefs'>2GB of storage</p>
                        <p className='billbriefs'>Email support</p>
                        <p className='billbriefs'>Help center access</p>
                        <p className='billbriefs'>Sign Up For Free</p>
                    </div>
                </Card>
                
            </Stack>
            <Stack sx ={{
                marginTop:"30px",
                display:'flex',
                flexDirection:"row",
                justifyContent:"space-between",
                
            }}>
                <Button sx={{
                    marginLeft:"10%",
                    backgroundColor:"#4A77FF",
                    borderRadius:"20px",
                    color:"white",
                    width:"15%",
                }}>
                    Current Plan
                </Button>
                <Button sx={{
                    backgroundColor:"#B1B1B1",
                    borderRadius:"20px",
                    color:"white",
                    width:"15%",
                }}>
                    Upgrade
                </Button>
                <Button sx={{
                    marginRight:"10%",
                    backgroundColor:"#B1B1B1",
                    borderRadius:"20px",
                    color:"white",
                    width:"15%",
                }}>
                    Upgrade
                </Button>               
            </Stack>
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
    </div>
  )
}

export default Bill