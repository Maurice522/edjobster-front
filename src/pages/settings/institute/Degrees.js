import React, { useState, useEffect, useMemo } from 'react';
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
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import { LoadingButton } from '@mui/lab';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
// components
// eslint-disable-next-line import/no-unresolved
import { sortedDataFn } from 'src/utils/getSortedData';
import DegreeSettingModal from './DegreeSettingModal';
import Page from '../../../components/Page';
import Iconify from '../../../components/Iconify';
import { useDegreeGetQuery, useAddDegreeMutation, useUpdateDegreeMutation, useDeleteDegreeMutation } from "../../../redux/services/settings/DegreeService";
import DataTableLazyLoading from '../../../components/lazyloading/DataTableLazyLoading';
import { showToast } from "../../../utils/toast";
// mock

const Degrees = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [editmodalOpen, setEditModalOpen] = useState(false);
  const { data = [], isLoading, refetch } = useDegreeGetQuery();
  const [AddDegree, AddDegreeInfo] = useAddDegreeMutation();
  const [UpdateDegree, UpdateDegreeInfo] = useUpdateDegreeMutation();
  const [DeleteDegree, DeleteDegreeInfo] = useDeleteDegreeMutation();
  const [currentIndex, setCurrentIndex] = useState(null);
  const [btnLoader, setBtnLoader] = useState(false)

  const [addValue, setAddValue] = useState({
    name: ""
  });

  const [editValue, setEditValue] = useState({
    id: undefined,
    name: ""
  });
  const [modalName, setModalName] = useState("add");

  const sortedData = useMemo(() => {
    const result = sortedDataFn(data.data);
    return result;
  }, [data])

  useEffect(() => {
    if (AddDegreeInfo.isSuccess) {
      setModalOpen(false);
      refetch();
      showToast("success", "degree successfully added.");
      setBtnLoader(false);
      AddDegreeInfo.reset();
    }
    if (AddDegreeInfo.isError) {
      showToast("error", AddDegreeInfo.error.data.msg);
      setBtnLoader(false);
      AddDegreeInfo.reset();
    }
    if (UpdateDegreeInfo.isSuccess) {
      refetch();
      showToast("success", "degree successfully updated.");
      setEditModalOpen(false);
      setBtnLoader(false);
      UpdateDegreeInfo.reset();
    }
    if (UpdateDegreeInfo.isError) {
      showToast("error", UpdateDegreeInfo.error.data.msg);
      setBtnLoader(false);
      UpdateDegreeInfo.reset();
    }
  }, [modalOpen, AddDegreeInfo, setModalOpen, refetch, setBtnLoader, setEditModalOpen, UpdateDegreeInfo])

  if (isLoading) {
    return <DataTableLazyLoading />
  }
  if (DeleteDegreeInfo.isSuccess) {
    showToast("success", "degree successfully deleted.");
    DeleteDegreeInfo.reset();
  }
  if (DeleteDegreeInfo.isError) {
    showToast("error", DeleteDegreeInfo.error.data.msg);
    DeleteDegreeInfo.reset();
  }


  const modalHandleClose = () => {
    console.log(editmodalOpen)
    setModalOpen(false);
    setEditModalOpen(false);
  };

  const addNewDegreeHandler = () => {
    setModalOpen(true);
    setModalName("Add");
  };

  const onEditModalHandler = (dataIndex) => {
    const dataArr = sortedData;
    const currentDataObj = dataArr[dataIndex];
    setEditValue(currentDataObj)
    setEditModalOpen(true);
    setModalName("Edit");
  };

  const onDeleteHandler = async (dataIndex) => {
    setCurrentIndex(dataIndex)
    const dataArr = sortedData;
    const currentDataObj = dataArr[dataIndex];
    await DeleteDegree(currentDataObj.id);
    refetch();
  }

  const columns = [
    {
      name: "id",
      label: "Degree Id",
      options: {
        filter: true,
        sort: true,
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
            <EditIcon onClick={() => onEditModalHandler(dataIndex)}
              sx={{
                padding: '0px',
                minWidth: '0',
                cursor:"pointer",
                color:"grey",}}
            />
            <DeleteIcon 
                onClick={() => onDeleteHandler(dataIndex)}
                loading={dataIndex === currentIndex ? DeleteDegreeInfo.isLoading : false}
                sx={{
                  margin: '0px 15px',
                  cursor:"pointer",
                  color:"grey",}}
            />
          </>
        )
      },
    },
  ];

  const options = {
    filterType: 'dropdown',
  };
  const addClickHandler = async () => {
    setBtnLoader(true);
    if (modalName === "Add") {
      await AddDegree(addValue);
      setAddValue({ name: "" })
    } else {
      await UpdateDegree(editValue);
    }
  }

  const addChangeHandler = (e) => {
    console.log(e.target.value);
    setAddValue({ [e.target.name]: e.target.value });
  }

  const editChangeHandler = (e) => {
    setEditValue({ ...editValue, [e.target.name]: e.target.value })
  }

  return (
    <Page title="Degree">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="flex-end" mb={5} sx={{marginTop:"0"}}>
          <AddCircleRoundedIcon onClick={addNewDegreeHandler}
          sx={{
            marginTop:"0",
            cursor:"pointer",
            color:"blue",
            fontSize:"40px"}}
          />
        </Stack>
          <MUIDataTable title={' Degree List'} data={sortedData} columns={columns} options={options} />
      </Container>
      <DegreeSettingModal
        open={modalOpen}
        handleClose={modalHandleClose}
        label="Degree Name"
        type="text"
        textboxlabel="Add Degree"
        id="degreeName"
        name="name"
        value={addValue.name}
        onChangeHandle={addChangeHandler}
        buttonlabel="Add Degree"
        addClickHandler={addClickHandler}
        loadingbtn={btnLoader}
      />
      <DegreeSettingModal
        open={editmodalOpen}
        handleClose={modalHandleClose}
        label="Edit Degree"
        type="text"
        textboxlabel="Degree Name"
        id="editDegreeName"
        name="name"
        value={editValue.name}
        onChangeHandle={editChangeHandler}
        buttonlabel="Update Degree"
        addClickHandler={addClickHandler}
        loadingbtn={btnLoader}
      />
    </Page>
  );
};

export default Degrees;
