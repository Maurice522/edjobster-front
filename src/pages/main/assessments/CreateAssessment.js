import React, { useState,useEffect } from 'react';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { Link as RouterLink } from 'react-router-dom';
import Grid from '@mui/material/Grid';
// material
import {
  Card,
  Table,
  Stack,
  Avatar,
  Button,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
  ListItemIcon,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
} from '@mui/material';
import TextField from '@mui/material/TextField';
import {showToast } from '../../../utils/toast';

import { useAddAssesmentMutation } from '../../../redux/services/main/AssesmentService';
import {
  useGetAssesmentQuestionsQuery,
  useAddAssesmentQuestionsMutation,
  useUpdateAssesmentQuestionsMutation,
  useDeleteAssesmentQuestionsMutation,
  useCheckAssesmentQuestionsMutation,
  useSelectAssesmentQuestionsMutation,
  useTextAssesmentQuestionsMutation,
} from '../../../redux/services/main/AssesmentQuestionsService';
import { useGetAssesmentCategoryQuery } from '../../../redux/services/main/AssesmentCatagoriesservice';

const CreateAssessment = () => {
  const { data: assesmentCategoryData } = useGetAssesmentCategoryQuery();
  const { data: assesmentQuestionsData } = useGetAssesmentQuestionsQuery(2);
  const [addAssesmentQuestions, addAssesmentQuestionsInfo] = useAddAssesmentQuestionsMutation();
  const [updateAssesmentQuestions, updateAssesmentQuestionsInfo] = useUpdateAssesmentQuestionsMutation();
  const [deleteAssesmentQuestions, deleteAssesmentQuestionsInfo] = useDeleteAssesmentQuestionsMutation();
  const [textAssesmentQuestions, textAssesmentQuestionsInfo] = useTextAssesmentQuestionsMutation();
  const [selectAssesmentQuestions, selectAssesmentQuestionsInfo] = useSelectAssesmentQuestionsMutation();
  const [checkAssesmentQuestions, checkAssesmentQuestionsInfo] = useCheckAssesmentQuestionsMutation();
  const [addAssesment, addAssesmentInfo] = useAddAssesmentMutation();
  const [currentSelectedType, setCurrentSelectedType] = useState('');
  const [assesmentName, setAssesmentName] = useState('');
  const [selectedAssesmentCategory, setSelectedAssesmentCategory] = useState('');
  const questionType = [
    { type: 'S', name: 'Select' },
    { type: 'C', name: 'Checkbox' },
    { type: 'T', name: 'Text' },
  ];
  const [questions, setQuestions] = useState([
    {
      id: 1,
      type: 'R',
      question: 'sample question',
      options: ['Option 1', 'option 2', 'option 3'],
      marks: 1,
      answer: '1',
    },
  ]);

  const onAssesmentNameInputChangeHandler = (e) => {
    e.preventDefault();
    setAssesmentName(e.target.value);
  };
  const onAssesmentCategoryChangeHandler = (e) => {
    e.preventDefault();
    setSelectedAssesmentCategory(e.target.value);
  };
  const onAssesmentCategoryQuestionTypeHandler = (e) => {
    // setQuestions(e.target.value);
  };
  const addQuestionTypeHandler = () => {};

  const onSelectedQuestionTypeClicked = (type) => {
    setCurrentSelectedType(type);
  };

  const onAssesmentSaveClick = async () => {
    console.log(selectedAssesmentCategory, assesmentName);
    await addAssesment({
      category: selectedAssesmentCategory,
      name: assesmentName,
    });
  };
  useEffect(() => {
    if (addAssesmentInfo.isSuccess) {
      showToast('success', "Assesment Saved Sucessfully");
      addAssesmentInfo.reset();
      
    }
    if (addAssesmentInfo.isError) {
      showToast('error', addAssesmentInfo.error.data.msg);
      addAssesmentInfo.reset();
      
    }
  }, [addAssesmentInfo]);

  return (
    <>
      <Grid container spacing={2} padding="20px">
        <Grid item xs={6} display="flex">
          <Grid>
            <IconButton
              edge="start"
              color="inherit"
              component={RouterLink}
              to="/dashboard/assessments"
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
          </Grid>
          <Grid>
            <Typography variant="h4" gutterBottom>
              Create an Assessment
            </Typography>
          </Grid>
        </Grid>
        <Grid item xs={6} display="flex" justifyContent="right">
          <Grid style={{ marginRight: 5 }}>
            <Button
              variant="contained"
              component={RouterLink}
              to="#"
              onClick={onAssesmentSaveClick}
              // startIcon={<Iconify icon="eva:plus-fill" />}
            >
              Save
            </Button>
          </Grid>
          <Grid style={{ marginRight: 5 }}>
            <Button
              variant="contained"
              component={RouterLink}
              to="#"
              // onClick={addNewDepartmentHandler}
              // startIcon={<Iconify icon="eva:plus-fill" />}
            >
              Preview
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <Container>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Card variant="outlined" style={{ padding: 20 }}>
              <Grid item xs={12} style={{ marginBottom: 20 }}>
                <FormControl variant="standard" sx={{ mt: 1, minWidth: '100%' }}>
                  <InputLabel id="demo-simple-select-standard-label">Assesment Category</InputLabel>
                  <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    value={selectedAssesmentCategory}
                    onChange={onAssesmentCategoryChangeHandler}
                    label="Assesment"
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    {assesmentCategoryData &&
                      assesmentCategoryData?.data?.map((item) => (
                        <MenuItem key={item.id} value={item.id}>
                          {item?.name} 
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} display="flex" style={{ margin: 20 }}>
                <Grid item xs={12} style={{ justifyContent: 'right' }}>
                  <Typography variant="h5" gutterBottom>
                    Select Questions Types
                  </Typography>
                </Grid>
              </Grid>
              <Grid item display={'flex'} xs={12} alignItems="center">
                <Grid item xs={8} style={{ margin: '10px' }}>
                  <Typography>Multiple Choices Questions</Typography>
                </Grid>
                <Grid item xs={4} style={{ margin: '10px' }}>
                  <Button variant="contained" value="S" onClick={() => onSelectedQuestionTypeClicked('S')}>
                    {' '}
                    Add
                  </Button>
                </Grid>
              </Grid>
              <Grid item display={'flex'} xs={12} alignItems="center">
                <Grid item xs={8} style={{ margin: '10px' }}>
                  <Typography>Multiple CheckBoxes</Typography>
                </Grid>
                <Grid item xs={4} style={{ margin: '10px' }}>
                  <Button variant="contained" value="C" onClick={() => onSelectedQuestionTypeClicked('C')}>
                    {' '}
                    Add
                  </Button>
                </Grid>
              </Grid>
              {/* <Grid item display={'flex'} xs={12} alignItems="center">
                <Grid item xs={8} style={{ margin: '10px' }}>
                  <Typography>Drop Down</Typography>
                </Grid>
                <Grid item xs={4} style={{ margin: '10px' }}>
                  <Button variant="contained" onClick={()=>onSelectedQuestionTypeClicked()}>
                    {' '}
                    Add
                  </Button>
                </Grid>
              </Grid> */}
              <Grid item display={'flex'} xs={12} alignItems="center">
                <Grid item xs={8} style={{ margin: '10px' }}>
                  <Typography>Text Paragraph</Typography>
                </Grid>
                <Grid item xs={4} style={{ margin: '10px' }}>
                  <Button variant="contained" value={'T'} onClick={() => onSelectedQuestionTypeClicked('T')}>
                    Add
                  </Button>
                </Grid>
              </Grid>
            </Card>
          </Grid>

          <Grid item xs={6}>
            <Card variant="outlined" style={{ padding: 20 }}>
              <Grid item xs={12} style={{ marginBottom: 20 }}>
                <TextField
                  autoFocus
                  margin="dense"
                  variant="standard"
                  placeholder="Enter Assesment Name"
                  fullWidth
                  name="aasesmentName"
                  value={assesmentName}
                  label="Give Name to Your Assessment"
                  onChange={onAssesmentNameInputChangeHandler}
                />
              </Grid>
              {currentSelectedType === 'T' ? (
                <Grid item xs={12} style={{ margin: 15 }}>
                  <Typography variant="h5" gutterBottom>
                    Question 1 : Text Question
                  </Typography>
                  <Grid item xs={12}>
                    <TextField
                      autoFocus
                      margin="dense"
                      variant="standard"
                      placeholder="Enter Your Question"
                      fullWidth
                      name="question"
                      // value={textValue.jobTitle}
                      label="Enter Your Question"
                      // onChange={onInputChangeHandler}
                    />
                  </Grid>
                  <Grid item xs={5}>
                    <TextField
                      autoFocus
                      margin="dense"
                      variant="standard"
                      placeholder="Enter Marks"
                      fullWidth
                      name="Marks"
                      // value={textValue.jobTitle}
                      label="Marks"
                    />
                  </Grid>
                </Grid>
              ) : (
                <>
                  <Grid item xs={12} style={{ margin: 15 }}>
                    <Typography variant="h5" gutterBottom>
                      Question 1 : Multiple Choice Question
                    </Typography>
                    <Grid item xs={12}>
                      <TextField
                        autoFocus
                        margin="dense"
                        variant="standard"
                        placeholder="Enter Your Question"
                        fullWidth
                        name="question"
                        // value={textValue.jobTitle}
                        label="Enter Your Question"
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <Grid item xs={10}>
                        <TextField
                          autoFocus
                          margin="dense"
                          variant="standard"
                          placeholder="Enter Option 1"
                          fullWidth
                          name="option1"
                          // value={textValue.jobTitle}
                          label="Option 1"
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12} style={{ margin: 15 }}>
                    <Grid item xs={10}>
                      <TextField
                        autoFocus
                        margin="dense"
                        variant="standard"
                        placeholder="Enter Option 2"
                        fullWidth
                        name="option 2"
                        // value={textValue.jobTitle}
                        label="Option 2"
                      />
                    </Grid>
                  </Grid>
                  <Grid item xs={12} style={{ margin: 15 }}>
                    <Grid item xs={10}>
                      <TextField
                        autoFocus
                        margin="dense"
                        variant="standard"
                        placeholder="Enter Option 3"
                        fullWidth
                        name="option 3"
                        // value={textValue.jobTitle}
                        label="Option 3"
                      />
                    </Grid>
                    <Grid item display={'flex'} xs={12}>
                      <Grid item xs={5} style={{ margin: '10px' }}>
                        <TextField
                          autoFocus
                          margin="dense"
                          variant="standard"
                          placeholder="Enter Marks"
                          fullWidth
                          name="Marks"
                          // value={textValue.jobTitle}
                          label="Marks"
                        />
                      </Grid>
                      {currentSelectedType === 'S' ? (
                        <>
                          <Grid item xs={5} style={{ margin: '10px' }}>
                            <TextField
                              autoFocus
                              margin="dense"
                              variant="standard"
                              placeholder="Enter Answer"
                              fullWidth
                              name="Answer"
                              // value={textValue.jobTitle}
                              label="Answer"
                            />
                          </Grid>
                        </>
                      ) : (
                        ''
                      )}
                    </Grid>
                  </Grid>
                </>
              )}
              <Grid item xs={10} style={{ marginTop: 40 }}>
                <Grid item xs={12} display="flex" justifyContent="center">
                  <Button
                    variant="contained"
                    component={RouterLink}
                    to="#"

                    // onClick={addNewDepartmentHandler}
                    // startIcon={<Iconify icon="eva:plus-fill" />}
                  >
                    DONE
                  </Button>
                </Grid>
              </Grid>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default CreateAssessment;
