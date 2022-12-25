import React, { useState, useMemo, useEffect } from 'react';
import MUIDataTable from 'mui-datatables';
import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import { Link as RouterLink } from 'react-router-dom';
import { LoadingButton } from '@mui/lab';
// material
import {
  Card,
  Table,
  Stack,
  Avatar,
  Button,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
  ListItemIcon,
  Tooltip,
} from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
// eslint-disable-next-line import/no-unresolved
import { sortedDataFn } from 'src/utils/getSortedData';
// components
import UserModalList from '../../../components/users/UsersModalList';
import UserViewModel from '../../../components/users/userViewModel';
import Page from '../../../components/Page';
import Label from '../../../components/Label';
import Iconify from '../../../components/Iconify';
import {
  useGetUsersApiQuery,
  useAddUserApiMutation,
  useUpdateUserApiMutation,
  useDeleteUserApiMutation,
  useActivateDeactivateUserApiMutation,
} from '../../../redux/services/settings/UserService';
import DataTableLazyLoading from '../../../components/lazyloading/DataTableLazyLoading';
import { showToast } from '../../../utils/toast';
import SwitchButton from '../../../components/SwitchButton/SwitchButton';

// mock

const List = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [viewModelOpen, setViewModelOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(null);
  const { data = [], isLoading, refetch } = useGetUsersApiQuery();
  const [AddUserApi, AddUserApiInfo] = useAddUserApiMutation();
  const [UpdateUserApi, UpdateUserApiInfo] = useUpdateUserApiMutation();
  const [DeleteUserApi, DeleteUserApiInfo] = useDeleteUserApiMutation();
  const [ActivateDeactivateApi, ActivateDeactivateApiInfo] = useActivateDeactivateUserApiMutation();
  const [modalType, setModalType] = useState('Add');

  const [apiData, setApiData] = useState({
    account_id: null,
    first_name: '',
    last_name: '',
    email: '',
    mobile: '',
    department: '',
    designation: '',
    role: '',
    email_desable: false,
    photo: null,
  });

  useEffect(() => {
    if (AddUserApiInfo.isSuccess) {
      setModalOpen(false);
      refetch();
      showToast('success', AddUserApiInfo.data.msg);
      AddUserApiInfo.reset();
    }
    if (UpdateUserApiInfo.isSuccess) {
      refetch();
      setModalOpen(false);
      showToast('success', UpdateUserApiInfo.data.msg);
      UpdateUserApiInfo.reset();
    }
    if (UpdateUserApiInfo.isError) {
      showToast('error', UpdateUserApiInfo.error.data.msg);
      UpdateUserApiInfo.reset();
    }
  }, [AddUserApiInfo, UpdateUserApiInfo]);

  const sortedData = useMemo(() => {
    const result = sortedDataFn(data.list);
    return result;
  }, [data]);

  if (isLoading) {
    return <DataTableLazyLoading />;
  }

  const modalHandleClose = (value) => {
    setModalOpen(value);
  };
  const viewHandleClose = () => {
    setViewModelOpen(false);
  };

  const addNewListHandler = () => {
    setModalType('Add');
    setApiData({
      account_id: null,
      first_name: '',
      last_name: '',
      email: '',
      mobile: '',
      department: '',
      designation: '',
      role: '',
      email_desable: false,
    });
    setModalOpen(true);
  };

  const onEditModalHandler = (index) => {
    const dataArr = sortedData;
    const currentObj = dataArr[index];
    setApiData({
      account_id: currentObj.account_id,
      first_name: currentObj.first_name,
      last_name: currentObj.last_name,
      email: currentObj.email,
      mobile: currentObj.mobile,
      department: currentObj.department,
      designation: currentObj.designation,
      role: currentObj.role,
      email_desable: true,
      photo: currentObj.photo,
    });
    setModalType('Update');
    setModalOpen(true);
  };

  console.log('model open', viewModelOpen);

  const onViewHandler = () => {
    setViewModelOpen(true);
  };

  // Edited below by kundan for user list
  const rows = [
    // { id: 1, lastName: 'Snow', firstName: 'Jon', status: 'Applied', phone:'9382398329', sourcedFrom: "Linked In"},
    // { id: 2, lastName: 'Lannister', firstName: 'Cersei', status: 'Applied', phone:'9382398329', sourcedFrom: "Linked In"},
    // { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45, status: 'Applied', phone:'9382398329', sourcedFrom: "Linked In" },
    // { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 ,status: 'Applied', phone:'9382398329', sourcedFrom: "Linked In" },
    // { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null ,status: 'Applied', phone:'9382398329', sourcedFrom: "Linked In" },
    // { id: 6, lastName: 'Melisandre', firstName: null, age: 150 ,status: 'Applied', phone:'9382398329', sourcedFrom: "Linked In" },
    // { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 ,status: 'Applied', phone:'9382398329', sourcedFrom: "Linked In" },
    // { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36  ,status: 'Applied', phone:'9382398329', sourcedFrom: "Linked In"},
    // { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 ,status: 'Applied', phone:'9382398329', sourcedFrom: "Linked In" },
    { id: 1, name: "ram", email: 'demo', action: 'Edit'},
  ];
  const column = [
    { field: 'name', headerName: 'Name', width: 200, editable: true, headerAlign:'center',align:'center'},
    { field: 'email', headerName: 'email', width: 200, editable: true, headerAlign:'center',align:'center'},
    { field: 'number', headerName: 'Contact Number',type:"number", width: 200, editable: true, headerAlign:'center',align:'center'},
    { field: 'department', headerName: 'Department', width: 200, editable: true, headerAlign:'center',align:'center'},
    { field: 'status', headerName: 'Status', width: 200, editable: true, headerAlign:'center',align:'center'},
    { field: 'action', headerName: 'Action', width: 200, editable: true, headerAlign:'center',align:'center', renderCell: (params) => {
      return (
        <div>
          <a href='/dashboard/user/edit-user'><EditIcon /></a>          
        </div>
      );
   }},
    
  ]
// Edited above by kundan for user list
  const columns = [
    {
      name: 'first_name',
      label: 'Name',
      options: {
        filter: true,
        sort: true,
        setCellProps: () => ({ style: { maxWidth: '250px', cursor: 'pointer' } }),
      },
    },
    {
      name: 'email',
      label: 'Email',
      options: {
        filter: true,
        sort: true,
        setCellProps: () => ({ style: { maxWidth: '250px' } }),
      },
    },
    {
      name: 'phone',
      label: 'Contact Number',
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: 'department',
      label: 'Department',
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: 'is_active',
      label: 'Status',
      options: {
        filter: false,
        sort: false,
        customBodyRenderLite: (dataIndex) => {
          const isActive = sortedData[dataIndex];

          return (
            <SwitchButton
              checked={isActive.is_active ? 'true' : false}
              onChange={() => activateDeactivateHandler(dataIndex)}
            />
          );
        },
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
              style={{ minWidth: 0, margin: '0px 5px' }}
              variant="contained"
              color="success"
              onClick={() => onViewHandler(dataIndex)}
            >
              <ListItemIcon style={{ color: '#fff', padding: '0px', minWidth: 0 }}>
                <Iconify icon="carbon:view-filled" width={24} height={24} />
              </ListItemIcon>
            </Button>
            <Button style={{ minWidth: 0 }} variant="contained" onClick={() => onEditModalHandler(dataIndex)}>
              <ListItemIcon style={{ color: '#fff', padding: '0px', minWidth: 0 }}>
                <Iconify icon="ep:edit" width={24} height={24} />
              </ListItemIcon>
            </Button>
            <LoadingButton
              style={{ minWidth: 0, margin: '0px 5px' }}
              variant="contained"
              color="error"
              onClick={() => onDeleteHandler(dataIndex)}
              loading={dataIndex === currentIndex ? DeleteUserApiInfo.isLoading : false}
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
  };

  const activateDeactivateHandler = async (index) => {
    const currentData = await sortedData[index];
    ActivateDeactivateApi({
      account_id: currentData.account_id,
      status: currentData.is_active ? 'D' : 'A',
    });
  };

  // console.log("sortedData",sortedData);

  const onSubmitHandler = async (value, index) => {
    if (modalType === 'Add') {
      console.log('value', value);
      const formData = new FormData();
      formData.append('first_name', value.first_name);
      formData.append('last_name', value.last_name);
      formData.append('email', value.email);
      formData.append('mobile', value.mobile);
      formData.append('department', value.department);
      formData.append('designation', value.designation);
      formData.append('role', value.role);
      formData.append('photo', value.photo);

      await AddUserApi(formData);
    } else {
      const formData = new FormData();
      formData.append('first_name', value.first_name);
      formData.append('last_name', value.last_name);
      formData.append('email', value.email);
      formData.append('mobile', value.mobile);
      formData.append('department', value.department);
      formData.append('designation', value.designation);
      formData.append('role', value.role);
      formData.append('photo', value.photo);
      UpdateUserApi(formData);
    }
  };

  if (ActivateDeactivateApiInfo.isSuccess) {
    showToast('success', ActivateDeactivateApiInfo.data.msg);
    refetch();
    ActivateDeactivateApiInfo.reset();
  }

  const onDeleteHandler = async (dataIndex) => {
    setCurrentIndex(dataIndex);
    const dataArr = sortedData;
    const currentDataObj = dataArr[dataIndex];
    await DeleteUserApi(currentDataObj.account_id);
    refetch();
  };
  if (DeleteUserApiInfo.isSuccess) {
    showToast('success', DeleteUserApiInfo.data.msg);
    DeleteUserApiInfo.reset();
  }
  if (DeleteUserApiInfo.isError) {
    showToast('error', DeleteUserApiInfo.error.data.msg);
    DeleteUserApiInfo.reset();
  }

  return (
    <Page title="User">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            User List
          </Typography>
          <Button
            variant="contained"
            component={RouterLink}
            to="/dashboard/user/adduser"
            // onClick={addNewListHandler}
            startIcon={<Iconify icon="eva:plus-fill" />}
          >
            Add User
          </Button>
        </Stack>

        <Card>
          <MUIDataTable title={'Users List'} data={sortedData} columns={columns} options={options} />
        </Card>
      </Container>
      <UserModalList
        open={modalOpen}
        handleClose={modalHandleClose}
        onsubmit={onSubmitHandler}
        type={modalType}
        formData={apiData}
      />
      <UserViewModel handleClose={viewHandleClose} open={viewModelOpen} />

      <Typography sx={{marginTop:"3%",marginBottom:"2%"}}variant="h4" gutterBottom     background-color="#F9FAFB">
            User List
        </Typography>
      <div style={{ height: 400, width: '100%',boxSizing: 'border-box',
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
        // showCellRightBorder
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
    </Page>
  );
};

export default List;
