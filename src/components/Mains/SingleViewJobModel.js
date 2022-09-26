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

import ApplyClient from '../../pages/settings/client/ApplyClient';
import Iconify from '../Iconify';
import { useGetJobQuery, useGetJobeDetailsQuery } from '../../redux/services/jobs/JobServices';

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
  const { open, handleClose, jobId } = props;
  const { data: jobData } = useGetJobeDetailsQuery(jobId);
  console.log('jobData', jobData?.data);

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [expanded, setExpanded] = React.useState(false);
  const [age, setAge] = useState('');
  const [modelOpen, setModelOpen] = useState(false);


  const selecttextfiled = (event) => {
    setAge(event.target.value);
  };

  const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

  //   const [open, setOpen] = React.useState(false);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const onCandidateModelView = () => {
    setModelOpen(true);
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
              <Grid item md={1} style={{ display: 'flex', justifyContent: 'end', alignItems: 'center' }}>
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
              <Grid item md={1} style={{ display: 'flex', alignItems: 'center', justifyContent: 'end' }}>
                <Iconify icon="bi:share-fill" width={25} height={25} style={{ color: '#109CF1' }} />
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>

        <Grid container sx={{ mt: 5, pl: 2, pr: 2 }}>
          <Grid item md={12}>
            <Card style={{ backgroundColor: '#f9f9f9' }}>
              <CardContent>
                <Grid container>
                  <Grid item md={3} style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                    <Typography variant="subtitle1">Department</Typography>
                    <Typography variant="body2" sx={{ mb: 1, mt: 1 }}>
                      {' '}
                      {jobData?.data?.department?.name}
                    </Typography>
                  </Grid>
                  <Divider orientation="vertical" flexItem />
                  <Grid item md={3} style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                    <Typography variant="subtitle1">Type</Typography>
                    <Typography variant="body2" sx={{ mb: 1, mt: 1 }}>
                      {jobData?.data?.type}
                    </Typography>
                  </Grid>
                  <Divider orientation="vertical" flexItem />
                  <Grid item md={2} style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                    <Typography variant="subtitle1">Education</Typography>
                    <Typography variant="body2" sx={{ mb: 1, mt: 1 }}>
                      {jobData?.data?.educations?.map((item) => (
                        <span>{item.name},</span>
                      ))}
                    </Typography>
                  </Grid>
                  <Divider orientation="vertical" flexItem />
                  <Grid item md={3} style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                    <Typography variant="subtitle1">Major/ Speciality</Typography>
                    <Typography variant="body2" sx={{ mb: 1, mt: 1 }}>
                      {jobData?.data?.speciality}
                    </Typography>
                  </Grid>
                </Grid>
                <Divider />

                <Grid container>
                  <Grid
                    item
                    md={3}
                    sx={{ mt: 2 }}
                    style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}
                  >
                    <Typography variant="subtitle1">Work Experience (Years)</Typography>
                    <Typography variant="body2" sx={{ mb: 1, mt: 1 }}>
                      {jobData?.data?.exp_min} to {jobData?.data?.exp_max}
                    </Typography>
                  </Grid>
                  <Divider orientation="vertical" flexItem />
                  <Grid
                    item
                    md={3}
                    sx={{ mt: 2 }}
                    style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}
                  >
                    <Typography variant="subtitle1">Salary Offered (Monthly)</Typography>
                    <Typography variant="body2" sx={{ mb: 1, mt: 1 }}>
                      {jobData?.data?.salary_min} to {jobData?.data?.salary_max}
                    </Typography>
                  </Grid>
                  <Divider orientation="vertical" flexItem />
                  <Grid
                    item
                    md={2}
                    sx={{ mt: 2 }}
                    style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}
                  >
                    <Typography variant="subtitle1">Country</Typography>
                    <Typography variant="body2" sx={{ mb: 1, mt: 1 }}>
                      {jobData?.data?.country?.name}
                    </Typography>
                  </Grid>
                  <Divider orientation="vertical" flexItem />
                  <Grid
                    item
                    md={3}
                    sx={{ mt: 2 }}
                    style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}
                  >
                    <Typography variant="subtitle1">City</Typography>
                    <Typography variant="body2" sx={{ mb: 1, mt: 1 }}>
                      {jobData?.data?.city}
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Grid container sx={{ mt: 3 }}>
          <Grid item md={12} style={{ display: 'flex', justifyContent: 'center' }}>
            <Typography variant="body1">Job Description</Typography>
          </Grid>
          <Grid item md={12} sx={{ mt: 3, pl: 3, pr: 3 }}>
            <Typography variant="body2">{jobData?.data?.description}</Typography>
          </Grid>
          <Grid item md={12} style={{ display: 'flex', justifyContent: 'center' }}>
            <Button onClick={onCandidateModelView} variant="contained" size='large' disableElevation>
              Apply
            </Button>
          </Grid>
        </Grid>
      </Dialog>
      <ApplyClient open={modelOpen} handleClose={handleClose} />

    </>
  );
};

export default SingleViewJobModel;
