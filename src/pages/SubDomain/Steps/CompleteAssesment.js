import React from 'react'
import {
  Card,
  Stack,
  Button,
  Container,
  Typography,
  ListItemIcon,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  DialogContent,
  Box,
  RadioGroup,
  Radio,
  Checkbox,
  FormLabel
} from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';
import ReactQuill from 'react-quill';
import { useParams } from 'react-router-dom';

function CompleteAssesment() {
  const { assesment } = useParams();

  return (
    <div className='ApplicationSteps'>
      <Container>
        <h1 style={{ marginLeft: "auto", marginRight: "auto", textAlign: "center" }}>Assesment Questions</h1>
        <Card sx={{
          width: "60%",
          marginLeft: "auto",
          marginRight: "auto",

        }}>
          <Stack sx={{
            padding: "5%"
          }}>
            <h3>
              1. Is this test Question 1?
            </h3>
            <Stack direction="row" alignItems="center" justifyContent="flex-start" width={500} mb={5} ml={0} mr={0}>
              <FormControlLabel
                sx={{
                  backgroundColor: "#f9fafb",
                  marginRight: "0",
                  "&.MuiTypography-root": {
                    backgroundColor: '#f9fafb'
                  },
                  "&.MuiFormControlLabel-label": {
                    backgroundColor: '#f9fafb'
                  }
                }}
                value="IP"
                control={<Radio />}
                labelPlacement="end"
              />
              <p style={{ marginLeft: "0.5%" }}>abcd person</p>
              <FormControlLabel
                sx={{
                  marginLeft: "1%"
                }}
                value="PC"
                control={<Radio />}
                labelPlacement="end"
              />
              <p style={{ marginLeft: "0.5%" }}>abcd</p>
              <FormControlLabel
                sx={{
                  marginLeft: "1%"
                }}
                value="VC"
                control={<Radio />}
                labelPlacement="end"
              />
              <p style={{ marginLeft: "0.5%" }}>abcd</p>
              <FormControlLabel
                sx={{
                  marginLeft: "1%"
                }}
                value="VC"
                control={<Radio />}
                labelPlacement="end"
              />
              <p style={{ marginLeft: "0.5%" }}>abcd</p>
            </Stack>
          </Stack>
          <Stack sx={{
            padding: "5%"
          }}>
            <h3>
              1. Is this test Question 2?
            </h3>
            <Stack direction="row" alignItems="center" justifyContent="flex-start" width={500} mb={5} ml={0} mr={0}>
              <FormControlLabel
                sx={{
                  backgroundColor: "#f9fafb",
                  marginRight: "0",
                  "&.MuiTypography-root": {
                    backgroundColor: '#f9fafb'
                  },
                  "&.MuiFormControlLabel-label": {
                    backgroundColor: '#f9fafb'
                  }
                }}
                value="IP"
                control={<Checkbox />}
                labelPlacement="end"
              />
              <p style={{ marginLeft: "0.5%" }}>abcd person</p>
              <FormControlLabel
                sx={{
                  marginLeft: "1%"
                }}
                value="PC"
                control={<Checkbox />}
                labelPlacement="end"
              />
              <p style={{ marginLeft: "0.5%" }}>abcd</p>
              <FormControlLabel
                sx={{
                  marginLeft: "1%"
                }}
                value="VC"
                control={<Checkbox />}
                labelPlacement="end"
              />
              <p style={{ marginLeft: "0.5%" }}>abcd</p>
              <FormControlLabel
                sx={{
                  marginLeft: "1%"
                }}
                value="VC"
                control={<Checkbox />}
                labelPlacement="end"
              />
              <p style={{ marginLeft: "0.5%" }}>abcd</p>
            </Stack>
          </Stack>
          <Stack sx={{
            padding: "5%"
          }}>
            <h3>
              1. Is this test Question 3?
            </h3>
            <Stack direction="row" alignItems="center" justifyContent="flex-start" width={500} mb={5} ml={0} mr={0}>
              <FormControlLabel
                sx={{
                  backgroundColor: "#f9fafb",
                  marginRight: "0",
                  "&.MuiTypography-root": {
                    backgroundColor: '#f9fafb'
                  },
                  "&.MuiFormControlLabel-label": {
                    backgroundColor: '#f9fafb'
                  }
                }}
                value="IP"
                control={<Radio />}
                labelPlacement="end"
              />
              <p style={{ marginLeft: "0.5%" }}>abcd person</p>
              <FormControlLabel
                sx={{
                  marginLeft: "1%"
                }}
                value="PC"
                control={<Radio />}
                labelPlacement="end"
              />
              <p style={{ marginLeft: "0.5%" }}>abcd</p>
              <FormControlLabel
                sx={{
                  marginLeft: "1%"
                }}
                value="VC"
                control={<Radio />}
                labelPlacement="end"
              />
              <p style={{ marginLeft: "0.5%" }}>abcd</p>
              <FormControlLabel
                sx={{
                  marginLeft: "1%"
                }}
                value="VC"
                control={<Radio />}
                labelPlacement="end"
              />
              <p style={{ marginLeft: "0.5%" }}>abcd</p>
            </Stack>
          </Stack>
          <Stack sx={{
            padding: "5%"
          }}>
            <h3>
              1. Is this test Question 4?
            </h3>
            <Stack direction="row" alignItems="center" justifyContent="flex-start" width={500} mb={5} ml={0} mr={0}>
              <FormControlLabel
                sx={{
                  backgroundColor: "#f9fafb",
                  marginRight: "0",
                  "&.MuiTypography-root": {
                    backgroundColor: '#f9fafb'
                  },
                  "&.MuiFormControlLabel-label": {
                    backgroundColor: '#f9fafb'
                  }
                }}
                value="IP"
                control={<Radio />}
                labelPlacement="end"
              />
              <p style={{ marginLeft: "0.5%" }}>abcd person</p>
              <FormControlLabel
                sx={{
                  marginLeft: "1%"
                }}
                value="PC"
                control={<Radio />}
                labelPlacement="end"
              />
              <p style={{ marginLeft: "0.5%" }}>abcd</p>
              <FormControlLabel
                sx={{
                  marginLeft: "1%"
                }}
                value="VC"
                control={<Radio />}
                labelPlacement="end"
              />
              <p style={{ marginLeft: "0.5%" }}>abcd</p>
              <FormControlLabel
                sx={{
                  marginLeft: "1%"
                }}
                value="VC"
                control={<Radio />}
                labelPlacement="end"
              />
              <p style={{ marginLeft: "0.5%" }}>abcd</p>
            </Stack>
          </Stack>
        </Card>
        <div style={{
          marginRight: "auto",
          marginLeft: "auto",
          display:"flex",
          justifyContent:"center"
        }}>
          <Button
            variant="contained"
            sx={{
              marginRight: "auto",
              marginLeft: "auto"
            }}
          >
            Submit
          </Button>
        </div>
      </Container>
    </div>
  )
}

export default CompleteAssesment