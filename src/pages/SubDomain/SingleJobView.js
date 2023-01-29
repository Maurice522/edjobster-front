import React from 'react'
import { useNavigate, useParams } from 'react-router-dom';
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
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useGetJobeDetailsQuery } from '../../redux/services/jobs/JobServices';

function SingleJobView() {
    const {id}=useParams()
    const { data, isLoading, refetch } = useGetJobeDetailsQuery(1);
    console.log(data)
    const navigate=useNavigate()
    return (
        <div style={{ backgroundColor: "#ffffff", height: "100%" }}>
            <div className='applicationTop'>
                <ArrowBackIcon color="secondary" />
                <div style={{
                    width: "142px",
                    height: "142px",
                    padding: "71px 0px",
                    borderRadius: "50%",
                    alignItems: "center",
                    textAlign: "center",
                    marginLeft: "auto",
                    marginRight: "auto",
                    backgroundColor: "#f9fafb"
                }}>
                    Logo
                </div>
            </div>
            <Card sx={{
                marginTop: "5%",
                backgroundColor: "#f9fafb",

            }}>
                <h2 style={{
                    display: "flex",
                    justifyContent: "center"
                }}>
                    Job Position-Title- Department Name
                </h2>
                <div className="grid-container">
                    <div className="grid-item">
                        <h3>
                            Department
                        </h3>
                        <div>
                            Mechanical Engineering
                        </div>
                    </div>
                    <div className="grid-item">
                        <h3>
                            Type
                        </h3>
                        <div>
                            Full Timw
                        </div>
                    </div>
                    <div className="grid-item">
                        <h3>
                            Education
                        </h3>
                        <div>
                            M tech
                        </div>
                    </div>
                    <div className="grid-item">
                        <h3>
                            Major/Speciality
                        </h3>
                        <div>
                            Mechanical
                        </div>
                    </div>
                    <div className="grid-item">
                        <h3>
                            Work Expirience
                        </h3>
                        <div>
                            5-8 Years
                        </div>
                    </div>
                    <div className="grid-item">
                        <h3>
                            Salary Offered
                        </h3>
                        <div>
                            INR 50-100
                        </div>
                    </div>
                    <div className="grid-item">
                        <h3>
                            Country
                        </h3>
                        <div>
                            India
                        </div>
                    </div>
                    <div className="grid-item">
                        <h3>
                            City
                        </h3>
                        <div>
                            Pune
                        </div>
                    </div>
                </div>
                <h2 style={{
                    display: "flex",
                    justifyContent: "center"
                }}>
                    Job Description
                </h2>
                <Card sx={{
                    padding: "2%",
                    border: "3px solid ##4A77FF",
                    height: "100px"
                }}>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                </Card>
                <div style={{display:"flex",justifyContent:"center",marginTop:"2%"}}>
                <Button sx={{
                    marginBottom:"2%",
                    marginBTop:"2%",
                    display: "flex",
                    justifyContent: "center"
                 }}
                    variant="contained"
                    onClick={()=>navigate('/dashboard/Institute-Description/Individual-Job/Application')}
                >
                    Apply
                </Button>
                </div>
            </Card>
        </div>
    )
}

export default SingleJobView