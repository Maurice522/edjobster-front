import React, { useState, useMemo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import MUIDataTable from 'mui-datatables';
import { sentenceCase } from 'change-case';
import { LoadingButton } from '@mui/lab';
import { Link as RouterLink, useParams } from 'react-router-dom';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
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
import { sortedDataFn } from '../../../utils/getSortedData';
import { showToast } from '../../../utils/toast';
import { useGetJobQuery, useDeleteJobMutation, useUpdateJobMutation } from '../../../redux/services/jobs/JobServices';
import { jobAction } from '../../../redux/job/JobReducer';

// mock

const Jobs = () => {
  const { data = [], refetch } = useGetJobQuery();
  const dispatch = useDispatch();

  const job = useSelector((state) => state.job.job);
  const [currentIndex, setCurrentIndex] = useState(null);
  const [deleteJob, deleteJobInfo] = useDeleteJobMutation();
  const [updateJobData, updateJobDataInfo] = useUpdateJobMutation();

  // const { data: jobData } = useGetJobQuery();

  console.log('data is fetching form job', data);
  const sortData = useMemo(() => {
    const sortresult = sortedDataFn(data.data);
    return sortresult;
  }, [data]);

  const onDeletAssesmenteHandler = async (dataIndex) => {
    setCurrentIndex(dataIndex);
    const dataArr = sortData;
    const currentDataObj = dataArr[dataIndex];
    await deleteJob(currentDataObj.id);
  };
  const onEditJobClicked = (rowData) => {
    console.log('edit row data', rowData);
    dispatch(jobAction(rowData));
    // const newCompleted = completed;
    // newCompleted[activeStep] = true;
    // setCompleted(newCompleted);
    // handleNext();
  };
  useEffect(() => {
    console.log('job UpdatedJobDataInfoaddJobDataInfo:', updateJobDataInfo);
    if (updateJobDataInfo.isSuccess) {
      console.log('job data on updated');
      showToast('success', 'job form Updated');
      const textValue1 = {
        title: '',
        vacancies: null,
        department: null,
        owner: '',
        assesment: null,
        member_ids: [],
        type: '',
        nature: '',
        education: [],
        speciality: '',
        exp_min: null,
        exp_max: null,
        salary_min: '',
        salary_max: '',
        currency: '',
        salary_type: '',
        state: null,
        city: '',
        description: '',
        job_boards: ['Linedin-id'],
        pipeline: null,
        active: 1,
      };
      dispatch(jobAction(textValue1));
      // const savedAssesmentRecord = addJobDataInfo.data.data.find((item) => item.name === assesmentName);
      updateJobDataInfo.reset();
    }
    if (updateJobDataInfo.isError) {
      showToast('error', 'not Updated');
      updateJobDataInfo.reset();
    }
  }, []);

  useEffect(() => {
    refetch();
  }, [refetch]);

  useEffect(() => {
    if (deleteJobInfo.isSuccess) {
      showToast('success', deleteJobInfo.data.msg);
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
      name: 'owner_id',
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
              style={{ minWidth: 0 }}
              variant="contained"
              component={RouterLink}
              to={`/dashboard/jobs/edit-job/${data.data[dataIndex].id}`}
              onClick={() => onEditJobClicked(data.data[dataIndex])}
            >
              <ListItemIcon style={{ color: '#fff', padding: '0px', minWidth: 0 }}>
                <Iconify icon="ep:edit" width={24} height={24} />
              </ListItemIcon>
            </Button>
            <LoadingButton
              style={{ minWidth: 0, margin: '0px 5px' }}
              variant="contained"
              color="error"
              onClick={() => onDeletAssesmenteHandler(dataIndex)}
              // loading={dataIndex === currentIndex ? useDeleteAssesmentMutation.isLoading : false}
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
      <Button component={RouterLink} to="/dashboard/jobs/edit-job">
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
    responsive: 'stacked',
    filter: false,
    download: false,
    print: false,
  };

  const getInputValue = (value) => {};

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
          <MUIDataTable title={'Job List'} data={data?.data} columns={columns} options={options} />
        </Card>
      </Container>
    </Page>
  );
};

export default Jobs;
