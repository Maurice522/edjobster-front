import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import {
    CardContent,
    Typography,
    Card,
    Grid,
    Divider,
    ListItemIcon,
    TextField,
    InputLabel,
    Box,
    Menu,
    FormControl,
    Select,
    MenuItem,
    Tooltip,
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Avatar,
} from '@mui/material';
import Iconify from '../Iconify';
import SingleViewJobModel from './SingleViewJobModel';





const Transition = React.forwardRef((props, ref) => {
    return <Slide direction="up" ref={ref} {...props} />;
});

const AvilableJobsModel = (props) => {

    const [modelOpen, setModelOpen] = useState(false);

    const [age, setAge] = useState('');

    const selecttextfiled = (event) => {
        setAge(event.target.value);
    };

    function generate(element) {
        return [0, 1, 2].map((value) =>
            React.cloneElement(element, {
                key: value,
            }),
        );
    }

    const onViewDetailsModel = () => {
        setModelOpen(true);
    }

    const ModelhandleClose = () => {
        setModelOpen(false);
    };

    const { open, handleClose } = props;


    return (
        <>
            <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
                <AppBar sx={{ position: 'relative' }} style={{ backgroundColor: '#fff' }}>
                    <Toolbar>
                        <IconButton edge="start" color="secondary" onClick={handleClose} aria-label="close">
                            <CloseIcon />
                        </IconButton>
                        <Grid container spacing={3}>
                            <Grid item md={1} style={{ display: "flex", justifyContent: "end", alignItems: "center" }}>
                                <Avatar
                                    alt="Remy Sharp"
                                    src="/static/images/avatar/1.jpg"
                                    sx={{ width: 90, height: 90 }}
                                />
                            </Grid>
                            <Grid item md={11} style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Typography variant="subtitle1" style={{ color: '#000' }} sx={{ mt: 2, mb: 2 }}>
                                    Imperial College of Engineering <br />
                                    <Typography variant="body2" sx={{ mt: 1 }}>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ultricies accumsan cursus aliquet blandit interdum. Cursus lobortis lorem eu, semper. Interdum lorem et integer ac aliquam porttitor quam consequat. Venenatis nunc malesuada euismod iaculis.
                                    </Typography>
                                </Typography>
                            </Grid>
                        </Grid>
                    </Toolbar>
                </AppBar>

                <Grid container sx={{ mt: 1, pl: 2, pr: 2, mb: 1 }} spacing={2} style={{ display: "flex", alignItems: "center" }}>
                    <Grid item md={9}>
                        <Typography variant='h4'> Available Jobs (09)</Typography>
                    </Grid>
                    <Grid item md={3} style={{ display: "flex", justifyContent: "end" }}>
                        <FormControl sx={{ m: 1, minWidth: 300 }}>
                            <InputLabel id="demo-simple-select-helper-label">Sort by New to Old</InputLabel>
                            <Select
                                labelId="demo-simple-select-helper-label"
                                id="demo-simple-select-helper"
                                value={age}
                                label="Sort by New to Old"
                                onChange={selecttextfiled}
                                fullWidth
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
                <Divider variant="middle" />
                <Grid container sx={{ mt: 3, pl: 3, pr: 3 }} style={{ overflow: "auto" }}>
                    <Grid item md={12}>
                        <Card style={{ backgroundColor: "#f9f9f9" }}>
                            <CardContent>
                                <Grid container style={{ display: "flex", alignItems: "center" }}>
                                    <Grid item md={10}>
                                        <Typography sx={{ mb: 2 }} variant='h6'>Assistant Professor - Mechanical Engineering
                                        </Typography>
                                        <Box style={{ display: "flex", flexDirection: 'row' }}>
                                            <Typography variant='body2' component="span" style={{ display: "flex", alignItems: "center", marginRight: "30px" }}> <Iconify icon="carbon:location-filled" width={20} height={20} style={{ color: "#109CF1", marginRight: "5px" }} />  Nagpur</Typography>
                                            <Typography variant='body2' component="span" style={{ display: "flex", alignItems: "center" }} > <Iconify icon="bx:briefcase-alt-2" width={20} height={20} style={{ color: "#109CF1", marginRight: "5px" }} />  Experience 5 to 8 Years</Typography>
                                        </Box>
                                    </Grid>
                                    <Grid item md={2} style={{ display: "flex", justifyContent: "end" }}>
                                        <Button
                                            style={{ minWidth: 0, margin: '0px 5px', }}
                                            variant="contained"
                                            color="primary"
                                            onClick={onViewDetailsModel}
                                        >
                                            View Details
                                        </Button>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                        <Card style={{ backgroundColor: "#f9f9f9" }} sx={{ mt: 5 }}>
                            <CardContent>
                                <Grid container style={{ display: "flex", alignItems: "center" }}>
                                    <Grid item md={10}>
                                        <Typography sx={{ mb: 2 }} variant='h6'>Assistant Professor - Mechanical Engineering
                                        </Typography>
                                        <Box style={{ display: "flex", flexDirection: 'row' }}>
                                            <Typography variant='body2' component="span" style={{ display: "flex", alignItems: "center", marginRight: "30px" }}> <Iconify icon="carbon:location-filled" width={20} height={20} style={{ color: "#109CF1", marginRight: "5px" }} />  Nagpur</Typography>
                                            <Typography variant='body2' component="span" style={{ display: "flex", alignItems: "center" }} > <Iconify icon="bx:briefcase-alt-2" width={20} height={20} style={{ color: "#109CF1", marginRight: "5px" }} />  Experience 5 to 8 Years</Typography>
                                        </Box>
                                    </Grid>
                                    <Grid item md={2} style={{ display: "flex", justifyContent: "end" }}>
                                        <Button
                                            style={{ minWidth: 0, margin: '0px 5px', }}
                                            variant="contained"
                                            color="primary"
                                            onClick={onViewDetailsModel}
                                        >
                                            View Details
                                        </Button>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                        <Card style={{ backgroundColor: "#f9f9f9" }} sx={{ mt: 5 }}>
                            <CardContent>
                                <Grid container style={{ display: "flex", alignItems: "center" }}>
                                    <Grid item md={10}>
                                        <Typography sx={{ mb: 2 }} variant='h6'>Assistant Professor - Mechanical Engineering
                                        </Typography>
                                        <Box style={{ display: "flex", flexDirection: 'row' }}>
                                            <Typography variant='body2' component="span" style={{ display: "flex", alignItems: "center", marginRight: "30px" }}> <Iconify icon="carbon:location-filled" width={20} height={20} style={{ color: "#109CF1", marginRight: "5px" }} />  Nagpur</Typography>
                                            <Typography variant='body2' component="span" style={{ display: "flex", alignItems: "center" }} > <Iconify icon="bx:briefcase-alt-2" width={20} height={20} style={{ color: "#109CF1", marginRight: "5px" }} />  Experience 5 to 8 Years</Typography>
                                        </Box>
                                    </Grid>
                                    <Grid item md={2} style={{ display: "flex", justifyContent: "end" }}>
                                        <Button
                                            style={{ minWidth: 0, margin: '0px 5px', }}
                                            variant="contained"
                                            color="primary"
                                            onClick={onViewDetailsModel}
                                        >
                                            View Details
                                        </Button>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                        <Card style={{ backgroundColor: "#f9f9f9" }} sx={{ mt: 5 }}>
                            <CardContent>
                                <Grid container style={{ display: "flex", alignItems: "center" }}>
                                    <Grid item md={10}>
                                        <Typography sx={{ mb: 2 }} variant='h6'>Assistant Professor - Mechanical Engineering
                                        </Typography>
                                        <Box style={{ display: "flex", flexDirection: 'row' }}>
                                            <Typography variant='body2' component="span" style={{ display: "flex", alignItems: "center", marginRight: "30px" }}> <Iconify icon="carbon:location-filled" width={20} height={20} style={{ color: "#109CF1", marginRight: "5px" }} />  Nagpur</Typography>
                                            <Typography variant='body2' component="span" style={{ display: "flex", alignItems: "center" }} > <Iconify icon="bx:briefcase-alt-2" width={20} height={20} style={{ color: "#109CF1", marginRight: "5px" }} />  Experience 5 to 8 Years</Typography>
                                        </Box>
                                    </Grid>
                                    <Grid item md={2} style={{ display: "flex", justifyContent: "end" }}>
                                        <Button
                                            style={{ minWidth: 0, margin: '0px 5px', }}
                                            variant="contained"
                                            color="primary"
                                            onClick={onViewDetailsModel}
                                        >
                                            View Details
                                        </Button>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                    </Grid>

                </Grid>
            </Dialog>
            <SingleViewJobModel open={modelOpen} handleClose={ModelhandleClose} />
        </>
    );
};

export default AvilableJobsModel;
