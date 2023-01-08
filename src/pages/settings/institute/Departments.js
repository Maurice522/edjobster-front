import { useState, useEffect, useMemo } from 'react';
// material
import {
  Stack, Container
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
// components
// eslint-disable-next-line import/no-unresolved
import { sortedDataFn } from 'src/utils/getSortedData';
import { DataGrid } from '@mui/x-data-grid';
import DepartmentSettingModal from './DepartmentSettingModal';
import Page from '../../../components/Page';
// eslint-disable-next-line import/named
import {
  useDepartmentGetQuery,
  useAddDepartmentMutation,
  useUpdateDepartmentMutation,
  useDeleteDepartmentMutation,
} from '../../../redux/services/settings/DepartmentService';
import DataTableLazyLoading from '../../../components/lazyloading/DataTableLazyLoading';
import { showToast } from '../../../utils/toast';

const Departments = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [editmodalOpen, setEditModalOpen] = useState(false);
  const { data = [], isLoading, refetch } = useDepartmentGetQuery();
  const [AddDepartment, AddDepartmentInfo] = useAddDepartmentMutation();
  const [UpdateDepartment, UpdateDepartmentInfo] = useUpdateDepartmentMutation();
  const [DeleteDepartment, DeleteDepartmentInfo] = useDeleteDepartmentMutation();
  const [currentIndex, setCurrentIndex] = useState(null);
  const [btnLoader, setBtnLoader] = useState(false);

  const [addValue, setAddValue] = useState({
    name: ''
  });
  const [editValue, setEditValue] = useState({
    id: undefined,
    name: ''
  });
  const [modalName, setModalName] = useState('add');

  const sortedData = useMemo(() => {
    const result = sortedDataFn(data.data);
    return result;
  }, [data])

  useEffect(() => {
    if (AddDepartmentInfo.isSuccess) {
      setModalOpen(false);
      refetch();
      showToast('success', 'department successfully added.');
      setBtnLoader(false);
      AddDepartmentInfo.reset();
    }
    if (AddDepartmentInfo.isError) {
      showToast('error', AddDepartmentInfo.error.data.msg);
      setBtnLoader(false);
      AddDepartmentInfo.reset();
    }
    if (UpdateDepartmentInfo.isSuccess) {
      refetch();
      showToast('success', 'department successfully updated.');
      setEditModalOpen(false);
      setBtnLoader(false);
      UpdateDepartmentInfo.reset();
    }
    if (UpdateDepartmentInfo.isError) {
      showToast('error', UpdateDepartmentInfo.error.data.msg);
      setBtnLoader(false);
      UpdateDepartmentInfo.reset();
    }
  }, [modalOpen, AddDepartmentInfo, setModalOpen, refetch, setBtnLoader, setEditModalOpen, UpdateDepartmentInfo]);

  if (isLoading) {
    return <DataTableLazyLoading />
  }
  if (DeleteDepartmentInfo.isSuccess) {
    showToast('success', 'department successfully deleted.');
    DeleteDepartmentInfo.reset();
  }
  if (DeleteDepartmentInfo.isError) {
    showToast('error', DeleteDepartmentInfo.error.data.msg);
    DeleteDepartmentInfo.reset();
  }


  const modalHandleClose = () => {
    setModalOpen(false);
    setEditModalOpen(false);
  };

  const addNewDepartmentHandler = () => {
    setModalOpen(true);
    setModalName('Add');
  };

  const onEditModalHandler = (dataIndex) => {
    const dataArr = sortedData;
    const currentDataObj = dataArr[dataIndex];
    setEditValue(dataIndex.row)
    setEditModalOpen(true);
    setModalName('Edit');
    console.log(dataIndex.row)
  };

  const onDeleteHandler = async (dataIndex) => {
    setCurrentIndex(dataIndex)
    const dataArr = sortedData;
    const currentDataObj = dataArr[dataIndex];
    await DeleteDepartment(dataIndex.id);
    refetch();
  };
  const columns = [
    {
      name: 'id',
      label: 'Department Id',
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
            loading={dataIndex === currentIndex ? DeleteDepartmentInfo.isLoading : false}
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
    //   field: 'id',
    //   headerName: 'Department Id',
    //   options: {
    //     filter: true,
    //     sort: true,
    //   },
    // },
    {
      field: 'name',
      headerName: 'Name',
      width:900,
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
                  loading={dataIndex === currentIndex ? DeleteDepartmentInfo.isLoading : false}
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
      await AddDepartment(addValue);
      // setAddValue({ name: "" })
    }else {
      await UpdateDepartment(editValue);
    }
  };

  const addChangeHandler = (e) => {
    setAddValue({ [e.target.name]: e.target.value });
  };
  const editChangeHandler = (e) => {
    setEditValue({ ...editValue, [e.target.name]: e.target.value });
  };
  return (
    <Page title="Department">
      <Container sx={{
        marginTop:"0"
      }}>
        <Stack direction="row" alignItems="center" justifyContent="flex-end" mb={5} sx={{marginTop:"0"}}>
          <AddCircleRoundedIcon onClick={addNewDepartmentHandler}
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
      <DepartmentSettingModal
        open={modalOpen}
        handleClose={modalHandleClose}
        label="Department Name"
        type="text"
        textboxlabel="Add Department"
        id="depratmentName"
        name="name"
        value={addValue.name}
        onChangeHandle={addChangeHandler}
        buttonlabel="Add Department"
        addClickHandler={addClickHandler}
        loadingbtn={btnLoader}
      />
      <DepartmentSettingModal
        open={editmodalOpen}
        handleClose={modalHandleClose}
        label="Edit Department"
        type="text"
        textboxlabel="Department Name"
        id="editDepratmentName"
        name="name"
        value={editValue.name}
        onChangeHandle={editChangeHandler}
        buttonlabel="Update Department"
        addClickHandler={addClickHandler}
        loadingbtn={btnLoader}
      />
    </Page>
  );
};

export default Departments;
