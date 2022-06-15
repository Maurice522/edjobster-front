import React, { useState } from 'react';
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
// components
import SettingsModal from '../../../components/settings/SettingsModal';
import Page from '../../../components/Page';
import Label from '../../../components/Label';
import Iconify from '../../../components/Iconify';
// mock

const Pipelines = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [editmodalOpen, setEditModalOpen] = useState(false);

  const modalHandleClose = (value) => {
    console.log('value', value);
    setModalOpen(value);
    setEditModalOpen(value);
  };

  const addNewPipelineHandler = () => {
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
            Pipelines
          </Typography>
          <Button
            variant="contained"
            component={RouterLink}
            to="#"
            onClick={addNewPipelineHandler}
            startIcon={<Iconify icon="eva:plus-fill" />}
          >
            New Pipeline
          </Button>
        </Stack>

        <Card>
          <MUIDataTable title={'Pipeline List'} data={data} columns={columns} options={options} />
        </Card>
      </Container>
      <SettingsModal
        open={modalOpen}
        handleClose={modalHandleClose}
        label="Add Pipeline"
        type="text"
        textBoxLabel="Pipeline Name"
        id="pipelineName"
        name="pipeline"
        getInputValue={getInputValue}
        buttonLabel="Add Pipeline"
      />
      <SettingsModal
        open={editmodalOpen}
        handleClose={modalHandleClose}
        label="Edit Pipeline"
        type="text"
        textBoxLabel="Pipeline Name"
        id="editPipelineName"
        name="pipeline"
        getInputValue={getInputValue}
        buttonLabel="Update Pipeline"
      />
    </Page>
  );
};

export default Pipelines;
