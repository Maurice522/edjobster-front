import React from 'react'
import { DataGrid, GridToolbar } from '@mui/x-data-grid';

import { Link as RouterLink, useParams } from 'react-router-dom';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import Container from '@mui/material/Container';
import {
    CardContent,
    Typography,
    Card,
    Grid,
    Divider,
    ListItemIcon,
    TextField,
    InputLabel,
    Box,
    Menu,
    FormControl,
    Select,
    MenuItem,
    Avatar,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { number } from 'prop-types';


function CandidateList() {
  

  const columns = [
    { field: 'id', headerName: 'ID', width: 70, editable: true},
    { field: 'firstName', headerName: 'First name', width: 130, editable: true },
    { field: 'lastName', headerName: 'Last name', width: 130, editable: true  },
    { field: 'status', headerName: 'Status', width: 130, editable: true  },
    { field: 'sourcedFrom', headerName: 'Sourced From', width: 130, editable: true  },
    { field: 'phone', headerName: 'Phone', headerAlign:'right', width: 130, editable: true  },
  
    {
      field: 'fullName',
      headerName: 'Full name',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 160,
      valueGetter: (params) =>
        `${params.row.firstName || ''} ${params.row.lastName || ''}`,
    },
    { field: 'action', headerName: 'Action', sortable: false, width: 130, disableClickEventBubbling: true, renderCell: (params) => {
      return (
        <div>
          <EditIcon />
          <DeleteIcon />
        </div>
      );
   }
      
    }
  ];
  
  const rows = [
    { id: 1, lastName: 'Snow', firstName: 'Jon', status: 'Applied', phone:'9382398329', sourcedFrom: "Linked In"},
    { id: 2, lastName: 'Lannister', firstName: 'Cersei', status: 'Applied', phone:'9382398329', sourcedFrom: "Linked In"},
    { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45, status: 'Applied', phone:'9382398329', sourcedFrom: "Linked In" },
    { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 ,status: 'Applied', phone:'9382398329', sourcedFrom: "Linked In" },
    { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null ,status: 'Applied', phone:'9382398329', sourcedFrom: "Linked In" },
    { id: 6, lastName: 'Melisandre', firstName: null, age: 150 ,status: 'Applied', phone:'9382398329', sourcedFrom: "Linked In" },
    { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 ,status: 'Applied', phone:'9382398329', sourcedFrom: "Linked In" },
    { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36  ,status: 'Applied', phone:'9382398329', sourcedFrom: "Linked In"},
    { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 ,status: 'Applied', phone:'9382398329', sourcedFrom: "Linked In" },
  ];

  return (
    <div style={{ height: 400, width: '100%' }}>
          <Container
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            '& .MuiDataGrid-cell:hover': {
              color: 'primary.main',
            },
          }}>
              <FormControl sx={{ m: 1, minWidth: 300 }}>
                            <InputLabel id="demo-simple-select-helper-label">Sort by New to Old</InputLabel>
                            <Select
                                labelId="demo-simple-select-helper-label"
                                id="demo-simple-select-helper"
                                label="Sort by New to Old"
                                fullWidth
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                <MenuItem value={10}>Ten</MenuItem>
                                <MenuItem value={20}>Twenty</MenuItem>
                                <MenuItem value={30}>Thirty</MenuItem>
                            </Select>
            </FormControl>
            <FormControl sx={{ m: 1, minWidth: 300 }}>
                            <InputLabel id="demo-simple-select-helper-label">All Candidates</InputLabel>
                            <Select
                                labelId="demo-simple-select-helper-label"
                                id="demo-simple-select-helper"
                                label="Sort by New to Old"
                                fullWidth
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                <MenuItem value={10}>Ten</MenuItem>
                                <MenuItem value={20}>Twenty</MenuItem>
                                <MenuItem value={30}>Thirty</MenuItem>
                            </Select>
          </FormControl>
          <Button
            variant="contained"
            component={RouterLink}
            to="/dashboard/jobs/create-job"
            sx={{height: 56,
                 marginTop:1}}
          >
            Create Candidate
          </Button>
        </Container>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        alignItems="center"
        justifyContent="center"
        rowHeight={70}
        showCellRightBorder
        showColumnRightBorder
        components={{ Toolbar: GridToolbar }}

        initialState={{
          filter: {
            filterModel: {
              items: [{ columnField: 'rating', operatorValue: '>', value: '2.5' }],
            },
          },
        }}

        
        
        sx={{
          // border:"0.5px solid gray",
          marginTop:5,
          // background:"#ededed",
          boxShadow: 2,

          
          '& .MuiDataGrid-cell:hover': {
            color: 'primary.main',
          },
          "& .MuiDataGrid-row:hover": {
            backgroundColor: "white"
          },
          "& .MuiDataGrid-row": {
            borderTop: 2,
            // borderColor:"white"
            borderColor:"white"
          }
        }}
      />
    </div>

  )
}

export default CandidateList