import React, { useState, useEffect, useMemo } from 'react';
import MUIDataTable from 'mui-datatables';
import { sentenceCase } from 'change-case';
import { Link as RouterLink, useParams } from 'react-router-dom';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LoadingButton } from '@mui/lab';
// material
import {
  Card,
  Stack,
  Button,
  Container,
  Typography,
  ListItemIcon,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  DialogContent,
  Box,
} from '@mui/material';
// components
import Page from '../../../components/Page';
import Label from '../../../components/Label';
import Iconify from '../../../components/Iconify';
import JobModel from '../../../components/Mains/JobModel';
import { sortedDataFn } from '../../../utils/getSortedData';

import { showToast } from '../../../utils/toast';
import { useGetJobQuery, useDeleteJobMutation } from '../../../redux/services/jobs/JobServices';

// mock

const Jobs = () => {
  const [modelOpen, setModelOpen] = useState(false);

  const [detailsId, setDetailsId] = useState();
  const { data = [], refetch } = useGetJobQuery();
  const { editJobId } = useParams();
  console.log('list', data.list);

  const [currentIndex, setCurrentIndex] = useState(editJobId);
  const [deleteJob, deleteJobInfo] = useDeleteJobMutation();

  const onJobViewModel = (jobId) => {
    setModelOpen(true);
    setDetailsId(jobId);
  };
  const handleClose = () => {
    setModelOpen(false);
    refetch();

  };

  const sortData = useMemo(() => {
    const sortresult = sortedDataFn(data.list);
    return sortresult;
  }, [data]);

  // Delete Handler
  const onDeletJobeHandler = async (deleteId) => {
    // console.log("data index value",dataIndex);
    setCurrentIndex(deleteId);
    // console.log("current index value",currentIndex)

    await deleteJob(deleteId);
  };

  useEffect(() => {
    if (deleteJobInfo.isSuccess) {
      showToast('success', deleteJobInfo?.data?.msg);
      deleteJobInfo.reset();
      refetch();
    }
    if (deleteJobInfo.isError) {
      showToast('error', deleteJobInfo.error.data.msg);
      deleteJobInfo.reset();
      refetch();
    }
  }, [deleteJobInfo, refetch]);
  const columns = [
    {
      name: 'title',
      label: 'Job title',
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: 'created',
      label: 'Publishing Date',
      options: {
        filter: false,
        sort: false,
      },
    },
    {
      name: 'department',
      label: 'Department',
      options: {
        filter: false,
        sort: false,
      },
    },
    {
      name: 'owner',
      label: 'Owner',
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
            <Button
              style={{ minWidth: 0, marginRight: '5px' }}
              variant="contained"
              onClick={() => onJobViewModel(data.list[dataIndex].id)}
              color="info"
            >
              <ListItemIcon style={{ color: '#fff', padding: '0px', minWidth: 0 }}>
                <Iconify icon="carbon:view-filled" width={15} height={15} />
              </ListItemIcon>
            </Button>
            <Button
              style={{ minWidth: 0 }}
              variant="contained"
              component={RouterLink}
              to={`/dashboard/jobs/edit-job/${data.list[dataIndex].id}`}
              // onClick={() => onEditModalHandler(dataIndex)}
            >
              <ListItemIcon style={{ color: '#fff', padding: '0px', minWidth: 0 }}>
                <Iconify icon="ep:edit" width={15} height={15} />
              </ListItemIcon>
            </Button>
            <Button
              style={{ minWidth: 0, margin: '0px 5px' }}
              variant="contained"
              color="error"
              onClick={() => onDeletJobeHandler(data.list[dataIndex].id)}
              // onClick={() => onDeleteHandler(dataIndex)}
              // loading={dataIndex === currentIndex ? useDeleteAssessmentListMutation.isLoading : false}
            >
              <ListItemIcon style={{ color: '#fff', padding: '0px', minWidth: 0 }}>
                <Iconify icon="eva:trash-2-outline" width={15} height={15} />
              </ListItemIcon>
            </Button>
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
  // const data = [
  //   { name: 'Joe James', status: labelStatus },
  //   { name: 'John Walsh', status: labelStatus },
  //   { name: 'Bob Herm', status: labelStatus },
  //   { name: 'James Houston', status: labelStatus },
  // ];
  const options = {
    filterType: 'dropdown',
    responsive: 'stacked',
    filter: false,
    download: false,
    print: false,
  };

  // const getInputValue = (value) => {};

  const [value, setValue] = React.useState(null);

  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <Page title="User">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Jobs
          </Typography>
          <Button
            variant="contained"
            component={RouterLink}
            to="/dashboard/jobs/create-job"
            startIcon={<Iconify icon="eva:plus-fill" />}
          >
            New Job
          </Button>
        </Stack>
        <Card>
          <DialogContent>
            <Box sx={{ flexGrow: 1 }}>
              <Grid container spacing={2}>
                <Grid item xs={4}>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                      label="From Date"
                      value={value}
                      onChange={(newValue) => {
                        setValue(newValue);
                      }}
                      renderInput={(params) => <TextField {...params} sx={{ minWidth: '100%' }} />}
                    />
                  </LocalizationProvider>
                </Grid>
                <Grid item xs={4}>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                      label="To Date"
                      value={value}
                      onChange={(newValue) => {
                        setValue(newValue);
                      }}
                      renderInput={(params) => <TextField {...params} sx={{ minWidth: '100%' }} />}
                    />
                  </LocalizationProvider>
                </Grid>
                <Grid item xs={4}>
                  <FormControl sx={{ minWidth: '100%' }}>
                    <InputLabel id="demo-simple-select-autowidth-label">Experience</InputLabel>
                    <Select
                      labelId="demo-simple-select-autowidth-label"
                      id="demo-simple-select-autowidth-label"
                      value={age}
                      onChange={handleChange}
                      label="Experience"
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value={10}>Ten</MenuItem>
                      <MenuItem value={20}>Twenty</MenuItem>
                      <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={4}>
                  <FormControl sx={{ minWidth: '100%' }}>
                    <InputLabel id="demo-simple-select-autowidth-label">Skills</InputLabel>
                    <Select
                      labelId="demo-simple-select-autowidth-label"
                      id="demo-simple-select-autowidth-label"
                      value={age}
                      label="Skills"
                      onChange={handleChange}
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value={10}>Ten</MenuItem>
                      <MenuItem value={20}>Twenty</MenuItem>
                      <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={4}>
                  <FormControl sx={{ minWidth: '100%' }}>
                    <InputLabel id="demo-simple-select-autowidth-label">Job Applied</InputLabel>
                    <Select
                      labelId="demo-simple-select-autowidth-label"
                      id="demo-simple-select-autowidth-label"
                      value={age}
                      label="Job Applied"
                      onChange={handleChange}
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value={10}>Ten</MenuItem>
                      <MenuItem value={20}>Twenty</MenuItem>
                      <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={4}>
                  <FormControl sx={{ minWidth: '100%' }}>
                    <InputLabel id="demo-simple-select-autowidth-label">Education</InputLabel>
                    <Select
                      labelId="demo-simple-select-autowidth-label"
                      id="demo-simple-select-autowidth-label"
                      value={age}
                      label="Education"
                      onChange={handleChange}
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value={10}>Ten</MenuItem>
                      <MenuItem value={20}>Twenty</MenuItem>
                      <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={4}>
                  <FormControl sx={{ minWidth: '100%' }}>
                    <InputLabel id="demo-simple-select-autowidth-label">Hiring Status</InputLabel>
                    <Select
                      labelId="demo-simple-select-autowidth-label"
                      id="demo-simple-select-autowidth-label"
                      value={age}
                      label="Hiring Status"
                      onChange={handleChange}
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value={10}>Ten</MenuItem>
                      <MenuItem value={20}>Twenty</MenuItem>
                      <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={4}>
                  <FormControl sx={{ minWidth: '100%' }}>
                    <InputLabel id="demo-simple-select-autowidth-label">Sourced from</InputLabel>
                    <Select
                      labelId="demo-simple-select-autowidth-label"
                      id="demo-simple-select-autowidth-label"
                      value={age}
                      label="Sourced from"
                      onChange={handleChange}
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value={10}>Ten</MenuItem>
                      <MenuItem value={20}>Twenty</MenuItem>
                      <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={4} display="flex" justifyContent="end">
                  <Button
                    variant="contained"
                    component={RouterLink}
                    to="#"
                    startIcon={<Iconify icon="bi:filter-square-fill" />}
                  >
                    Apply Filter
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </DialogContent>
        </Card>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5} />
        <Card>
          <MUIDataTable title={'Job List'} data={data?.list} columns={columns} options={options} />
        </Card>
      </Container>
      {modelOpen && detailsId && <JobModel open={modelOpen} handleClose={handleClose} detailsId={detailsId} />}
    </Page>
  );
};

export default Jobs;
