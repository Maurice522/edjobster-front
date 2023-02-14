import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { sentenceCase } from 'change-case';
import MUIDataTable from 'mui-datatables';

import {
    CardContent,
    Typography,
    Card,
    Grid,
    TextField,
    Box,
    OutlinedInput,
    MenuItem,
    FormControl,
    InputLabel,
    Select,
    Drawer,
    CssBaseline,
    List,
    Divider,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
} from '@mui/material';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import { LoadingButton } from '@mui/lab';
import MailIcon from '@mui/icons-material/Mail';
import { useParams } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
// eslint-disable-next-line import/no-unresolved
import { useGetJobCandidatesQuery } from 'src/redux/services/jobs/JobListService';
import Iconify from '../Iconify';
import Label from '../Label';
import RichTextEditer from '../Rich-text-editer/RichTextEditer';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 550,
        },
    },
};


const names = [
    'Oliver Hansen',
    'Van Henry',
    'April Tucker',
    'Ralph Hubbard',
    'Omar Alexander',
    'Carlos Abbott',
];

function getStyles(name, personName, theme) {
    return {
        fontWeight:
            personName.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}


const Transition = React.forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);
const drawerWidth = 240;


const ViewAllCandidatesModel = (props) => {
    const { id } = useParams();
    const { data: candidateData } = useGetJobCandidatesQuery(+id)
    console.log("this is candidate data", candidateData)
    const [personName, setPersonName] = useState([]);

    const theme = useTheme();

    const { open, handleClose } = props;


    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        setPersonName(
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    const columns = [
        {
            name: 'first_name',
            label: 'First Name',
            options: {
                filter: true,
                sort: true,
                setCellProps: () => ({ style: { maxWidth: '250px' } }),
            },
        },
        {
            name: 'email',
            label: 'Email',
            options: {
                filter: true,
                sort: true,
                setCellProps: () => ({ style: { maxWidth: '250px' } }),
            },
        },
        {
            name: 'phone',
            label: 'Phone',
            options: {
                filter: true,
                sort: true,
            },
        },
        {
            name: 'pipeline_stage_Status',
            label: 'Status',
            options: {
                filter: true,
                sort: true,
            },
        },
        // {
        //     name: 'department',
        //     label: 'Source From',
        //     options: {
        //         filter: true,
        //         sort: true,
        //     },
        // },
        // {
        //     name: 'department',
        //     label: 'Owner',
        //     options: {
        //         filter: true,
        //         sort: true,
        //     },
        // },
        // {
        //     name: 'action',
        //     label: 'Action',
        //     options: {
        //         filter: false,
        //         sort: false,
        //         customBodyRenderLite: () => (
        //             <>
        //                 <Button style={{ minWidth: 0 }} variant="contained">
        //                     <ListItemIcon style={{ color: '#fff', padding: '0px', minWidth: 0 }}>
        //                         <Iconify icon="ep:edit" width={24} height={24} />
        //                     </ListItemIcon>
        //                 </Button>
        //                 <LoadingButton
        //                     style={{ minWidth: 0, margin: '0px 5px' }}
        //                     variant="contained"
        //                     color="error"

        //                 >
        //                     <ListItemIcon style={{ color: '#fff', padding: '0px', minWidth: 0 }}>
        //                         <Iconify icon="eva:trash-2-outline" width={24} height={24} />
        //                     </ListItemIcon>
        //                 </LoadingButton>
        //             </>
        //         ),
        //     },
        // },
    ];
    const labelStatus = (
        <Label variant="ghost" color={'success'}>
            {sentenceCase('active')}
        </Label>
    );
    const editAndDeleteButton = (
        <>
            <Button>
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
        {
            name: 'Abid Gaush Mohd Ansari',
            email: 'abid.reactdeveloper@gmail.com',
            phone: '8856823440',
            department: 'computer',
            status: labelStatus,
            action: editAndDeleteButton,
        },
        { name: 'John Walsh', status: labelStatus, action: editAndDeleteButton },
        { name: 'Bob Herm', status: labelStatus, action: editAndDeleteButton },
        { name: 'James Houston', status: labelStatus, action: editAndDeleteButton },
    ];

    // const { data: }

    const options = {
        filterType: 'dropdown',
    };

    const getInputValue = (value) => {
        console.log('value', value);
    };

    return (
        <>
            <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
                <AppBar sx={{ position: 'relative', width: "85%", }} style={{ backgroundColor: '#fff', marginLeft: "240px" }}>
                    <Toolbar>
                        <IconButton edge="start" color="secondary" onClick={handleClose} aria-label="close">
                            <CloseIcon />
                        </IconButton>
                        <Grid container spacing={3}>
                            <Grid item md={4} style={{ display: 'flex', alignItems: 'center' }}>
                                <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div" style={{ color: '#000' }}>
                                    Assisstent Professer - Mechanical Engineering
                                </Typography>
                            </Grid>
                            <Grid item md={3}>
                                <FormControl sx={{ m: 1, width: 300 }}>
                                    <InputLabel id="demo-multiple-name-label">Sort New to Old</InputLabel>
                                    <Select
                                        labelId="demo-multiple-name-label"
                                        id="demo-multiple-name"
                                        multiple
                                        value={personName}
                                        onChange={handleChange}
                                        input={<OutlinedInput label="Sort New to Old" />}
                                        MenuProps={MenuProps}
                                    >
                                        {names.map((name) => (
                                            <MenuItem
                                                key={name}
                                                value={name}
                                                style={getStyles(name, personName, theme)}
                                            >
                                                {name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item md={3}>
                                <FormControl sx={{ m: 1, width: 300 }}>
                                    <InputLabel id="demo-multiple-name-label">All candidates</InputLabel>
                                    <Select
                                        labelId="demo-multiple-name-label"
                                        id="demo-multiple-name"
                                        multiple
                                        value={personName}
                                        onChange={handleChange}
                                        input={<OutlinedInput label="All candidates" />}
                                        MenuProps={MenuProps}
                                    >
                                        {names.map((name) => (
                                            <MenuItem
                                                key={name}
                                                value={name}
                                                style={getStyles(name, personName, theme)}
                                            >
                                                {name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item md={2} style={{ display: "flex", alignItems: "center" }}>
                                <Button variant="contained" size='large' sx={{ width: "200px" }} color="info">assign a candidates</Button>
                            </Grid>
                        </Grid>
                    </Toolbar>
                </AppBar>
                <Grid container>
                    <Grid item md={2}>
                        <Drawer
                            sx={{
                                width: drawerWidth,
                                flexShrink: 0,
                                '& .MuiDrawer-paper': {
                                    width: drawerWidth,
                                    boxSizing: 'border-box',
                                },
                            }}
                            variant="permanent"
                            anchor="left"
                        >
                            <FormControl sx={{ mt: 2, ml: 2, width: 200, }}>
                                <InputLabel id="demo-multiple-name-label">From date</InputLabel>
                                <Select
                                    labelId="demo-multiple-name-label"
                                    id="demo-multiple-name"
                                    multiple
                                    value={personName}
                                    onChange={handleChange}
                                    input={<OutlinedInput label="Form data" />}
                                    MenuProps={MenuProps}
                                >
                                    {names.map((name) => (
                                        <MenuItem
                                            key={name}
                                            value={name}
                                            style={getStyles(name, personName, theme)}
                                        >
                                            {name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>

                            <FormControl sx={{ mt: 2, ml: 2, width: 200, }}>
                                <InputLabel id="demo-multiple-name-label">To date</InputLabel>
                                <Select
                                    labelId="demo-multiple-name-label"
                                    id="demo-multiple-name"
                                    multiple
                                    value={personName}
                                    onChange={handleChange}
                                    input={<OutlinedInput label="To date" />}
                                    MenuProps={MenuProps}
                                >
                                    {names.map((name) => (
                                        <MenuItem
                                            key={name}
                                            value={name}
                                            style={getStyles(name, personName, theme)}
                                        >
                                            {name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <FormControl sx={{ mt: 2, ml: 2, width: 200, }}>
                                <InputLabel id="demo-multiple-name-label">Experiance</InputLabel>
                                <Select
                                    labelId="demo-multiple-name-label"
                                    id="demo-multiple-name"
                                    multiple
                                    value={personName}
                                    onChange={handleChange}
                                    input={<OutlinedInput label="Experiance" />}
                                    MenuProps={MenuProps}
                                >
                                    {names.map((name) => (
                                        <MenuItem
                                            key={name}
                                            value={name}
                                            style={getStyles(name, personName, theme)}
                                        >
                                            {name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <FormControl sx={{ mt: 2, ml: 2, width: 200, }}>
                                <InputLabel id="demo-multiple-name-label">Skils</InputLabel>
                                <Select
                                    labelId="demo-multiple-name-label"
                                    id="demo-multiple-name"
                                    multiple
                                    value={personName}
                                    onChange={handleChange}
                                    input={<OutlinedInput label="Skils" />}
                                    MenuProps={MenuProps}
                                >
                                    {names.map((name) => (
                                        <MenuItem
                                            key={name}
                                            value={name}
                                            style={getStyles(name, personName, theme)}
                                        >
                                            {name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <FormControl sx={{ mt: 2, ml: 2, width: 200, }}>
                                <InputLabel id="demo-multiple-name-label">Job Application</InputLabel>
                                <Select
                                    labelId="demo-multiple-name-label"
                                    id="demo-multiple-name"
                                    multiple
                                    value={personName}
                                    onChange={handleChange}
                                    input={<OutlinedInput label="Job Application" />}
                                    MenuProps={MenuProps}
                                >
                                    {names.map((name) => (
                                        <MenuItem
                                            key={name}
                                            value={name}
                                            style={getStyles(name, personName, theme)}
                                        >
                                            {name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <FormControl sx={{ mt: 2, ml: 2, width: 200, }}>
                                <InputLabel id="demo-multiple-name-label">Education</InputLabel>
                                <Select
                                    labelId="demo-multiple-name-label"
                                    id="demo-multiple-name"
                                    multiple
                                    value={personName}
                                    onChange={handleChange}
                                    input={<OutlinedInput label="Education" />}
                                    MenuProps={MenuProps}
                                >
                                    {names.map((name) => (
                                        <MenuItem
                                            key={name}
                                            value={name}
                                            style={getStyles(name, personName, theme)}
                                        >
                                            {name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <FormControl sx={{ mt: 2, ml: 2, width: 200, }}>
                                <InputLabel id="demo-multiple-name-label">Hiring Status</InputLabel>
                                <Select
                                    labelId="demo-multiple-name-label"
                                    id="demo-multiple-name"
                                    multiple
                                    value={personName}
                                    onChange={handleChange}
                                    input={<OutlinedInput label="Hiring Status" />}
                                    MenuProps={MenuProps}
                                >
                                    {names.map((name) => (
                                        <MenuItem
                                            key={name}
                                            value={name}
                                            style={getStyles(name, personName, theme)}
                                        >
                                            {name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <FormControl sx={{ mt: 2, ml: 2, width: 200, }}>
                                <InputLabel id="demo-multiple-name-label">Sourced Form</InputLabel>
                                <Select
                                    labelId="demo-multiple-name-label"
                                    id="demo-multiple-name"
                                    multiple
                                    value={personName}
                                    onChange={handleChange}
                                    input={<OutlinedInput label="Sourced Form" />}
                                    MenuProps={MenuProps}
                                >
                                    {names.map((name) => (
                                        <MenuItem
                                            key={name}
                                            value={name}
                                            style={getStyles(name, personName, theme)}
                                        >
                                            {name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <Button variant="contained" size='large' sx={{ width: "200px", mt: 2, ml: 2 }} color="info">Apply Filter</Button>
                        </Drawer>
                    </Grid>
                    <Grid item md={10} sx={{ mt: 2, pr: 4 }}>
                        <Card>
                            <MUIDataTable title={'Approval List'} data={candidateData} columns={columns} options={options} />
                        </Card>
                    </Grid>
                </Grid>
            </Dialog>
        </>
    );
};

export default ViewAllCandidatesModel;
