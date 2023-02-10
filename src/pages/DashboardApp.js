import { faker } from '@faker-js/faker';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography, Stack, Card } from '@mui/material';
import ToDoApp from '../components/homePage/ToDoApp';
// components
import Page from '../components/Page';
import Iconify from '../components/Iconify';
// sections
import {
  AppTasks,
  AppNewsUpdate,
  AppOrderTimeline,
  AppCurrentVisits,
  AppWebsiteVisits,
  AppTrafficBySite,
  AppWidgetSummary,
  AppCurrentSubject,
  AppConversionRates,
} from '../sections/@dashboard/app';
import ChartsGraph from './ChartsGraph';
import LatestInterview from '../components/homePage/InterviewStats/LatestInterview';


// ----------------------------------------------------------------------

export default function DashboardApp() {
  const userData = JSON.parse(localStorage.getItem("globalUser"))?.account
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const auth = useSelector((state) => state.login.auth);
  useEffect(() => {
    console.log(location);
    // if (!auth) {
    //   navigate('/login');
    // }
  }, []);

  return (
    <Page title="Dashboard">
      <Container maxWidth="xl">
        <h1>
          Hi {(userData?.first_name || "")}!, Welcome back
        </h1>
        <div className="container">
          <h1>Stats</h1>
          <div className="row">
            <div className="card">
              <AppWidgetSummary title="Screening" total={714000} icon={'ant-design:android-filled'} />
            </div>
            <div className="card">
              <AppWidgetSummary title="Applied" total={1352831} color="info" icon={'ant-design:apple-filled'} />
            </div>
            <div className="card">
              <AppWidgetSummary title="Shortlisted" total={1723315} color="warning" icon={'ant-design:windows-filled'} />
            </div>
            <div className="card">
              <AppWidgetSummary title="Interviews" total={234} color="error" icon={'ant-design:bug-filled'} />
            </div>
            <div className="card">
              <AppWidgetSummary title="Offered" total={234} icon={'ant-design:android-filled'} />
            </div>
            <div className="card">
              <AppWidgetSummary title="Hired" total={234} color="warning" icon={'ant-design:windows-filled'} />
            </div>
            <div className="card">
              <AppWidgetSummary title="On Boarded" total={234} color="info" icon={'ant-design:apple-filled'} />
            </div>
          </div>
        </div>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={8} mt={5}>
            <Card>
              <ChartsGraph />
            </Card>
          </Grid>

          <Grid item xs={12} md={6} lg={4} mt={5}>
            <AppCurrentVisits
              title="Current Visits"
              chartData={[
                { label: 'America', value: 4344 },
                { label: 'Asia', value: 5435 },
                { label: 'Europe', value: 1443 },
                { label: 'Africa', value: 4443 },
              ]}
              chartColors={[
                theme.palette.primary.main,
                theme.palette.chart.blue[0],
                theme.palette.chart.violet[0],
                theme.palette.chart.yellow[0],
              ]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppConversionRates
              title="Conversion Rates"
              subheader="(+43%) than last year"
              chartData={[
                { label: 'Italy', value: 400 },
                { label: 'Japan', value: 430 },
                { label: 'China', value: 448 },
                { label: 'Canada', value: 470 },
                { label: 'France', value: 540 },
                { label: 'Germany', value: 580 },
                { label: 'South Korea', value: 690 },
                { label: 'Netherlands', value: 1100 },
                { label: 'United States', value: 1200 },
                { label: 'United Kingdom', value: 1380 },
              ]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4} s>
            <AppCurrentSubject
              title="Current Subject"
              chartLabels={['English', 'History', 'Physics', 'Geography', 'Chinese', 'Math']}
              chartData={[
                { name: 'Series 1', data: [80, 50, 30, 40, 100, 20] },
                { name: 'Series 2', data: [20, 30, 40, 80, 20, 80] },
                { name: 'Series 3', data: [44, 76, 78, 13, 43, 10] },
              ]}
              chartColors={[...Array(6)].map(() => theme.palette.text.secondary)}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppNewsUpdate
              title="News Update"
              list={[...Array(5)].map((_, index) => ({
                id: faker.datatype.uuid(),
                title: faker.name.jobTitle(),
                description: faker.name.jobTitle(),
                image: `/static/mock-images/covers/cover_${index + 1}.jpg`,
                postedAt: faker.date.recent(),
              }))}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppOrderTimeline
              title="Order Timeline"
              list={[...Array(5)].map((_, index) => ({
                id: faker.datatype.uuid(),
                title: [
                  'New Job Posted',
                  '12 Candidates applied',
                  'Application closed',
                  '5 Shortlisted',
                  '1 candidate hired',
                ][index],
                type: `order${index + 1}`,
                time: faker.date.past(),
              }))}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppTrafficBySite
              title="Traffic by Site"
              list={[
                {
                  name: 'FaceBook',
                  value: 323234,
                  icon: <Iconify icon={'eva:facebook-fill'} color="#1877F2" width={32} height={32} />,
                },
                {
                  name: 'Google',
                  value: 341212,
                  icon: <Iconify icon={'eva:google-fill'} color="#DF3E30" width={32} height={32} />,
                },
                {
                  name: 'Linkedin',
                  value: 411213,
                  icon: <Iconify icon={'eva:linkedin-fill'} color="#006097" width={32} height={32} />,
                },
                {
                  name: 'Twitter',
                  value: 443232,
                  icon: <Iconify icon={'eva:twitter-fill'} color="#1C9CEA" width={32} height={32} />,
                },
              ]}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={8}>
            <Card sx={{
              minHeight:"100%",
            }}>
              <ToDoApp />
            </Card>
          </Grid>
          <Grid item xs={12} md={6} lg={8}>
            <Card sx={{
              minHeight:"100%",
            }}>
              <LatestInterview />
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
