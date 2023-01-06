import React, { useState, useEffect, useMemo } from 'react';
import MUIDataTable from 'mui-datatables';
import { Link as RouterLink } from 'react-router-dom';
// material
import { Card, Stack, Button, Container, Typography, ListItemIcon } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
// components
// eslint-disable-next-line import/no-unresolved
import { sortedDataFn } from 'src/utils/getSortedData';
import DesignationSettingModal from './DesignationSettingModal';
import Page from '../../../components/Page';
import Iconify from '../../../components/Iconify';
// eslint-disable-next-line import/named
import {
  useDesignationGetQuery,
  useAddDesignationMutation,
  useUpdateDesignationMutation,
  useDeleteDesignationMutation,
} from '../../../redux/services/settings/DesignationService';
import DataTableLazyLoading from '../../../components/lazyloading/DataTableLazyLoading';
import { showToast } from '../../../utils/toast';
// mock

const Designations = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [editmodalOpen, setEditModalOpen] = useState(false);
  const { data = [], isLoading, refetch } = useDesignationGetQuery();
  const [AddDesignation, AddDesignationInfo] = useAddDesignationMutation();
  const [UpdateDesignation, UpdateDesignationInfo] = useUpdateDesignationMutation();
  const [DeleteDesignation, DeleteDesignationInfo] = useDeleteDesignationMutation();
  const [currentIndex, setCurrentIndex] = useState(null);
  const [btnLoader, setBtnLoader] = useState(false);

  const [addValue, setAddValue] = useState({
    name: '',
  });

  const [editValue, setEditValue] = useState({
    id: undefined,
    name: '',
  });
  const [modalName, setModalName] = useState('add');

  const sortedData = useMemo(() => {
    const result = sortedDataFn(data.data);
    return result;
  }, [data]);

  useEffect(() => {
    if (AddDesignationInfo.isSuccess) {
      setModalOpen(false);
      refetch();
      showToast('success', 'designation successfully added.');
      setBtnLoader(false);
      setAddValue({ name: '' });
      AddDesignationInfo.reset();
    }
    if (AddDesignationInfo.isError) {
      showToast('error', AddDesignationInfo.error.data.msg);
      AddDesignationInfo.reset();
    }
    if (UpdateDesignationInfo.isSuccess) {
      refetch();
      showToast('success', 'designation successfully updated.');
      setEditModalOpen(false);
      setBtnLoader(false);
      UpdateDesignationInfo.reset();
    }
    if (UpdateDesignationInfo.isError) {
      showToast('error', UpdateDesignationInfo.error.data.msg);
      setBtnLoader(false);
      UpdateDesignationInfo.reset();
    }
  }, [setBtnLoader, AddDesignationInfo, UpdateDesignationInfo,refetch]);

  if (isLoading) {
    return <DataTableLazyLoading />;
  }
  if (DeleteDesignationInfo.isSuccess) {
    showToast('success', 'department successfully deleted.');
    DeleteDesignationInfo.reset();
  }
  if (DeleteDesignationInfo.isError) {
    showToast('error', DeleteDesignationInfo.error.data.msg);
  }
  // eslint-disable-next-line react-hooks/rules-of-hooks

  const modalHandleClose = () => {
    setModalOpen(false);
    setEditModalOpen(false);
  };

  const addNewDesignationHandler = () => {
    setModalOpen(true);
    setModalName('Add');
  };

  const onEditModalHandler = (dataIndex) => {
    const dataArr = sortedData;
    const currentDataObj = dataArr[dataIndex];
    setEditValue(currentDataObj);
    setEditModalOpen(true);
    setModalName('Edit');
  };

  const onDeleteHandler = async (dataIndex) => {
    setCurrentIndex(dataIndex);
    const dataArr = sortedData;
    const currentDataObj = dataArr[dataIndex];
    await DeleteDesignation(currentDataObj.id);
    refetch();
  };
  const columns = [
    {
      name: 'id',
      label: 'Designation Id',
      options: {
        filter: true,
        sort: true,
      },
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
            <EditIcon onClick={() => onEditModalHandler(dataIndex)}
            sx={{
              padding: '0px',
              minWidth: '0',
              cursor:"pointer",
              color:"grey",}}/>
            <DeleteIcon 
            onClick={() => onDeleteHandler(dataIndex)}
            loading={dataIndex === currentIndex ? DeleteDesignationInfo.isLoading : false}
            sx={{
              margin: '0px 15px',
              cursor:"pointer",
              color:"grey",}}
            />
          </>
        ),
      },
    },
  ];

  const options = {
    filterType: 'dropdown',
  };

  const addClickHandler = async () => {
    setBtnLoader(true);
    if (modalName === 'Add') {
      await AddDesignation(addValue);
    } else {
      await UpdateDesignation(editValue);
    }
  };

  const addChangeHandler = (e) => {
    setAddValue({ [e.target.name]: e.target.value });
  };

  const editChangeHandler = (e) => {
    setEditValue({ ...editValue, [e.target.name]: e.target.value });
  };

  return (
    <Page title="User">
      <Container>
      <Stack direction="row" alignItems="center" justifyContent="flex-end" mb={5} sx={{marginTop:"0"}}>
          <AddCircleRoundedIcon onClick={addNewDesignationHandler}
          sx={{
            marginTop:"0",
            cursor:"pointer",
            color:"blue",
            fontSize:"40px"}}
          />
        </Stack>
          <MUIDataTable sx={{backgroundColor:"#f9fafb"}} title={'Designation List'} data={sortedData} columns={columns} options={options} />
      </Container>
      <DesignationSettingModal
        open={modalOpen}
        handleClose={modalHandleClose}
        label="Designation Name"
        type="text"
        textboxlabel="Add Designation"
        id="designationName"
        name="name"
        value={addValue.name}
        onChangeHandle={addChangeHandler}
        buttonlabel="Add Designation"
        addClickHandler={addClickHandler}
        loadingbtn={btnLoader}
      />
      <DesignationSettingModal
        open={editmodalOpen}
        handleClose={modalHandleClose}
        label="Edit Designation"
        type="text"
        textboxlabel="Designation Name"
        id="editDesignationName"
        name="name"
        value={editValue.name}
        onChange={editChangeHandler}
        buttonlabel="Update Designation"
        addclickhandler={addClickHandler}
        loadingbtn={btnLoader}
      />
    </Page>
  );
};

export default Designations;
