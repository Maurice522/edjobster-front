import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
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

const steps = ['Fill Details', 'Complete assessment ', 'Submit'];

const Transition = React.forwardRef((props, ref) => {
    return <Slide direction="up" ref={ref} {...props} />;
});

const CandidatesApplyModel = (props) => {
    const [activeStep, setActiveStep] = React.useState(0);
    const [skipped, setSkipped] = React.useState(new Set());
    const [age, setAge] = React.useState('');

    const handleChange = (event) => {
        setAge(event.target.value);
    };

    const { open, handleClose } = props;

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
                                    Assistant Professor - Assistant Professor -Mechanical Engineering
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
                                                        <Grid item md={6}>
                                                            <TextField
                                                                id="outlined-basic"
                                                                label="Job title*"
                                                                variant="outlined"
                                                                fullWidth
                                                                size="small"
                                                                sx={{ mb: 2 }}
                                                            />
                                                            <FormControl sx={{ minWidth: 460, mb: 2 }} size="small">
                                                                <InputLabel id="demo-select-small">Department</InputLabel>
                                                                <Select
                                                                    labelId="demo-select-small"
                                                                    id="demo-select-small"
                                                                    value={age}
                                                                    label="Department"
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
                                                            <FormControl sx={{ minWidth: 460, mb: 2 }} size="small">
                                                                <InputLabel id="demo-select-small">Team member Involved</InputLabel>
                                                                <Select
                                                                    labelId="demo-select-small"
                                                                    id="demo-select-small"
                                                                    value={age}
                                                                    label="Team member Involved"
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
                                                            <FormControl sx={{ minWidth: 460, mb: 2 }} size="small">
                                                                <InputLabel id="demo-select-small">Job Nature*</InputLabel>
                                                                <Select
                                                                    labelId="demo-select-small"
                                                                    id="demo-select-small"
                                                                    value={age}
                                                                    label="Job Nature*"
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
                                                            <FormControl sx={{ minWidth: 460, mb: 2 }} size="small">
                                                                <InputLabel id="demo-select-small">Major/ Speciality</InputLabel>
                                                                <Select
                                                                    labelId="demo-select-small"
                                                                    id="demo-select-small"
                                                                    value={age}
                                                                    label="Major/ Speciality"
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
                                                            <Grid container spacing={3}>
                                                                <Grid item md={6}>
                                                                    <FormControl sx={{ minWidth: 210, mb: 2 }} size="small">
                                                                        <InputLabel id="demo-select-small">Salary Min</InputLabel>
                                                                        <Select
                                                                            labelId="demo-select-small"
                                                                            id="demo-select-small"
                                                                            value={age}
                                                                            label="Salary Min"
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
                                                                <Grid item md={6}>
                                                                    <FormControl sx={{ minWidth: 220, mb: 2 }} size="small">
                                                                        <InputLabel id="demo-select-small">Salary Max</InputLabel>
                                                                        <Select
                                                                            labelId="demo-select-small"
                                                                            id="demo-select-small"
                                                                            value={age}
                                                                            label="Salary Max"
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
                                                            </Grid>

                                                            <TextField
                                                                id="outlined-basic"
                                                                label="Country"
                                                                variant="outlined"
                                                                fullWidth
                                                                size="small"
                                                                sx={{ mb: 2 }}
                                                            />
                                                        </Grid>
                                                        <Grid item md={6}>
                                                            <TextField
                                                                id="outlined-basic"
                                                                label="Number Of Vacancies*"
                                                                variant="outlined"
                                                                fullWidth
                                                                size="small"
                                                                sx={{ mb: 2 }}
                                                            />
                                                            <TextField
                                                                id="outlined-basic"
                                                                label="Job Owner*"
                                                                variant="outlined"
                                                                fullWidth
                                                                size="small"
                                                                sx={{ mb: 2 }}
                                                            />
                                                            <FormControl sx={{ minWidth: 460, mb: 2 }} size="small">
                                                                <InputLabel id="demo-select-small">Type</InputLabel>
                                                                <Select
                                                                    labelId="demo-select-small"
                                                                    id="demo-select-small"
                                                                    value={age}
                                                                    label="Type"
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
                                                            <FormControl sx={{ minWidth: 460, mb: 2 }} size="small">
                                                                <InputLabel id="demo-select-small">Education</InputLabel>
                                                                <Select
                                                                    labelId="demo-select-small"
                                                                    id="demo-select-small"
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
                                                            <Grid container spacing={3}>
                                                                <Grid item md={6}>
                                                                    <FormControl sx={{ minWidth: 210, mb: 2 }} size="small">
                                                                        <InputLabel id="demo-select-small">Work Ex. min. (Years)*</InputLabel>
                                                                        <Select
                                                                            labelId="demo-select-small"
                                                                            id="demo-select-small"
                                                                            value={age}
                                                                            label="Work Ex. min. (Years)*"
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
                                                                <Grid item md={6}>
                                                                    <FormControl sx={{ minWidth: 220, mb: 2 }} size="small">
                                                                        <InputLabel id="demo-select-small">Work Ex. max.(Years)</InputLabel>
                                                                        <Select
                                                                            labelId="demo-select-small"
                                                                            id="demo-select-small"
                                                                            value={age}
                                                                            label="Work Ex. max.(Years)"
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
                                                            </Grid>
                                                            <Grid container spacing={3}>
                                                                <Grid item md={6}>
                                                                    <FormControl sx={{ minWidth: 210, mb: 2 }} size="small">
                                                                        <InputLabel id="demo-select-small">Currency</InputLabel>
                                                                        <Select
                                                                            labelId="demo-select-small"
                                                                            id="demo-select-small"
                                                                            value={age}
                                                                            label="Currency"
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
                                                                <Grid item md={6}>
                                                                    <FormControl sx={{ minWidth: 220, mb: 2 }} size="small">
                                                                        <InputLabel id="demo-select-small">Salary Type</InputLabel>
                                                                        <Select
                                                                            labelId="demo-select-small"
                                                                            id="demo-select-small"
                                                                            value={age}
                                                                            label="Salary Type"
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
                                                            </Grid>
                                                            <TextField
                                                                id="outlined-basic"
                                                                label="City"
                                                                variant="outlined"
                                                                fullWidth
                                                                size="small"
                                                                sx={{ mb: 2 }}
                                                            />
                                                        </Grid>
                                                    </Grid>
                                                </>
                                            ) : null}
                                            {activeStep === 1 ? (
                                                <>
                                                    <Grid container sx={{ mt: 5 }} style={{ display: 'flex', justifyContent: 'center' }}>
                                                        <Grid item md={8}>
                                                            <Card>
                                                                <CardContent>
                                                                    <Typography variant="h6">Do you have At least 5 years of experience?</Typography>
                                                                    <Box>
                                                                        <FormControlLabel value="female" control={<Radio />} label="Yes" />
                                                                    </Box>
                                                                    <Box>
                                                                        <FormControlLabel value="male" control={<Radio />} label="No" />
                                                                    </Box>

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
                                                    <Grid container sx={{ mt: 5 }} style={{ display: 'flex', justifyContent: 'center' }}>
                                                        <Grid item md={8}>
                                                            <Card>
                                                                <CardContent>
                                                                    <Box sx={{ mb: 2 }} style={{ display: "flex", justifyContent: "space-between" }}>
                                                                        <FormControlLabel control={<Checkbox defaultChecked />} label="Expertise  1" />
                                                                        <FormControlLabel control={<Checkbox defaultChecked />} label="Expertise  1" />

                                                                        <FormControlLabel control={<Checkbox defaultChecked />} label="Expertise  1" />

                                                                        <FormControlLabel control={<Checkbox defaultChecked />} label="Expertise  1" />

                                                                    </Box>
                                                                    <Box sx={{ mb: 2 }} style={{ display: "flex", justifyContent: "space-between" }}>
                                                                        <FormControlLabel control={<Checkbox defaultChecked />} label="Expertise  1" />
                                                                        <FormControlLabel control={<Checkbox defaultChecked />} label="Expertise  1" />

                                                                        <FormControlLabel control={<Checkbox defaultChecked />} label="Expertise  1" />

                                                                        <FormControlLabel control={<Checkbox defaultChecked />} label="Expertise  1" />

                                                                    </Box>


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

export default CandidatesApplyModel;
