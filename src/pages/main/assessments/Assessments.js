import React, { useState, useEffect, useMemo } from 'react';
import MUIDataTable from 'mui-datatables';
import { sentenceCase } from 'change-case';
import { Link as RouterLink } from 'react-router-dom';
// material
import { Card, Stack, Button, Container, Typography, ListItemIcon } from '@mui/material';
import { LoadingButton } from '@mui/lab';

// components
import MainModuleFilter from '../../../components/main/MainModuleFilter';
import Page from '../../../components/Page';
import Label from '../../../components/Label';
import Iconify from '../../../components/Iconify';
import { showToast } from '../../../utils/toast';
import {
  useGetAssessmentListQuery,
  useDeleteAssessmentListMutation,
} from '../../../redux/services/settings/AssessmentListService';
import { sortedDataFn } from '../../../utils/getSortedData';

// mock

const Assessments = () => {
  const [currentIndex, setCurrentIndex] = useState(null);
  const { data = [], isLoading, refetch } = useGetAssessmentListQuery();
  const [DeleteAssessmentCategories, DeleteAssessmentCategoriesInfo] = useDeleteAssessmentListMutation();

  const sortData = useMemo(() => {
    const sortresult = sortedDataFn(data.data);
    return sortresult;
  }, [data]);

  const onDeleteHandler = async (dataIndex) => {
    setCurrentIndex(dataIndex);
    const dataArr = sortData;
    const currentDataObj = dataArr[dataIndex];
    await DeleteAssessmentCategories(currentDataObj.id);
  };
  if (DeleteAssessmentCategoriesInfo.isSuccess) {
    showToast('success', DeleteAssessmentCategoriesInfo.data.msg);
    DeleteAssessmentCategoriesInfo.reset();
    refetch();
  }
  if (DeleteAssessmentCategoriesInfo.isError) {
    showToast('error', DeleteAssessmentCategoriesInfo.error.data.msg);
    DeleteAssessmentCategoriesInfo.reset();
    refetch();
  }

  const columns = [
    {
      name: 'id',
      label: 'ID',
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: 'name',
      label: 'Name',
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: 'category_name',
      label: 'Category Name',
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
              style={{ minWidth: 0 }}
              variant="contained"
              // onClick={() => onEditModalHandler(dataIndex)}
            >
              <ListItemIcon style={{ color: '#fff', padding: '0px', minWidth: 0 }}>
                <Iconify icon="ep:edit" width={24} height={24} />
              </ListItemIcon>
            </Button>
            <LoadingButton
              style={{ minWidth: 0, margin: '0px 5px' }}
              variant="contained"
              color="error"
              onClick={() => onDeleteHandler(dataIndex)}
              loading={dataIndex === currentIndex ? useDeleteAssessmentListMutation.isLoading : false}
            >
              <ListItemIcon style={{ color: '#fff', padding: '0px', minWidth: 0 }}>
                <Iconify icon="eva:trash-2-outline" width={24} height={24} />
              </ListItemIcon>
            </LoadingButton>
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
            Assessment
          </Typography>
          <Button
            variant="contained"
            component={RouterLink}
            to="/dashboard/assessments/create-assessment"
            startIcon={<Iconify icon="eva:plus-fill" />}
          >
            New Assessment
          </Button>
        </Stack>
        <Card>
          <MainModuleFilter />
        </Card>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5} />
        <Card>
          <MUIDataTable title={'Assessment List'} data={sortData} columns={columns} options={options} />
        </Card>
      </Container>
    </Page>
  );
};

export default Assessments;
