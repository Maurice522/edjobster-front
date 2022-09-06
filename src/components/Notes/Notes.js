import React from 'react';
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

const Notes = () => {
  return (
    <>
      <Grid container>
        <Grid item md={12} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Typography variant="h6">Notes</Typography>
        </Grid>
        <Grid container spacing={2} sx={{ mt: 2 }}>
          <Grid item md={10}>
            <TextField
              id="outlined-basic"
              label="Type Somthing"
              placeholder="TypeSomthing..."
              fullWidth
              variant="outlined"
              size="small"
            />
          </Grid>
          <Grid item md={2}>
            <Button style={{ minWidth: 0 }} variant="contained">
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
          <Card style={{ backgroundColor: '#5656561f' }}>
            <CardContent>
              <Typography variant="body2">
                Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer
                took a galley of type and scrambled it to make a
              </Typography>
            </CardContent>
          </Card>
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
          <Card style={{ backgroundColor: '#5656561f' }}>
            <CardContent>
              <Typography variant="body2">
                Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer
                took a galley of type and scrambled it to make a
              </Typography>
            </CardContent>
          </Card>
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
          <Card style={{ backgroundColor: '#5656561f' }}>
            <CardContent>
              <Typography variant="body2">
                Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer
                took a galley of type and scrambled it to make a
              </Typography>
            </CardContent>
          </Card>
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
