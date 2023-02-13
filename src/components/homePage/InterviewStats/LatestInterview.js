import React, { useState, useMemo, useEffect } from 'react';
import {
  Container,
  Card,
  Stack,
  Divider,
  TextField,
  Typography
} from '@mui/material';
import { useGetInterviewLatestQuery } from '../../../redux/services/interview/InterviewServices';

function LatestInterview() {
  const { data, refetch } = useGetInterviewLatestQuery();
  useEffect(() => {
    console.log(data?.data[0]?.candidate_name)

  }, [data])

  console.log(data?.data[0]?.candidate_name)
  console.log("render full array please",data?.data)
  return (
    <div>
      <Container>
      hi there
      {data?.data?.map((e, i) => (
        <Container key={i}>
          <Container>
            {e.data?.map((elem, j) => (
              <Stack>
              <h3>{elem.job_title}</h3>
              <h3>{elem.candidate_name}</h3>
              <h3>{elem.date}</h3>
              </Stack>
            ))}
          </Container>
        </Container>
      ))}
    </Container>
    </div>
  )
}

export default LatestInterview