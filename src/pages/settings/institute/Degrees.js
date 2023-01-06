import { useState, useEffect, useMemo } from 'react';
import MUIDataTable from 'mui-datatables';
// material
import {
  Stack, Container
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { DataGrid } from '@mui/x-data-grid';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
// components
// eslint-disable-next-line import/no-unresolved
import { sortedDataFn } from 'src/utils/getSortedData';
import DegreeSettingModal from './DegreeSettingModal';
import Page from '../../../components/Page';
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
    setEditValue(dataIndex)
    setEditModalOpen(true);
    setModalName("Edit");
  };

  const onDeleteHandler = async (dataIndex) => {
    setCurrentIndex(dataIndex)
    const dataArr = sortedData;
    const currentDataObj = dataArr[dataIndex];
    await DeleteDegree(dataIndex.id);
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
  const column = [
    // {
    //   field: 'id',
    //   headerName: 'Degree Id',
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
                  loading={dataIndex === currentIndex ? DeleteDegreeInfo.isLoading : false}
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
    if (modalName === "Add") {
      await AddDegree(addValue);
      setAddValue({ name: "" })
    } else {
      await UpdateDegree(editValue);
    }
  };

  const addChangeHandler = (e) => {
    console.log(e.target.value);
    setAddValue({ [e.target.name]: e.target.value });
  }

  const editChangeHandler = (e) => {
    setEditValue({ ...editValue, [e.target.name]: e.target.value })
  }

  return (
    <Page title="Degree">
      {/* <Container>
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
      </Container> */}
      <Container sx={{
        marginTop:"0"
      }}>
        <Stack direction="row" alignItems="center" justifyContent="flex-end" mb={5} sx={{marginTop:"0"}}>
          <AddCircleRoundedIcon onClick={addNewDegreeHandler}
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
