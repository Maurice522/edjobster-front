import React, { useState, useEffect } from 'react';
import { skipToken } from '@reduxjs/toolkit/query/react';
import PropTypes from 'prop-types';
import DialogContent from '@mui/material/DialogContent';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import { Card, Box, Stack, Button, TextField, Container, CircularProgress, ListItem, Grid, FormControl, InputLabel, Select, Tabs, Tab } from '@mui/material';
import FileUpload from 'react-material-file-upload';
import { LoadingButton } from '@mui/lab';
// eslint-disable-next-line import/no-unresolved
import ImagePreview from 'src/components/imagePreview/ImagePreview';
// eslint-disable-next-line import/no-unresolved
import { useGetCompanyInfoQuery, useUpdateCompanyInfoMutation, useUpdateCompanyLogoMutation, useGetCompanyTagsQuery } from 'src/redux/services/settings/CareerSiteService';
// eslint-disable-next-line import/no-unresolved
import { useGetCountryQuery, useGetStateQuery, useGetCityQuery } from 'src/redux/services/settings/CountryStateCityService';
// eslint-disable-next-line import/no-unresolved
import { useGetTestimonialsQuery } from 'src/redux/services/settings/TestimonialService';
import MUIDataTable from 'mui-datatables';
import { showToast } from '../../../utils/toast';

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}


