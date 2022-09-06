import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { makeStyles } from '@mui/styles';
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

const useStyles = makeStyles({
    card_heading: {
        display: 'flex',
        justifyContent: 'center',
    },
    description: {
        fontSize: '32px',
        fontWeight: '37px',
    },
});

const Transition = React.forwardRef((props, ref) => {
    return <Slide direction="up" ref={ref} {...props} />;
});

const JobPreViewModel = (props) => {
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const [expanded, setExpanded] = React.useState(false);
    const [age, setAge] = useState('');

    const selecttextfiled = (event) => {
        setAge(event.target.value);
    };



    const { open, handleClose } = props;

    const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

    //   const [open, setOpen] = React.useState(false);

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };
    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    const handleClickOpen = () => {
        // setOpen(true);
    };

    //   const handleClose = () => {
    //     // setOpen(false);
    //   };

    return (
        <>
            <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
                <AppBar sx={{ position: 'relative' }} style={{ backgroundColor: '#fff' }}>
                    <Toolbar>
                        <IconButton edge="start" color="secondary" onClick={handleClose} aria-label="close">
                            <CloseIcon />
                        </IconButton>
                        <Grid container spacing={3}>
                            <Grid item md={12} style={{ display: 'flex', alignItems: 'center' }}>
                                <Typography variant="subtitle1" style={{ color: '#000' }} sx={{ mt: 2, mb: 2 }}>
                                    Preview | Assistant Professor - Mechanical Engineering                                </Typography>
                            </Grid>
                        </Grid>
                    </Toolbar>
                </AppBar>

                <Grid container sx={{ mt: 5, pl: 2, pr: 2 }}>
                    <Grid item md={3} />
                    <Grid item md={3}>
                        <Typography variant='subtitle1'>
                            Job title*
                            <Typography variant='body2'>
                                Assistant Professor - Mechanical Engineering
                            </Typography>
                        </Typography>

                        <Typography variant='subtitle1' sx={{ mt: 2 }}>
                            Department*
                        </Typography>
                        <Typography variant='body2'>
                            Mechanical
                        </Typography>
                        <Typography variant='subtitle1' sx={{ mt: 2 }}>
                            Team Members Involved
                        </Typography>
                        <Typography variant='body2'>
                            Petsi, Avinash
                        </Typography>
                        <Typography variant='subtitle1' sx={{ mt: 2 }}>
                            Job Nature*
                        </Typography>
                        <Typography variant='body2'>
                            In Campus
                        </Typography>
                        <Typography variant='subtitle1' sx={{ mt: 2 }}>
                            Major/ Speciality
                        </Typography>
                        <Typography variant='body2'>
                            Mechanical
                        </Typography>
                        <Grid container>
                            <Grid item md={4}>
                                <Typography variant='subtitle1' sx={{ mt: 2 }}>
                                    Salary Minimum
                                </Typography>
                                <Typography variant='body2'>
                                    52,000
                                </Typography>
                            </Grid>
                            <Grid item md={6}>
                                <Typography variant='subtitle1' sx={{ mt: 2 }}>
                                    Salary Max
                                </Typography>
                                <Typography variant='body2'>
                                    72,000
                                </Typography>
                            </Grid>
                        </Grid>
                        <Typography variant='subtitle1' sx={{ mt: 2 }}>
                            Country
                        </Typography>
                        <Typography variant='body2'>
                            India
                        </Typography>
                    </Grid>
                    <Grid item md={1} />
                    <Grid item md={5}>
                        <Typography variant='subtitle1'>
                            Number of Vacancies*
                            <Typography variant='body2'>
                                3
                            </Typography>
                        </Typography>

                        <Typography variant='subtitle1' sx={{ mt: 2 }}>
                            Job Owner*
                        </Typography>
                        <Typography variant='body2'>
                            Sameer
                        </Typography>
                        <Typography variant='subtitle1' sx={{ mt: 2 }}>
                            Type*
                        </Typography>
                        <Typography variant='body2'>
                            Full-Time
                        </Typography>
                        <Typography variant='subtitle1' sx={{ mt: 2 }}>
                            Education*
                        </Typography>
                        <Typography variant='body2'>
                            M. Tech.
                        </Typography>
                        <Grid container>
                            <Grid item md={4}>
                                <Typography variant='subtitle1' sx={{ mt: 2 }}>
                                    Work Ex. min. (Years)*
                                </Typography>
                                <Typography variant='body2'>
                                    5
                                </Typography>
                            </Grid>
                            <Grid item md={6}>
                                <Typography variant='subtitle1' sx={{ mt: 2 }}>
                                    Work Ex. max.(Years)
                                </Typography>
                                <Typography variant='body2'>
                                    8
                                </Typography>
                            </Grid>
                            <Grid item md={4}>
                                <Typography variant='subtitle1' sx={{ mt: 2 }}>
                                    Currency
                                </Typography>
                                <Typography variant='body2'>
                                    INR
                                </Typography>
                            </Grid>
                            <Grid item md={6}>
                                <Typography variant='subtitle1' sx={{ mt: 2 }}>
                                    Salary Type
                                </Typography>
                                <Typography variant='body2'>
                                    Monthly
                                </Typography>
                            </Grid>
                        </Grid>
                        <Typography variant='subtitle1' sx={{ mt: 2 }}>
                            City
                        </Typography>
                        <Typography variant='body2'>
                            Nagpur
                        </Typography>
                    </Grid>
                </Grid>


            </Dialog>
        </>
    );
};

export default JobPreViewModel;
