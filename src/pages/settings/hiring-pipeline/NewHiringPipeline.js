import React, { useState, useMemo, useEffect } from 'react'
import Pipelines from './Pipelines'
import {
  useGetPipelineQuery,
  useDeletePipelineApiMutation,
  useAddPipelineApiMutation,
  useUpdatePipelineApiMutation,
} from '../../../redux/services/settings/PipelineService';
import { sortedDataFn } from '../../../utils/getSortedData';
import { showToast } from '../../../utils/toast';
import { useGetStagesQuery } from '../../../redux/services/settings/StageService';

function NewHiringPipeline() {
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
      fileds: [],
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
  
  }, [AddPipelineApiInfo, DeletePipelineInfo]);

  return (
    <div>
      <Pipelines />
    </div>
  )
}

export default NewHiringPipeline