const CareerSite = () => {
  const [tag, setTag] = useState('');
  const [files, setFiles] = React.useState([]);
  const { data, isLoading, refetch } = useGetCompanyInfoQuery();
  const { data: countryData } = useGetCountryQuery();
  const [countryId, setCountryId] = useState(skipToken);
  const [stateId, setStateId] = useState(skipToken);
  const { data: stateData } = useGetStateQuery(countryId);
  const { data: cityData } = useGetCityQuery(stateId);
  const { data: companyTagsData } = useGetCompanyTagsQuery();
  const [UpdateCompany, UpdateCompanyInfo] = useUpdateCompanyInfoMutation();
  const { data: testimonialData } = useGetTestimonialsQuery()
  console.log(testimonialData)
  const [UpdateCompanyLogo, UpdateCompanyLogoInfo] = useUpdateCompanyLogoMutation();
  const [companyData, setCompanyData] = useState({
    company: "",
    logo: "",
    website: "",
    address: "",
    landmark: "",
    country_id: "",
    state_id: "",
    city: "",
    pincode: "",
    description: "",
    tag: -1,
  })
  console.log("UpdateCompanyLogoInfo", UpdateCompanyLogoInfo);

  useEffect(() => {
    if (data) {
      
      const response = data?.company;
      console.log(response)
      setCompanyData({
        company: response.name,
        logo: response.logo,
        website: response.website,
        address: response.address,
        landmark: response.landmark,
        country_id: response.country_id,
        state_id: response.state_id,
        city: response.city_id,
        pincode: response.pincode,
        description: response.description,
        tag: response.tag
      });
      setCountryId(data?.company?.country_id);
      setStateId(data?.company?.state_id)
    }
  }, [data])


  if (UpdateCompanyInfo.isSuccess) {
    showToast("success", "career site updated successfully");
    refetch();
    UpdateCompanyInfo.reset();
  }
  if (UpdateCompanyInfo.isError) {
    showToast("error", UpdateCompanyInfo.error.data.msg);
    console.log("description daal")
  }
  if (UpdateCompanyLogoInfo.isSuccess) {
    showToast("success", UpdateCompanyLogoInfo.data.msg);
    refetch();
    UpdateCompanyLogoInfo.reset();
  }
  if (UpdateCompanyLogoInfo.isError) {
    showToast("error", "error while updating logo..");
    UpdateCompanyLogoInfo.reset();
  }

  const updateCareerSite = async () => {
    const formData = new FormData();
    formData.append('company', companyData.company);
    formData.append('address', companyData.address);
    formData.append('landmark', companyData.landmark);
    formData.append('city', companyData.city);
    formData.append('pincode', companyData.pincode);
    formData.append('website', companyData.website);
    formData.append('description', companyData.description);
    formData.append('tag', companyData.tag);
    await UpdateCompany(formData);

  }

  const companyLogoChangeHandler = async (file) => {
    console.log("file", file);
    const formData = new FormData();
    formData.append('logo', file);
    await UpdateCompanyLogo(formData);
  }

  const onInputChangeHandler = (e) => {
    console.log(typeof e.target.value)
    setCompanyData({ ...companyData, [e.target.name]: e.target.name === "tag"?+e.target.value:e.target.value })
    console.log(companyData)
  }
  console.log(companyData)

  const handleTag = (event) => {
    setTag(event.target.value);
  };

  const [tabIndex, setTabIndex] = useState(0)
  const hangeChangeTabIndex = (e, newValue) => setTabIndex(newValue)

  const columns = [
    {
      name: "name",
      label: "Name",
      options: {
        filter: true,
        sort: true
      }
    },
    {
      name: "testimonials",
      label: "Testimony",
      options: {
        filter: true,
        sort: true
      }
    }
  ]

  const options = {
    filterType: 'dropdown',
    responsive: 'stacked',
    filter: false,
    download: false,
    print: false,
  }


  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <h1>
          Career Site
        </h1>
      </Stack>
      <Tabs value={tabIndex} onChange={hangeChangeTabIndex} sx={{display: "flex", justifyContent: "center"}}>
        <Tab label="Company Details" {...a11yProps(0)} />
        <Tab label="Testimonials" {...a11yProps(1)} />
      </Tabs>
      <TabPanel value={tabIndex} index={0}>
        <DialogContent>
          <Card sx={{ minWidth: 275, p: 4 }} variant="outlined">
            <Box sx={{ flexGrow: 1 }}>
              <Grid container spacing={3} justifyContent="center">
                <Grid item xs={12} md={7}>
                  <TextField
                    
                    margin="dense"
                    variant="outlined"
                    fullWidth
                    name="company"
                    value={companyData.company}
                    label="Institute Name"
                    onChange={onInputChangeHandler}
                  />
                </Grid>
                <Grid item xs={12} md={7} sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}>
                  {/* <FileUpload value={files} onChange={setFiles} /> */}
                  <Stack>
                    <ImagePreview
                      logo={companyData.logo}
                      onFileSelectSuccess={(file) => companyLogoChangeHandler(file)}
                      onFileSelectError={({ error }) => showToast("error", error)}
                    />
                  </Stack>
                  <Stack sx={{}}>
                    <Grid item xs={12} md={7} sx={{ width: "300px", marginBottom: "4%" }}>
                      <TextField
                        
                        margin="dense"
                        variant="outlined"
                        fullWidth
                        name="website"
                        value={companyData.website}
                        label="Institute Website"
                        onChange={onInputChangeHandler}
                        sx={{
                          width: "300px"
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} md={7} sx={{ width: "300px", marginBottom: "4%" }}>
                      <TextField
                        
                        margin="dense"
                        variant="outlined"
                        fullWidth
                        name="address"
                        value={companyData.address}
                        label="Institute Address"
                        onChange={onInputChangeHandler}
                        sx={{
                          width: "300px"
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} md={7}>
                      <TextField
                        
                        margin="dense"
                        variant="outlined"
                        fullWidth
                        value={companyData.landmark}
                        label="Address Landmark"
                        name="landmark"
                        onChange={onInputChangeHandler}
                        sx={{
                          width: "300px"
                        }}
                      />
                    </Grid>
                  </Stack>
                </Grid>
                <Grid item xs={12} md={7}>
                  <FormControl variant="outlined" sx={{ minWidth: '100%' }}>
                    <InputLabel id="select-tag">Tags</InputLabel>
                    <Select
                      labelId="select-tag"
                      id="tags"
                      label="Tags"
                      value={companyData.tag}
                      name="tag"
                      onChange={onInputChangeHandler}
                    >
                      {companyTagsData?.types?.map((e, i) => (
                        <MenuItem value={e.id} key={i}>{e.name}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} md={7}>
                  <FormControl variant="outlined" sx={{ minWidth: '100%' }}>
                    <InputLabel id="select-country">Select Country</InputLabel>
                    <Select
                      labelId="select-country"
                      id="country"
                      value={companyData.country_id}
                      // onChange={() => console.log("hello")}
                      // onClick={() => console.log("click")}
                      label="Select Country"
                    >
                      {countryData && countryData?.countries?.map((country) => <MenuItem key={country?.id} value={country?.id}>{country?.name}</MenuItem>)}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={7}>
                  <FormControl variant="outlined" sx={{ minWidth: '100%' }}>
                    <InputLabel id="select-state">Select State</InputLabel>
                    <Select
                      labelId="select-state"
                      id="state"
                      value={companyData.state_id}
                      //   onChange={handleChange}
                      label="Select State"
                    >

                      {stateData && stateData?.states?.map((state) => <MenuItem key={state?.id} value={state?.id}>{state?.name}</MenuItem>)}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={7}>
                  <FormControl variant="outlined" sx={{ minWidth: '100%' }}>
                    <InputLabel id="select-city">Select City</InputLabel>
                    <Select
                      labelId="select-city"
                      id="city"
                      value={companyData.city_id}
                      label="Select City"
                    >
                      {cityData && cityData?.cities?.map((city) => <MenuItem key={city?.id} value={city?.id}>{city?.name}</MenuItem>)}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={7}>
                  <TextField
                    margin="dense"
                    variant="outlined"
                    label="Pincode"
                    name="pincode"
                    fullWidth
                    value={companyData.pincode}
                    onChange={onInputChangeHandler}
                  />
                </Grid>
                <Grid item xs={12} md={7}>
                  <TextField
                    multiline
                    rows={4}
                    margin="dense"
                    variant="outlined"
                    fullWidth
                    value={companyData.description}
                    label="About the Institute"
                    name="description"
                    onChange={onInputChangeHandler}
                  />
                </Grid>
                <Grid item xs={12} md={7}>
                  <Box style={{ display: 'flex', justifyContent: 'center' }}>
                    <LoadingButton variant="contained" onClick={updateCareerSite} loading={UpdateCompanyInfo.isLoading}> Update </LoadingButton>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Card>
        </DialogContent>
      </TabPanel>
      <TabPanel value={tabIndex} index={1}>
        <MUIDataTable
          title="Testimonials"
          data={testimonialData}
          columns={columns}
          options={options}
        />
      </TabPanel>
    </Container>
  );
};

export default CareerSite;
