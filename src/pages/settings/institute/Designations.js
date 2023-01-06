import { useState, useEffect, useMemo } from 'react';
// material
import { Stack, Container } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { DataGrid } from '@mui/x-data-grid';

import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
// components
// eslint-disable-next-line import/no-unresolved
import { sortedDataFn } from 'src/utils/getSortedData';
import DesignationSettingModal from './DesignationSettingModal';
import Page from '../../../components/Page';
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
    console.log(dataIndex)
    const dataArr = sortedData;
    const currentDataObj = dataArr[dataIndex];
    setEditValue(dataIndex);
    console.log(setEditValue)
    setEditModalOpen(true);
    setModalName('Edit');
  };

  const onDeleteHandler = async (dataIndex) => {
    setCurrentIndex(dataIndex);
    const dataArr = sortedData;
    const currentDataObj = dataArr[dataIndex];
    await DeleteDesignation(dataIndex.id);
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
  const column = [
    // {
    //   name: 'id',
    //   label: 'Designation Id',
    //   options: {
    //     filter: true,
    //     sort: true,
    //   },
    // },
    {
      field: 'name',
      headerName: 'Name',
      width: 900,
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      field: 'edit',
      headerName: 'Edit',
      width:50,
      renderCell: (dataIndex) => {
          return (
            <div>
               <EditIcon onClick={() => onEditModalHandler(dataIndex)}
                  sx={{
                    padding: '0px',
                    minWidth: '0',
                    cursor:"pointer",
                    color:"grey",
                    }}/>       
            </div>
          );
        }
      
    },
    {
      field: 'delete',
      headerName: 'Delete',
      width:100,
      renderCell: (dataIndex) => {
          return (
            <div>
                <DeleteIcon 
                  onClick={() => onDeleteHandler(dataIndex)}
                  loading={dataIndex === currentIndex ? DeleteDesignationInfo.isLoading : false}
                  sx={{
                    cursor:"pointer",
                    color:"grey",}}
                  />       
            </div>
          );
        }
      
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
      {/* <Container>
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
      </Container> */}
      <Container sx={{
        marginTop:"0"
      }}>
        <Stack direction="row" alignItems="center" justifyContent="flex-end" mb={5} sx={{marginTop:"0"}}>
          <AddCircleRoundedIcon onClick={addNewDesignationHandler}
          sx={{
            marginTop:"0",
            cursor:"pointer",
            color:"blue",
            fontSize:"40px"}}
          />
        </Stack>
        <div style={{ height: 400, width: '100%' }}>
          <DataGrid
            rows={sortedData}
            columns={column}
            options={options}
            sx={{
              backgroundColor:"#f9fafb"
            }}
            pageSize={5}
            rowsPerPageOptions={[5]}
            checkboxSelection
            disableSelectionOnClick
          />
        </div>
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
