import React, { useState, useEffect, useMemo } from 'react';
import {
  Stack, Container
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import { DataGrid } from '@mui/x-data-grid';
import Page from '../../../components/Page';
// eslint-disable-next-line import/named
import DataTableLazyLoading from '../../../components/lazyloading/DataTableLazyLoading';
import { showToast } from '../../../utils/toast';
import List from './List';

function NewUserList() {

    const column = [
        {
          field: 'name',
          headerName: 'Name',
          width:900,
          options: {
            filter: true,
            sort: true,
          },
        },
        {
          field: 'edit',
          headerName: 'Edit',
          width:50,
          renderCell: (dataIndex) => {
              return (
                <div>
                   <EditIcon 
                      sx={{
                        padding: '0px',
                        minWidth: '0',
                        cursor:"pointer",
                        color:"grey",
                        }}/>       
                </div>
              );
            }
          
        },
      ];

  return (
    <div>
        <Stack direction="row" alignItems="center" justifyContent="flex-end" mb={5} sx={{marginTop:"0"}}>
            <AddCircleRoundedIcon
                sx={{
                    marginTop:"0",
                    cursor:"pointer",
                    color:"blue",
                    fontSize:"40px"}}
            />
        </Stack>
       <List />
    </div>
  )
}

export default NewUserList