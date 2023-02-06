import React, { useEffect, useState } from 'react';
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
  Box,
  Menu,
  MenuItem,
  Tooltip,
  Accordion,
  AccordionDetails,
  Container,
  AccordionSummary,
  Avatar,
  Stack,
  TextField,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PersonAdd from '@mui/icons-material/PersonAdd';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import AttachEmailIcon from '@mui/icons-material/AttachEmail';
import { useParams } from 'react-router-dom';
// eslint-disable-next-line import/no-unresolved
import { showToast } from 'src/utils/toast';
import SendEmailModel from '../../../components/Mains/SendEmailModel';
import Notes from '../../../components/Notes/Notes';
import Iconify from '../../../components/Iconify';
import AssignJobModel from '../../../components/Mains/AssignJobModel';
import { useGetCandidateNotesListQuery, useGetNotesTypesQuery } from '../../../redux/services/notes/NotesServices';
import { useGetCandidateDetailsQuery, useAssignJobMutation } from '../../../redux/services/candidate/CandidateServices';
import { useGetJobListQuery } from '../../../redux/services/jobs/JobListService';




const Transition = React.forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);

const PerticularCandidate = (props) => {
  const { id: candidateId } = useParams();

  const [assignJob, assignJobInfo] = useAssignJobMutation()
  const { data: candidateData, refetch } = useGetCandidateDetailsQuery(+candidateId)
  console.log(candidateData)
  const { data: jobListData } = useGetJobListQuery();
  const [selectedJob, setSelectedJob] = useState(candidateData?.job?.id);
  const handleChangeSelectedJob = (e) => setSelectedJob(+e.target.value)
  const handleUpdateSelectedJob = async () => {
    await assignJob({
      candidate: +candidateId,
      job: selectedJob
    })
    refetch()
  }
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [expanded, setExpanded] = useState(false);
  const [modelOpen, setModelOpen] = useState(false);
  const [emailModelOpen, setEmailModelOpen] = useState(false);
  const { open, handleClose } = props;
  
  const openMenu = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };
  
  
  const settings = ['Edit Candidates', 'Send Email', 'View Past Application', 'Logout'];
  
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
  
  const assignJobModel = () => {
    setModelOpen(true);
  }
  const assignJobModelClosed = () => {
    setModelOpen(false);
    setEmailModelOpen(false);
  };
  
  const sendEmailhandler = () => {
    setEmailModelOpen(true);
  }
  useEffect(() => {
    if(assignJobInfo.isError) {
      showToast("error", "Error while assigning the job")
      console.log(assignJobInfo.error)
      assignJobModelClosed()
    }
    if(assignJobInfo.isSuccess) {
      showToast("success", "Assigned the job to the candidate")
      assignJobModelClosed()
    }
  }, [assignJobInfo])

  return (
    <div>
      <AppBar sx={{ position: 'relative' }} style={{ backgroundColor: '#fff' }}>
        <Toolbar>
          <IconButton edge="start" color="secondary" onClick={handleClose} aria-label="close">
            <CloseIcon />
          </IconButton>
          <Grid container spacing={3}>
            <Grid item md={2}>
              <Typography sx={{ ml: 2 }} variant="h6" component="div" style={{ color: '#000' }}>
                Abhineet Sabharwal
              </Typography>
            </Grid>
            <Grid item md={8} style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="body1" style={{ color: '#000' }}>
                M.Tech. (Structure) + 91-7030205067
              </Typography>
            </Grid>
            <Grid item md={2} style={{ textAlign: 'end', }}>
              <Box sx={{ display: 'flex', justifyContent: "flex-end" }}>
                {/* <Typography style={{ minWidth: 100 }}>Contact</Typography>
                  <Typography style={{ minWidth: 100 }}>Profile</Typography> */}
                <Tooltip title="Account settings">
                  <IconButton
                    onClick={handleClick}
                    size="small"
                    sx={{ ml: 2 }}
                    aria-controls={open ? 'account-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                  >
                    <Iconify icon="entypo:dots-three-vertical" width={24} height={24} />
                  </IconButton>
                </Tooltip>
              </Box>
              <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={openMenu}
                onClose={handleCloseMenu}
                onClick={handleCloseMenu}
                PaperProps={{
                  elevation: 0,
                  sx: {
                    overflow: 'visible',
                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                    mt: 1.5,
                    '& .MuiAvatar-root': {
                      width: 32,
                      height: 32,
                      ml: -0.5,
                      mr: 1,
                    },
                    '&:before': {
                      content: '""',
                      display: 'block',
                      position: 'absolute',
                      top: 0,
                      right: 14,
                      width: 10,
                      height: 10,
                      bgcolor: 'background.paper',
                      transform: 'translateY(-50%) rotate(45deg)',
                      zIndex: 0,
                    },
                  },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
              >
                <MenuItem>
                  <ListItemIcon>
                    <PersonAdd fontSize="small" />
                  </ListItemIcon>
                  <Typography> Edit Candidate</Typography>
                </MenuItem>
                <MenuItem onClick={sendEmailhandler}>
                  <ListItemIcon>
                    <AttachEmailIcon fontSize="small" />
                  </ListItemIcon>
                  <Typography>Send Email</Typography>
                </MenuItem>
                <MenuItem>
                  <ListItemIcon>
                    <VisibilityIcon fontSize="small" />
                  </ListItemIcon>
                  <Typography> View Past Application</Typography>
                </MenuItem>
                <MenuItem>
                  <ListItemIcon>
                    <DeleteForeverIcon fontSize="small" />
                  </ListItemIcon>
                  <Typography>Delete Candidate</Typography>
                </MenuItem>
              </Menu>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <Grid container sx={{ mt: 2, pl: 2, pr: 2, mb: 4 }} spacing={3}>
        <Grid item md={8}>
          <Grid container>
            <Grid item md={4}>
              <h3>Last Job Applied</h3>
              <p>
                HOD,Civil
              </p>
            </Grid>
            <Grid item md={4}>
              <h3>Last Job Applied</h3>
              <p>
                Shortlisted
              </p>
            </Grid>
            <Grid item md={4}>
              <h3>Last Job Applied</h3>
              <p>
                View
              </p>
            </Grid>
          </Grid>
        </Grid>
        <Grid item md={4} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Button variant="contained" style={{ textTransform: 'capitalize' }}>
            Schedule Interview
          </Button>
          <Button variant="contained" style={{ textTransform: 'capitalize' }} onClick={assignJobModel}>
            Assign to a job
          </Button>
          <Box sx={{ flexGrow: 0 }}>
            <Button
              variant="contained"
              color="success"
              onClick={handleOpenUserMenu}
              style={{ textTransform: 'capitalize' }}
            >
              Hiring Status
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
        </Grid>
      </Grid>
      <Divider variant="middle" />
      <Stack sx={{
        display:"flex",
        flexDirection:"row"
      }}>
      <Card sx={{
        width: "200px",
        height: "216px",
        padding: "1%",
        paddingLeft: "2%",
        marginTop:"10%",
        boxShadow:"rgba(0, 0, 0, 0.25)"
      }}>
        <h3>Quick Access</h3>
        <a className='quickaccess' href='#candidateprofile'>Candidate Profile</a>
        <a className='quickaccess' href='#work'>Work Experiance</a>
        <a className='quickaccess' href='#education'>Education Details</a>
        <a className='quickaccess' href='#notes'>Notes</a>

      </Card>
      <Container sx={{
        width: "80%",
        marginLeft: "auto",
        marginRight: "auto",
      }}>
        <Stack sx={{
          marginTop: "10%"
        }}>

          <Stack sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            gap: "20%"

          }}>
            <Stack>
              <TextField
                sx={{
                  margin: "4%"
                }}
                required
                fullWidth
                id="standard-required"
                label="Phone"
                name="phone"
              />
              <TextField
                sx={{
                  margin: "4%"
                }}
                required
                id="standard-required"
                label="E-mail"
                name="email"
                fullWidth
              />
              <TextField
                sx={{
                  margin: "4%"
                }}
                required
                id="standard-required"
                label="Address"
                fullWidth
                name="address"
              />
            </Stack>
            <Stack>
              <TextField
                sx={{
                  margin: "4%"
                }}
                required
                fullWidth
                id="standard-required"
                label="Gender"
                name="Gender"
              />
              <TextField
                sx={{
                  margin: "4%"
                }}
                required
                fullWidth
                id="standard-required"
                label="D.O.B"
                name="dob"
              />
              <TextField
                sx={{
                  margin: "4%"
                }}
                required
                fullWidth
                id="standard-required"
                label="Nationality"
                name="nationality"
              />

              <TextField
                sx={{
                  margin: "4%"
                }}
                required
                fullWidth
                id="standard-required"
                label="Marital Status"
                name="marital"
              />
            </Stack>
          </Stack>
        </Stack>
        <Grid container sx={{ mt: 1, justifyContent: "center" }} spacing={2}>
          <Grid item md={8} sx={{ ml: 3 }}>
            <Grid item md={12}>
              <h3 id='candidateprofile' className='canhead'>Candidate Profile</h3>
            </Grid>
            <Grid container sx={{ mt: 4, pr: 2 }} spacing={2}>
              <Grid item md={3} style={{ display: 'flex', alignItems: 'center' }}>
                <h4>Headline</h4>
              </Grid>
              <Grid item md={8}>
                <p className='candidateBlueCard'>
                  ypesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of
                  Letraset sheets containing Lorem Ipsum passages,
                </p>
              </Grid>
              <Grid item md={3} style={{ display: 'flex', alignItems: 'center' }}>
                <h4>Summary</h4>
              </Grid>
              <Grid item md={8}>
                <p className='candidateBlueCard'>
                  Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
                  industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and
                  scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap
                  into electronic
                </p>
              </Grid>
              <Grid item md={3} style={{ display: 'flex', alignItems: 'center' }}>
                <h4>Total Experiance</h4>
              </Grid>
              <Grid item md={8}>
                <p className='candidateBlueCard' style={{width:"20%"}}>12 Years</p>
              </Grid>
              <Grid item md={3} style={{ display: 'flex', alignItems: 'center' }}>
                <h4>Skills</h4>
              </Grid>
              <Grid item md={8}>
                <p className='candidateBlueCard'>
                  Technical skills are the specialized knowledge and expertise required to perform specific tasks and
                  use specific tools and programs in real world situations.
                </p>
              </Grid>
            </Grid>
            <Grid container sx={{ mt: 4 }}>
              <Grid item md={12}>
                <h4 id='work'className='canhead'>Work Experiance</h4>
              </Grid>
              <Grid item md={12} sx={{ mt: 2, pr: 2 }}>
                <Card>
                  <CardContent>
                    <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1bh-content"
                        id="panel1bh-header"
                      >
                        <Typography sx={{ width: '33%', flexShrink: 0 }} variant="subtitle1">
                          May 2019 - Present
                        </Typography>
                        <Typography sx={{ color: 'text.secondary' }} variant="body1">
                          Assisstent Professor Professional UniverSity
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Typography>
                          Nulla facilisi. Phasellus sollicitudin nulla et quam mattis feugiat. Aliquam eget maximus est,
                          id dignissim quam.
                        </Typography>
                      </AccordionDetails>
                    </Accordion>
                    <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2bh-content"
                        id="panel2bh-header"
                      >
                        <Typography sx={{ width: '33%', flexShrink: 0 }} variant="subtitle1">
                          June 2016 - Apr 2019
                        </Typography>
                        <Typography sx={{ color: 'text.secondary' }}>
                          Assisstent Professor at Amity UniverSity
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Typography>
                          Donec placerat, lectus sed mattis semper, neque lectus feugiat lectus, varius pulvinar diam
                          eros in elit. Pellentesque convallis laoreet laoreet.
                        </Typography>
                      </AccordionDetails>
                    </Accordion>
                    <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel3bh-content"
                        id="panel3bh-header"
                      >
                        <Typography sx={{ width: '33%', flexShrink: 0 }} variant="subtitle1">
                          Dec 2009 - Apr 2016
                        </Typography>
                        <Typography sx={{ color: 'text.secondary' }}>
                          Assisstent Professor at Pune UniverSity
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Typography>
                          Nunc vitae orci ultricies, auctor nunc in, volutpat nisl. Integer sit amet egestas eros, vitae
                          egestas augue. Duis vel est augue.
                        </Typography>
                      </AccordionDetails>
                    </Accordion>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
            <Grid container sx={{ mt: 4, mb: 4 }}>
              <Grid item md={12}>
                <h4 id='education' className='canhead'>Education Details</h4>
              </Grid>
              <Grid item md={12} sx={{ mt: 2, pr: 2 }}>
                <Card>
                  <CardContent>
                    <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1bh-content"
                        id="panel1bh-header"
                      >
                        <Typography sx={{ width: '33%', flexShrink: 0 }} variant="subtitle1">
                          May 2007 - Mar 2009
                        </Typography>
                        <Typography sx={{ color: 'text.secondary' }} variant="body1">
                          M.Tech (Structure) from Mumbai University
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Typography>
                          Nulla facilisi. Phasellus sollicitudin nulla et quam mattis feugiat. Aliquam eget maximus est,
                          id dignissim quam.
                        </Typography>
                      </AccordionDetails>
                    </Accordion>
                    <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2bh-content"
                        id="panel2bh-header"
                      >
                        <Typography sx={{ width: '33%', flexShrink: 0 }} variant="subtitle1">
                          June 2007 - Apr 2009
                        </Typography>
                        <Typography sx={{ color: 'text.secondary' }}>
                          B.E Civil Engineering From Mumbai UniverSity
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Typography>
                          Donec placerat, lectus sed mattis semper, neque lectus feugiat lectus, varius pulvinar diam
                          eros in elit. Pellentesque convallis laoreet laoreet.
                        </Typography>
                      </AccordionDetails>
                    </Accordion>
                    <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel3bh-content"
                        id="panel3bh-header"
                      >
                        <Typography sx={{ width: '33%', flexShrink: 0 }} variant="subtitle1">
                          Dec 2009 - Apr 2016
                        </Typography>
                        <Typography sx={{ color: 'text.secondary' }}>
                          Assisstent Professor at Pune UniverSity
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Typography>
                          Nunc vitae orci ultricies, auctor nunc in, volutpat nisl. Integer sit amet egestas eros, vitae
                          egestas augue. Duis vel est augue.
                        </Typography>
                      </AccordionDetails>
                    </Accordion>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Grid>
          {/* <Divider orientation="vertical" flexItem /> */}

        </Grid>
        <Grid item md={3} id='notes'>
          <Notes candidateId={candidateId} />
        </Grid>
      </Container>
      </Stack>
      <AssignJobModel 
        open={modelOpen} 
        handleClose={assignJobModelClosed} 
        jobs={jobListData} 
        value={selectedJob}
        handleChange={handleChangeSelectedJob}
        handleSubmit={handleUpdateSelectedJob}
      />
      <SendEmailModel open={emailModelOpen} handleClose={assignJobModelClosed} />
    </div>

  );
};

export default PerticularCandidate;