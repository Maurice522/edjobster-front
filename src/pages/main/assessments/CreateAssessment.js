import React, { useState, useEffect } from 'react';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { Link as RouterLink, useParams } from 'react-router-dom';
import './create-assesment.css';

import Grid from '@mui/material/Grid';

// material
import { Card, Button, Container, Typography, FormControl, Select, MenuItem, InputLabel } from '@mui/material';
import TextField from '@mui/material/TextField';
import PreviewAssesment from './PreviewAssesment';
import { showToast } from '../../../utils/toast';

// import {useGetAssesmentCategoryQuery } from '../../../redux/services/main/AssesmentCatagoriesservice'
import { useAddAssesmentMutation } from '../../../redux/services/main/AssesmentService';
import {
  useGetAssesmentQuestionsQuery,
  useAddAssesmentQuestionsMutation,
  useDeleteAssesmentQuestionsMutation,
} from '../../../redux/services/main/AssesmentQuestionsService';
import { useGetAssesmentCategoryQuery } from '../../../redux/services/main/AssesmentCatagoriesservice';
import Iconify from '../../../components/Iconify';
import CandidateSettingModal from "../../settings/candidate-settings/CandidateSettingsModal";


const CreateAssessment = () => {
  const [btnLoader, setBtnLoader] = useState(false);

  const [modalOpen, setModalOpen] = useState(false);
  const { assessmentEditId } = useParams();
  const { data: assesmentCategoryData } = useGetAssesmentCategoryQuery();
  const { data: assesmentQuestionsData, refetch } = useGetAssesmentQuestionsQuery(assessmentEditId, {
    skip: assessmentEditId === undefined,
  });
  const [addAssesmentQuestions, addAssesmentQuestionsInfo] = useAddAssesmentQuestionsMutation();
  const [deleteAssesmentQuestions] = useDeleteAssesmentQuestionsMutation();
  // const [textAssesmentQuestions, textAssesmentQuestionsInfo] = useTextAssesmentQuestionsMutation();
  // const [selectAssesmentQuestions, selectAssesmentQuestionsInfo] = useSelectAssesmentQuestionsMutation();
  // const [checkAssesmentQuestions, checkAssesmentQuestionsInfo] = useCheckAssesmentQuestionsMutation();
  const [addAssesment, addAssesmentInfo] = useAddAssesmentMutation();
  const [currentSelectedType, setCurrentSelectedType] = useState('');
  const [assesmentName, setAssesmentName] = useState(
    assessmentEditId && assesmentQuestionsData ? assesmentQuestionsData.assesment.name : ''
  );
  const [selectedAssesmentCategory, setSelectedAssesmentCategory] = useState(
    assessmentEditId && assesmentQuestionsData ? assesmentQuestionsData.assesment.categpry_id : ''
  );
  const [assesmentId, setAssesmentId] = useState(assessmentEditId);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState();

  const [questions, setQuestions] = useState(
    assessmentEditId && assesmentQuestionsData ? assesmentQuestionsData.questions : []
  );
    const [modal2Open, setModal2Open] = useState(false);
      const [modal2Name, setModal2Name] = useState('add');
      // const [addAssessmentCategories, AddAssessmentCategoriesInfo] = useAddAssesmentCategoryMutation();

//  const addClickHandler = async () => {
//     setBtnLoader(true);
//     if (modal2Name === 'Add') {
//       console.log(" addValue : ",addValue);
//       await addAssessmentCategories(addValue);
//       modalHandleClose(false);
//     } else {
//       console.log(modal2Name);  
//     }
//   };
  const onPreviewModalOpen = () => {
    setModalOpen(true);
  };
  const onPreviewModalClose = () => {
    setModalOpen(false);
  };
  const onAssesmentNameInputChangeHandler = (e) => {
    e.preventDefault();
    setAssesmentName(e.target.value);
  };
  const onAssesmentCategoryChangeHandler = (e) => {
    e.preventDefault();
    setSelectedAssesmentCategory(e.target.value);
  };
  const onAssesmentQuestionNameInputChangeHandler = (e, questionIndex) => {
    e.preventDefault();
    questions[questionIndex].question = e.target.value;
    setQuestions([...questions]);
  };
  const onAssesmentOptionInputChangeHandler = (e, optIndex, questionIndex) => {
    e.preventDefault();
    questions[questionIndex].options[optIndex] = e.target.value;
    setQuestions([...questions]);
  };
  const onAssesmentMarksInputChangeHandler = (e, questionIndex) => {
    // e.preventDefault();
    questions[questionIndex].marks = parseInt(e.target.value, 10);
    setQuestions([...questions]);
  };
  const onAssesmentAnswerInputChangeHandler = (e, questionIndex) => {
    e.preventDefault();
    questions[questionIndex].answer = parseInt(e.target.value, 10);
    setQuestions([...questions]);
  };

  const onQuestionDoneClicked = async (questionIndex) => {
    if (assesmentId) {
      if (questions[questionIndex].assesment) {
        await addAssesmentQuestions(questions[questionIndex]);
      } else {
        questions[questionIndex].assesment = assesmentId;
        await addAssesmentQuestions(questions[questionIndex]);
      }
    } else {
      setCurrentQuestionIndex(questionIndex);
      onAssesmentSaveClick();
    }
  };
  useEffect(() => {
    if (assesmentId && currentQuestionIndex) {
      questions[currentQuestionIndex].assesment = assesmentId;
      onQuestionDoneClicked(currentQuestionIndex);
      console.log('question', assesmentQuestionsData);
    }
  }, [assesmentId]);
  const addOptionsSelection = (questionIndex, optIndex) => {
    questions[questionIndex].options = [...questions[questionIndex].options, `Option ${optIndex + 2}`];
    setQuestions([...questions]);
  };
  const onCloseQuestionDeleteHandler = async (questionIndex) => {
    if (questions[questionIndex].id) {
      await deleteAssesmentQuestions(questions[questionIndex].id);
    }
    const newSelected = questions.filter((item) => item !== questions[questionIndex]);
    setQuestions(newSelected);
  };
  const addNewCategoryHandler = () => {
    setModal2Open(true);
    setModal2Name('Add');
  };
  const onSelectedQuestionTypeClicked = (type) => {
    setCurrentSelectedType(type);
    switch (type) {
      case 'S':
        // setQuestions([
        //   ...questions,
        //   {
        // assesment: assesmentId,
        // type: 'S',
        // question: '',
        // options: ['Option 1', 'Option 2'],
        // marks: null,
        // answer: null,
        //   },
        // ]);
        setQuestions((prev) => [...prev, {
          assesment: assesmentId,
          type: 'S',
          question: '',
          options: ['Option 1', 'Option 2'],
          marks: null,
          answer: null,
        }])
        break;
      case 'T':
        setQuestions((prev) => [...prev,
        {
          assesment: assesmentId,
          type: 'T',
          question: '',
          marks: null,
        }
        ])
        break;
      case 'C':
        // setQuestions([
        //   ...questions,
        //   {
        // assesment: assesmentId,
        // type: 'C',
        // question: '',
        // options: ['Option 1', 'Option 2'],
        // marks: null,
        //   },
        // ]);
        setQuestions((prev) => [...prev, {
          assesment: assesmentId,
          type: 'C',
          question: '',
          options: ['Option 1', 'Option 2'],
          marks: null,
        }])

        break;
      case 'R':
        // setQuestions([
        //   ...questions,
        //   {
        // assesment: assesmentId,
        // type: 'R',
        // question: '',
        // options: ['Option 1', 'Option 2'],
        // marks: null,
        // answer: null,
        //   },
        // ]);
        setQuestions((prev) => [...prev, {
          assesment: assesmentId,
          type: 'R',
          question: '',
          options: ['Option 1', 'Option 2'],
          marks: null,
          answer: null,
        }])
        break;

      default:
        break;
    }
  };

  const isValidateSaveAssesment = () => {
    let status = true;
    if (selectedAssesmentCategory === undefined || selectedAssesmentCategory === '') {
      status = false;
      showToast('error', 'Select Catgegory');
    } else if (assesmentName === undefined || assesmentName === '') {
      status = false;
      showToast('error', 'Enter Assestment Name');
    }
    return status;
  };

  const onAssesmentSaveClick = async () => {
    if (isValidateSaveAssesment()) {
      await addAssesment({
        category: selectedAssesmentCategory,
        name: assesmentName,
      });
    }
  };
  useEffect(() => {
    if (assesmentQuestionsData) {
      setQuestions(assesmentQuestionsData.questions);
      setSelectedAssesmentCategory(assesmentQuestionsData.assesment.categpry_id);
      setAssesmentName(assesmentQuestionsData.assesment.name);
    }
  }, [assesmentQuestionsData]);
  useEffect(() => {
    if (assessmentEditId) {
      refetch();
    }
  }, [assessmentEditId, refetch]);
  useEffect(() => {
    if (addAssesmentInfo.isSuccess) {
      showToast('success', 'Assesment Saved Sucessfully');
      const savedAssesmentRecord = addAssesmentInfo.data.data.find((item) => item.name === assesmentName);
      setAssesmentId(savedAssesmentRecord.id);
      addAssesmentInfo.reset();
    }
    if (addAssesmentInfo.isError) {
      showToast('error', addAssesmentInfo.error.data.msg);
      addAssesmentInfo.reset();
    }
    if (addAssesmentQuestionsInfo.isSuccess) {
      showToast('success', 'Assesment Question Saved Sucessfully');
      console.log('added assesments question', addAssesmentQuestionsInfo.data);
      setQuestions(addAssesmentQuestionsInfo.data.questions);
      addAssesmentQuestionsInfo.reset();
    }
    if (addAssesmentQuestionsInfo.isError) {
      showToast('error', addAssesmentQuestionsInfo.error.data.msg);
      addAssesmentQuestionsInfo.reset();
    }
  }, [addAssesmentInfo, addAssesmentQuestionsInfo, assesmentName]);

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
            <Typography variant="h4" gutterBottom />
            {assessmentEditId ? 'Edit' : 'Create'} an Assessment
          </Grid>
        </Grid>
        <Grid item xs={6} display="flex" justifyContent="right">
          <Grid style={{ marginRight: 5 }}>
            <Button variant="contained" onClick={onAssesmentSaveClick}>
              Save
            </Button>
          </Grid>
          <Grid style={{ marginRight: 5 }}>
            <Button variant="contained" onClick={onPreviewModalOpen}>
              Preview
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <Container>
        <Grid container spacing={2} component="form">
          <Grid item xs={6}>
            <Card variant="outlined" style={{ padding: 20 }}>
              <Grid item xs={12} style={{ marginBottom: 20 }} sx={{
                display:"flex",
                flexDirection:"row",
                justifyContent: "space-between"
               }}>
                <FormControl variant="standard" sx={{ mt: 1, width:"100%", }}>
                  <InputLabel id="demo-simple-select-standard-label">Assesment Category</InputLabel>
                  <Select 
                    required
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    value={selectedAssesmentCategory}
                    onChange={onAssesmentCategoryChangeHandler}
                    label="Assesment"
                  >
                    {assesmentCategoryData &&
                      assesmentCategoryData?.data?.map((item) => (
                        <MenuItem key={item.id} value={item.id}>
                          {item?.name}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
                {/* <Button
                  variant="contained"
                  component={RouterLink}
                  to="#"
                  onClick={addNewCategoryHandler}
                >
                  New
                </Button> */}
              </Grid>
              <Grid item xs={12} display="flex" style={{ margin: 20 }}>
                <Grid item xs={12} style={{ justifyContent: 'right' }}>
                  <Typography variant="h5" gutterBottom>
                    Select Questions Types
                  </Typography>
                </Grid>
              </Grid>
              <Grid item display={'flex'} xs={12} alignItems="center">
                <Grid item xs={8} style={{ margin: '10px' }} >
                  <Typography className={currentSelectedType === 'R' ? 'highligth' : ''}>Multiple Choices Questions</Typography>
                </Grid>
                <Grid item xs={4} style={{ margin: '10px' }}>
                  <Button variant="contained" value="R" onClick={() => onSelectedQuestionTypeClicked('R')}>
                    Add
                  </Button>
                </Grid>
              </Grid>
              <Grid item display={'flex'} xs={12} alignItems="center">
                <Grid item xs={8} style={{ margin: '10px' }} >
                  <Typography className={currentSelectedType === 'C' ? 'highligth' : ''}>Multiple CheckBoxes</Typography>
                </Grid>

                <Grid item xs={4} style={{ margin: '10px' }}>
                  <Button variant="contained" value="C" onClick={() => onSelectedQuestionTypeClicked('C')}>
                    {' '}
                    Add
                  </Button>
                </Grid>
              </Grid>

              <Grid item display={'flex'} xs={12} alignItems="center">
                <Grid item xs={8} style={{ margin: '10px' }} >
                  <Typography className={currentSelectedType === 'S' ? 'highligth' : ''}>Dropdown</Typography>
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
                  <Typography className={currentSelectedType === 'T' ? 'highligth' : ''}>Text Paragraph</Typography>
                </Grid>
                <Grid item xs={4} style={{ margin: '10px' }}>
                  <Button variant="contained" value="T" onClick={() => onSelectedQuestionTypeClicked('T')}>
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
                  required
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
              {questions.map((item, index) =>
                item.type === 'T' ? (
                  <Grid key={`text-${index}`} item xs={12} style={{ margin: 15 }}>
                    <Grid display="flex" item xs={12}>
                      <Grid item xs={11} style={{ margin: 15 }}>
                        <Typography variant="h5" gutterBottom>
                          Question {index + 1} : Text Question
                        </Typography>
                      </Grid>
                      <Grid item xs={1}>
                        <Button style={{ color: 'red' }} onClick={() => onCloseQuestionDeleteHandler(index)}>
                          &#10005;
                        </Button>
                      </Grid>
                    </Grid>
                    <Grid item xs={11}>
                      <TextField
                        required
                        autoFocus
                        margin="dense"
                        variant="standard"
                        placeholder="Enter Your Question"
                        fullWidth
                        name="question"
                        value={item.question}
                        onChange={(e) => onAssesmentQuestionNameInputChangeHandler(e, index)}
                        label="Enter Your Question"
                      />
                    </Grid>

                    <Grid item xs={5}>
                      <TextField
                        required="true"
                        autoFocus
                        margin="dense"
                        variant="standard"
                        placeholder="Enter Marks"
                        fullWidth
                        name="Marks"
                        value={item.marks}
                        onChange={(e) => onAssesmentMarksInputChangeHandler(e, index)}
                        label="Marks"
                        type="number"
                      />
                    </Grid>
                    {/* <Grid display="flex" alignItems="center" justifyContent="right" style={{ marginRight: 5 }}>
                      <Button
                        variant="contained"
                        component={RouterLink}
                        to="#"
                        onClick={() => onQuestionDoneClicked(index)}
                      >
                        DONE
                      </Button>
                    </Grid> */}
                  </Grid>
                ) : (
                  <div>
                    {(item.type === 'S') ||
                      (item.type === 'C') ||
                      (item.type === 'R') ? (
                      <div key={`multiple-${index}`}>
                        <Grid item xs={12} style={{ margin: 15 }}>
                          <Grid display="flex" item xs={12}>
                            <Grid item xs={11}>
                              <Typography variant="h6" gutterBottom>
                                Question {index + 1} : Multiple Choice Question
                              </Typography>
                            </Grid>
                            <Grid item xs={1}>
                              <Button style={{ color: 'red' }} onClick={() => onCloseQuestionDeleteHandler(index)}>
                                &#10005;
                              </Button>
                            </Grid>
                          </Grid>
                          <Grid item xs={12}>
                            <TextField
                              required
                              autoFocus
                              margin="dense"
                              variant="standard"
                              placeholder="Enter Your Question"
                              fullWidth
                              name="question"
                              value={item.question}
                              onChange={(e) => onAssesmentQuestionNameInputChangeHandler(e, index)}
                              label="Enter Your Question"
                            />
                          </Grid>

                          {item.options.map((opt, optIndex) => (
                            <Grid key={`options-${optIndex}`} display="flex" alignItems="end" item xs={12}>
                              <Grid item xs={11}>
                                <TextField
                                  required
                                  autoFocus
                                  margin="dense"
                                  variant="standard"
                                  placeholder={`Enter Option ${optIndex + 1}`}
                                  fullWidth
                                  name={opt}
                                  value={opt}
                                  onChange={(e) => onAssesmentOptionInputChangeHandler(e, optIndex, index)}
                                  label={`Option ${optIndex + 1}`}
                                />
                              </Grid>
                              {item.options.length === optIndex + 1 && (
                                <Grid item xs={1}>
                                  <Button onClick={() => addOptionsSelection(index, optIndex)}>&#10010;</Button>
                                </Grid>
                              )}
                            </Grid>
                          ))}
                        </Grid>

                        <Grid item xs={12} style={{ margin: 15 }}>
                          <Grid item display={'flex'} xs={12}>
                            <Grid item xs={5} style={{ margin: '10px' }}>
                              <TextField
                                required
                                autoFocus
                                margin="dense"
                                variant="standard"
                                placeholder="Enter Marks"
                                fullWidth
                                name="Marks"
                                value={item.marks}
                                onChange={(e) => onAssesmentMarksInputChangeHandler(e, index)}
                                label="Marks"
                                type="number"
                              />
                            </Grid>

                            {currentSelectedType === 'S' || currentSelectedType === 'R' ? (
                              <>
                                <Grid item xs={5} style={{ margin: '10px' }}>
                                  <TextField
                                    required
                                    autoFocus
                                    margin="dense"
                                    variant="standard"
                                    placeholder="Enter Answer"
                                    fullWidth
                                    name="Answer"
                                    type="number"
                                    value={item.answer}
                                    onChange={(e) => onAssesmentAnswerInputChangeHandler(e, index)}
                                    label="Answer"
                                  />
                                </Grid>
                              </>
                            ) : (
                              ''
                            )}
                          </Grid>
                        </Grid>
                        {/* <Grid display="flex" alignItems="center" justifyContent="right" style={{ marginRight: 5 }}>
                          <Button
                            variant="contained"
                            component={RouterLink}
                            to="#"
                            onClick={() => onQuestionDoneClicked(index)}
                          >
                            DONE
                          </Button>
                        </Grid> */}
                      </div>
                    ) : (
                      ''
                    )}
                  </div>
                )
              )}
            </Card>
          </Grid>
        </Grid>
      </Container>
      {/* <CandidateSettingModal
        open={modalOpen}
        handleClose={modalHandleClose}
        label="Email Category Name"
        type="Add"
        textboxlabel="Add Assessment Categories"
        id="categoryName"
        name="Add"
        onChange={addChangeHandler}
        buttonlabel="Add Email category"
        addClickHandler={addClickHandler}
        loadingbtn={btnLoader}
      /> */}
      {modalOpen && (
        <PreviewAssesment
          open={modalOpen}
          selectedAssesmentCategory={selectedAssesmentCategory}
          assesmentName={assesmentName}
          questions={questions}
          handleclose={onPreviewModalClose}
          label="Email Category Name"
          type="Add"
          textboxlabel="Add category"
          id="categoryName"
          name="name"
          // onChange={addChangeHandler}
          buttonlabel="Add Email category"
        // addclickhandler={addClickHandler}
        // loadingbtn={btnLoader}
        />
      )}
    </>
  );
};

export default CreateAssessment;
