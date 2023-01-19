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
import Box from '@mui/material/Box';
import { LoadingButton } from '@mui/lab';
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import { useGetStagesQuery,useAddStageApiMutation } from '../../redux/services/settings/StageService';
import { useAddPipelineApiMutation } from '../../redux/services/settings/PipelineService';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
const PipelineModel = (props) => {
  const { open, handleClose, textboxlabel, loadingbtn, formstagedata, onsubmit, type, companyName } = props;

  const theme = useTheme();
  const [stageData, setStageData] = useState([
    "Associated/Screening",
    "Applied",
    "Shortlisted",
    "Interview",
    "Offered",
    "Hired",
    "On Board",
  ]);
  const [stageTextValue, setStageTextValue] = useState(formstagedata);
  // console.log('stagetext', formStageData);

  const { data: stageApiData } = useGetStagesQuery();
  const [addStageApi,addStageApiInfo]=useAddStageApiMutation();
  const [stageId, setStagetId] = useState(null);

  // ------------------------------ADD PIPELINE LOGIC -----------------------------
  const [ addPipelineApi ] = useAddPipelineApiMutation();
  const [nameInput, setNameInput] = useState('');

  const addPipeLine = async () => {
    console.log(stageData);
    await addPipelineApi({name: nameInput, fields: stageData });
  }

  const stageResponse = stageApiData?.data;

  const addStagesHander = () => {
    addStageApi({
    id:70,
    name:stageData,
    });
  };
  useEffect(() => {
    if (formstagedata?.id) {
      const stageArr = stageResponse;
      const foundStage = stageArr?.find((stageFound) => stageFound?.formstagedata?.stage);
      setStagetId(foundStage?.id);
      setStageTextValue({
        ...formstagedata,
        stage: foundStage.id,
      });
    } else {
      setStageTextValue(formstagedata);
      setStagetId(null);
    }
  }, [formstagedata, type, stageResponse]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setStageData(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value
    );
    setStageTextValue({ ...stageTextValue, fileds: typeof value === 'string' ? value.split(',') : value });
    console.log('event: ', event);
    // console.log('split value', typeof value === 'string' ? value.split(',') : value);
  };

  // eslint-disable-next-line react/prop-types

  const addclickhandler = () => {
    onsubmit(stageTextValue);
  };

  const onInputChangeHandler = (e) => {
    setStageTextValue({ ...stageTextValue, [e.target.name]: e.target.value });
  };

  return (
    <>
      <Dialog
        open={open}
        fullWidth
        maxWidth="xs"
        onClose={handleClose}
        aria-labelledby="alertmodalCloseHandler-dialog-title"
        aria-describedby="alert-dialog-description"
        BackdropProps={{ style: { background: 'rgba(0, 0, 0, 0.5)' } }}
      >
        <div>
          <DialogTitle>{textboxlabel || "Add Pipeline"}</DialogTitle>
          <DialogContent style={{ marginBottom: '15%' }}>
            <Box sx={{ flexGrow: 1 }}>
              <Grid container spacing={2} mt={1}>
                <Grid item xs={12}>
                  <TextField
                    id="pipeline"
                    label="Pipeline Name"
                    variant="outlined"
                    fullWidth
                    onChange={(e) => setNameInput(e.target.value)}
                    value={companyName}
                  />
                </Grid>
              </Grid>
            </Box>
            {/* <Box sx={{ flexGrow: 1 }}>
              <br />
              <InputLabel id="Stage_label">Add Pipeline Stages</InputLabel>
              <br />
                <Select
                  labelId="Stage_label"
                  id="stage"
                  name="stage"
                  multiple
                  fullWidth
                  value={stageData}
                  onChange={handleChange}
                  input={<OutlinedInput id="select-multiple-chip" label="Add Pipeline filed" />}
                  renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {selected?.length > 0 && selected?.map((value) => <Chip key={value} label={value} />)}
                    </Box>
                  )}
                  MenuProps={MenuProps}
                >
                  {stageResponse && stageResponse.length > 0 &&
                    stageResponse.map((value) => (
                      <MenuItem key={value.name} value={value.name}>
                        {value.name}
                      </MenuItem>
                    ))}
                </Select>
              <FormControl sx={{ mt: 5, width: 390 }} />
            </Box> */}
          </DialogContent>
          <DialogActions>
            <Box>
              <Button onClick={handleClose} autoFocus variant="outlined" style={{ marginRight: 5 }}>
                Cancel
              </Button>
              <LoadingButton onClick={() => onsubmit({ name: nameInput, fields: stageData })} variant="contained" loading={loadingbtn}>
                Add
              </LoadingButton>
            </Box>
          </DialogActions>
        </div>
      </Dialog>
    </>
  );
};

export default PipelineModel;
