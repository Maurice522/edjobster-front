import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import { Link as RouterLink, useParams, useNavigate } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import Typography from '@mui/material/Typography';
import FillDetails from './job-stepper-components/FillDetails';
import SelectAssessment from './job-stepper-components/SelectAssessment';
import SelectJobBoards from './job-stepper-components/SelectJobBoards';
import Publish from './job-stepper-components/Publish';
import AvailableJobsModel from '../../../components/Mains/AvilableJobsModel';
import JobPreViewModel from '../../../components/Mains/JobPreViewModel';
import { showToast } from '../../../utils/toast';
import { jobAction } from '../../../redux/job/JobReducer';
import { setJobList } from '../../../redux/job/JobListReducer';

import { useAddJobMutation, useGetJobQuery, useGetJobeDetailsQuery } from '../../../redux/services/jobs/JobServices';

function getSteps() {
  return ['Fill Details', 'Select Assessment', 'Select Job Boards', 'Publish'];
}

function getStepContent(step) {
  switch (step) {
    case 0:
      return <FillDetails />;
    case 1:
      return <SelectAssessment />;
    // case 2:
    //   return <SelectJobBoards />;
    // case 3:
    //   return <Publish />;
    case 2:
      return <Publish />;
    default:
      return 'Unknown step';
  }
}

