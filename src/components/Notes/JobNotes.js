import React, { useEffect, useState } from 'react';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';

import {
  CardContent, 
  Card,
  Grid,
  Divider,
  ListItemIcon,
  TextField,
  Box,
  Menu,
  MenuItem,
  Tooltip,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
  Button,
} from '@mui/material';
import Iconify from '../Iconify';
import {
  useGetJobNotesListQuery,
  useGetNotesTypesQuery,
  useAddJobNotesMutation,
  useDeleteJobNotesMutation,
} from '../../redux/services/notes/NotesServices';
import { showToast } from '../../utils/toast';

const JobNotes = (props) => {
  const { data: jobNotesData, refetch } = useGetJobNotesListQuery(props.jobId);
  const { data: jobNoteType } = useGetNotesTypesQuery();
  // const [addNotesData] = useAddjobNotesMutation();
  const [addJobNotes, addJobNotesInfo] = useAddJobNotesMutation();
  const [deleteJobNote, deleteJobNoteinfo] = useDeleteJobNotesMutation();
  const [emailNotes, setEmailNotes] = useState([]);
  const [interviewNotes, setInterviewNotes] = useState([]);
  const [callNotes, setCallNotes] = useState([]);
  const [notes, setNotes] = useState([]);
  const [noteText, setNoteText] = useState('');

  const [selectedNoteType, setSelectedNoteType] = useState('');
  // const [value, setValue] = useState([]);

  const handleChange = (e) => {
    setSelectedNoteType(e.target.value);
    console.log('select', e.target.value);
  };
  const onDeleteHandler = async (id) => {
    await deleteJobNote(id);
  };

  const notesChange = (e) => {
    setNoteText(e.target.value);
    //  console.log(notes)
  };
  const addNotesHandler = () => {
    addJobNotes({
      job: props.jobId,
      type: selectedNoteType,
      note: noteText,
    });
  };
  useEffect(() => {
    if (addJobNotesInfo.isSuccess) {
      showToast('success', 'Notes Saved Sucessfully');
      refetch();
      // setAssesmentId(savedAssesmentRecord.id);
      // addjobNotesInfo.reset();
    }
    if (addJobNotesInfo.isError) {
      showToast('error', deleteJobNoteinfo.error.data.msg);
    }
    if (deleteJobNoteinfo.isSuccess) {
      showToast('success', deleteJobNoteinfo.data.msg);
      refetch();
    }
    if (deleteJobNoteinfo.isError) {
      showToast('error', deleteJobNoteinfo.error.data.msg);
      refetch();
    }
  }, [addJobNotesInfo, deleteJobNoteinfo]);
  useEffect(() => {
    if (jobNotesData) {
      setNotes(jobNotesData.notes.filter((x) => x.type.name === 'Note'));
      setEmailNotes(jobNotesData.notes.filter((x) => x.type.name === 'Email'));
      setInterviewNotes(jobNotesData.notes.filter((x) => x.type.name === 'Interview'));
      setCallNotes(jobNotesData.notes.filter((x) => x.type.name === 'Call'));
    }
  }, [jobNotesData]);
  return (
    <>
      <Grid container style={{ }}>
        <Box width="100px"  >
          <FormControl variant="standard" sx={{ mt: 1, minWidth: '100%' }}>
            <TextField    autoFocus={false}           variant="outlined"
 size="small"   classes={{}} select value={selectedNoteType} fullWidth onChange={handleChange} label="select">
              {jobNoteType &&
                jobNoteType?.types &&
                jobNoteType.types.map((item) => {
                  
                  return (
                    <MenuItem  key={item.id} value={item.id}>
                      {item.name}
                    </MenuItem>
                  );
                })}
            </TextField>
          </FormControl>
        </Box>
        <Grid container spacing={1} sx={{ mt: 2 }}>
          <Grid item md={10}>
            <TextField
              id="outlined-basic"
              label="Type Somthing"
              placeholder="TypeSomthing..."
              fullWidth
              variant="outlined"
              size="small"
              value={noteText}
              onChange={notesChange}
            />
          </Grid>
          <Grid item md={2}>
            <Button style={{ minWidth: 0 }} variant="contained" onClick={addNotesHandler}>
              <ListItemIcon style={{ color: '#fff', padding: '0px', minWidth: 0 }}>
                <Iconify icon="akar-icons:plus" width={20} height={25} />
              </ListItemIcon>
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <Grid container sx={{ mt: 4 }}>
        <Grid item md={12}>
          <Typography variant="subtitle2" sx={{ mb: 1, ml: 1 }}>
            Notes
          </Typography>
          {notes.map((item) => {
            const date = new Date(item.created);
            const formattedDate = date.toLocaleDateString('en-GB', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            })
            return (
              <>
                <Card style={{ backgroundColor: '#5656561f' }}>
                  <CardContent>
                    <Typography variant="body2">{item.note}</Typography>
                  </CardContent>
                </Card>

                <Grid container sx={{ mt: 1, ml: 1 }}>
                  <Grid item md={8}>
                    <Typography color="silver" style={{ fontSize: '12px' }}>
                      By: {item.added_by.first_name} {formattedDate}
                    </Typography>
                  </Grid>
                  <Grid item md={3} style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography color="silver" style={{ fontSize: '12px' }}>
                      Edit
                    </Typography>
                    <Typography onClick={() => onDeleteHandler(item.id)} color="silver" style={{ fontSize: '12px' }}>
                      Delete
                    </Typography>
                  </Grid>
                </Grid>
              </>
            );
          })}
        </Grid>
      </Grid>
      <Grid container sx={{ mt: 4 }}>
        <Grid item md={12}>
          <Typography variant="subtitle2" sx={{ mb: 1, ml: 1 }}>
            Interview
          </Typography>
          {interviewNotes.map((item) => {
             const date = new Date(item.created);
             const formattedDate = date.toLocaleDateString('en-GB', {
               day: 'numeric',
               month: 'long',
               year: 'numeric',
             })
            return (
              <>
                <Card style={{ backgroundColor: '#5656561f' }}>
                  <CardContent>
                    <Typography variant="body2">{item.note}</Typography>
                  </CardContent>
                </Card>
                <Grid container sx={{ mt: 1, ml: 1 }}>
                  <Grid item md={8}>
                    <Typography color="silver" style={{ fontSize: '12px' }}>
                      By: {item.added_by.first_name} {formattedDate}
                    </Typography>
                  </Grid>
                  <Grid item md={3} style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography color="silver" style={{ fontSize: '12px' }}>
                      Edit
                    </Typography>
                    <Typography onClick={() => onDeleteHandler(item.id)} color="silver" style={{ fontSize: '12px' }}>
                      Delete
                    </Typography>
                  </Grid>
                </Grid>
              </>
            );
          })}
        </Grid>
      </Grid>
      <Grid container sx={{ mt: 4 }}>
        <Grid item md={12}>
          <Typography variant="subtitle2" sx={{ mb: 1, ml: 1 }}>
            Email
          </Typography>
          {emailNotes.map((item) => {
             const date = new Date(item.created);
             const formattedDate = date.toLocaleDateString('en-GB', {
               day: 'numeric',
               month: 'long',
               year: 'numeric',
             })
            return (
              <>
                <Card style={{ backgroundColor: '#5656561f' }}>
                  <CardContent>
                    <Typography variant="body2">{item.note}</Typography>
                  </CardContent>
                </Card>

                <Grid container sx={{ mt: 1, ml: 1 }}>
                  <Grid item md={8}>
                    <Typography color="silver" style={{ fontSize: '12px' }}>
                      By: {item.added_by.first_name} {formattedDate}
                    </Typography>
                  </Grid>
                  <Grid item md={3} style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography color="silver" style={{ fontSize: '12px' }}>
                      Edit
                    </Typography>
                    <Typography onClick={() => onDeleteHandler(item.id)} color="silver" style={{ fontSize: '12px' }}>
                      Delete
                    </Typography>
                  </Grid>
                </Grid>
              </>
            );
          })}
        </Grid>
      </Grid>
    </>
  );
};

export default JobNotes;
