import React, { useState } from 'react';
import MUIDataTable from 'mui-datatables';
import { sentenceCase } from 'change-case';
import { Link as RouterLink } from 'react-router-dom';
// material
import {
  Card,
  Stack,
  Button,
  Container,
  Typography,
  ListItemIcon,
 
} from '@mui/material';
// components
import MainModalCandidates from "../../../components/main/candidate-modal/MainModalCandidates"
import MainModuleFilter from "../../../components/main/MainModuleFilter";
import Page from '../../../components/Page';
import Label from '../../../components/Label';
import Iconify from '../../../components/Iconify';
// mock



const Candidates = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [editmodalOpen, setEditModalOpen] = useState(false);

  const modalHandleClose = (value) => {
    console.log('value', value);
    setModalOpen(value);
    setEditModalOpen(value);
  };

  const addNewcandidateHandler = () => {
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
    responsive: "stacked",
      filter: false,
      download: false,
      print: false
  };

  const getInputValue = (value) => {
    console.log('value', value);
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
            to="#"
            onClick={addNewcandidateHandler}
            startIcon={<Iconify icon="eva:plus-fill" />}
          >
            New candidate
          </Button>
        </Stack>
        <Card>
        <MainModuleFilter/>
        </Card>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5} />
        <Card>
          <MUIDataTable title={'candidate List'} data={data} columns={columns} options={options} />
        </Card>
      </Container>

      <MainModalCandidates
        open={modalOpen}
        handleClose={modalHandleClose}
        label="Add candidate"
        type="text"
        textBoxLabel="candidate Name"
        id="candidateName"
        name="candidate"
        getInputValue={getInputValue}
        buttonLabel="Add candidate"
      />
      <MainModalCandidates
        open={editmodalOpen}
        handleClose={modalHandleClose}
        label="Edit candidate"
        type="text"
        textBoxLabel="candidate Name"
        id="editcandidateName"
        name="candidate"
        getInputValue={getInputValue}
        buttonLabel="Update candidate"
      />
    </Page>

  );
};

export default Candidates;