const CreateJob = () => {
  const { editJobId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const job = useSelector((state) => state.job.job);
  const { data: allJobs, refetch } = useGetJobQuery();
  const { data: jobData } = useGetJobeDetailsQuery(editJobId,{skip: editJobId === undefined});
  const [addJobData, addJobDataInfo] = useAddJobMutation();
  const [modelOpen, setModelOpen] = useState(false);
  const [jobModelPublish, setJobModelPublish] = useState(false);

  // const [textValue, setTextValue] = useState({
  //   name: '',
  //   address: '',
  //   pincode: '',
  //   country: '',
  //   state: '',
  //   city: '',
  // });

  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState({});

  const steps = getSteps();

  const totalSteps = () => steps.length;

  const completedSteps = () => Object.keys(completed).length;

  const isLastStep = () => activeStep === totalSteps() - 1;

  const allStepsCompleted = () => completedSteps() === totalSteps();

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted() ? steps.findIndex((step, i) => !(i in completed)) : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step) => () => {
    setActiveStep(step);
  };

  // const handleComplete = () => {
  //   const newCompleted = completed;
  //   newCompleted[activeStep] = true;
  //   setCompleted(newCompleted);
  //   handleNext();
  // };

  const handleComplete = async () => {
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    handleNext();
    if (isValidateUpdateJob()) {
      await addJobData({...job, education: 1});
    }
  };
  useEffect(() => {
    if (jobData) {
      const textValue1 = {
        id: editJobId,
        title: jobData?.title,
        vacancies: jobData?.vacancies,
        department: jobData?.department,
        owner: jobData?.owner,
        assesment: jobData?.assesment,
        webform:jobData?.webform,
        webform_name:jobData?.webform?.name,
        member_ids: jobData?.members?.[0],
        member_names: jobData?.members,
        type: jobData?.type,
        nature: jobData?.nature,
        education: jobData?.educations,
        speciality: jobData?.speciality,
        exp_min: jobData?.exp_min,
        exp_max: jobData?.exp_max,
        salary_min: jobData?.salary_min,
        salary_max: jobData?.salary_max,
        currency: jobData?.currency,
        salary_type: jobData?.salary_type,
        state: jobData?.state?.id,
        state_name: jobData?.state?.name,
        city: jobData?.city,
        description: jobData?.description,
        job_boards: jobData?.job_boards,
        pipeline: jobData?.pipeline,
        active: jobData?.active,
        assesment_name: jobData?.assesment?.name,
        education_names: jobData?.educations,
        pipeline_name: jobData?.pipeline?.name,
        owner_name: jobData?.owner,
        city_name: jobData?.city?.city_name,
        department_name: jobData?.department?.department_name,
        address: jobData?.address,
      };
      console.log('Edit Job data recieved', textValue1);
      dispatch(jobAction(textValue1));
    }
  }, [dispatch, jobData]);

  useEffect(() => {
    if (addJobDataInfo.isSuccess) {
      showToast('success', 'Job created succesfully');
      const textValue1 = {
        title: '',
        vacancies: null,
        department: null,
        owner: '',
        assesment: null,
        member_ids: [],
        member_names: [],
        type: '',
        nature: '',
        education: '',
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
        assesment_name: '',
        webform:null,
        webform_name:'',
        education_names: [],
        pipeline_name: '',
        state_name: '',
        owner_name: '',
        department_name:'',
        city_name:'',

      };
      dispatch(jobAction(job));
      addJobDataInfo.reset();
      refetch();
      dispatch(setJobList(allJobs));
      navigate('/dashboard/jobs');
    }
    if (addJobDataInfo.isError) {
      showToast('error', addJobDataInfo.error.data.msg);
      console.log(addJobDataInfo.error)
      addJobDataInfo.reset();
      refetch();
    }
    return () => {
      const textValue2 = {
        title: '',
        vacancies: null,
        department: null,
        owner: '',
        assesment: null,
        member_ids: [],
        member_names: [],
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
        address:'',
        job_boards: ['Linedin-id'],
        pipeline: null,
        active: 1,
        assesment_name: '',
        education_names: [],
        pipeline_name: '',
        state_name: '',
        owner_name: '',
        department_name:'',
        city_name:'',
      };
      dispatch(jobAction(textValue2));
    };
  }, [addJobDataInfo.isSuccess, addJobDataInfo.isError, dispatch, addJobDataInfo, refetch, allJobs, navigate]);

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };
  const isValidateUpdateJob = () => {
    let status = true;
    if (job.title === null || job.title === '' || job.title === undefined) {
      status = false;
      showToast('error', 'fill the title');
    }
    if (job.vacancies === null || job.vacancies === '' || job.vacancies === undefined) {
      status = false;
      showToast('error', 'fill the number of vacancies');
    }
    if (job.department === null || job.department === '' || job.department === undefined) {
      status = false;
      showToast('error', 'fill the department');
    }
    if (job.owner === null || job.owner === '' || job.owner === undefined) {
      status = false;
      showToast('error', 'fill the owner');
    }
    if (job.education === null || job.education === '' || job.education === undefined) {
      status = false;
      showToast('error', 'fill the education');
    }
    // if (job.member_ids === null || job.member_ids === '' || job.member_ids === undefined) {
    //   status = false;
    //   showToast('error', 'fill the team members');
    // }
    if (job.type === null || job.type === '' || job.type === undefined) {
      status = false;
      showToast('error', 'fill the type');
    }
    if (job.nature === null || job.nature === '' || job.nature === undefined) {
      status = false;
      showToast('error', 'fill the job nature');
    }

    if (job.speciality === null || job.speciality === '' || job.speciality === undefined) {
      status = false;
      showToast('error', 'fill the speciality');
    }
    if (job.exp_min === null || job.exp_min === '' || job.exp_min === undefined) {
      status = false;
      showToast('error', 'fill the number of exp_min');
    }
    if (job.exp_max === null || job.exp_max === '' || job.exp_max === undefined) {
      status = false;
      showToast('error', 'fill the exp_max');
    }
    if (job.salary_min === null || job.salary_min === '' || job.salary_min === undefined) {
      status = false;
      showToast('error', 'fill the number of salary_min');
    }
    if (job.salary_max === null || job.salary_max === '' || job.salary_max === undefined) {
      status = false;
      showToast('error', 'fill the salary_max');
    }
    if (job.currency === null || job.currency === '' || job.currency === undefined) {
      status = false;
      showToast('error', 'fill the team currency');
    }
    if (job.salary_type === null || job.salary_type === '' || job.salary_type === undefined) {
      status = false;
      showToast('error', 'fill the salary_type');
    }
    if(job.address ===null || job.address === '' || job.address === undefined) {
      status = false;
      showToast('error', 'fill the Address state');
    }
    if (job.description === null || job.description === '' || job.description === undefined) {
      status = false;
      showToast('error', 'fill the team description');
    }
    if (job.pipeline === null || job.pipeline === '' || job.pipeline === undefined) {
      status = false;
      showToast('error', 'fill the pipeline');
    }

    console.log("status: ", status);

    return status;
  };
  // for New Page Ui

  const avilableJobs = () => {
    setJobModelPublish(true);
  };

  const handleClose = () => {
    setModelOpen(false);
  };
  const handleJobClose=()=>{
    setJobModelPublish(false)
  }
  const onJobPreviewModel = () => {
    setModelOpen(true);
  };

  return (
    <>
      <Grid container spacing={2} padding="20px">
        <Grid item xs={6} display="flex">
          <Grid>
            <IconButton edge="start" color="inherit" aria-label="close" component={RouterLink} to="/dashboard/jobs">
              <CloseIcon />
            </IconButton>
          </Grid>
          <Grid>
            <Typography variant="h4" gutterBottom>
              {editJobId ? 'Update' : 'Create'} job
            </Typography>
          </Grid>
        </Grid>
        <Grid item xs={6} display="flex" justifyContent="right">
          {/* <Grid style={{ marginRight: 5 }}>
            <Button variant="contained" onClick={handleComplete} component={RouterLink} to="#">
              Save
            </Button>
          </Grid> */}
          {/* <Grid style={{ marginRight: 5 }}>
            <Button variant="contained" component={RouterLink} to="#" onClick={onJobPreviewModel}>
              Preview
            </Button>
          </Grid> */}
          <Grid style={{ marginRight: 5 }}>
            <Button variant="contained" onClick={handleComplete}>
              Publish
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <Card style={{ padding: 20 }}>
        <div>
          <Stepper nonLinear activeStep={activeStep}>
            {steps.map((label, index) => (
              <Step key={label}>
                <StepButton onClick={handleStep(index)} completed={completed[index]}>
                  {label}
                </StepButton>
              </Step>
            ))}
          </Stepper>

          <div>
            {allStepsCompleted() ? (
              <div>
                <Typography>All steps completed - you&apos;re finished</Typography>
                <Button onClick={handleReset}>Reset</Button>
              </div>
            ) : (
              <div>
                <Typography style={{ display: 'flex', justifyContent: 'center' }}>
                  {getStepContent(activeStep)}
                </Typography>

                <div style={{ display: 'flex', justifyContent: 'end' }}>
                  <Button disabled={activeStep === 0} onClick={handleBack} style={{ marginRight: '5px' }}>
                    Back
                  </Button>
                  <Button variant="contained" color="primary" onClick={handleNext} style={{ marginRight: '5px' }}>
                  {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                  </Button>
                  {/* {activeStep !== steps.length &&
                    (completed[activeStep] ? (
                      <Typography variant="caption">Step {activeStep + 1} already completed</Typography>
                    ) : (
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={handleComplete}
                        style={{ marginRight: '5px' }}
                      >
                        {completedSteps() === totalSteps() - 1 ? 'Finish' : 'Complete Step'}
                      </Button>
                    ))} */}
                </div>
              </div>
            )}
          </div>
        </div>
      </Card>
      <AvailableJobsModel open={jobModelPublish} handleClose={handleJobClose} />

      <JobPreViewModel open={modelOpen} handleClose={handleClose} />
    </>
  );
};

export default CreateJob;
