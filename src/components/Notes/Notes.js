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
  useGetCandidateNotesListQuery,
  useGetNotesTypesQuery,
  useAddCandidateNotesMutation,
} from '../../redux/services/notes/NotesServices';
import { showToast } from '../../utils/toast';

const Notes = (props) => {
  const { data: candidateNotesData, refetch } = useGetCandidateNotesListQuery(props.candidateId);
  const { data: candidateNoteType } = useGetNotesTypesQuery();
  // const [addNotesData] = useAddCandidateNotesMutation();
  const [addCandidateNotes, addCandidateNotesInfo] = useAddCandidateNotesMutation();

  const [emailNotes, setEmailNotes] = useState([]);
  const [interviewNotes, setInterviewNotes] = useState([]);
  const [callNotes, setCallNotes] = useState([]);
  const [notes, setNotes] = useState([]);
  const [noteText,setNoteText]=useState()

  const [selectedNoteType, setSelectedNoteType] = useState("");
  // const [value, setValue] = useState([]);

  const handleChange = (e) => {
    setSelectedNoteType(e.target.value);
    console.log('select', e.target.value);
  };

  const notesChange = (e) => {
    setNoteText(e.target.value);
    //  console.log(notes)
  };
  const addNotesHandler = () => {
    addCandidateNotes({
      candidate: props.candidateId,
      type: selectedNoteType,
      note:noteText,
    });
  };
  useEffect(() => {
    if (addCandidateNotesInfo.isSuccess) {
      showToast('success', 'Notes Saved Sucessfully');
      refetch();
      // setAssesmentId(savedAssesmentRecord.id);
      // addCandidateNotesInfo.reset();
    }
    if (addCandidateNotesInfo.isError) {
      showToast('error', addCandidateNotesInfo.error.data.msg);
    }
  }, [addCandidateNotesInfo]);
  useEffect(() => {
    if (candidateNotesData) {
      setNotes(candidateNotesData.notes.filter((x) => x.type.name === 'Note'));
      setEmailNotes(candidateNotesData.notes.filter((x) => x.type.name === 'Email'));
      setInterviewNotes(candidateNotesData.notes.filter((x) => x.type.name === 'Interview'));
      setCallNotes(candidateNotesData.notes.filter((x) => x.type.name === 'Call'));
    }
  }, [candidateNotesData]);
  return (
    <>
      <Grid container>
        <Box width="250px">
          <FormControl variant="standard" sx={{ mt: 1, minWidth: '100%' }}>
            <TextField select value={selectedNoteType} fullWidth onChange={handleChange} label="select">
              {candidateNoteType &&
                candidateNoteType?.types &&
                candidateNoteType.types.map((item) => {
                  return (
                    <MenuItem key={item.id} value={item.id}>
                      {item.name}
                    </MenuItem>
                  );
                })}
            </TextField>
          </FormControl>
        </Box>
        <Grid container spacing={2} sx={{ mt: 2 }}>
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
            {' '}
            Notes
          </Typography>
          {notes.map((item) => {
            return (
              <Card style={{ backgroundColor: '#5656561f' }}>
                <CardContent>
                  <Typography variant="body2">{item.note}</Typography>
                </CardContent>
              </Card>
            );
          })}
          <Grid container sx={{ mt: 1, ml: 1 }}>
            <Grid item md={8}>
              <Typography color="silver" style={{ fontSize: '12px' }}>
                By: Sameer 20 Aug 2021
              </Typography>
            </Grid>
            <Grid item md={3} style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography color="silver" style={{ fontSize: '12px' }}>
                Edit
              </Typography>
              <Typography color="silver" style={{ fontSize: '12px' }}>
                Delete
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid container sx={{ mt: 4 }}>
        <Grid item md={12}>
          <Typography variant="subtitle2" sx={{ mb: 1, ml: 1 }}>
            Interview
          </Typography>
          {interviewNotes.map((item) => {
           return(
         <Card style={{ backgroundColor: '#5656561f' }}>
            <CardContent>
              
               <Typography variant="body2">{item.note}</Typography>;
             
            </CardContent>
          </Card>)
           })}
          <Grid container sx={{ mt: 1, ml: 1 }}>
            <Grid item md={8}>
              <Typography color="silver" style={{ fontSize: '12px' }}>
                By: Sameer 20 Aug 2021
              </Typography>
            </Grid>
            <Grid item md={3} style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography color="silver" style={{ fontSize: '12px' }}>
                Edit
              </Typography>
              <Typography color="silver" style={{ fontSize: '12px' }}>
                Delete
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid container sx={{ mt: 4 }}>
        <Grid item md={12}>
          <Typography variant="subtitle2" sx={{ mb: 1, ml: 1 }}>
            Email
          </Typography>
          {emailNotes.map((item) => {
            return (
              <Card style={{ backgroundColor: '#5656561f' }}>
                <CardContent>
                  <Typography variant="body2">{item.note}</Typography>
                </CardContent>
              </Card>
            );
          })}
          <Grid container sx={{ mt: 1, ml: 1 }}>
            <Grid item md={8}>
              <Typography color="silver" style={{ fontSize: '12px' }}>
                By: Sameer 20 Aug 2021
              </Typography>
            </Grid>
            <Grid item md={3} style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography color="silver" style={{ fontSize: '12px' }}>
                Edit
              </Typography>
              <Typography color="silver" style={{ fontSize: '12px' }}>
                Delete
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default Notes;
