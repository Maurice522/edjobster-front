import { useMemo, useState, useEffect } from 'react';
import MUIDataTable from 'mui-datatables';
import { Link as RouterLink } from 'react-router-dom';
import { LoadingButton } from '@mui/lab';
// material
import {
  Card, Stack, Button, Container,
  Typography, ListItemIcon
} from '@mui/material';
import { sortedDataFn } from '../../../utils/getSortedData';
import { showToast } from '../../../utils/toast';
import {
  useGetEmailCategoryQuery,
  useDeleteEmailCategoryMutation,
  useAddEmailCategoryMutation,
  useUpdateEmailCategoryMutation,
} from '../../../redux/services/settings/EmailCategoryService';
// components
import CategorySettingModal from './CategorySettingModel';
import DataTableLazyLoading from '../../../components/lazyloading/DataTableLazyLoading';
import Page from '../../../components/Page';
import Iconify from '../../../components/Iconify';
// mock

const Categories = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [editmodalOpen, setEditModalOpen] = useState(false);
  const { data = [], isLoading, refetch } = useGetEmailCategoryQuery();
  const [DeleteEmailCategory, DeleteEmailCategoryInfo] = useDeleteEmailCategoryMutation();
  const [AddEmailCategory, AddEmailcategoryInfo] = useAddEmailCategoryMutation();
  const [UpdateEMailCategory, UpdateEMailCategoryInfo] = useUpdateEmailCategoryMutation();
  const [currentIndex, setCurrentIndex] = useState(null);
  const [btnLoader, setBtnLoader] = useState(false);
  const [modalName, setModalName] = useState('add');

  const [addValue, setAddvalue] = useState({
    name: '',
  });
  const [editValue, setEditValue] = useState({
    id: undefined,
    name: '',
  });
  
  const sortData = useMemo(() => {
    const sortresult = sortedDataFn(data.data);
    return sortresult;
  }, [data]);

  useEffect(() => {
    if (AddEmailcategoryInfo.isSuccess) {
      setModalOpen(false);
      refetch();
      showToast('success', 'Email Category successfully added.');
      setBtnLoader(false);
      AddEmailcategoryInfo.reset();
    }
    if (AddEmailcategoryInfo.isError) {
      console.log(AddEmailcategoryInfo.error)
      showToast('error', AddEmailcategoryInfo.error.data.msg);
      setBtnLoader(false);
      AddEmailcategoryInfo.reset();
    }
    if (UpdateEMailCategoryInfo.isSuccess) {
      refetch();
      showToast('success', 'Category successfully updated.');
      setEditModalOpen(false);
      setBtnLoader(false);
      UpdateEMailCategoryInfo.reset();
    }
    if (UpdateEMailCategoryInfo.isError) {
      showToast('error', UpdateEMailCategoryInfo.error.data.msg);
      setBtnLoader(false);
      UpdateEMailCategoryInfo.reset();
    }
  }, [modalOpen, AddEmailcategoryInfo, setModalOpen, refetch, setBtnLoader, setEditModalOpen,  UpdateEMailCategoryInfo]);

    if (isLoading) {
      return <DataTableLazyLoading />;
    }
    if (DeleteEmailCategoryInfo.isSuccess) {
      showToast('success', DeleteEmailCategoryInfo.data.msg);
      DeleteEmailCategoryInfo.reset();
      // refetch();
    }
    if (DeleteEmailCategoryInfo.isError) {
      showToast('error', DeleteEmailCategoryInfo.error.data.msg);
      DeleteEmailCategoryInfo.reset();
      // refetch();
    }
  const modalHandleClose = () => {
    setModalOpen(false);
    setEditModalOpen(false);
  };

  const addNewCategoryHandler = () => {
    setModalOpen(true);
    setModalName('Add');
  };

  const onEditModalHandler = (dataIndex) => {
    const dataArr = sortData;
    const currentDataObj = dataArr[dataIndex];
    setEditModalOpen(true);
    setEditValue(currentDataObj);
    setModalName('Edit');
  };

  const onDeleteHandler = async (dataIndex) => {
    setCurrentIndex(dataIndex);
    const dataArr = sortData;
    const currentDataObj = dataArr[dataIndex];
    await DeleteEmailCategory(currentDataObj.id);
    refetch();
  }

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
            <Button style={{ minWidth: 0 }} onClick={() => onEditModalHandler(dataIndex)}>
              <ListItemIcon style={{ color: '#fff', padding: '0px', minWidth: 0 }}>
                <Iconify icon="ep:edit" width={24} height={24} color={'blue'}/>
              </ListItemIcon>
            </Button>
            <LoadingButton
              style={{ minWidth: 0, margin: '0px 5px' }}
              // variant="contained"
              color="error"
              onClick={() => onDeleteHandler(dataIndex)}
              loading={dataIndex === currentIndex ? DeleteEmailCategoryInfo.isLoading : false}>
              <ListItemIcon style={{ color: '#fff', padding: '0px', minWidth: 0 }}>
                <Iconify icon="eva:trash-2-outline" width={24} height={24} color={'red'}/>
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
  const addClickHandler = async () => {
    setBtnLoader(true);
    if (modalName === 'Add') {
      console.log(addValue)
      await AddEmailCategory(addValue);
      setAddvalue({ name: "" })
    } else {
      await UpdateEMailCategory(editValue);
    }
  }


  const addChangeHandler = (e) => {
    console.log(e.target.value);
    setAddvalue({ [e.target.name]: e.target.value });
  };

  // Edit Handler
  const editChangeHandler = (e) => {
    setEditValue({ ...editValue, [e.target.name]: e.target.value })
  }
  
  const getInputValue = (value) => {
    console.log('value', value);
  };

  return (
    <Page title="User">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <h1>
            Categories
          </h1>
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
          <MUIDataTable title={'Category List'} data={sortData} columns={columns} options={options} />
        </Card>
      </Container>
      <CategorySettingModal
        open={modalOpen}
        handleClose={modalHandleClose}
        label="Email Category Name"
        type="text"
        textboxlabel="Add category"
        id="categoryName"
        name="name"
        value={addValue.name}
        onChangeHandle={addChangeHandler}
        buttonlabel="Add Email category"
        addClickhandler={addClickHandler}
        loadingbtn={btnLoader}
      />
      <CategorySettingModal
        open={editmodalOpen}
        handleClose={modalHandleClose}
        label="Edit Category Name"
        type="text"
        textboxlabel="Edit Category"
        id="editCategoryName"
        value={editValue.name}
        name="name"
        onChangeHandle={editChangeHandler}
        buttonlabel="Update Category"
        addClickhandler={addClickHandler}
        loadingbtn={btnLoader}
      />
    </Page>
  );
};

export default Categories;
