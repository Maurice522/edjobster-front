import React, { useState } from 'react';
import MUIDataTable from 'mui-datatables';
import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import { Link as RouterLink } from 'react-router-dom';
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
import UserModalList from '../../../components/users/UsersModalList';
import Page from '../../../components/Page';
import Label from '../../../components/Label';
import Iconify from '../../../components/Iconify';
// mock

const List = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [editmodalOpen, setEditModalOpen] = useState(false);

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
      name: 'name',
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
      name: 'department',
      label: 'Department',
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: 'status',
      label: 'Status',
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
  const data = [
    {
      name: 'Abid Gaush Mohd Ansari',
      email: 'abid.reactdeveloper@gmail.com',
      phone: '8856823440',
      department: 'computer',
      status: labelStatus,
      action: editAndDeleteButton,
    },
    { name: 'John Walsh', status: labelStatus, action: editAndDeleteButton },
    { name: 'Bob Herm', status: labelStatus, action: editAndDeleteButton },
    { name: 'James Houston', status: labelStatus, action: editAndDeleteButton },
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
          <MUIDataTable title={'Users List'} data={data} columns={columns} options={options} />
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
