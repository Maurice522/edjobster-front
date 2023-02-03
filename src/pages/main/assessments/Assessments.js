import React, { useState, useMemo, useEffect } from 'react';
import MUIDataTable from 'mui-datatables';
import { Link as RouterLink } from 'react-router-dom';
import { LoadingButton } from '@mui/lab';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';



// material
import { Card, Stack, Button, Container, Typography, ListItemIcon } from '@mui/material';

// components
import { sortedDataFn } from '../../../utils/getSortedData';
import { showToast } from '../../../utils/toast';

import MainModuleFilter from '../../../components/main/MainModuleFilter';
import Page from '../../../components/Page';

import Iconify from '../../../components/Iconify';
import { 
  useGetAssesmentQuery, 
  useDeleteAssesmentMutation, 
  useUpdateAssesmentMutation, 
  useAddAssesmentMutation 
} from '../../../redux/services/main/AssesmentService';
// mock

const Assessments = () => {
  const { data = [],  refetch } = useGetAssesmentQuery();
  const [addAssesment, addAssesmentInfo] = useAddAssesmentMutation();
  const [updateAssesment, updateAssesmentInfo] = useUpdateAssesmentMutation();
  const [deleteAssesment, deleteAssesmentInfo] = useDeleteAssesmentMutation();
  const [currentIndex, setCurrentIndex] = useState(null);
  
  const [modalName, setModalName] = useState('add');
  const [btnLoader, setBtnLoader] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editmodalOpen, setEditModalOpen] = useState(false);


  const[addValue, setAddvalue] = useState({ name:'', })
  const[editValue, setEditvalue] = useState({ name:'', })

  const modalHandleClose = () => {
    setModalOpen(false);
    setEditModalOpen(false);
  };

  console.log('data is fetching form assesment', data);
  const sortData = useMemo(() => {
    const sortresult = sortedDataFn(data.data);
    return sortresult;
  }, [data]);
  console.log('data of assesment',data.data);

  // Add Assesment handler
  const addAssesmentHandler = (e) => {
    setAddvalue({[e.target.name]: e.target.value});
  };
  const addClickHandler = async () => {
    setBtnLoader(true);
    if (modalName ==='Add') {
      console.log("addValue :",addValue)
      await addAssesment(addValue);
      modalHandleClose(false);
    }if (modalName === "Edit"){
      await updateAssesment(editValue);
      modalHandleClose(false);
    } else {
      console.log(modalName);
    
    }
  };

 // Edit Assesment Handler
 const editAssesmentHandler = (e) => {
  setEditvalue({ ...editValue, [e.target.name]: e.target.value });
};

