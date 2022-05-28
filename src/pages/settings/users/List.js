import React, { useState, useMemo } from 'react';
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
} from '@mui/material';
// eslint-disable-next-line import/no-unresolved
import { sortedDataFn } from 'src/utils/getSortedData';
// components
import UserModalList from '../../../components/users/UsersModalList';
import Page from '../../../components/Page';
import Label from '../../../components/Label';
import Iconify from '../../../components/Iconify';
import { useGetUsersApiQuery } from '../../../redux/services/settings/UserService';
import DataTableLazyLoading from '../../../components/lazyloading/DataTableLazyLoading';

// mock

const List = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [editmodalOpen, setEditModalOpen] = useState(false);
  const { data = [], isLoading, refetch } = useGetUsersApiQuery();

  console.log("data", data);

  const sortedData = useMemo(() => {
    const result = sortedDataFn(data.list);
    return result;
  }, [data])

  if (isLoading) {
    return <DataTableLazyLoading />
  }


  const modalHandleClose = (value) => {
    console.log('value', value);
    setModalOpen(value);
    setEditModalOpen(value);
  };

  const addNewListHandler = () => {
    setModalOpen(true);
  };

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
      name: 'action',
      label: 'Action',
      options: {
        filter: false,
        sort: false,
        customBodyRenderLite: (dataIndex) => (
          <>
            <Button style={{ minWidth: 0 }} variant="contained" onClick={() => onEditModalHandler(dataIndex)}>
              <ListItemIcon style={{ color: "#fff", padding: "0px", minWidth: 0 }}>
                <Iconify icon="ep:edit" width={24} height={24} />
              </ListItemIcon>
            </Button>
            <LoadingButton style={{ minWidth: 0, margin: "0px 5px" }} variant="contained" color="error"
            // onClick={() => onDeleteHandler(dataIndex)} loading={dataIndex === currentIndex ? DeleteAddressInfo.isLoading : false}
            >
              <ListItemIcon style={{ color: "#fff", padding: "0px", minWidth: 0 }}>
                <Iconify icon="eva:trash-2-outline" width={24} height={24} />
              </ListItemIcon>
            </LoadingButton>
          </>
        )
      },
    },
  ];


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
          <Typography variant="h4" gutterBottom>
            List
          </Typography>
          <Button
            variant="contained"
            component={RouterLink}
            to="#"
            onClick={addNewListHandler}
            startIcon={<Iconify icon="eva:plus-fill" />}
          >
            New List
          </Button>
        </Stack>

        <Card>
          <MUIDataTable title={'Users List'} data={sortedData} columns={columns} options={options} />
        </Card>
      </Container>
      <UserModalList
        open={modalOpen}
        handleClose={modalHandleClose}
        label="Add List"
        type="text"
        textBoxLabel="List Name"
        id="listName"
        name="list"
        getInputValue={getInputValue}
        buttonLabel="Add List"
      />
      <UserModalList
        open={editmodalOpen}
        handleClose={modalHandleClose}
        label="Edit List"
        type="text"
        textBoxLabel="List Name"
        id="editListName"
        name="list"
        getInputValue={getInputValue}
        buttonLabel="Update List"
      />
    </Page>
  );
};

export default List;
