import React from 'react'
import { useNavigate } from 'react-router-dom';
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
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import FillWebForm from './Steps/FillWebForm';
import CompleteAssesment from './Steps/CompleteAssesment';
import Preview from './Steps/Preview';

const steps = ['Fill Details', 'Complete Assesment', 'Preview'];
function getStepContent(step) {
    switch (step) {
        case 0:
            return <FillWebForm />;
        case 1:
            return <CompleteAssesment />;
        case 2:
            return <Preview />;
        default:
            return 'Unknown step';
    }
}


function JobApplication() {
    const navigate = useNavigate()
    const [activeStep, setActiveStep] = React.useState(0);
    const [skipped, setSkipped] = React.useState(new Set());


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


    const handleReset = () => {
        setActiveStep(0);
    };


    return (
        <div>
            <Stack sx={{
                display: "flex",
                flexDirection: "row",

            }}>
                <ArrowBackIcon color="secondary" onClick={navigate('/dashboard/Institute-Description/Individual-Job')}  sx={{cursor:"pointer"}}/>
                <h1>Job Title</h1>
            </Stack>
            <Card>
                <div style={{width:"80%", marginLeft:"auto", marginRight:"auto",marginTop:"2%"}}>
                    <Stepper activeStep={activeStep} sx={{ fontSize: "xx-large" }}>
                        {steps.map((label, index) => {
                            const stepProps = {};
                            const labelProps = {};
                            return (
                                <Step key={label} {...stepProps}>
                                    <StepLabel {...labelProps}>{label}</StepLabel>
                                </Step>
                            );
                        })}
                    </Stepper>
                </div>
                <div>
                    {activeStep === steps.length ? (
                        <div>
                            <Typography sx={{ mt: 2, mb: 1 }}>
                                All steps completed - you&apos;re finished
                            </Typography>
                            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                                <Box sx={{ flex: '1 1 auto' }} />
                                <Button onClick={handleReset}>Reset</Button>
                            </Box>
                        </div>
                    ) : (
                        <div>
                            <div>
                                {getStepContent(activeStep)}
                            </div>
                            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2, marginBottom: '10px', marginLeft: '5px' }}>
                                <div style={{ display: "flex", alignItems: "center" }}>
                                    <Button
                                        className="next_btn"
                                        disabled={activeStep === 0}
                                        onClick={handleBack}
                                    >
                                        Back
                                    </Button>
                                </div>
                                <Box sx={{ flex: '1 1 auto' }} />
                                <div style={{ display: "flex", alignItems: "center" }}>
                                    <Button onClick={handleNext} className="next_btn">
                                        {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                                    </Button>
                                </div>
                            </Box>

                        </div>
                    )}
                </div>
            </Card>

        </div>
    )
}

export default JobApplication