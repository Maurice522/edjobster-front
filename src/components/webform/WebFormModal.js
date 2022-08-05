import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Slide from '@mui/material/Slide';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { Typography, ButtonGroup } from '@mui/material';
import Box from '@mui/material/Box';
import { LoadingButton } from '@mui/lab';
import { Stack } from 'immutable';
import { IndeterminateCheckBox } from '@mui/icons-material';
import { showToast } from '../../utils/toast';

import { useAddWebformApiMutation, useUpdateWebformMutation } from '../../redux/services/settings/WebformService';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const WebFormsModal = (props) => {
  // eslint-disable-next-line react/prop-types
  const { open, handleclose, textboxlabel, loadingbtn, webFormFieldsData } = props;
  const [AddWebform, AddWebformInfo] = useAddWebformApiMutation();
  const [UpdateWebform, UpdateWebformInfo] = useUpdateWebformMutation();

  const [selectedFields, setSelectedFields] = useState([]);
  const [webFormName, setWebFormName] = useState('');

  const modalCloseHandler = () => {
    handleclose(false);
  };
  const onFieldsButtonClicked = (index) => {
    setSelectedFields([...selectedFields, webFormFieldsData[index]]);
  };
  const onWebFormNameInputChange = (e) => {
    setWebFormName(e.target.value);
  };
  const addClickHandler = async () => {
    await AddWebform({ name: webFormName, form: selectedFields });
  };
  useEffect(() => {
    if (AddWebformInfo.isSuccess) {
      // setModalOpen(false);
      showToast('success', 'Webform successfully added.');
      modalCloseHandler();
      AddWebformInfo.reset();
    }
    if (AddWebformInfo.isError) {
      showToast('error', AddWebformInfo.error.data.msg);

      AddWebformInfo.reset();
    }
  }, [AddWebformInfo, modalCloseHandler]);

  return (
    <>
      <Dialog
        open={open}
        fullWidth
        maxWidth="md"
        onClose={() => {
          handleclose(false);
        }}
        aria-labelledby="alertmodalCloseHandler-dialog-title"
        aria-describedby="alert-dialog-description"
        BackdropProps={{ style: { background: 'rgba(0, 0, 0, 0.5)' } }}
      >
        <div>
          <Container>
            <DialogTitle>{textboxlabel}</DialogTitle>
            <DialogContent>
              <Box sx={{ flexGrow: 1 }}>
                <Grid container>
                  <Grid item xs={4}>
                    <Item>
                      {' '}
                      <Grid item xs={12}>
                        <Typography variant="h4" style={{ float: 'left' }}>
                          Select Fields
                        </Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                          {webFormFieldsData &&
                            webFormFieldsData.map((item, index) => (
                              <Grid item xs={6} key={`fields-${item}-${index}`}>
                                <Item>
                                  <Button variant="outlined" onClick={() => onFieldsButtonClicked(index)}>
                                    {item.name}
                                  </Button>
                                </Item>
                              </Grid>
                            ))}
                          {/* <Grid item xs={6}>
                            <Item>
                              <Button variant="outlined">LastName</Button>
                            </Item>
                          </Grid>
                          <Grid item xs={6}>
                            <Item>
                              <Button variant="outlined">Email</Button>
                            </Item>
                          </Grid>
                          <Grid item xs={6}>
                            <Item>
                              <Button variant="outlined">Mobile</Button>
                            </Item>
                          </Grid> */}
                        </Grid>
                      </Grid>
                    </Item>
                  </Grid>
                  <Grid item xs={8}>
                    <Item>
                      <Grid item xs={12}>
                        <TextField
                          autoFocus
                          placeholder="Give name to your webform"
                          margin="dense"
                          variant="standard"
                          fullWidth
                          value={webFormName}
                          onChange={onWebFormNameInputChange}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                          {selectedFields.map((item, index) => (
                            <Grid item xs={6} key={`selectedfield-${item}-${index}`}>
                              <Item>
                                <TextField
                                  autoFocus
                                  type={item.type}
                                  placeholder={item.name}
                                  margin="dense"
                                  variant="standard"
                                  disabled
                                  fullWidth
                                />
                              </Item>
                            </Grid>
                          ))}

                          {/* <Grid item xs={6}>
                            <Item>
                              <TextField autoFocus placeholder="LastName" margin="dense" variant="standard" fullWidth />
                            </Item>
                          </Grid>
                          <Grid item xs={6}>
                            <Item>
                              <TextField autoFocus placeholder="Email" margin="dense" variant="standard" fullWidth />
                            </Item>
                          </Grid>
                          <Grid item xs={6}>
                            <Item>
                              <TextField placeholder="Mobile" autoFocus margin="dense" variant="standard" fullWidth />
                            </Item>
                          </Grid> */}
                        </Grid>
                      </Grid>
                    </Item>
                  </Grid>
                </Grid>
              </Box>
            </DialogContent>
            <DialogActions>
              <Box>
                <Button onClick={modalCloseHandler} autoFocus variant="outlined" style={{ marginRight: 5 }}>
                  Cancel
                </Button>
                <LoadingButton onClick={() => addClickHandler()} variant="contained" loading={loadingbtn}>
                  Add
                </LoadingButton>
              </Box>
            </DialogActions>
          </Container>
        </div>
      </Dialog>
    </>
  );
};

export default WebFormsModal;
