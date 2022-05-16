import React, { useState } from 'react';
import MUIDataTable from 'mui-datatables';
import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import { Link as RouterLink } from 'react-router-dom';
import Skeleton from '@mui/material/Skeleton';
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
// eslint-disable-next-line import/named
import { useDepartmentGetQuery, useAddDepartmentMutation, useUpdateDepartmentMutation, useDeleteDepartmentMutation } from '../../../redux/services/settings/DepartmentService';
import DataTableLazyLoading from '../../../components/lazyloading/DataTableLazyLoading';

// mock

const Departments = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [editmodalOpen, setEditModalOpen] = useState(false);
  const [getValue, setGetValue] = useState({})
  const { data, isLoading, refetch } = useDepartmentGetQuery();
  const [AddDepartment, AddDepartmentInfo] = useAddDepartmentMutation();
  const [UpdateDepartment, UpdateDepartmentInfo] = useUpdateDepartmentMutation();
  const [DeleteDepartment, DeleteDepartmentInfo] = useDeleteDepartmentMutation();

  const [addValue, setAddValue] = useState({
    name: ""
  });
  const [editValue, setEditValue] = useState({
    id: undefined,
    name: ""
  });
  const [modalName, setModalName] = useState("add");

  if (isLoading || DeleteDepartmentInfo.isLoading || AddDepartmentInfo.isLoading || UpdateDepartmentInfo.isLoading) {
    return <DataTableLazyLoading />
  }


  const modalHandleClose = (value) => {
    setModalOpen(value);
    setEditModalOpen(value);
  };

  const addNewDepartmentHandler = () => {
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
    await DeleteDepartment(currentDataObj.id);
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
  
  const labelStatus = (
    <Label variant="ghost" color={'success'}>
      {sentenceCase('active')}
    </Label>
  );


  const options = {
    filterType: 'dropdown',
  };


  const addClickHandler = async () => {
    if (modalName === "Add") {
      await AddDepartment(addValue);
      refetch()
      setModalOpen(false);
      setAddValue({ name: "" })
    } else {
      await UpdateDepartment(editValue);
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
    <Page title="Department">
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
          <MUIDataTable title={'Department List'} data={data.data} columns={columns} options={options} />
        </Card>
      </Container>
      <SettingsModal
        open={modalOpen}
        handleclose={modalHandleClose}
        label="Department Name"
        type="text"
        textboxlabel="Add Department"
        id="depratmentName"
        name="name"
        value={addValue.name}
        onChange={addChangeHandler}
        buttonlabel="Add Department"
        addclickhandler={addClickHandler}
      />
      <SettingsModal
        open={editmodalOpen}
        handleclose={modalHandleClose}
        label="Edit Department"
        type="text"
        textboxlabel="Department Name"
        id="editDepratmentName"
        name="name"
        value={editValue.name}
        onChange={editChangeHandler}
        buttonlabel="Update Department"
        addclickhandler={addClickHandler}
      />
    </Page>
  );
};

export default Departments;
