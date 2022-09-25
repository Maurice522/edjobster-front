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
import { useGetJobQuery } from '../../redux/services/jobs/JobServices';


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

const SingleViewJobModel = (props) => {
    const { data : jobData } = useGetJobQuery();
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
                            <Grid item md={1} style={{ display: "flex", justifyContent: "end", alignItems: "center" }}>
                                <Avatar
                                    alt="Remy Sharp"
                                    src="/static/images/avatar/1.jpg"
                                    sx={{ width: 70, height: 70, mt: 1, mb: 1 }}
                                />
                            </Grid>
                            <Grid item md={10} style={{ display: 'flex', alignItems: 'center' }}>
                                <Typography variant="subtitle1" style={{ color: '#000' }} sx={{ mt: 2, mb: 2 }}>
                                    Assistant Professor - Assistant Professor -Mechanical Engineering
                                </Typography>
                            </Grid>
                            <Grid item md={1} style={{ display: "flex", alignItems: "center", justifyContent: "end" }} >
                                <Iconify icon="bi:share-fill" width={25} height={25} style={{ color: "#109CF1" }} />
                            </Grid>
                        </Grid>
                    </Toolbar>
                </AppBar>

                <Grid container sx={{ mt: 5, pl: 2, pr: 2 }}>
                    <Grid item md={12}>
                        <Card style={{ backgroundColor: "#f9f9f9" }}>
                            <CardContent>
                                <Grid container>
                                    <Grid item md={3} style={{ display: "flex", alignItems: "center", flexDirection: 'column' }}>
                                        <Typography variant='subtitle1' >Department</Typography>
                                        <Typography variant='body2' sx={{ mb: 1, mt: 1 }}>Mechanical Engineering</Typography>
                                    </Grid>
                                    <Divider orientation="vertical" flexItem />
                                    <Grid item md={3} style={{ display: "flex", alignItems: "center", flexDirection: 'column' }}>
                                        <Typography variant='subtitle1' >Type</Typography>
                                        <Typography variant='body2' sx={{ mb: 1, mt: 1 }}>Full-Time</Typography>
                                    </Grid>
                                    <Divider orientation="vertical" flexItem />
                                    <Grid item md={2} style={{ display: "flex", alignItems: "center", flexDirection: 'column' }}>
                                        <Typography variant='subtitle1' >Education</Typography>
                                        <Typography variant='body2' sx={{ mb: 1, mt: 1 }}>ME/ M.Tech</Typography>
                                    </Grid>
                                    <Divider orientation="vertical" flexItem />
                                    <Grid item md={3} style={{ display: "flex", alignItems: "center", flexDirection: 'column' }}>
                                        <Typography variant='subtitle1' >Major/ Speciality</Typography>
                                        <Typography variant='body2' sx={{ mb: 1, mt: 1 }}>Mechanical</Typography>
                                    </Grid>
                                </Grid>
                                <Divider />

                                <Grid container>
                                    <Grid item md={3} sx={{ mt: 2 }} style={{ display: "flex", alignItems: "center", flexDirection: 'column' }}>
                                        <Typography variant='subtitle1' >Work Experience (Years)</Typography>
                                        <Typography variant='body2' sx={{ mb: 1, mt: 1 }}>5 to 8</Typography>
                                    </Grid>
                                    <Divider orientation="vertical" flexItem />
                                    <Grid item md={3} sx={{ mt: 2 }} style={{ display: "flex", alignItems: "center", flexDirection: 'column' }}>
                                        <Typography variant='subtitle1' >Salary Offered (Monthly)</Typography>
                                        <Typography variant='body2' sx={{ mb: 1, mt: 1 }}>INR 52,000 to INR 72,000</Typography>
                                    </Grid>
                                    <Divider orientation="vertical" flexItem />
                                    <Grid item md={2} sx={{ mt: 2 }} style={{ display: "flex", alignItems: "center", flexDirection: 'column' }}>
                                        <Typography variant='subtitle1' >Country</Typography>
                                        <Typography variant='body2' sx={{ mb: 1, mt: 1 }}>India</Typography>
                                    </Grid>
                                    <Divider orientation="vertical" flexItem />
                                    <Grid item md={3} sx={{ mt: 2 }} style={{ display: "flex", alignItems: "center", flexDirection: 'column' }}>
                                        <Typography variant='subtitle1' >City</Typography>
                                        <Typography variant='body2' sx={{ mb: 1, mt: 1 }}>Nagpur</Typography>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>

                <Grid container sx={{ mt: 3 }}>
                    <Grid item md={12} style={{ display: "flex", justifyContent: "center" }}>
                        <Typography variant='body1'>Job Description</Typography>
                    </Grid>
                    <Grid item md={12} sx={{ mt: 3, pl: 3, pr: 3 }}>
                        <Typography variant='body2'>
                            Build and lead the marketing organization. Recruit and retain a world class team
                        </Typography>
                        <Typography variant='body2'>
                            Own the marketing roadmap, including all planning, budgeting and execution.
                        </Typography>
                        <Typography variant='body2'>
                            Build a journey for merchants throughout the whole lifecycle, from the moment they hear about us, till the moment they
                        </Typography>
                        <Typography variant='body2'>
                            dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                        </Typography>
                        <Typography variant='body2'>
                            ply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a
                        </Typography>
                        <Typography variant='body2'>
                            e Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.
                        </Typography>
                        <Typography variant='body2'>
                            ply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a
                        </Typography><Typography variant='body2'>
                            Build and lead the marketing organization. Recruit and retain a world class team
                        </Typography>
                        <Typography variant='body2'>
                            Build and lead the marketing organization. Recruit and retain a world class team
                        </Typography>
                        <Typography variant='body2'>
                            ply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a
                        </Typography>
                        <Typography variant='body2'>
                            Build and lead the marketing organization. Recruit and retain a world class team
                        </Typography>
                        <Typography variant='body2'>
                            ply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a
                        </Typography>


                    </Grid>
                </Grid>

            </Dialog>
        </>
    );
};

export default SingleViewJobModel;
