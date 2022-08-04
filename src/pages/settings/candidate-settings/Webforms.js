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
// components
import { showToast } from '../../../utils/toast';
import { sortedDataFn } from '../../../utils/getSortedData';
import {
  useGetWebformQuery,
  useAddWebformApiMutation,
  useUpdateWebformMutation,
} from '../../../redux/services/settings/WebformService';
import { useGetWebformFieldsQuery } from '../../../redux/services/settings/FieldServices';
import Page from '../../../components/Page';
import Label from '../../../components/Label';
import Iconify from '../../../components/Iconify';
import WebFormsModal from '../../../components/webform/WebFormModal';

const Webforms = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [editmodalOpen, setEditModalOpen] = useState(false);
  const { data = [], isLoading, refetch } = useGetWebformQuery();
  const [btnLoader, setBtnLoader] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(null);

  const [AddWebform, AddWebformInfo] = useAddWebformApiMutation();
  const [UpdateWebform, UpdateWebformInfo] = useUpdateWebformMutation();
  const [modalName, setModalName] = useState('add');
  const { data: webFormFieldsData } = useGetWebformFieldsQuery();

  const [addValue, setAddvalue] = useState({
    name: '',
  });
  const [editValue, setEditValue] = useState({
    id: undefined,
    name: '',
  });

  const modalHandleClose = (value) => {
    setModalOpen(value);
    setEditModalOpen(value);
    refetch();
  };
  const modaEditlHandleClose = (value) => {
    setModalOpen(value);
    setEditModalOpen(value);
    refetch();
  };
  const sortData = useMemo(() => {
    const sortresult = sortedDataFn(data.data);
    return sortresult;
  });
  const addChangeHandler = (e) => {
    setAddvalue({ [e.target.name]: e.target.value });
  };

  const addClickHandler = async () => {
    setBtnLoader(true);
    if (modalName === 'Add') {
      await AddWebform(addValue);
    } else {
      await UpdateWebform(editValue);
    }
  };

  useEffect(() => {
    if (AddWebformInfo.isSuccess) {
      setModalOpen(false);
      refetch();
      showToast('success', 'Email Category successfully added.');
      setBtnLoader(false);
      AddWebformInfo.reset();
      setAddvalue({ name: '' });
    }
  }, [modalOpen, AddWebformInfo, setModalOpen, refetch, setBtnLoader, addValue, setAddvalue]);
  const addNewWebformHandler = () => {
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
              // onClick={() => onDeleteHandler(dataIndex)}
              // loading={dataIndex === currentIndex ? useDeleteEmailCategoryMutation.isLoading : false}
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
  // const data = [
  //   { name: 'Joe James', status: labelStatus, action: editAndDeleteButton },
  //   { name: 'John Walsh', status: labelStatus, action: editAndDeleteButton },
  //   { name: 'Bob Herm', status: labelStatus, action: editAndDeleteButton },
  //   { name: 'James Houston', status: labelStatus, action: editAndDeleteButton },
  // ];
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
            Webforms
          </Typography>
          <Button
            variant="contained"
            component={RouterLink}
            to="#"
            onClick={addNewWebformHandler}
            startIcon={<Iconify icon="eva:plus-fill" />}
          >
            New Webform
          </Button>
        </Stack>

        <Card>
          <MUIDataTable title={'Webform List'} data={sortData} columns={columns} options={options} />
        </Card>
      </Container>
      {modalOpen && (
        <WebFormsModal
          open={modalOpen}
          handleclose={modalHandleClose}
          label="Add Webform"
          type="text"
          textboxlabel="Create an Web form "
          id="webformName"
          name="webform"
          buttonlabel="Add Webform"
          webFormFieldsData={webFormFieldsData?.data}
        />
      )}
      {editmodalOpen && (
        <WebFormsModal
          open={editmodalOpen}
          handleClose={modaEditlHandleClose}
          label="Edit Webform"
          type="text"
          textBoxLabel="Update an Web form "
          id="editWebformName"
          name="webform"
          getInputValue={getInputValue}
          buttonLabel="Update Webform"
        />
      )}
    </Page>
  );
};

export default Webforms;
