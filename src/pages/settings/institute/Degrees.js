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
import { useDegreeGetQuery, useAddDegreeMutation, useUpdateDegreeMutation, useDeleteDegreeMutation } from "../../../redux/services/settings/DegreeService";
import DataTableLazyLoading from '../../../components/lazyloading/DataTableLazyLoading';
// mock

const Degrees = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [editmodalOpen, setEditModalOpen] = useState(false);
  const { data, isLoading, refetch } = useDegreeGetQuery();
  const [AddDegree, AddDegreeInfo] = useAddDegreeMutation();
  const [UpdateDegree, UpdateDegreeInfo] = useUpdateDegreeMutation();
  const [DeleteDegree, DeleteDegreeInfo] = useDeleteDegreeMutation();


  const [addValue, setAddValue] = useState({
    name: ""
  });

  const [editValue, setEditValue] = useState({
    id: undefined,
    name: ""
  });
  const [modalName, setModalName] = useState("add");

  if (isLoading || DeleteDegreeInfo.isLoading || AddDegreeInfo.isLoading || UpdateDegreeInfo.isLoading) {
    return <DataTableLazyLoading />
  }
  const modalHandleClose = (value) => {
    setModalOpen(value);
    setEditModalOpen(value);
  };

  const addNewDegreeHandler = () => {
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
    await DeleteDegree(currentDataObj.id);
    refetch();
  }

  const columns = [
    {
      name: "id",
      label: "Id",
      options: {
        display: false
      }
    },
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
      await AddDegree(addValue);
      refetch()
      setModalOpen(false);
      setAddValue({ name: "" })
    } else {
      await UpdateDegree(editValue);
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
    <Page title="Degree">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Degrees
          </Typography>
          <Button
            variant="contained"
            component={RouterLink}
            to="#"
            onClick={addNewDegreeHandler}
            startIcon={<Iconify icon="eva:plus-fill" />}
          >
            New Degree
          </Button>
        </Stack>

        <Card>
          <MUIDataTable title={' Degree List'} data={data.data} columns={columns} options={options} />
        </Card>
      </Container>
      <SettingsModal
        open={modalOpen}
        handleclose={modalHandleClose}
        label="Degree Name"
        type="text"
        textboxlabel="Add Degree"
        id="degreeName"
        name="name"
        value={addValue.name}
        onChange={addChangeHandler}
        buttonlabel="Add Degree"
        addclickhandler={addClickHandler}
      />
      <SettingsModal
        open={editmodalOpen}
        handleclose={modalHandleClose}
        label="Edit Degree"
        type="text"
        textboxlabel="Degree Name"
        id="editDegreeName"
        name="name"
        value={editValue.name}
        onChange={editChangeHandler}
        buttonlabel="Update Degree"
        addclickhandler={addClickHandler}
      />
    </Page>
  );
};

export default Degrees;
