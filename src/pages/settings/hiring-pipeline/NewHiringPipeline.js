import React, { useState, useMemo, useEffect } from 'react'
import MUIDataTable from 'mui-datatables';
import { LoadingButton } from '@mui/lab';
import {
  Card,
  Stack,
  Button,
  Container,
  Typography,
  ListItemIcon,
  Link
} from '@mui/material';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import { useNavigate } from 'react-router-dom';
import PipelineModel from '../../../components/settings/pipelineModel';
import {
  useGetPipelineQuery,
  useDeletePipelineApiMutation,
  useAddPipelineApiMutation,
  useUpdatePipelineApiMutation,
} from '../../../redux/services/settings/PipelineService';
import { sortedDataFn } from '../../../utils/getSortedData';
import { showToast } from '../../../utils/toast';
import Page from '../../../components/Page';
import Iconify from '../../../components/Iconify';


function NewHiringPipeline() {
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(null);
  const { data = [], isLoading, refetch } = useGetPipelineQuery();
  const [AddPipelineApi, AddPipelineApiInfo] = useAddPipelineApiMutation();
  const [UpdatePipelineApi, UpdatePipelineApiInfo] = useUpdatePipelineApiMutation();
  const [DeletePipelineApi, DeletePipelineInfo] = useDeletePipelineApiMutation();
  const [modalType, setModalType] = useState('Add');
  const [stageApidata, setStageApidata] = useState({
    name: '',
    fileds: [],
  });
  const [editValue, setEditValue] = useState({
    id: undefined,
    name: '',
    fileds: [],
  });
  const options = {
    filterType: 'dropdown',
  };
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
        customBodyRenderLite: (dataIndex) => (
          <Link sx={{
            textDecoration: "none",
            color: "black"
          }} 
          href={`/dashboard/hiring-pipeline/stages/${data.data[dataIndex].id}`}> 
            {data.data[dataIndex].name}
          </Link>
        )
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
            >
              <ListItemIcon style={{ color: '#fff', padding: '0px', minWidth: 0 }}>
                <Iconify icon="eva:trash-2-outline" width={24} height={24} />
              </ListItemIcon>
            </LoadingButton>
          </>
        ),
      }
    },
  ];

  const modalHandleClose = () => {
    console.log('value');
    setModalOpen(false);
    setEditModalOpen(false);
  };

  const sortData = useMemo(() => {
    const sortresult = sortedDataFn(data.data);
    return sortresult;
  }, [data]);

  const addNewPipelineHandler = () => {
    setModalOpen(true);
    setModalType('Add');
    setStageApidata({
      id: null,
      name: '',
    });
  };
  const onEditModalHandler = (index) => {
    const dataArr = sortData;
    const curentObj = dataArr[index];
    setEditValue(curentObj);
    console.log('editValue', editValue);
    setStageApidata({
      name: curentObj.name,
      fileds: curentObj.fileds,
    });
    setModalType('Update');
    setModalOpen(true);
  };
  const onSubmitHandler = async (value) => {
    console.log('value', value);
    if (modalType === 'Add') {
      const data = {
        name: value.name,
        fields: value.fields,
      };
      await AddPipelineApi(data);
    }
  };

  const onDeleteHandler = async (dataIndex) => {
    setCurrentIndex(dataIndex);
    const dataArr = sortData;
    const currentDataObj = dataArr[dataIndex];
    await DeletePipelineApi(currentDataObj.id);
  };

  useEffect(() => {
    if (AddPipelineApiInfo.isSuccess) {
      showToast('success', AddPipelineApiInfo.data.msg);
      setModalOpen(false);
      refetch();
      AddPipelineApiInfo.reset();
    }
    if (AddPipelineApiInfo.isError) {
      showToast('error', AddPipelineApiInfo.error.data.msg);
      AddPipelineApi.reset();
    }
    if (DeletePipelineInfo.isSuccess) {
      showToast('success', DeletePipelineInfo.data.msg);
      DeletePipelineInfo.reset();
      refetch();
    }
    if (DeletePipelineInfo.isError) {
      showToast('error', DeletePipelineInfo.error.data.msg);
      DeletePipelineInfo.reset();
      refetch();
    }
  }, [AddPipelineApi, AddPipelineApiInfo, DeletePipelineInfo, refetch]);
  console.log(data)

  return (
    <div>
      <Page title="Pipeline">
        <Container>
          <Stack direction="row" alignItems="center" justifyContent="flex-end" mb={5} sx={{marginTop:"0"}}>
            <AddCircleRoundedIcon onClick={addNewPipelineHandler}
              sx={{
                marginTop:"0",
                cursor:"pointer",
                color:"blue",
                fontSize:"40px"
              }}
            />
          </Stack>
          <Card>
            <MUIDataTable title={'Pipeline List'} data={sortData} columns={columns} options={options} />
          </Card>
        </Container>
        <PipelineModel
          open={modalOpen}
          handleClose={modalHandleClose}
          textBoxLabel="Add Pipeline Name"
          id="pipelineName"
          name="pipeline"
          buttonLabel="Add Pipeline"
          onsubmit={onSubmitHandler}
          type={modalType}
          formstagedata={stageApidata}
          // companyName={data[currentIndex].name}
        />
      </Page>
    </div>
  )
}

export default NewHiringPipeline