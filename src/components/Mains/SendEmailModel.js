import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { makeStyles } from '@mui/styles';
import {
    CardContent,
    Card,
    Grid,
    Divider,
    TextField,
    Box,
    Menu,
    OutlinedInput,
    MenuItem,
    FormControl,
    InputLabel,
    Select,
    Radio,
    FormControlLabel,
    Checkbox,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
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


const Transition = React.forwardRef((props, ref) => {
    return <Slide direction="up" ref={ref} {...props} />;
});

const SendEmailModel = (props) => {
    const [activeStep, setActiveStep] = useState(0);
    const [skipped, setSkipped] = useState(new Set());
    const [age, setAge] = useState('');
    const [personName, setPersonName] = useState([]);

    const theme = useTheme();



    const { open, handleClose } = props;


    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        setPersonName(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    return (
        <>
            <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
                <AppBar sx={{ position: 'relative' }} style={{ backgroundColor: '#fff' }}>
                    <Toolbar>
                        <IconButton edge="start" color="secondary" onClick={handleClose} aria-label="close">
                            <CloseIcon />
                        </IconButton>
                        <Grid container spacing={3}>
                            <Grid item md={8} style={{ display: 'flex', alignItems: 'center' }}>
                                <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div" style={{ color: '#000' }}>
                                    Send Email
                                </Typography>
                            </Grid>
                        </Grid>
                    </Toolbar>
                </AppBar>
                <Grid container sx={{ mt: 5, mb: 5 }} style={{ display: "flex", justifyContent: "center" }}>
                    <Grid item md={8}>
                        <Card style={{ backgroundColor: "#f9f9f9" }}>
                            <CardContent>
                                <Grid container sx={{ mt: 1 }} style={{ display: "flex", alignItems: "center" }}>
                                    <Grid item md={3}>
                                        <Typography variant='subtitle1'>
                                            Select Email Template :
                                        </Typography>
                                    </Grid>
                                    <Grid item md={9}>
                                        <FormControl sx={{ m: 1, width: 770 }}>
                                            <InputLabel id="demo-multiple-name-label">Select Email Tamplate</InputLabel>
                                            <Select
                                                labelId="demo-multiple-name-label"
                                                id="demo-multiple-name"
                                                multiple
                                                value={personName}
                                                fullWidth
                                                onChange={handleChange}
                                                input={<OutlinedInput label="Select Email Tamplate" />}
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
                                </Grid>
                                <Grid container sx={{ mt: 3 }} style={{ display: "flex", alignItems: "center" }}>
                                    <Grid item md={3}>
                                        <Typography variant='subtitle1'>
                                            From :
                                        </Typography>
                                    </Grid>
                                    <Grid item md={9}>
                                        <TextField id="outlined-basic" label="from" variant="outlined" fullWidth defaultValue="zubiar.khan@gmail.com" />
                                    </Grid>
                                </Grid>
                                <Grid container sx={{ mt: 3 }} style={{ display: "flex", alignItems: "center" }}>
                                    <Grid item md={3}>
                                        <Typography variant='subtitle1'>
                                            To :
                                        </Typography>
                                    </Grid>
                                    <Grid item md={9}>
                                        <TextField id="outlined-basic" label="To" variant="outlined" fullWidth defaultValue="bilal.momin@gmail.com" />
                                    </Grid>
                                </Grid>
                                <Grid container sx={{ mt: 3 }} style={{ display: "flex", alignItems: "center" }}>
                                    <Grid item md={3}>
                                        <Typography variant='subtitle1'>
                                            Subject :
                                        </Typography>
                                    </Grid>
                                    <Grid item md={9}>
                                        <TextField id="outlined-basic" label="Subject" variant="outlined" fullWidth placeholder='Tpye your subject here...' />
                                    </Grid>
                                </Grid>
                                <Grid container sx={{ mt: 3 }} style={{ display: "flex", alignItems: "center" }}>
                                    <Grid item md={3}>
                                        <Typography variant='subtitle1'>
                                            Email Body :
                                        </Typography>
                                    </Grid>
                                    <Grid item md={9}>
                                        <RichTextEditer />
                                    </Grid>
                                </Grid>
                                <Grid container sx={{ mt: 3 }} style={{ display: "flex", alignItems: "center" }}>
                                    <Grid item md={3}>
                                        <Typography variant='subtitle1'>
                                            Attechment :
                                        </Typography>
                                    </Grid>
                                    <Grid item md={9}>
                                        <TextField id="outlined-basic" type="file" label="Attechment" variant="outlined" fullWidth defaultValue="" />
                                    </Grid>
                                </Grid>
                                <Box style={{ display: "flex", justifyContent: "center" }} sx={{ mt: 5 }}>
                                    <Button variant="contained" sx={{ width: "200px" }}>Send</Button>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>

            </Dialog>
        </>
    );
};

export default SendEmailModel;
