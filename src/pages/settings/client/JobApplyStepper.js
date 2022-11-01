import * as React from 'react';
import { useSelector } from 'react-redux';
import {Box, Grid, Stepper, Step, StepLabel, Button, Typography, Container, Card, Stack} from '@mui/material';
import Page from '../../../components/Page';
import WebformFillup from './WebformFillup';
import AssementFillup from './AssementFillup';
import { useAddApplyJobMutation } from '../../../redux/services/candidate/CandidateServices';

const steps = [{title: 'Fill Details', component: <WebformFillup /> }, {title: 'Complete Assessments', component: <AssementFillup />}, {title: 'Preview & Apply', component: <div>Preview</div>}];

export default function JobApplyStepper() {
  const selectedJob = useSelector((state) => state.selectedJob.job);
  const webFormData = useSelector((state) => state.jobApplyWebFormData);
  const [applyToJob, { isLoading, isSuccess }] = useAddApplyJobMutation();
  
  
  const handleSubmit = () => {
    const formData = new FormData();
    formData.append("job_id", (selectedJob.id).toString());

    Object.keys(webFormData).map((key) =>
      formData.append(key, webFormData[key])
    )
    applyToJob(formData);
  }
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());

  const isStepOptional = () => false;

  const isStepSkipped = (step) => skipped.has(step);

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };


  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <Page title="Apply To Job">
      <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Apply To Job
          </Typography>
        </Stack>
        <Card>
        <Grid>
        <Box sx={{ width: '100%', padding: '20px' }}>
          <Stepper activeStep={activeStep}>
            {steps.map((step, index) => {
              const stepProps = {};
              const labelProps = {};
              const Component = step.component;
              if (isStepOptional(index)) {
                labelProps.optional = (
                  <Typography variant="caption">Optional</Typography>
                );
              }
              if (isStepSkipped(index)) {
                stepProps.completed = false;
              }
              return (
                <Step key={step.title} {...stepProps}>
                  <StepLabel {...labelProps}>{step.title}</StepLabel>
                </Step>
              );
            })}
          </Stepper>
          <div style={{ paddingTop: '5%' }}>
            {steps[activeStep].component}
          </div>
          <>
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Back
              </Button>
              <Box sx={{ flex: '1 1 auto' }} />
              {isStepOptional(activeStep) && (
                <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                  Skip
                </Button>
              )}

              <Button onClick={activeStep !== steps.length - 1 ? handleNext : handleSubmit}>
                {activeStep === steps.length - 1 ? 'Apply' : 'Next'}
              </Button>
            </Box>
          </>
        </Box>
        </Grid>
      </Card>
    </Container>
    </Page>
  );
}