useEffect(() => {
  if (addAssesmentInfo.isSuccess) {
    setModalOpen(false);
    refetch();
    showToast('success', 'Assesments successfully added.');
    setBtnLoader(false);
    addAssesmentInfo.reset();
    setAddvalue({ name: '' });
  }
  if (addAssesmentInfo.isError) {
    showToast('error', addAssesmentInfo.error.data.msg);
    setBtnLoader(false);
    addAssesmentInfo.reset();
  }
  if (updateAssesmentInfo.isSuccess) {
    setModalOpen(false);
    showToast('success', 'Assessments Category successfully edited.');
    refetch();
    setBtnLoader(false);
    addAssesmentInfo.reset();
  }
  if (updateAssesmentInfo.isError) {
    showToast('error', updateAssesmentInfo.error.data.msg);
    setBtnLoader(false);
    updateAssesmentInfo.reset();
  }
}, [
  modalOpen,
  addAssesmentInfo,
  setModalOpen,
  refetch,
  setBtnLoader,
  addValue,
  setAddvalue,
  updateAssesmentInfo,
]);


  // Delete Assesment handler
  const onDeletAssesmenteHandler = async (dataIndex) => {
    setCurrentIndex(dataIndex);
    const dataArr = sortData;
    const currentDataObj = dataArr[dataIndex];
    await deleteAssesment(currentDataObj.id);
  };
  useEffect(() => {
    refetch();
  }, [refetch]);
  useEffect(() => {
    if (deleteAssesmentInfo.isSuccess) {
      showToast('success', deleteAssesmentInfo.data.msg);
      deleteAssesmentInfo.reset();
      refetch();
    }
    if (deleteAssesmentInfo.isError) {
      showToast('error', deleteAssesmentInfo.error.data.msg);
      deleteAssesmentInfo.reset();
      refetch();
    }
  }, [deleteAssesmentInfo, refetch]);

  const rows = [
    { id: 1, title: "Demo",date:"04/04/2002" , action: 'Edit'},
  ];
  const column = [
    { field: 'title', headerName: 'Title', width: 300, editable: true, headerAlign:'center',align:'center'},
    { field: 'date', headerName: 'Date',type:"date", width: 300, editable: true, headerAlign:'center',align:'center'},
    { field: 'action', headerName: 'Action', width: 300, editable: true, headerAlign:'center',align:'center', renderCell: (params) => (
        <div>
          <a href='/dashboard/assessments/edit-assessment'><EditIcon /></a>          
        </div>
      )},
    
  ]
  

  const columns = [
    {
      name: 'name',
      label: 'Name',
      options: {
        filter: true,
        sort: true,
      },
    },

    {
      name: 'action',
      label: 'Action',
      options: {
        filter: false,
        sort: false,
        customBodyRenderLite: (dataIndex) => (
          <>
            <Button style={{ minWidth: 0 }} variant="contained" component={RouterLink} to={`/dashboard/assessments/edit-assessment/${data.data[dataIndex].id}`}>
            <ListItemIcon style={{ color: '#fff', padding: '0px', minWidth: 0 }}>
                <Iconify icon="ep:edit" width={24} height={24} />
              </ListItemIcon>
            </Button>
            <LoadingButton
              style={{ minWidth: 0, margin: '0px 5px' }}
              variant="contained"
              color="error"
              onClick={() => onDeletAssesmenteHandler(dataIndex)}
              loading={dataIndex === currentIndex ? useDeleteAssesmentMutation.isLoading : false}
            >
              <ListItemIcon style={{ color: '#fff', padding: '0px', minWidth: 0 }}>
                <Iconify icon="eva:trash-2-outline" width={24} height={24} />
              </ListItemIcon>
            </LoadingButton>
          </>
        ),
      },
    },
  ];

    const options = {
    filterType: 'dropdown',
    responsive: 'stacked',
    filter: false,
    download: false,
    print: false,
  };

  return (
    <Page title="User">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Assessment
          </Typography>
          <Button
            variant="contained"
            component={RouterLink}
            to="/dashboard/assessments/create-assessment"
            
            startIcon={<Iconify icon="eva:plus-fill" sx={{
              height:"35px"
            }}/>}
          >
            New Assessment
          </Button>
        </Stack>
        <Card>
          <MainModuleFilter />
        </Card>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5} />
        <Card>
          <MUIDataTable title={'Assessment List'} data={data?.data} columns={columns} options={options} />
        </Card>
        {/* <Typography variant="h4" gutterBottom     background-color="#F9FAFB">
            Assesment List
        </Typography> */}
      {/* <div style={{ height: 400, width: '100%',boxSizing: 'border-box',
          boxShadow: '0px 3px 1px -2px rgb(145 158 171 / 20%), 0px 2px 2px 0px rgb(145 158 171 / 14%), 0px 1px 5px 0px rgb(145 158 171 / 12%)',
          borderRadius:'16px',
          backgroundColor:'#fff',
          // marginTop: '40px'
           }}>
        <DataGrid
        rows={rows}
        columns={column}
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
          boxSizing: 'border-box',
          boxShadow: '0px 3px 1px -2px rgb(145 158 171 / 20%), 0px 2px 2px 0px rgb(145 158 171 / 14%), 0px 1px 5px 0px rgb(145 158 171 / 12%)',
          
          
          '& .MuiDataGrid-column': {
            width: 100,
          },
        
        }}
      />
    </div> */}
      </Container>
    </Page>
  );
};

export default Assessments;