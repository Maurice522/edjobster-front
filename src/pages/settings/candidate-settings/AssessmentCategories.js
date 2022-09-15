import React, { useState, useMemo, useEffect } from 'react';
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
import { sortedDataFn } from '../../../utils/getSortedData';
import { showToast } from '../../../utils/toast';
import {
  useGetAssessmentCategoriesQuery,
  useDeleteAssessmentCategoriesMutation,
  useAddAssessmentCategoriesMutation,
  useUpdateAssessmentCategoriesMutation,
} from '../../../redux/services/settings/AssessmentCategoriesService';
// components
import SettingsModal from "./CandidateSettingsModal";
import Page from '../../../components/Page';
import Label from '../../../components/Label';
import Iconify from '../../../components/Iconify';
// mock

const AssessmentCategories = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [editmodalOpen, setEditModalOpen] = useState(false);
  const [modalName, setModalName] = useState('add');
  const [btnLoader, setBtnLoader] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(null);
  const { data = [], isLoading, refetch } = useGetAssessmentCategoriesQuery();
  const [addAssessmentCategories, AddAssessmentCategoriesInfo] = useAddAssessmentCategoriesMutation();
  const [updateAssessmentCategories, updateAssessmentCategoriesInfo] = useUpdateAssessmentCategoriesMutation();
  const [DeleteAssessmentCategories, DeleteAssessmentCategoriesInfo] = useDeleteAssessmentCategoriesMutation();
  const [addValue, setAddvalue] = useState({
    name: '',
  });
  const [editValue, setEditValue] = useState({
    id: undefined,
    name: '',
  });
console.log("assesment category",data)
  const modalHandleClose = (value) => {
    console.log('value', value);
    setModalOpen(value);
    setEditModalOpen(value);
  };

  const addNewCategoryHandler = () => {
    setModalOpen(true);
    setModalName('Add');
  };

  const onEditModalHandler = (dataindex) => {
    setEditModalOpen(true);
    const dataArr = sortData;
    const currentDataObj = dataArr[dataindex];
    setEditValue(currentDataObj);
    setModalName('Edit');
    setModalOpen(false)
  };

  // add Handler

  const addChangeHandler = (e) => {
    setAddvalue({ [e.target.name]: e.target.value });
  };
  const addClickHandler = async () => {
    setBtnLoader(true);
    if (modalName === 'Add') {
      await addAssessmentCategories(addValue);
      modalHandleClose(false);
    }if (modalName === "Edit"){
      await updateAssessmentCategories(editValue);
      modalHandleClose(false);
    } else {
      console.log(modalName);
    
    }
  };
  // Edit Handler
  const editChangeHandler = (e) => {
    setEditValue({ ...editValue, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (AddAssessmentCategoriesInfo.isSuccess) {
      setModalOpen(false);
      refetch();
      showToast('success', 'Assessments Category successfully added.');
      setBtnLoader(false);
      AddAssessmentCategoriesInfo.reset();
      setAddvalue({ name: '' });
    }
    if (AddAssessmentCategoriesInfo.isError) {
      showToast('error', AddAssessmentCategoriesInfo.error.data.msg);
      setBtnLoader(false);
      AddAssessmentCategoriesInfo.reset();
    }
    if (updateAssessmentCategoriesInfo.isSuccess) {
      setModalOpen(false);
      showToast('success', 'Assessments Category successfully edit.');
      refetch();
      setBtnLoader(false);
      AddAssessmentCategoriesInfo.reset();
    }
    if (updateAssessmentCategoriesInfo.isError) {
      showToast('error', updateAssessmentCategoriesInfo.error.data.msg);
      setBtnLoader(false);
      updateAssessmentCategoriesInfo.reset();
    }
  }, [
    modalOpen,
    AddAssessmentCategoriesInfo,
    setModalOpen,
    refetch,
    setBtnLoader,
    addValue,
    setAddvalue,
    updateAssessmentCategoriesInfo,
  ]);

  const onDeleteHandler = async (dataindex) => {
    setCurrentIndex(dataindex);
    const dataArr = sortData;
    const currentDataObj = dataArr[dataindex];
    await DeleteAssessmentCategories(currentDataObj.id);
  };
  if (DeleteAssessmentCategoriesInfo.isSuccess) {
    showToast('success', DeleteAssessmentCategoriesInfo.data.msg);
    DeleteAssessmentCategoriesInfo.reset();
    refetch();
  }
  if (DeleteAssessmentCategoriesInfo.isError) {
    showToast('error', DeleteAssessmentCategoriesInfo.error.data.msg);
    DeleteAssessmentCategoriesInfo.reset();
    refetch();
  }
  const sortData = useMemo(() => {
    const sortresult = sortedDataFn(data.data);
    return sortresult;
  }, [data]);

  const columns = [
    {
      name: 'id',
      label: 'Id',
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
            <Button style={{ minWidth: 0 }} variant="contained" onClick={() => onEditModalHandler(dataIndex)}>
              <ListItemIcon style={{ color: '#fff', padding: '0px', minWidth: 0 }}>
                <Iconify icon="ep:edit" width={24} height={24} />
              </ListItemIcon>
            </Button>
            <LoadingButton
              style={{ minWidth: 0, margin: '0px 5px' }}
              variant="contained"
              color="error"
              onClick={() => onDeleteHandler(dataIndex)}
              loading={dataIndex === currentIndex ? useDeleteAssessmentCategoriesMutation.isLoading : false}
            >
              <ListItemIcon style={{ color: '#fff', padding: '0px', minWidth: 0 }}>
                <Iconify icon="eva:trash-2-outline" width={24} height={24} />
              </ListItemIcon>
            </LoadingButton>
          </>
        ),
      },
    },
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
            AssessmentCategories
          </Typography>
          <Button
            variant="contained"
            component={RouterLink}
            to="#"
            onClick={addNewCategoryHandler}
            startIcon={<Iconify icon="eva:plus-fill" />}
          >
            New Category
          </Button>
        </Stack>

        <Card>
          <MUIDataTable title={'Assessment Categories List'} data={sortData} columns={columns} options={options} />
        </Card>
      </Container>
      <SettingsModal
        open={modalOpen}
        handleclose={modalHandleClose}
        label="Email Category Name"
        type="Add"
        textboxlabel="Add Assessment Categories"
        id="categoryName"
        name="name"
        onChange={addChangeHandler}
        buttonlabel="Add Email category"
        addclickhandler={addClickHandler}
        loadingbtn={btnLoader}
      />
      <SettingsModal
        open={editmodalOpen}
        label="Edit Category Name"
        type="Edit"
        textboxlabel="Edit Category"
        id="editCategoryName"
        value={editValue.name}
        name="name"
        onChange={editChangeHandler}
        addclickhandler={addClickHandler}
        loadingbtn={btnLoader}
      />
    </Page>
  );
};

export default AssessmentCategories;
