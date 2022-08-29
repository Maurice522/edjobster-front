import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import { Link as RouterLink, useParams } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import Typography from '@mui/material/Typography';
import { jobAction } from '../../../redux/job/JobReducer';

import {
  useAddJobMutation,
  useGetJobeDetailsQuery,
  useUpdateJobMutation,
} from '../../../redux/services/jobs/JobServices';
import FillDetails from './job-stepper-components/FillDetails';
import SelectAssessment from './job-stepper-components/SelectAssessment';
import SelectJobBoards from './job-stepper-components/SelectJobBoards';
import Publish from './job-stepper-components/Publish';
import { showToast } from '../../../utils/toast';

const CreateJob = () => {
  const { editJobId } = useParams();
  const [updateJobData, updateJobDataInfo] = useUpdateJobMutation();

  const dispatch = useDispatch();
  const job = useSelector((state) => state.job.job);
  const { data: jobData } = useGetJobeDetailsQuery(editJobId);
  const [addJobData, addJobDataInfo] = useAddJobMutation();

  // useGetDepartment

  const getSteps = () => ['Fill Details', 'Select Assessment', 'Select Job Boards', 'Publish'];

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return <FillDetails />;
      case 1:
        return <SelectAssessment />;
      case 2:
        return <SelectJobBoards />;
      case 3:
        return <Publish />;
      default:
        return 'Unknown step';
    }
  };

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

  // const handleComplete = async (questionIndex) => {

  //   await addJobData(textValue[questionIndex]);

  const handleComplete = async () => {
    console.log('checking function');
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    handleNext();
    console.log('job detailsssss:', job);
    if (editJobId) {
      updateJobData(job);
    } else {
      await addJobData(job);
    }
  };
  useEffect(() => {
    if (jobData) {
      dispatch(jobAction(jobData));
    }
  }, [jobData]);
  useEffect(() => {
    console.log('job addJobDataInfoaddJobDataInfo:', addJobDataInfo);
    if (addJobDataInfo.isSuccess) {
      console.log('job data on success');
      showToast('success', 'job form Sucessfully');
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
      addJobDataInfo.reset();
    }
    if (addJobDataInfo.isError) {
      showToast('error', 'not SuccessFul');
      addJobDataInfo.reset();
    }
    // return () => {
    //   const textValue2 = {
    //     title: '',
    //     vacancies: null,
    //     department: null,
    //     owner: '',
    //     assesment: null,
    //     member_ids: [],
    //     type: '',
    //     nature: '',
    //     education: [],
    //     speciality: '',
    //     exp_min: null,
    //     exp_max: null,
    //     salary_min: '',
    //     salary_max: '',
    //     currency: '',
    //     salary_type: '',
    //     state: null,
    //     city: '',
    //     description: '',
    //     job_boards: ['Linedin-id'],
    //     pipeline: null,
    //     active: 1,
    //   };
    //   dispatch(jobAction(textValue2));
    // };
  }, [addJobDataInfo, dispatch]);

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };

  return (
    <>
      <div>
        <Grid container spacing={2} padding="20px">
          <Grid item xs={6} display="flex">
            <Grid>
              <IconButton edge="start" color="inherit" aria-label="close" component={RouterLink} to="/dashboard/jobs">
                <CloseIcon />
              </IconButton>
            </Grid>
            <Grid>
              <Typography variant="h4" gutterBottom>
                {editJobId ? 'Edit' : 'Create'} a Job
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={6} display="flex" justifyContent="right">
            <Grid style={{ marginRight: 5 }}>
              <Button variant="contained">{editJobId ? 'Update' : 'Save'}</Button>
            </Grid>
            <Grid style={{ marginRight: 5 }}>
            {/* <Button
              variant="contained"
              component={RouterLink}
              to={`/dashboard/jobs/edit-job/${data.data[dataIndex].id}`} */}
            
              <Button variant="contained" component={RouterLink} to ={`/dashboard/jobs/job-preview/${editJobId}`}>
                Preview
              </Button>
            </Grid>
            
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
                  {/* <Typography>All steps completed - you&apos;re finished</Typography> */}
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
                      Next
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </Card>
      </div>
    </>
  );
};

export default CreateJob;
