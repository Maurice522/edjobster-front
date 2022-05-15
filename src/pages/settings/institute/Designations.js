import React, { useState } from 'react';
import MUIDataTable from 'mui-datatables';
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
import SettingsModal from '../../../components/settings/SettingsModal';
import Page from '../../../components/Page';
import Label from '../../../components/Label';
import Iconify from '../../../components/Iconify';
// eslint-disable-next-line import/named
import  { useDesignationGetQuery, useAddDesignationMutation, useUpdateDesignationMutation, useDeleteDesignationMutation } from '../../../redux/services/settings/DesignationService'
import DataTableLazyLoading from '../../../components/lazyloading/DataTableLazyLoading';
// mock


const Designations = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [editmodalOpen, setEditModalOpen] = useState(false);
  const { data, isLoading, refetch } = useDesignationGetQuery();
  const [AddDesignation, AddDesignationInfo] = useAddDesignationMutation();
  const [UpdateDesignation, UpdateDesignationInfo] = useUpdateDesignationMutation();
  const [DeleteDesignation, DeleteDesignationInfo] = useDeleteDesignationMutation();
  

  const [addValue, setAddValue] = useState({
    name: ""
  });

  const [editValue, setEditValue] = useState({
    id: undefined,
    name: ""
  });
  const [modalName, setModalName] = useState("add");

  if (isLoading || DeleteDesignationInfo.isLoading || AddDesignationInfo.isLoading || UpdateDesignationInfo.isLoading) {
    return <DataTableLazyLoading />
  }
  

  const modalHandleClose = (value) => {
    setModalOpen(value);
    setEditModalOpen(value);
  };

  const addNewDesignationHandler = () => {
    setModalOpen(true);
    setModalName("Add");
  };

  const onEditModalHandler = (dataIndex) => {
    const dataArr = data.data;
    const currentDataObj = dataArr[dataIndex];
    setEditValue(currentDataObj)
    setEditModalOpen(true);
    setModalName("Edit");
  };

  const onDeleteHandler = async (dataIndex) => {
    const dataArr = data.data;
    const currentDataObj = dataArr[dataIndex];
    await DeleteDesignation(currentDataObj.id);
    refetch();
  }
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
            <Button onClick={() => onEditModalHandler(dataIndex)}>
              <ListItemIcon style={{ justifyContent: 'center' }}>
                <Iconify icon="eva:edit-fill" width={24} height={24} />
              </ListItemIcon>
            </Button>
            <Button onClick={() => onDeleteHandler(dataIndex)}>
              <ListItemIcon style={{ justifyContent: 'center' }}>
                <Iconify icon="eva:trash-2-outline" width={24} height={24} />
              </ListItemIcon>
            </Button>
          </>
        )
      },
    },
  ];

 
  const options = {
    filterType: 'dropdown',
  };

  const addClickHandler = async () => {
    if (modalName === "Add") {
      await AddDesignation(addValue);
      refetch()
      setModalOpen(false);
      setAddValue({ name: "" })
    } else {
      await UpdateDesignation(editValue);
      refetch();
      setEditModalOpen(false);
    }
  }

  const addChangeHandler = (e) => {
    setAddValue({ [e.target.name]: e.target.value });
  }
  
  const editChangeHandler = (e) => {
    setEditValue({ ...editValue, [e.target.name]: e.target.value })
  }

  

  return (
    <Page title="User">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Designations
          </Typography>
          <Button
            variant="contained"
            component={RouterLink}
            to="#"
            onClick={addNewDesignationHandler}
            startIcon={<Iconify icon="eva:plus-fill" />}
          >
            New Designation
          </Button>
        </Stack>

        <Card>
          <MUIDataTable title={'Designation List'} data={data.data} columns={columns} options={options} />
        </Card>
      </Container>
      <SettingsModal
        open={modalOpen}
        handleclose={modalHandleClose}
        label="Designation Name"
        type="text"
        textboxlabel="Add Designation"
        id="designationName"
        name="name"
        value={addValue.name}
        onChange={addChangeHandler}
        buttonlabel="Add Designation"
        addclickhandler={addClickHandler}
      />
      <SettingsModal
        open={editmodalOpen}
        handleclose={modalHandleClose}
        label="Edit Designation"
        type="text"
        textboxlabel="Designation Name"
        id="editDesignationName"
        name="name"
        value={editValue.name}
        onChange={editChangeHandler}
        buttonlabel="Update Designation"
        addclickhandler={addClickHandler}
      />
    </Page>
  );
};

export default Designations;