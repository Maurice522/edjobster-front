import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import ReactQuill from 'react-quill';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Editor } from 'react-draft-wysiwyg';
import RichTextEditer from '../Rich-text-editer/RichTextEditer';
import { showToast } from '../../utils/toast';
import {
  useAddEmailTemplateMutation,
  useUpdateEmailTemplateMutation,
} from '../../redux/services/settings/EmailTamplateService';

const EmailModalTemplates = (props) => {
  const { open, handleClose, categoryData, variableData, emailTemplateData } = props;
  const [AddEmailTemplate, AddEmailTemplateInfo] = useAddEmailTemplateMutation();
  const [UpdateEmailTemplate, UpdateEmailTemplateInfo] = useUpdateEmailTemplateMutation();

  const handleChangeFormData = (name, value) => {
    console.log("rect quill")
  }

  const modules = {
    toolbar: [
      [{ 'font': [] }],
      [{ 'size': ['small', false, 'large', 'huge'] }],
      ['bold', 'italic', 'underline'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      [{ 'align': [] }],
      [{ 'color': [] }, { 'background': [] }],
      ['clean']
    ]
  };
  
  const formats = [
    'font',
    'size',
    'bold', 'italic', 'underline',
    'list', 'bullet',
    'align',
    'color', 'background'
  ];
  
  const state = {
    comments: ''
  }

  const [textValue, setTextValue] = useState({
    category: emailTemplateData?.category_id ?? 1,
    subject: emailTemplateData?.subject ?? '',
    variables: '',
    body: emailTemplateData?.message ?? '',
    type: emailTemplateData?.type ?? '',
  });
  const onSubjectInputChangeHandler = (e) => {
    e.preventDefault();
    setTextValue({ ...textValue, subject: e.target.value });
  };
  const handleTypeChange = (e) => {
    e.preventDefault();
    setTextValue({ ...textValue, type: e.target.value });
  };
  const handleCategoryChange = (e) => {
    e.preventDefault();
    setTextValue({ ...textValue, category: e.target.value });
  };
  const handleVariablesChange = (e) => {
    e.preventDefault();
  };
  const modalCloseHandler = () => {
    handleClose(false);
  };
  const addEmailTemplateHandler = () => {
    if (emailTemplateData) {
      UpdateEmailTemplate({
        id: emailTemplateData.id,
        category: textValue.category || 1,
        type: textValue.type,
        subject: textValue.subject,
        message: textValue.body,
      });
    } else {
      AddEmailTemplate({
        category: textValue.category || 1,
        type: textValue.type,
        subject: textValue.subject,
        message: textValue.body,
      });
    }
  };
  const onInputChangeHandler = (changedText) => {
    setTextValue({ ...textValue, body: `${changedText.replace('<p>', '').replace('</p>', '')}` });
  };
  useEffect(() => {
    setTextValue({
      category: emailTemplateData?.category_id ?? '',
      subject: emailTemplateData?.subject ?? '',
      variables: '',
      body: emailTemplateData?.message ?? '',
      type: emailTemplateData?.type ?? '',
    });
  }, [emailTemplateData]);
  useEffect(() => {
    if (AddEmailTemplateInfo.isSuccess) {
      showToast('success', 'Email Category successfully added.');
      handleClose(false);
      AddEmailTemplateInfo.reset();
      setTextValue({
        category: '',
        subject: '',
        variables: '',
        body: '',
        type: '',
        message: '',
      });
    }
    if (AddEmailTemplateInfo.isError) {
      showToast('error', AddEmailTemplateInfo.error);
      AddEmailTemplateInfo.reset();
    }
    if (UpdateEmailTemplateInfo.isSuccess) {
      showToast('success', 'Email Category successfully updated.');
      handleClose(false);
      UpdateEmailTemplateInfo.reset();
      setTextValue({
        category: '',
        subject: '',
        variables: '',
        body: '',
        type: '',
        message: '',
      });
    }
    if (UpdateEmailTemplateInfo.isError) {
      showToast('error', UpdateEmailTemplateInfo.error.data.msg);
      UpdateEmailTemplateInfo.reset();
    }
  }, [
    AddEmailTemplateInfo.isSuccess,
    AddEmailTemplateInfo.isError,
    AddEmailTemplateInfo,
    handleClose,
    UpdateEmailTemplateInfo,
  ]);

  return (
    <>
      <Dialog
        open={open}
        fullWidth
        maxWidth="sm"
        onClose={() => {
          handleClose(false);
        }}
        aria-labelledby="alertmodalCloseHandler-dialog-title"
        aria-describedby="alert-dialog-description"
        BackdropProps={{ style: { background: 'rgba(0, 0, 0, 0.5)' } }}
      >
        <div>
          <DialogTitle>Create an Email Templates</DialogTitle>
          <DialogContent>
            <Box sx={{ flexGrow: 1 }}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <FormControl variant="standard" sx={{ mt: 1, minWidth: '100%' }}>
                    <InputLabel id="demo-simple-select-standard-label">Category</InputLabel>
                    <Select
                      labelId="demo-simple-select-standard-label"
                      id="demo-simple-select-standard"
                      value={textValue.category}
                      onChange={handleCategoryChange}
                      label="Category"
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      {categoryData?.map((item) => (
                        <MenuItem key={item.id} value={item.id}>
                          {item.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={6} display="flex" alignItems="flex-end">
                  <FormControl>
                    <RadioGroup
                      row
                      aria-labelledby="demo-row-radio-buttons-group-label"
                      name="row-radio-buttons-group"
                      value={textValue.type}
                      onChange={handleTypeChange}
                    >
                      <FormControlLabel value="C" control={<Radio />} label="Candidate" />
                      <FormControlLabel value="I" control={<Radio />} label="Internal" />
                    </RadioGroup>
                  </FormControl>
                </Grid>
                {/* <Grid item xs={12}>
                  <TextField
                    autoFocus
                    margin="dense"
                    variant="standard"
                    fullWidth
                    name="subject"
                    value={textValue.subject}
                    label="Subject"
                    onChange={onSubjectInputChangeHandler}
                  />
                </Grid> */}
                <Grid item xl={12} style={{ heigth: '45vh' }}>
                  {/* <RichTextEditer onChange={onInputChangeHandler} variableData={variableData} body={textValue.body} /> */}
                  <p>Subject</p>
                  <ReactQuill 
                    theme="snow"
                    modules={modules}
                    formats={formats} value={state.comments || ''}
                    name="email_msg"
                    onChange={e => {
                      handleChangeFormData("email_msg", e)
                    }}
                  />
                </Grid>
              </Grid>
            </Box>
          </DialogContent>
          <DialogActions>
            <Box>
              <Button onClick={modalCloseHandler} autoFocus variant="outlined" style={{ marginRight: 5 }}>
                Cancel
              </Button>
              <Button onClick={addEmailTemplateHandler} variant="contained">
                {emailTemplateData ? 'Update Template' : 'Add Template'}
              </Button>
            </Box>
          </DialogActions>
        </div>
      </Dialog>
    </>
  );
};

export default EmailModalTemplates;