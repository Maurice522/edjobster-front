import React, { useState, useMemo, useEffect } from 'react';
import MUIDataTable from 'mui-datatables';
import { Link as RouterLink, useParams } from 'react-router-dom';
import { LoadingButton } from '@mui/lab';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

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
import { DataGrid } from '@mui/x-data-grid';
import SettingsModal from '../../../components/settings/SettingsModal';
import Page from '../../../components/Page';
import Iconify from '../../../components/Iconify';
// mock
import { sortedDataFn } from '../../../utils/getSortedData';
import { showToast } from '../../../utils/toast';
import ViewStatus from '../../../components/ViewStatus/ViewStatus';
import DataTableLazyLoading from '../../../components/lazyloading/DataTableLazyLoading';
import {
  useGetStagesQuery,
  useDeleteStageApiMutation,
  useAddStageApiMutation,
  useUpdateStageApiMutation
 } from '../../../redux/services/settings/StageService';

 import { useGetStatusApiQuery } from '../../../redux/services/settings/StatusServices';

const Stages = () => {
  const { id } = useParams();
  console.log(id)
  const [modalOpen, setModalOpen] = useState(false);
  const [editmodalOpen, setEditModalOpen] = useState(false);
  const [viewModelOpen, setViewModelOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(null);
  const { data, refetch } = useGetStatusApiQuery(id);
  const { statusData = [], isError, isLoading } = useGetStatusApiQuery();
  const [DeleteStageApi, DeleteStageApiInfo] = useDeleteStageApiMutation();
  const [AddStage, AddStageInfo] = useAddStageApiMutation();
  const [UpdateStage, UpdateStageInfo] = useUpdateStageApiMutation();
  const [btnLoader, setBtnLoader] = useState(false);
  const [modalName, setModalName] = useState('add');

  const [addValue, setAddValue] = useState({
    name: '',
  });
  const [editValue, setEditValue] = useState({
    id: undefined,
    name: '',
  });

  const [viewStatusvalue, setViewStatusValue] = useState({
    id: 1,
    status: ['IN PROGRESS'],
  });

  const modalHandleClose = () => {
    console.log('value');
    setModalOpen(false);
  };
  const modalViewHandleClose = () => {
    setViewModelOpen(false);
    // setEditModalOpen(value);
    // setViewModelOpen(value);
  };

  const addNewStageHandler = () => {
    setModalOpen(true);
    setModalName('Add');
  };

  const onEditModalHandler = (dataIndex) => {
    setEditModalOpen(true);
    const dataArr = data?.stages;
    const currentDataObj = dataArr[dataIndex];
    setEditValue(currentDataObj);
    setModalName('Edit');
  };

  const onViewStatusHandler = (dataIndex) => {
    setViewModelOpen(true);
    const dataArr = data?.stages;
    const currentDataObj = dataArr[dataIndex];
    const statusDataApi = currentDataObj.id;
    const statusData = statusDataApi;
    console.log('statusData', statusData);
    setViewStatusValue(currentDataObj);
  };

  const onViewChangeHandler = (e) => {
    setViewStatusValue({ ...viewStatusvalue, [e.target.status]: e.target.value });
  };

  const onDeleteHandler = async (dataIndex) => {
    setCurrentIndex(dataIndex);
    const dataArr = data?.stages;
    const currentDataObj = dataArr[dataIndex];
    await DeleteStageApi(currentDataObj.id);
  };
  if (DeleteStageApiInfo.isSuccess) {
    showToast('success', DeleteStageApiInfo.data.msg);
    DeleteStageApiInfo.reset();
    refetch();
  }
  if (DeleteStageApiInfo.isError) {
    showToast('error', DeleteStageApiInfo.error.data.msg);
    DeleteStageApiInfo.reset();
    refetch();
  }

  const addChangeHandler = (e) => {
    setAddValue({ [e.target.name]: e.target.value });
  };

  const editChangeHandler = (e) => {
    setEditValue({ ...editValue, [e.target.name]: e.target.value });
  };

  const addClickHandler = async () => {
    setBtnLoader(true);
    if (modalName === 'Add') {
      await AddStage(addValue);
    } else {
      await UpdateStage(editValue);
    }
  };

  useEffect(() => {
    if (AddStageInfo.isSuccess) {
      setModalOpen(false);
      refetch();
      showToast('success', 'department successfully added.');
      setBtnLoader(false);
      AddStageInfo.reset();
      setAddValue({ name: '' });
    }
    if (AddStageInfo.isError) {
      showToast('error', AddStageInfo.error.data.msg);
      setBtnLoader(false);
      AddStageInfo.reset();
    }
    if (UpdateStageInfo.isSuccess) {
      refetch();
      showToast('success', 'designation successfully updated.');
      setEditModalOpen(false);
      setBtnLoader(false);
      UpdateStageInfo.reset();
    }
    if (UpdateStageInfo.isError) {
      showToast('error', UpdateStageInfo.error.data.msg);
      setBtnLoader(false);
      UpdateStageInfo.reset();
    }
  }, [modalOpen, AddStageInfo, setModalOpen, UpdateStageInfo, refetch, setBtnLoader, addValue, setAddValue]);

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
      name: 'status',
      label: 'Status',
      options: {
        filter: false,
        sort: false,
        customBodyRenderLite: (dataIndex) => (
          <>
            <Button style={{ minWidth: 0 }} variant="outlined" onClick={() => onViewStatusHandler(dataIndex)}>
              View Status
            </Button>
          </>
        ),
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
              loading={dataIndex === currentIndex ? DeleteStageApiInfo.isLoading : false}
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

  return (
    <Page title="User">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Stages
          </Typography>
        </Stack>

        <Card>
          <MUIDataTable title={'Stage List'} data={data?.stages} columns={columns} options={options} />
        </Card>
      </Container>
      <SettingsModal
        open={editmodalOpen}
        label="Satge Name"
        type="edit"
        textboxlabel="Edit Stage"
        id="editStageName"
        name="name"
        value={editValue.name}
        onChange={editChangeHandler}
        buttonlabel="Update Stage"
        addclickhandler={addClickHandler}
        loadingbtn={btnLoader}
      />

      {viewModelOpen && (
        <ViewStatus
          open={viewModelOpen}
          handleclose={modalViewHandleClose}
          onChange={onViewChangeHandler}
          currentRowValue={viewStatusvalue}
        />
      )}
    </Page>
  );
};

export default Stages;
