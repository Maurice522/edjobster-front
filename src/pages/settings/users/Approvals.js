import React, { useEffect, useState, useMemo } from 'react';
import MUIDataTable from 'mui-datatables';
import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import { Link as RouterLink } from 'react-router-dom';
import { LoadingButton } from '@mui/lab';
// eslint-disable-next-line import/no-unresolved
import { sortedDataFn } from 'src/utils/getSortedData';

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
} from '@mui/material';
// components
import Page from '../../../components/Page';
import Label from '../../../components/Label';
import Iconify from '../../../components/Iconify';
import { 
  useGetUsersApiQuery,
  useUpdateUserApiMutation,
  useDeleteUserApiMutation
} from '../../../redux/services/settings/UserService';
import { showToast } from '../../../utils/toast';

// mock

const Approvals = () => {
  const [currentIndex, setCurrentIndex] = useState(null)
  const [UpdateUserApi, UpdateUserApiInfo] = useUpdateUserApiMutation();
  const [DeleteUserApi, DeleteUserApiInfo] = useDeleteUserApiMutation();
  const {data: userData, refetch} = useGetUsersApiQuery()
  const data = userData?.list
  console.log(userData)
  const [modalOpen, setModalOpen] = useState(false);
  const [editmodalOpen, setEditModalOpen] = useState(false);
  const sortedData = useMemo(() => {
    const result = sortedDataFn(data?.list);
    return result;
  }, [data]);

  const modalHandleClose = (value) => {
    console.log('value', value);
    setModalOpen(value);
    setEditModalOpen(value);
  };

  const addNewApprovalsHandler = async (accountId) => {
    await UpdateUserApi({
      status: "A",
      account_id: accountId,
    })
  };
  useEffect(() => {
    refetch()
  }, [refetch])

  const onDeleteHandler = async (accountId) => {
    await DeleteUserApi(accountId);
    refetch();
    console.log("delte hua")
  };
  if (DeleteUserApiInfo.isSuccess) {
    showToast('success', DeleteUserApiInfo.data.msg);
    DeleteUserApiInfo.reset();
  }
  if (DeleteUserApiInfo.isError) {
    showToast('error', DeleteUserApiInfo.error.data.msg);
    DeleteUserApiInfo.reset();
  }

  const onEditModalHandler = () => {
    setEditModalOpen(true);
  };
  const columns = [
    {
      name: 'first_name',
      label: 'Name',
      options: {
        filter: true,
        sort: true,
        setCellProps: () => ({ style: { maxWidth: '250px' } }),
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
      label: 'Phone',
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: 'account_id',
      label: 'account_id',
      options: {
        filter: false,
        sort: false,
        viewColumns: false,
        display: false,
        hide:true,
      },
      show: false,
      hide: true,
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
      name: 'action',
      label: 'Action',
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value,tableMeta) => (
          <>
            <Button 
              style={{ 
                minWidth: 0, 
                color: "#fff" 
              }} 
              variant="contained" 
              color="success" 
              onClick={() => addNewApprovalsHandler(tableMeta?.rowData?.[3])}
            > 
              Approve
            </Button>
            <LoadingButton
              style={{ minWidth: 0, margin: '0px 5px' }}
              variant="contained"
              color="error"
              onClick={() => onDeleteHandler(tableMeta?.rowData?.[3])}
            >
              <ListItemIcon style={{ color: '#fff', padding: '0px', minWidth: 0 }}>
                <Iconify icon="eva:trash-2-outline" width={24} height={24} />
              </ListItemIcon>
            </LoadingButton>
          </>
        )
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
      <Button onClick={onEditModalHandler}>
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
  const options = {
    filterType: 'dropdown',
  };

  const getInputValue = (value) => {
    console.log('value', value);
  };

  return (
    <Page title="User">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <h1>
            Approvals
          </h1>
        </Stack>
        <Card>
          <MUIDataTable title={'Approval List'} data={data} columns={columns} options={options} />
        </Card>
      </Container>

    </Page>
  );
};

export default Approvals;
