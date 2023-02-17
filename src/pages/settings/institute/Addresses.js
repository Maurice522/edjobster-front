import React, { useState, useEffect } from 'react';
import MUIDataTable from 'mui-datatables';
import { Link as RouterLink } from 'react-router-dom';
import { LoadingButton } from '@mui/lab';
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
// eslint-disable-next-line import/no-unresolved
import { useGetAddressesQuery, useDeleteAddressesMutation, useAddAddressesMutation, useUpdateAddressesMutation } from '../../../redux/services/settings/AddressesService';
import SettingModalAddress from '../../../components/settings/SettingModalAddress';
import Page from '../../../components/Page';
import Iconify from '../../../components/Iconify';
import DataTableLazyLoading from '../../../components/lazyloading/DataTableLazyLoading';
import { showToast } from "../../../utils/toast";


// mock

const Addresses = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const { data = [], isLoading, refetch } = useGetAddressesQuery();
  const [PostAddress, PostAddressInfo] = useAddAddressesMutation();
  const [UpdateAddress, UpdateAddressInfo] = useUpdateAddressesMutation();
  const [DeleteAddress, DeleteAddressInfo] = useDeleteAddressesMutation();
  const [currentIndex, setCurrentIndex] = useState(null);
  const [modalType, setModalType] = useState("Add")
  const [addData, setAddData] = useState({
    id: null,
    name: "",
    address: "",
    city: "",
    pincode: "",
    country: "",
    state: "",
  })


  useEffect(() => {
    if (PostAddressInfo.isSuccess) {
      setModalOpen(false);
      refetch();
      showToast("success", "address successfully added.");
      // setBtnLoader(false);
      PostAddressInfo.reset();
    }
    if (PostAddressInfo.isError) {
      showToast("error", PostAddressInfo.error.data.msg);
      // setBtnLoader(false);
      PostAddressInfo.reset();
    }
    if (UpdateAddressInfo.isSuccess) {
      refetch();

      setModalOpen(false);
      // setBtnLoader(false);
      UpdateAddressInfo.reset();

    }
    if (UpdateAddressInfo.isError) {
      showToast("error", UpdateAddressInfo.error.data.msg);
      // setBtnLoader(false);
      UpdateAddressInfo.reset();
    }
  }, [PostAddressInfo, UpdateAddressInfo,refetch])

  console.log("arry data", data?.data)


  // delete Address

  if (isLoading) {
    return <DataTableLazyLoading />
  }
  if (DeleteAddressInfo.isSuccess) {
    showToast("success", "degree successfully deleted.");
    DeleteAddressInfo.reset();
  }
  if (DeleteAddressInfo.isError) {
    showToast("error", DeleteAddressInfo.error.data.msg);
    DeleteAddressInfo.reset();
  }
  const onSubmitHandler = (value) => {
    if (modalType === "Add") {
      PostAddress({
        name: value?.name,
        address: value?.address,
        city: value?.city,
        pincode: value?.pincode,
        state: value?.state,
        country: value?.country,
      })
    } else {

      UpdateAddress({
        id: value?.id,
        name: value?.name,
        address: value?.address,
        city: value?.city,
        pincode: value?.pincode,
        state: value?.state,
        country: value?.country,
      })
    }
  }

  const onDeleteHandler = async (dataIndex) => {
    setCurrentIndex(dataIndex);
    const dataArr = data?.data;
    const currentDataObj = dataArr[dataIndex];
    await DeleteAddress(currentDataObj.id);
    refetch();
  }

  const modalHandleClose = (value) => {
    setModalOpen(value);
  };

  const emptyObjectFn = (currObj) => {
    const objData = { ...currObj };
    Object.keys(objData).forEach(key => {
      objData[key] = "";
    });
    return objData;
  }

  const addNewAddressHandler = () => {

    const emptyObj = emptyObjectFn(addData)
    setAddData(emptyObj);
    setModalOpen(true);
    setModalType("Add");
  };

  const onEditModalHandler = (dataIndex) => {
    const dataArr = data?.data;
    const currentDataObj = dataArr[dataIndex];
    setAddData({
      id: currentDataObj.id,
      name: currentDataObj.name,
      address: currentDataObj.address,
      city: currentDataObj.city_id,
      pincode: currentDataObj.pincode,
      // country: currentDataObj.country_id,
      // state: currentDataObj.state_id,
    })
    setModalOpen(true);
    setModalType("Update");
  };
  const columns = [
    {
      name: "id",
      label: "Address Id",
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
        setCellProps: () => ({ style: { maxWidth: '250px' } }),
      },
    },
    {
      name: 'address',
      label: 'Address',
      options: {
        filter: true,
        sort: true,
        setCellProps: () => ({ style: { maxWidth: '420px' } }),
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
              <ListItemIcon style={{ color: "#fff", padding: "0px", minWidth: 0 }}>
                <Iconify icon="ep:edit" width={24} height={24} />
              </ListItemIcon>
            </Button>
            <LoadingButton style={{ minWidth: 0, margin: "0px 5px" }} variant="contained" color="error"
              onClick={() => onDeleteHandler(dataIndex)} loading={dataIndex === currentIndex ? DeleteAddressInfo.isLoading : false}
            >
              <ListItemIcon style={{ color: "#fff", padding: "0px", minWidth: 0 }}>
                <Iconify icon="eva:trash-2-outline" width={24} height={24} />
              </ListItemIcon>
            </LoadingButton>
          </>
        )
      },
    },
  ];


  const options = {
    filterType: 'dropdown',
  };


  return (
    <Page title="User">
      <Container>
        <Stack 
          direction="row" 
          alignItems="center" 
          justifyContent="space-between" 
          mb={5}
        >
          <h2
            style={{
              paddingTop:"0px",
              marginToppaddingTop:"0px"
            }}
          >
            Addresses
          </h2>
          <Button
            variant="contained"
            component={RouterLink}
            to="#"
            onClick={addNewAddressHandler}
            startIcon={<Iconify icon="eva:plus-fill" />}
          >
            New Address
          </Button>
        </Stack>

        <Card>
          <MUIDataTable 
            title={'Address List'} 
            data={data?.data} 
            columns={columns} 
            options={options} 
          />
        </Card>
      </Container>
      <SettingModalAddress 
        open={modalOpen} 
        handleClose={modalHandleClose} 
        formData={addData} 
        type={modalType} 
        onSubmitData={onSubmitHandler} 
      />
    </Page>
  );
};

export default Addresses;
