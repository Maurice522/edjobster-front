import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import { Link as RouterLink, useParams } from 'react-router-dom';
import Slide from '@mui/material/Slide';
import { makeStyles } from '@mui/styles';
import { CardContent, Card, Grid, Divider, TextField, Box, Menu, MenuItem } from '@mui/material';
import Notes from '../../../components/Notes/Notes';
import AssignJobModel from '../../../components/Mains/AssignJobModel';
import ViewAllCandidatesModel from '../../../components/Mains/ViewAllCandidatesModel';
import { useAddJobMutation, useGetJobeDetailsQuery } from '../../../redux/services/jobs/JobServices';

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

const PerticularJob = (props) => {
  const { data: jobData } = useGetJobeDetailsQuery(props.detailsId);
  console.log('Edit Job data recieved from server', jobData?.data);
  const [textValue, setTextValue] = useState({
    id: props.detailsId,
    title: jobData?.data?.title,
    vacancies: jobData?.data?.vacancies,
    department: jobData?.data?.department?.id,
    owner: jobData?.data?.owner?.account_id,
    assesment: jobData?.data?.assesment?.id,
    webform:jobData?.data?.webform?.id,
    webform_name:jobData?.data?.webform?.name,
    member_ids: jobData?.data?.members?.map((x) => x.account_id),
    member_names: jobData?.data?.members?.map((x) => x.first_name),
    type: jobData?.data?.type,
    nature: jobData?.data?.nature,
    education: jobData?.data?.educations?.map((x) => x.id),
    speciality: jobData?.data?.speciality,
    exp_min: jobData?.data?.exp_min,
    exp_max: jobData?.data?.exp_max,
    salary_min: jobData?.data?.salary_min,
    salary_max: jobData?.data?.salary_max,
    currency: jobData?.data?.currency,
    salary_type: jobData?.data?.salary_type,
    state: jobData?.data?.state?.id,
    state_name: jobData?.data?.state?.name,
    city: jobData?.data?.city,
    description: jobData?.data?.description,
    job_boards: jobData?.data?.job_boards,
    pipeline: jobData?.data?.pipeline?.id,
    active: jobData?.data?.active,
    assesment_name: jobData?.data?.assesment?.name,
    education_names: jobData?.data?.educations?.map((x) => x.name),
    pipeline_name: jobData?.data?.pipeline?.name,
    owner_name: `${jobData?.data?.owner?.first_name} ${jobData?.data?.owner?.last_name}`,
    department_name: jobData?.data?.department?.name,
    city_name: jobData?.data?.city?.name,
  });
  console.log('Edit Job data recieved', textValue);
  const classes = useStyles();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [modelOpen, setModelOpen] = useState(false);
  const [candidatesModel, setCandidatesModel] = useState(false);

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
  };
  const assignJobModelClosed = () => {
    setModelOpen(false);
    setCandidatesModel(false);
  };

  const viewAllCandisateshandler = () => {
    setCandidatesModel(true);
  };

  return (
      <div>
        <AppBar sx={{ position: 'relative' }} style={{ backgroundColor: '#fff' }}>
          <Toolbar>
            <IconButton edge="start" color="secondary" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Grid container spacing={3}>
              <Grid item md={8} style={{ display: 'flex', alignItems: 'center' }}>
                <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div" style={{ color: '#000' }}>
                  {textValue.title}
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
                <Button
                  variant="contained"
                  color="success"
                  style={{ textTransform: 'capitalize' }}
                  onClick={assignJobModel}
                >
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
                <Button
                  component={RouterLink}
                  to={`/dashboard/jobs/edit-job/${props.detailsId}`}
                  variant="contained"
                  style={{ textTransform: 'capitalize' }}
                >
                  Edit Job
                </Button>
              </Grid>
            </Grid>
            <Grid container sx={{ mt: 4 }} spacing={2}>
              <Grid item md={5} sx={{ mb: 2 }}>
                <TextField
                  label="Job title"
                  value={textValue.title}
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
                  value={textValue.vacancies}
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
                  value={textValue.department_name}
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
                  value={textValue.owner_name}
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
                  value={textValue.member_names}
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
                  value={textValue.type}
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
                  value={textValue.nature}
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
                      value={textValue.exp_min}
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
                      value={textValue.exp_max}
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
                  value={textValue.education_names}
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
                      value={textValue.salary_min}
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
                      value={textValue.salary_max}
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
                  value={textValue.salary_type}
                  name="salary_type"
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
                  label="currency "
                  value={textValue.currency}
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
                  label="State"
                  value={textValue.state_name}
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
                  label="City"
                  value={textValue.city}
                  name="city_name"
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
                  margin="dense"
                  variant="standard"
                  label="Job description"
                  value={textValue.description}
                  inputProps={{
                    readOnly: true,
                  }}
                  size="small"
                  fullWidth
                />
              </Grid>
            </Grid>
          </Grid>
          <Divider orientation="vertical" flexItem />
          <Grid item md={3}>
            <Notes candidateId={props.detailsId} />
          </Grid>
        </Grid>
        <AssignJobModel open={modelOpen} handleClose={assignJobModelClosed} />
        <ViewAllCandidatesModel open={candidatesModel} handleClose={assignJobModelClosed} />
      </div>
  );
};

export default PerticularJob;
