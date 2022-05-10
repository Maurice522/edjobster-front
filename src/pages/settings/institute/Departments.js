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
import SettingsModal from '../../../components/settings/SettingsModal';
import Page from '../../../components/Page';
import Label from '../../../components/Label';
import Iconify from '../../../components/Iconify';
import { useDepartmentQuery } from '../../../redux/services/settings/DepartmentService';

// mock

const Departments = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [editmodalOpen, setEditModalOpen] = useState(false);
  const response = useDepartmentQuery();
  console.log("response", response);

  const modalHandleClose = (value) => {
    console.log('value', value);
    setModalOpen(value);
    setEditModalOpen(value);
  };

  const addNewDepartmentHandler = () => {
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
    { name: 'Joe James', status: labelStatus, action: editAndDeleteButton },
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
            Departments
          </Typography>
          <Button
            variant="contained"
            component={RouterLink}
            to="#"
            onClick={addNewDepartmentHandler}
            startIcon={<Iconify icon="eva:plus-fill" />}
          >
            New Department
          </Button>
        </Stack>

        <Card>
          <MUIDataTable title={'Department List'} data={data} columns={columns} options={options} />
        </Card>
      </Container>
      <SettingsModal
        open={modalOpen}
        handleClose={modalHandleClose}
        label="Add Department"
        type="text"
        textBoxLabel="Department Name"
        id="depratmentName"
        name="department"
        getInputValue={getInputValue}
        buttonLabel="Add Department"
      />
      <SettingsModal
        open={editmodalOpen}
        handleClose={modalHandleClose}
        label="Edit Department"
        type="text"
        textBoxLabel="Department Name"
        id="editDepratmentName"
        name="department"
        getInputValue={getInputValue}
        buttonLabel="Update Department"
      />
    </Page>
  );
};

export default Departments;
