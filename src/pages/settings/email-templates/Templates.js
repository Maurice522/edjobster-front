import React, { useState, useMemo } from 'react';
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

import { useGetEmailTamplateQuery } from '../../../redux/services/settings/EmailTamplateService';
import { sortedDataFn } from '../../../utils/getSortedData';
import { showToast } from '../../../utils/toast';

// components
import EmailModalTemplates from '../../../components/email-templates/EmailModalTemplates';
import Page from '../../../components/Page';
import Label from '../../../components/Label';
import Iconify from '../../../components/Iconify';
// mock

const Templates = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [editmodalOpen, setEditModalOpen] = useState(false);
  const { data = [], isLoading } = useGetEmailTamplateQuery();

  const modalHandleClose = (value) => {
    console.log('value', value);
    setModalOpen(value);
    setEditModalOpen(value);
  };

  // Show Data In Table

  const sortData = useMemo(() => {
    const sortresult = sortedDataFn(data.data);
    return sortresult;
  });

  const addNewTemplatesHandler = () => {
    setModalOpen(true);
  };

  const onEditModalHandler = () => {
    setEditModalOpen(true);
  };
  const columns = [
    {
      name: 'id',
      label: 'id',
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: 'category_name',
      label: 'Category Name',
      options: {
        filter: true,
        sort: true,
        setCellProps: () => ({ style: { maxWidth: '250px' } }),
      },
    },
    {
      name: 'subject',
      label: 'Subject',
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: 'type',
      label: 'Type',
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: 'message',
      label: 'Message',
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
          <Typography variant="h4" gutterBottom>
            Templates
          </Typography>
          <Button
            variant="contained"
            component={RouterLink}
            to="#"
            onClick={addNewTemplatesHandler}
            startIcon={<Iconify icon="eva:plus-fill" />}
          >
            Create Template
          </Button>
        </Stack>

        <Card>
          <MUIDataTable title={'Template List'} data={sortData} columns={columns} options={options} />
        </Card>
      </Container>
      <EmailModalTemplates
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
      <EmailModalTemplates
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

export default Templates;
