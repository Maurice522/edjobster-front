import React, { useState } from 'react'
import { DataGrid, GridToolbar } from '@mui/x-data-grid';

import { Link as RouterLink, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
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
    Stack,
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
import Iconify from '../../../components/Iconify';
import { deleteCandidateSuccess } from '../../../redux/candidateListSlice';

function CandidateList() {

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


  const [data, setData] = useState(rows)
  const dispatch = useDispatch

  const [arrIds, setArrIds] = useState([]);
  const handleDeleteAll= () => {
    console.log(arrIds)
    dispatch(deleteCandidateSuccess(arrIds))
  }

  const column = [
 { field: 'id', headerName: 'ID', width: 70, editable: true},
    { field: 'firstName', headerName: 'First name', width: 130, editable: true },
    { field: 'lastName', headerName: 'Last name', width: 130, editable: true  },
    { field: 'status', headerName: 'Status', width: 130, editable: true  },
    { field: 'sourcedFrom', headerName: 'Sourced From', width: 130, editable: true  },
    { field: 'phone', headerName: 'Phone', headerAlign:'right',align:'right', width: 130, editable: true  },

    {
      field: 'fullName',
      headerName: 'Full name',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 160,
      valueGetter: (params) =>
        `${params.row.firstName || ''} ${params.row.lastName || ''}`,
    },
    { field: 'details', headerName: 'Details', width: 160, editable: true, headerAlign:'center',align:'center', renderCell: (params) => {
      return (
        <div>
          <a href='/dashboard/candidates/candidate-details'>View</a>          
        </div>
      );
   }},
    { field: 'action', headerName: 'Action', sortable: false, width: 130, disableClickEventBubbling: true,headerAlign:'center',align:'center', renderCell: (params) => {
      return (
        <div>
          <DeleteIcon />
        </div>
      );
   }

    },
  ];

 



  return (
    // <Page title="User">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="flex-end" mb={5}>
          <Button
            variant="contained"
            component={RouterLink}
            to="/dashboard/candidates/create-candidate"
            startIcon={<Iconify icon="eva:plus-fill" />}           
          >
            New candidate
          </Button>
        </Stack>
        <Stack sx={{
          display:"flex",
          flexDirection:"row",
          justifyContent:"space-between"
        }}>
        <Typography variant="h4" gutterBottom     background-color="#F9FAFB">
            Candidate List
        </Typography>
        <Button
            variant="contained"
            sx={{
              backgroundColor:"red",
            }}
            onClick={handleDeleteAll}
          >
            Delete Enteries
          </Button>
        </Stack>
        <div style={{ height: 400, width: '100%',boxSizing: 'border-box',
          boxShadow: '0px 3px 1px -2px rgb(145 158 171 / 20%), 0px 2px 2px 0px rgb(145 158 171 / 14%), 0px 1px 5px 0px rgb(145 158 171 / 12%)',
          borderRadius:'16px',
          backgroundColor:'#fff',
          // marginTop: '40px'
           }}>
        <DataGrid
        // rows={rows}
        rows={data}
        columns={column}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        alignItems="center"
        justifyContent="center"
        editable={{
          onRowAdd:(newRow)=> new Promise((resolve, reject)=>{
            const updatedRows=[...data, newRow]
            setTimeout(()=>{
              setData(updatedRows)
              resolve()
            },2000)
          }),
          onRowDelete: selectedRow => new Promise ((resolve, reject) => {
            const index = selectedRow.tableData.id;
            const updatedRows = [...data]
           updatedRows.splice(index, 1)
           setTimeout(() => {
             setData(updatedRows)
              resolve()
            }, 2000)
          })
         
        }}
        rowHeight={70}
        onSelectionModelChange={(ids) => {
        setArrIds(ids);
        }}
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
          boxSizing: 'border-box',
          boxShadow: '0px 3px 1px -2px rgb(145 158 171 / 20%), 0px 2px 2px 0px rgb(145 158 171 / 14%), 0px 1px 5px 0px rgb(145 158 171 / 12%)',
          
          
          '& .MuiDataGrid-column': {
            width: 100,
          },
        
        }}
      />
    </div>
    </Container>
  )
}

export default CandidateList