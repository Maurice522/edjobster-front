import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import {
    CardContent,
    Typography,
    Card,
    Grid,
    Divider,
    ListItemIcon,
    TextField,
    InputLabel,
    Box,
    Menu,
    FormControl,
    Select,
    MenuItem,
    Avatar,
} from '@mui/material';
import Iconify from '../../../../components/Iconify';
import SingleViewJobModel from '../../../../components/Mains/SingleViewJobModel';
import { useGetJobListQuery } from '../../../../redux/services/jobs/JobListService';
import { useGetCompanyInfoQuery } from '../../../../redux/services/settings/CareerSiteService';


const Transition = React.forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);

const JobsList = () => {
    const { data: companyData, isLoading, refetch } = useGetCompanyInfoQuery();

    const { data : jobData } = useGetJobListQuery();
    const [modelOpen, setModelOpen] = useState(false);
    const [jobId , setJobId]=useState();

    const ModelhandleClose = () => {
        setModelOpen(false);
    };

    const onViewDetailsModel = (id) => {
        console.log("Selected Jobs Id: ", id);
        setJobId(id)

        setModelOpen(true);
    }

    return (
        <>
            <Grid>
                <AppBar sx={{ position: 'relative' }} style={{ backgroundColor: '#fff' }}>
                    <Toolbar>
                        <Grid container spacing={3}>
                            <Grid item md={1} style={{ display: "flex", justifyContent: "end", alignItems: "center" }}>
                                <Avatar
                                    alt="Remy Sharp"
                                    src="/static/images/avatar/1.jpg"
                                    sx={{ width: 90, height: 90 }}
                                />
                            </Grid>
                            <Grid item md={11} style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Typography variant="subtitle1" style={{ color: '#000' }} sx={{ mt: 2, mb: 2 }}>
                                    {companyData?.company?.name ?? ''} <br />
                                    <Typography variant="body2" sx={{ mt: 1 }}>
                                         {companyData?.company?.description ?? ''}
                                    </Typography>
                                </Typography>
                            </Grid>
                        </Grid>
                    </Toolbar>
                </AppBar>

                <Grid container sx={{ mt: 1, pl: 2, pr: 2, mb: 1 }} spacing={2} style={{ display: "flex", alignItems: "center" }}>
                    <Grid item md={9}>
                        <Typography variant='h4'> Available Jobs ({jobData?.length})</Typography>
                    </Grid>
                    <Grid item md={3} style={{ display: "flex", justifyContent: "end" }}>
                        <FormControl sx={{ m: 1, minWidth: 300 }}>
                            <InputLabel id="demo-simple-select-helper-label">Sort by New to Old</InputLabel>
                            <Select
                                labelId="demo-simple-select-helper-label"
                                id="demo-simple-select-helper"
                                label="Sort by New to Old"
                                fullWidth
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                <MenuItem value={10}>Ten</MenuItem>
                                <MenuItem value={20}>Twenty</MenuItem>
                                <MenuItem value={30}>Thirty</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
                <Divider variant="middle" />
                <Grid container sx={{ mt: 3, pl: 3, pr: 3 }} style={{ overflow: "auto" }}>
                    <Grid item md={12}>
                        {jobData?.map((item)=>(
                        <Card style={{ backgroundColor: "#f9f9f9" }} key={item}>
                            <CardContent>
                                <Grid container style={{ display: "flex", alignItems: "center" }}>
                                    <Grid item md={10}>
                                        <Typography sx={{ mb: 2 }} variant='h6'>{item.title}
                                        </Typography>
                                        <Box style={{ display: "flex", flexDirection: 'row' }}>
                                            <Typography variant='body2' component="span" style={{ display: "flex", alignItems: "center", marginRight: "30px" }}> <Iconify icon="carbon:location-filled" width={20} height={20} style={{ color: "#109CF1", marginRight: "5px" }} />  {item.country_name}</Typography>
                                            <Typography variant='body2' component="span" style={{ display: "flex", alignItems: "center" }} > <Iconify icon="bx:briefcase-alt-2" width={20} height={20} style={{ color: "#109CF1", marginRight: "5px" }} />  Experience {item.exp_min} to {item.exp_max} Years</Typography>
                                        </Box>
                                    </Grid>
                                    <Grid item md={2} style={{ display: "flex", justifyContent: "end" }}>
                                        <Button
                                            style={{ minWidth: 0, margin: '0px 5px', }}
                                            variant="contained"
                                            color="primary"
                                            onClick={() => onViewDetailsModel(item.id)}
                                        >
                                            View Details
                                        </Button>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                    ))}  
                    </Grid>
                </Grid>
            </Grid>
            <SingleViewJobModel jobId={jobId} open={modelOpen} handleClose={ModelhandleClose} />
        </>
    );
};

export default JobsList;
