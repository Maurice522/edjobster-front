import React, { useState } from 'react';
import MUIDataTable from 'mui-datatables';
import { sentenceCase } from 'change-case';
import { Link as RouterLink } from 'react-router-dom';
import { LoadingButton } from '@mui/lab';
// material
import { Card, Stack, Button, Container, Typography, ListItemIcon } from '@mui/material';
// components
import MainModuleFilter from '../../../components/main/MainModuleFilter';
import Page from '../../../components/Page';
import Label from '../../../components/Label';
import Iconify from '../../../components/Iconify';
import CandidatesModel from '../../../components/Mains/CandidatesModel';
// mock

const Candidates = () => {
  const [modelOpen, setModelOpen] = useState(false);

  const onCandidateModelView = () => {
    setModelOpen(true);
  };
  const handleClose = () => {
    setModelOpen(false);
  };

  const columns = [
    {
      name: 'name',
      label: 'Name',
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: 'action',
      label: 'Action',
      options: {
        filter: false,
        sort: false,
        customBodyRenderLite: (dataIndex) => (
          <>
            <Button
              style={{ minWidth: 0, marginRight: '5px' }}
              variant="contained"
              onClick={() => onCandidateModelView()}
              color="info"
            >
              <ListItemIcon style={{ color: '#fff', padding: '0px', minWidth: 0 }}>
                <Iconify icon="carbon:view-filled" width={24} height={24} />
              </ListItemIcon>
            </Button>
            <Button
              style={{ minWidth: 0 }}
              variant="contained"
            // onClick={() => onEditModalHandler(dataIndex)}
            >
              <ListItemIcon style={{ color: '#fff', padding: '0px', minWidth: 0 }}>
                <Iconify icon="ep:edit" width={24} height={24} />
              </ListItemIcon>
            </Button>
            <Button
              style={{ minWidth: 0, margin: '0px 5px' }}
              variant="contained"
              color="error"
            // onClick={() => onDeleteHandler(dataIndex)}
            // loading={dataIndex === currentIndex ? useDeleteAssessmentListMutation.isLoading : false}
            >
              <ListItemIcon style={{ color: '#fff', padding: '0px', minWidth: 0 }}>
                <Iconify icon="eva:trash-2-outline" width={24} height={24} />
              </ListItemIcon>
            </Button>
          </>
        ),
      },
    },
  ];
  const labelStatus = (
    <Label variant="ghost" color={'success'}>
      {sentenceCase('active')}
    </Label>
  );
  const editAndDeleteButton = (
    <>
      <Button component={RouterLink} to="/dashboard/candidates/edit-candidate">
        <ListItemIcon style={{ justifyContent: 'center' }}>
          <Iconify icon="eva:edit-fill" width={24} height={24} />
        </ListItemIcon>
      </Button>
      <Button>
        <ListItemIcon style={{ justifyContent: 'center' }}>
          <Iconify icon="eva:trash-2-outline" width={24} height={24} />
        </ListItemIcon>
      </Button>
    </>
  );
  const data = [
    { name: 'Joe James', status: labelStatus, action: editAndDeleteButton },
    { name: 'John Walsh', status: labelStatus, action: editAndDeleteButton },
    { name: 'Bob Herm', status: labelStatus, action: editAndDeleteButton },
    { name: 'James Houston', status: labelStatus, action: editAndDeleteButton },
  ];
  const options = {
    filterType: 'dropdown',
    responsive: 'stacked',
    filter: false,
    download: false,
    print: false,
  };
  return (
    <Page title="User">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Candidates
          </Typography>
          <Button
            variant="contained"
            component={RouterLink}
            to="/dashboard/candidates/create-candidate"
            startIcon={<Iconify icon="eva:plus-fill" />}
          >
            New candidate
          </Button>
        </Stack>
        <Card>
          <MainModuleFilter />
        </Card>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5} />
        <Card>
          <MUIDataTable title={'candidate List'} data={data} columns={columns} options={options} />
        </Card>
      </Container>
      <CandidatesModel open={modelOpen} handleClose={handleClose} />
    </Page>
  );
};

export default Candidates;
