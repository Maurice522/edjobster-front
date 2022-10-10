import React from 'react';
import { useSelector } from 'react-redux';
import './publish.css';

import {
  Typography,
  Grid,
  Container,
} from '@mui/material';

const Publish = () => {
  const job = useSelector((state) => state.job.job);

  return (
    <>
      <Container>
        <Grid container sx={{ mt: 5, pl: 2, pr: 2 }}>
          <Grid item md={3}>
            <Typography variant="subtitle1">
              Job title
              <Typography variant="body2">{job.title}</Typography>
            </Typography>
            <Typography variant="subtitle1" sx={{ mt: 2 }}>
              Department
            </Typography>
            <Typography variant="body2">{job.department}</Typography>
            <Typography variant="subtitle1" sx={{ mt: 2 }}>
              Team Members Involved
            </Typography>
            {job.member_names?.map((item) => <Typography variant="body2">{`${item.first_name} ${item.last_name}`}</Typography>)}
            <Typography variant="subtitle1" sx={{ mt: 2 }}>
              Job Nature
            </Typography>
            <Typography variant="body2">{job.nature}</Typography>
            <Typography variant="subtitle1" sx={{ mt: 2 }}>
              Major/ Speciality
            </Typography>
            <Typography variant="body2">{job.speciality}</Typography>
            <Grid container>
              <Grid item md={6}>
                <Typography variant="subtitle1" sx={{ mt: 2 }}>
                  Salary Min
                </Typography>
                <Typography variant="body2">{job.salary_min}</Typography>
              </Grid>
              <Grid item md={6}>
                <Typography variant="subtitle1" sx={{ mt: 2 }}>
                  Salary Max
                </Typography>
                <Typography variant="body2">{job.salary_max}</Typography>
              </Grid>
            </Grid>
            <Typography variant="subtitle1" sx={{ mt: 2 }}>
              State
            </Typography>
            <Typography variant="body2">{job.state_name}</Typography>
            <Grid item md={6}>
              <Typography variant="subtitle1" sx={{ mt: 2 }}>
                Description
              </Typography>
              <Typography variant="body2">{job.description}</Typography>
            </Grid>
          </Grid>
          <Grid item md={5}>
            <Typography variant="subtitle1">
              Number of Vacancies
              <Typography variant="body2">{job.vacancies}</Typography>
            </Typography>

            <Typography variant="subtitle1" sx={{ mt: 2 }}>
              Job Owner
            </Typography>
            <Typography variant="body2">{job.owner_name}</Typography>
            <Typography variant="subtitle1" sx={{ mt: 2 }}>
              Type
            </Typography>
            <Typography variant="body2">{job.type}</Typography>
            <Typography variant="subtitle1" sx={{ mt: 2 }}>
              Education
            </Typography>
            <Typography variant="body2">{job.education_names}</Typography>
            <Grid container>
              <Grid item md={6}>
                <Typography variant="subtitle1" sx={{ mt: 2 }}>
                  Work Ex. min. (Years)*
                </Typography>
                <Typography variant="body2">{job.exp_min}</Typography>
              </Grid>
              <Grid item md={6}>
                <Typography variant="subtitle1" sx={{ mt: 2 }}>
                  Work Ex. max.(Years)
                </Typography>
                <Typography variant="body2">{job.exp_max}</Typography>
              </Grid>
              <Grid item md={4}>
                <Typography variant="subtitle1" sx={{ mt: 2 }}>
                  Currency
                </Typography>
                <Typography variant="body2">{job.currency}</Typography>
              </Grid>
              <Grid item md={6}>
                <Typography variant="subtitle1" sx={{ mt: 2 }}>
                  Salary Type
                </Typography>
                <Typography variant="body2">{job.salary_type}</Typography>
              </Grid>
            </Grid>
            <Typography variant="subtitle1" sx={{ mt: 2 }}>
              City
            </Typography>
            <Typography variant="body2">{job.city}</Typography>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Publish;
