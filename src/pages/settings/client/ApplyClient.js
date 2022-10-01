import React, { useEffect } from 'react';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { makeStyles } from '@mui/styles';
import {
  CardContent,
  Card,
  Grid,
  Divider,
  TextField,
  Box,
  Menu,
  MenuItem,
  Stepper,
  Step,
  StepLabel,
  FormControl,
  Select,
  InputLabel,
  Radio,
  FormControlLabel,
  Checkbox,
} from '@mui/material';

import { useGetWebformDetailsQuery } from '../../../redux/services/settings/WebformService';
import { useGetAssesmentQuestionsQuery } from '../../../redux/services/main/AssesmentQuestionsService';

const steps = ['Fill Details', 'Complete assessment ', 'Submit'];
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const Transition = React.forwardRef((props, ref) => {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ApplyClient = (props) => {
  // const { assessmentEditId } = useParams();

  const { data: webFormDataById, isError, isLoading, refetch } = useGetWebformDetailsQuery(8);
  const { data: assesmentQuestionsData } = useGetAssesmentQuestionsQuery(94);

  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const [selectedFields, setSelectedFields] = React.useState([]);
  const [selectedAssesmentQuestion, setSelectedAssesmenntQuestion] = React.useState([]);

  const [age, setAge] = React.useState('');
  console.log('assesment question', assesmentQuestionsData);
  useEffect(() => {
    if (webFormDataById?.data) {
      setSelectedFields(webFormDataById.data.form);
    }
    if (assesmentQuestionsData?.data) {
      selectedAssesmentQuestion(assesmentQuestionsData.questions[0]);
    }
  }, [webFormDataById, assesmentQuestionsData]);

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const { open, handleClose, jobTitleData } = props;

  const isStepOptional = (step) => {
    return step === 1;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

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

  const step1 = () => {
    if (activeStep === 0) {
      return 'hello bilala Momin This';
    }
  };

  return (
    <>
      <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
        <AppBar sx={{ position: 'relative' }} style={{ backgroundColor: '#fff' }}>
          <Toolbar>
            <IconButton edge="start" color="secondary" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Grid container spacing={3}>
              <Grid item md={8} style={{ display: 'flex', alignItems: 'center' }}>
                <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div" style={{ color: '#000' }}>
                  {jobTitleData}
                </Typography>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
        <Grid container sx={{ mt: 3, pr: 2, pl: 2 }} style={{ display: 'flex', justifyContent: 'center' }}>
          <Grid item md={8}>
            <Card style={{ backgroundColor: '#f9f9f9f' }}>
              <CardContent>
                <Box sx={{ width: '100%' }}>
                  <Stepper activeStep={activeStep}>
                    {steps.map((label, index) => {
                      const stepProps = {};
                      const labelProps = {};
                      if (isStepOptional(index)) {
                        labelProps.optional = <Typography variant="caption">Bilal Momin</Typography>;
                      }
                      if (isStepSkipped(index)) {
                        stepProps.completed = false;
                      }
                      return (
                        <Step key={label} {...stepProps}>
                          <StepLabel>{label}</StepLabel>
                        </Step>
                      );
                    })}
                  </Stepper>
                  {activeStep === steps.length ? (
                    <>
                      <Typography sx={{ mt: 2, mb: 1 }}>All steps completed - you&apos;re finished</Typography>
                      <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                        <Box sx={{ flex: '1 1 auto' }} />
                        <Button onClick={handleReset}>Reset</Button>
                      </Box>
                    </>
                  ) : (
                    <>
                      {activeStep === 0 ? (
                        <>
                          <Grid container sx={{ mt: 1, mb: 1 }} spacing={5}>
                            <Grid item xs={12}>
                              <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                                {selectedFields &&
                                  selectedFields.map((item, index) => (
                                    <Grid
                                      item
                                      xs={6}
                                      style={{ display: 'flex', alignItems: 'center' }}
                                      key={`selectedfield-${item}-${index}`}
                                    >
                                      <Item>
                                        <TextField
                                          type={item.type}
                                          placeholder={item.name}
                                          margin="dense"
                                          variant="outlined"
                                          
                                          fullWidth
                                        />
                                      </Item>
                                    </Grid>
                                  ))}

                                {/* <Grid item xs={6}>
                            <Item>
                              <TextField autoFocus placeholder="LastName" margin="dense" variant="standard" fullWidth />
                            </Item>
                          </Grid>
                          <Grid item xs={6}>
                            <Item>
                              <TextField autoFocus placeholder="Email" margin="dense" variant="standard" fullWidth />
                            </Item>
                          </Grid>
                          <Grid item xs={6}>
                            <Item>
                              <TextField placeholder="Mobile" autoFocus margin="dense" variant="standard" fullWidth />
                            </Item>
                          </Grid> */}
                              </Grid>
                            </Grid>
                          </Grid>
                        </>
                      ) : null}
                      {activeStep === 1 ? (
                        <>
                          <Grid container sx={{ mt: 5 }} style={{ display: 'flex', justifyContent: 'center' }}>
                            <Grid item md={8}>
                              {assesmentQuestionsData?.questions.map((item,index) => {
                                return (
<>
                    {/* <Grid display="flex" item xs={12}>
                      <Grid item xs={11}>
                        <Typography variant="h5" gutterBottom>
                          Question {index + 1} : Text Question
                        </Typography>
                      </Grid>
                    </Grid> */}
                    <Grid item xs={11}>
                    <TextField
                      required
                      margin="dense"
                      variant="standard"
                      fullWidth
                       inputProps={{
                    readOnly: true,
                  }}
                      name="question"
                      value={item.question}
                    />
                  </Grid>
                  {item.options.map((opt, optIndex) => (
                            <Grid key={`options-${optIndex}`} display="flex" alignItems="end" item xs={12}>
                              <Grid item xs={11}>
                                <TextField
                                  required
                                  autoFocus
                                  margin="dense"
                                  variant="standard"
                                  placeholder={`Enter Option ${optIndex + 1}`}
                                  fullWidth
                                  name={opt}
                                  value={opt}
                                  label={`Option ${optIndex + 1}`}
                                />
                              </Grid>
                            </Grid>
                          ))}
                  </>

                                );
                              })}
                            </Grid>
                          </Grid>
                          <Grid container sx={{ mt: 5 }} style={{ display: 'flex', justifyContent: 'center' }}>
                            <Grid item md={8}>
                              <Card>
                                <CardContent>
                                  

                                  <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={handleNext}
                                    style={{ marginRight: '5px' }}
                                    sx={{ mt: 2 }}
                                  >
                                    Submit
                                  </Button>
                                </CardContent>
                              </Card>
                            </Grid>
                          </Grid>
                        </>
                      ) : null}
                      {activeStep === 2 ? <> Hello This is Step 3 </> : null}
                      <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                        <Button color="inherit" disabled={activeStep === 0} onClick={handleBack} sx={{ mr: 1 }}>
                          Back
                        </Button>
                        <Box sx={{ flex: '1 1 auto' }} />

                        <Button onClick={handleNext}>{activeStep === steps.length - 1 ? 'Finish' : 'Next'}</Button>
                      </Box>
                    </>
                  )}
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Dialog>
    </>
  );
};

export default ApplyClient;
