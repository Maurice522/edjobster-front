import React, { useState, useMemo, useEffect } from 'react';
import { faker } from '@faker-js/faker';

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
  console.log("render full array please", data?.data)
  return (
    <div>
      <Container>
        <h3 sx={{margin:"5%"}}>Recent Interviews Scheduled</h3>
        <Container sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          marginBottom:"5%"
         }}>
          <Stack sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-start",
          }}>
            <Stack sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent:"space-between",
             }}>
              <Stack sx={{
                display: "flex",
                flexDirection: "column",
                width:"600px"
               }}>
                <h3>{data?.data[0]?.job_title}</h3>
                <h4>{data?.data[0]?.candidate_name}</h4>
              </Stack>
              <Stack sx={{

              }}>
                <h5>{data?.data[0]?.date}</h5>
              </Stack>
            </Stack>
          </Stack>
        </Container>
        <Container sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          marginBottom:"5%"
         }}>
          <Stack sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-start",
          }}>
            <Stack sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent:"space-between",
             }}>
              <Stack sx={{
                display: "flex",
                flexDirection: "column",
                width:"600px"
               }}>
                <h3>{data?.data[1]?.job_title}</h3>
                <h4>{data?.data[1]?.candidate_name}</h4>
              </Stack>
              <Stack sx={{

              }}>
                <h5>{data?.data[1]?.date}</h5>
              </Stack>
            </Stack>
          </Stack>
        </Container>
        <Container sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          marginBottom:"5%"
         }}>
          <Stack sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-start",
          }}>
            <Stack sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent:"space-between",
             }}>
              <Stack sx={{
                display: "flex",
                flexDirection: "column",
                width:"600px"
               }}>
                <h3>{data?.data[2]?.job_title}</h3>
                <h4>{data?.data[2]?.candidate_name}</h4>
              </Stack>
              <Stack sx={{

              }}>
                <h5>{data?.data[2]?.date}</h5>
              </Stack>
            </Stack>
          </Stack>
        </Container>
        <Container sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          marginBottom:"5%"
         }}>
          <Stack sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-start",
          }}>
            <Stack sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent:"space-between",
             }}>
              <Stack sx={{
                display: "flex",
                flexDirection: "column",
                width:"600px"
               }}>
                <h3>{data?.data[3]?.job_title}</h3>
                <h4>{data?.data[3]?.candidate_name}</h4>
              </Stack>
              <Stack sx={{

              }}>
                <h5>{data?.data[3]?.date}</h5>
              </Stack>
            </Stack>
          </Stack>
        </Container>
        <Container sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          marginBottom:"5%"
         }}>
          <Stack sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-start",
          }}>
            <Stack sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent:"space-between",
             }}>
              <Stack sx={{
                display: "flex",
                flexDirection: "column",
                width:"600px"
               }}>
                <h3>{data?.data[4]?.job_title}</h3>
                <h4>{data?.data[4]?.candidate_name}</h4>
              </Stack>
              <Stack sx={{

              }}>
                <h5>{data?.data[4]?.date}</h5>
              </Stack>
            </Stack>
          </Stack>
        </Container>
          
        {/* {data?.data?.map((e, i) => (
        <Container key={i}>
          <h3>{e>.data?.candidate_name}</h3>
        </Container>
      ))} */}
      </Container>
    </div>
  )
}

export default LatestInterview