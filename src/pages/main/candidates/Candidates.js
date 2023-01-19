import React, { useState, useEffect, useMemo } from 'react';
import MUIDataTable from 'mui-datatables';
import { sentenceCase } from 'change-case';
import { Link as RouterLink } from 'react-router-dom';
import { LoadingButton } from '@mui/lab';

// material
import { Card, Stack, Button, Container, Typography, ListItemIcon } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

// components
import MainModuleFilter from '../../../components/main/MainModuleFilter';
import Page from '../../../components/Page';
import Label from '../../../components/Label';
import Iconify from '../../../components/Iconify';
import CandidatesModel from '../../../components/Mains/CandidatesModel';
import { sortedDataFn } from '../../../utils/getSortedData';
import { showToast } from '../../../utils/toast';
import {
  useGetCandidateListQuery,
  useDeleteCandidateMutation,
  useAddApplyJobMutation,
} from '../../../redux/services/candidate/CandidateServices';
import { useGetJobQuery } from '../../../redux/services/jobs/JobServices';
// mock

const Candidates = () => {
  const [modelOpen, setModelOpen] = useState(false);
const [candidateId,setCandidateId]=useState();
  const [salectedJobId, setSalectedJobId] = useState('');
  const { data = [], refetch } = useGetCandidateListQuery();
  const [currentIndex, setCurrentIndex] = useState(null);
  const [deleteJob, deleteJobInfo] = useDeleteCandidateMutation();
  const { data: jobIdData} = useGetJobQuery();
  console.log("Dataaaaa",data?.list);
  const [addApplyCandidate, addApplyCandidateInfo] = useAddApplyJobMutation();


// added by kundan
// added by kundan


  const sortData = useMemo(() => {
    const sortresult = sortedDataFn(data?.list);
    return sortresult;
  }, [data]);

  const onJobIDhandleChange = (event) => {
    event.preventDefault();
    setSalectedJobId(event.target.value);
  };
  const onDeleteHandler = async (dataIndex) => {
    setCurrentIndex(dataIndex);
    const dataArr = sortData;
    const currentDataObj = dataArr[dataIndex];
    await deleteJob(currentDataObj.id);
  };

  useEffect(() => {
    refetch();
  }, [refetch]);

  useEffect(() => {

    if (deleteJobInfo.isSuccess) {
      showToast('success', deleteJobInfo.data.msg);
      deleteJobInfo.reset();
      refetch();
    }
    if (deleteJobInfo.isError) {
      showToast('error', deleteJobInfo.error.data.msg);
      deleteJobInfo.reset();
      refetch();
    }
  }, [deleteJobInfo, refetch]);
  const onCandidateModelView = (candidateId) => {
    setCandidateId(candidateId)
    setModelOpen(true);
  };
  const handleClose = () => {
    setModelOpen(false);
  };

  const column = [
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
    { field: 'details', headerName: 'Details', width: 300, editable: true, headerAlign:'center',align:'center', renderCell: (params) => {
      return (
        <div>
          <a href='/dashboard/candidates/candidate'>View</a>          
        </div>
      );
   }},
    { field: 'action', headerName: 'Action', sortable: false, width: 130, disableClickEventBubbling: true, renderCell: (params) => {
      return (
        <div>
          <EditIcon />
          <DeleteIcon />
        </div>
      );
   }

    },
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

  const columns = [
    {
      name: 'first_name',
      label: 'Name',
      options: {
        filter: true,
        sort: true
      },
     },
    {
      name: 'job_title',
      label: 'Associated Job',
      options: {
        filter: false,
        sort: false,
      },
    },
    {
      name: 'action',
      label: 'Status',
      options: {
        filter: false,
        sort: false,
      },
    },
    {
      name: 'source',
      label: 'Sourced from',
      options: {
        filter: false,
        sort: false,
      },
    },
    {
      name: 'mobile',
      label: 'Phone',
      options: {
        filter: false,
        sort: false,
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
            <Button
              style={{ minWidth: 0, marginRight: '5px' }}
              variant="contained"
              onClick={() => onCandidateModelView(data.list[dataIndex].id)}
              color="info"
            >
              <ListItemIcon style={{ color: '#fff', padding: '0px', minWidth: 0 }}>
                <Iconify icon="carbon:view-filled" width={24} height={24} />
              </ListItemIcon>
            </Button>
            <Button
              style={{ minWidth: 0 }}
              variant="contained"
            // onClick={() => onEditModalHandler(dataIndex)}
            >
              <ListItemIcon style={{ color: '#fff', padding: '0px', minWidth: 0 }}>
                <Iconify icon="ep:edit" width={24} height={24} />
              </ListItemIcon>
            </Button>
            <Button
              style={{ minWidth: 0, margin: '0px 5px' }}
              variant="contained"
              color="error"
            onClick={() => onDeleteHandler(dataIndex)}
            loading={dataIndex === currentIndex ? useDeleteCandidateMutation.isLoading : false}
            >
              <ListItemIcon style={{ color: '#fff', padding: '0px', minWidth: 0 }}>
                <Iconify icon="eva:trash-2-outline" width={24} height={24} />
              </ListItemIcon>
            </Button>
          </>
        ),
      },
    },
  ];
  const labelStatus = (
    <Label variant="ghost" color={'success'}>
      {sentenceCase('active')}
    </Label>
  );
  const editAndDeleteButton = (
    <>
      <Button component={RouterLink} to="/dashboard/candidates/edit-candidate">
        <ListItemIcon style={{ justifyContent: 'center' }}>
          <Iconify icon="eva:edit-fill" width={24} height={24} />
        </ListItemIcon>
      </Button>
      <Button>
        <ListItemIcon style={{ justifyContent: 'center' }}>
          <Iconify icon="eva:trash-2-outline" width={24} height={24} />
        </ListItemIcon>
      </Button>
    </>
  );
  // const data = [
  //   { name: 'Joe James', status: labelStatus, action: editAndDeleteButton },
  //   { name: 'John Walsh', status: labelStatus, action: editAndDeleteButton },
  //   { name: 'Bob Herm', status: labelStatus, action: editAndDeleteButton },
  //   { name: 'James Houston', status: labelStatus, action: editAndDeleteButton },
  // ];
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
            Candidates
          </Typography>
          <Button 
            variant="contained"
            component={RouterLink}
            to="/dashboard/candidates/newcreate"
            startIcon={<Iconify icon="eva:plus-fill" />}
          >
            New candidate
          </Button>
        </Stack>
        <Card>
          <MainModuleFilter />
        </Card>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5} />
        <Card>
        <MUIDataTable title={'candidate List'} data={data?.list} columns={columns} options={options} />
        </Card>
        {/* <Typography variant="h4" gutterBottom     background-color="#F9FAFB">
            Candidate List
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
      <CandidatesModel open={modelOpen} handleClose={handleClose} candidateId={candidateId}/>
    </Page>
  );
};

export default Candidates;