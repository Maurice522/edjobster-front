import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { makeStyles } from '@mui/styles';
import { CardContent, Card, Grid, Divider, TextField, Box, Menu, MenuItem } from '@mui/material';
import Notes from '../Notes/Notes';
import AssignJobModel from './AssignJobModel';
import ViewAllCandidatesModel from './ViewAllCandidatesModel';

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

const JobModel = (props) => {
  const classes = useStyles();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [modelOpen, setModelOpen] = useState(false);
  const [candidatesModel, setCandidatesModel] = useState(false)

  const { open, handleClose } = props;

  const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const assignJobModel = () => {
    setModelOpen(true);
  }
  const assignJobModelClosed = () => {
    setModelOpen(false);
    setCandidatesModel(false)
  };

  const viewAllCandisateshandler = () => {
    setCandidatesModel(true)
  }

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
                  Assistant Professor - Mechanical Engineering
                </Typography>
              </Grid>
              <Grid item md={4} style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Box sx={{ flexGrow: 0 }}>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={handleOpenUserMenu}
                    style={{ textTransform: 'capitalize' }}
                  >
                    Job Status
                  </Button>
                  <Menu
                    sx={{ mt: '45px' }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                  >
                    {settings.map((setting) => (
                      <MenuItem key={setting} onClick={handleCloseUserMenu}>
                        <Typography textAlign="center">{setting}</Typography>
                      </MenuItem>
                    ))}
                  </Menu>
                </Box>
                <Button variant="contained" style={{ textTransform: 'capitalize' }} onClick={viewAllCandisateshandler}>
                  View all candidates
                </Button>
                <Button variant="contained" color="success" style={{ textTransform: 'capitalize' }} onClick={assignJobModel}>
                  Assign a candidates
                </Button>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
        <Grid container sx={{ mt: 2, pl: 2, pr: 2, mb: 4 }} spacing={3}>
          <Grid item md={2}>
            <Card>
              <CardContent>
                <Typography variant="h6" style={{ display: 'flex', justifyContent: 'center' }}>
                  Applied
                </Typography>
                <Typography style={{ fontSize: '32px', fontWeight: '700', textAlign: 'center' }}>37</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item md={2}>
            <Card>
              <CardContent>
                <Typography variant="h6" style={{ display: 'flex', justifyContent: 'center' }}>
                  Shortlisted
                </Typography>
                <Typography style={{ fontSize: '32px', fontWeight: '700', textAlign: 'center' }}>37</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item md={2}>
            <Card>
              <CardContent>
                <Typography variant="h6" style={{ display: 'flex', justifyContent: 'center' }}>
                  In Review
                </Typography>
                <Typography style={{ fontSize: '32px', fontWeight: '700', textAlign: 'center' }}>37</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item md={2}>
            <Card>
              <CardContent>
                <Typography variant="h6" style={{ display: 'flex', justifyContent: 'center' }}>
                  Offerd
                </Typography>
                <Typography style={{ fontSize: '32px', fontWeight: '700', textAlign: 'center' }}>37</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item md={2}>
            <Card>
              <CardContent>
                <Typography variant="h6" style={{ display: 'flex', justifyContent: 'center' }}>
                  Hired
                </Typography>
                <Typography style={{ fontSize: '32px', fontWeight: '700', textAlign: 'center' }}>37</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item md={2}>
            <Card>
              <CardContent>
                <Typography variant="h6" style={{ display: 'flex', justifyContent: 'center' }}>
                  No of candidates
                </Typography>
                <Typography style={{ fontSize: '32px', fontWeight: '700', textAlign: 'center' }}>37</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        <Divider variant="middle" />
        <Grid container sx={{ mt: 1 }} spacing={2}>
          <Grid item md={8} sx={{ ml: 3 }}>
            <Grid container style={{ display: 'flex', alignItems: 'center' }}>
              <Grid item md={10}>
                <Typography variant="h6">Publish on : 14/09/2021</Typography>
              </Grid>
              <Grid item md={2} style={{ textAlign: 'center' }}>
                <Button variant="contained" style={{ textTransform: 'capitalize' }}>
                  Edit Job
                </Button>
              </Grid>
            </Grid>
            <Grid container sx={{ mt: 4 }} spacing={2}>
              <Grid item md={5} sx={{ mb: 2 }}>
                <TextField
                  label="Job title"
                  defaultValue="Assisstent-Professer- Mechanical Enginnering"
                  inputProps={{
                    readOnly: true,
                  }}
                  variant="outlined"
                  size="small"
                  fullWidth
                />
              </Grid>
              <Grid item md={5} sx={{ mb: 2 }}>
                <TextField
                  label="Number of vacancies"
                  defaultValue="2"
                  inputProps={{
                    readOnly: true,
                  }}
                  variant="outlined"
                  size="small"
                  fullWidth
                />
              </Grid>
              <Grid item md={5} sx={{ mb: 2 }}>
                <TextField
                  label="Department"
                  defaultValue="Mechanical Engineering"
                  inputProps={{
                    readOnly: true,
                  }}
                  variant="outlined"
                  size="small"
                  fullWidth
                />
              </Grid>
              <Grid item md={5} sx={{ mb: 2 }}>
                <TextField
                  label="Job Owner"
                  defaultValue="sameer Jalali"
                  inputProps={{
                    readOnly: true,
                  }}
                  variant="outlined"
                  size="small"
                  fullWidth
                />
              </Grid>
              <Grid item md={5} sx={{ mb: 2 }}>
                <TextField
                  label="Team member involed"
                  defaultValue="2"
                  inputProps={{
                    readOnly: true,
                  }}
                  variant="outlined"
                  size="small"
                  fullWidth
                />
              </Grid>
              <Grid item md={5} sx={{ mb: 2 }}>
                <TextField
                  label="Type"
                  defaultValue="Full Time"
                  inputProps={{
                    readOnly: true,
                  }}
                  variant="outlined"
                  size="small"
                  fullWidth
                />
              </Grid>
              <Grid item md={5} sx={{ mb: 2 }}>
                <TextField
                  label="Job Nature"
                  defaultValue="in Campus"
                  inputProps={{
                    readOnly: true,
                  }}
                  variant="outlined"
                  size="small"
                  fullWidth
                />
              </Grid>
              <Grid item md={5} sx={{ mb: 2 }}>
                <TextField
                  label="Type"
                  defaultValue="Full-Time"
                  inputProps={{
                    readOnly: true,
                  }}
                  variant="outlined"
                  size="small"
                  fullWidth
                />
              </Grid>
              <Grid item md={5} sx={{ mb: 2 }}>
                <Grid container spacing={2}>
                  <Grid item md={6}>
                    <TextField
                      label="Work Experiance From"
                      defaultValue="2"
                      inputProps={{
                        readOnly: true,
                      }}
                      variant="outlined"
                      size="small"
                      fullWidth
                    />
                  </Grid>
                  <Grid item md={6}>
                    <TextField
                      label="Work Experiance To"
                      defaultValue="2"
                      inputProps={{
                        readOnly: true,
                      }}
                      variant="outlined"
                      size="small"
                      fullWidth
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item md={5} sx={{ mb: 2 }}>
                <TextField
                  label="Minimum Education"
                  defaultValue="M.E/M.Tech "
                  inputProps={{
                    readOnly: true,
                  }}
                  variant="outlined"
                  size="small"
                  fullWidth
                />
              </Grid>
              <Grid item md={5} sx={{ mb: 2 }}>
                <Grid container spacing={2}>
                  <Grid item md={6}>
                    <TextField
                      label="Salary From"
                      defaultValue="2"
                      inputProps={{
                        readOnly: true,
                      }}
                      variant="outlined"
                      size="small"
                      fullWidth
                    />
                  </Grid>
                  <Grid item md={6}>
                    <TextField
                      label="Salary To"
                      defaultValue="2"
                      inputProps={{
                        readOnly: true,
                      }}
                      variant="outlined"
                      size="small"
                      fullWidth
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item md={5} sx={{ mb: 2 }}>
                <TextField
                  label="Salary unit"
                  defaultValue="Monthly "
                  inputProps={{
                    readOnly: true,
                  }}
                  variant="outlined"
                  size="small"
                  fullWidth
                />
              </Grid>
              <Grid item md={5} sx={{ mb: 2 }}>
                <TextField
                  label="Minimum Education"
                  defaultValue="M.E/M.Tech "
                  inputProps={{
                    readOnly: true,
                  }}
                  variant="outlined"
                  size="small"
                  fullWidth
                />
              </Grid>
              <Grid item md={5} sx={{ mb: 2 }}>
                <TextField
                  label="Minimum Education"
                  defaultValue="M.E/M.Tech "
                  inputProps={{
                    readOnly: true,
                  }}
                  variant="outlined"
                  size="small"
                  fullWidth
                />
              </Grid>
            </Grid>
          </Grid>
          <Divider orientation="vertical" flexItem />
          <Grid item md={3}>
            <Notes />
          </Grid>
        </Grid>
        <AssignJobModel open={modelOpen} handleClose={assignJobModelClosed} />
        <ViewAllCandidatesModel open={candidatesModel} handleClose={assignJobModelClosed} />
      </Dialog>
    </>
  );
};

export default JobModel;
