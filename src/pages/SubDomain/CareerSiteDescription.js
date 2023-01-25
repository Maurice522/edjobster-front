import React from 'react'
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Button from '@mui/material/Button';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import FileUpload from 'react-material-file-upload';

function CareerSiteDescription() {

    const [value, setValue] = React.useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div>
            <h1 className='InstituteTitle'>SRM Institute Of Technology (Institute-Title)</h1>
            <hr style={{ width: '70%', color: 'grey', margin: '5% auto', justifyContent: "center",marginBottom:"2%" }} />
            <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TabList onChange={handleChange} aria-label="lab API tabs example">
                        <Tab label="Item One" value="1" sx={{width:"100%"}}/>
                        <Tab label="Item Three" value="2" sx={{width:"100%"}}/>
                    </TabList>
                </Box>
                <TabPanel value="1">
                    <Card>
                        <div className='InstitutePhotoAddress'>
                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTRvPseQ_eXBy0JHhwi0Os_KRiq9mASdmH6EGWF_
                        e34FegX6NUDtfWh_f-jUq7Cjt5gHVE&usqp=CAU" alt="InstitutePhoto"
                            />
                            <div className='InstituteAddress'>
                                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy
                                text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has
                                survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. (landmark, city, state, country)
                            </div>
                        </div>

                        <div className='InstituteDescription'>
                            <p>(Description)</p>
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever
                            since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only
                            five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the
                            release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including
                            versions of Lorem Ipsum.
                        </div>
                    </Card>
                </TabPanel>
                <TabPanel value="2">
                    Item Three
                </TabPanel>
            </TabContext>
            {/* <div className='InstitutePhotoAddress'>
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTRvPseQ_eXBy0JHhwi0Os_KRiq9mASdmH6EGWF_
                    e34FegX6NUDtfWh_f-jUq7Cjt5gHVE&usqp=CAU" alt="InstitutePhoto"
                />
                <div className='InstituteAddress'>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy
                    text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has
                    survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. (landmark, city, state, country)
                </div>
            </div>

            <div className='InstituteDescription'>
                <p>(Description)</p>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever
                since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only
                five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the
                release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including
                versions of Lorem Ipsum.
            </div> */}
        </div>
    )
}

export default CareerSiteDescription