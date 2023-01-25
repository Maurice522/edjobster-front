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

  const [formData, setFormData] = useState(emailTemplateData || {
    category: 0,
    type: "",
    subject: "",
    message: ""
  })

  const handleChangeFormData = (name, value) => {
    console.log(name,value)
    setFormData(prev => {
      prev[name] = value
      return prev
    })
    console.log(formData)
  }

  const modalCloseHandler = () => handleClose()

  const handleSubmit = async () =>  {
    if(emailTemplateData) {
      await UpdateEmailTemplate(formData)
    }
    else {
      console.log(formData)
      await AddEmailTemplate(formData)
    }
  }

  useEffect(() => {
    if(AddEmailTemplateInfo.isError) {
      console.log(AddEmailTemplateInfo.error)
      showToast("error", "Error in adding email template")
      console.log(AddEmailTemplate.error)
    }
    if(AddEmailTemplateInfo.isSuccess) {
      showToast("success", "Successfully added email template")
      handleClose()
    }
    if(UpdateEmailTemplateInfo.isSuccess) {
      showToast("success", "Successfully updated email template")
      handleClose()
    }
    if(UpdateEmailTemplateInfo.isError) {
      showToast("error", "Error in updating email template")
      handleClose()
    }
  }, [AddEmailTemplateInfo, UpdateEmailTemplateInfo])

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
                      name="category"
                      onChange={e => handleChangeFormData(e.target.name, +e.target.value)}
                      label="Category"
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      {categoryData && categoryData?.map((item) => (
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
                      name="type"
                      onChange={e => handleChangeFormData(e.target.name, e.target.value)}
                    >
                      <FormControlLabel value="C" control={<Radio />} label="Candidate" />
                      <FormControlLabel value="I" control={<Radio />} label="Internal" />
                    </RadioGroup>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    autoFocus
                    margin="dense"
                    variant="standard"
                    fullWidth
                    name="subject"
                    label="Subject"
                    onChange={e => handleChangeFormData(e.target.name, e.target.value)}
                  />
                </Grid>
                <Grid item xl={12} style={{ heigth: '45vh' }}>
                  {/* <RichTextEditer onChange={onInputChangeHandler} variableData={variableData} body={textValue.body} /> */}
                  <p>Body</p>
                  <ReactQuill 
                    theme="snow"
                    modules={modules}
                    formats={formats}
                    //  value={state.comments || ''}
                    name="message"
                    onChange={e => {
                      console.log(e)
                      handleChangeFormData("message", e)
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
              <Button onClick={handleSubmit} variant="contained">
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