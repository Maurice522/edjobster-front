import React, { useEffect, useState, } from 'react'
import { useNavigate } from 'react-router-dom';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
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
  } from '@mui/material';
import WorkIcon from '@mui/icons-material/Work';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import FileUpload from 'react-material-file-upload';
import ReactQuill from 'react-quill';
import { useGetJobListQuery } from '../../redux/services/jobs/JobListService';
import { showToast } from '../../utils/toast';
import { useGetCompanyInfoQuery } from '../../redux/services/settings/CareerSiteService';

function CareerSiteDescription() {
    const navigate = useNavigate()
    const { data, isLoading, refetch } = useGetCompanyInfoQuery();
    console.log(data)
    const { data: jobList } = useGetJobListQuery();

    const [AboutData, setAboutData] = useState({
        institute_name: '',
        institute_logo: '',
        institute_description: '',
        institute_address: '',
        institute_landmark: '',
        institute_city: '',
        institute_state: '',
        institute_country: '',

    })
    const [value, setValue] = React.useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    useEffect(() => {
        if (data?.company) {
            setAboutData({
                institute_name: data?.company?.name,
                institute_logo: data?.company?.logo,
                institute_description: data?.company?.description,
                institute_address: data?.company?.address,
                institute_landmark: data?.company?.landmark,
                institute_city: data?.company?.city_name,
                institute_state: data?.company?.state_name,
                institute_country: data?.company?.country_name,
            })
        }
        if (data?.code !== 200) {
            showToast("error", "Error fetching the Data")
        }
    }, [data])
    useEffect(() => {
        if (data?.company) {
            setAboutData({
                institute_name: data?.company?.name,
                institute_logo: data?.company?.logo,
                institute_description: data?.company?.description,
                institute_address: data?.company?.address,
                institute_landmark: data?.company?.landmark,
                institute_city: data?.company?.city_name,
                institute_state: data?.company?.state_name,
                institute_country: data?.company?.country_name,
            })
        }
        if (data?.code !== 200) {
            showToast("error", "Error fetching the Data")
        }
    }, [])






    return (
        <div>
            <h1 className='InstituteTitle'>{AboutData?.institute_name}</h1>
            <hr style={{ width: '70%', color: 'grey', margin: '5% auto', justifyContent: "center", marginBottom: "2%" }} />
            <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider', display: "flex", justifyContent: "center" }}>
                    <TabList onChange={handleChange} aria-label="lab API tabs example" sx={{ display: "flex", justifyContent: "center" }}>
                        <Tab label="About" value="1" sx={{ width: "10%" }} />
                        <Tab label="Job" value="2" sx={{ width: "10%" }} />
                    </TabList>
                </Box>
                <TabPanel value="1" sx={{ displya: "flex", justifyContent: "center" }}>
                    <Card sx={{ width: "80%", marginLeft: "auto", marginRight: "auto" }}>
                        <div className='InstitutePhotoAddress'>
                            <img src={AboutData?.institute_logo} alt="InstitutePhoto"
                            />
                            {/* <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTRvPseQ_eXBy0JHhwi0Os_KRiq9mASdmH6EGWF_
                                        e34FegX6NUDtfWh_f-jUq7Cjt5gHVE&usqp=CAU" alt="InstitutePhoto" /> */}
                            <div className='InstituteAddress'>
                                {AboutData?.institute_address}
                                <p>
                                    {AboutData?.institute_landmark}, {AboutData?.institute_city}, {AboutData?.institute_state}, {AboutData?.institute_country}
                                </p>
                            </div>
                        </div>

                        <div className='InstituteDescription'>
                            {AboutData?.institute_description}
                        </div>
                    </Card>
                </TabPanel>
                <TabPanel value="2" sx={{
                    marginLeft: "20%"
                }}>
                    {jobList?.map((item) => {

                        return (
                            <Card sx={{
                                borderRadius: "14px",
                                boxSizing: "border-box 1px solid #eaf1f5",
                                width: "60%",
                                marginBottom: "2%",
                            }}>
                                <div className='JobInnerCard'>
                                    <Stack sx={{
                                        display: "flex",
                                        flexDirection: "row",
                                        gap: "2%",
                                    }}>
                                        <div className='JobCardImgDiv'>
                                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTRvPseQ_eXBy0JHhwi0Os_KRiq9mASdmH6EGWF_
                                                        e34FegX6NUDtfWh_f-jUq7Cjt5gHVE&usqp=CAU" alt="InstitutePhoto"
                                            />
                                        </div>
                                        <div>
                                            <h2>{item?.title}</h2>
                                            <h4>{item?.institute_name}</h4>
                                        </div>
                                    </Stack>
                                    <Stack sx={{
                                        display: "flex",
                                        flexDirection: "row",
                                        gap: "4%",
                                        marginTop: "2%",
                                    }}>
                                        <div style={{ alignItems: "center", display: "flex", flexDirection: "row" }}>
                                            <WorkIcon color='disabled' />
                                            <p>{item?.exp_min}-{item?.exp_max}</p>
                                        </div>
                                        <div style={{ alignItems: "center", display: "flex", flexDirection: "row" }}>
                                            <CurrencyRupeeIcon color='disabled' sx={{ marginTop: "2%", paddingTop: "2%" }} />
                                            <p>{item?.salary_min}-{item?.salary_max}</p>
                                        </div>
                                        <div style={{ alignItems: "center", display: "flex", flexDirection: "row" }}>
                                            <LocationOnIcon color='disabled' />
                                            <p>{item?.country},{item?.state},{item?.city}</p>
                                        </div>
                                    </Stack>
                                    <Typography variant="body1" gutterBottom sx={{ marginTop: "2%" }}>
                                    <ReactQuill value={`${item?.description}`}  theme={"snow"} readOnly formats={[]} modules={{toolbar: false}} style={{height: "3em", overflow:"hidden"}}/>
                                    </Typography>
                                    <Button 
                                    onClick={()=>navigate(`/dashboard/Institute-Description/Individual-Job/${item?.id}`)}
                                    >
                                        Apply
                                    </Button>
                                </div>
                            </Card>
                        )
                    })}
                </TabPanel>
            </TabContext>
        </div>
    )
}

export default CareerSiteDescription