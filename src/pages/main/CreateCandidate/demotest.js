import React from 'react'
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


function NewcreateCandidate() {
    return (
        <div>
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5} ml={5} mr={5}>
                <Stack sx={{
                    display: "flex",
                    flexDirection: "row",
                    gap: "5%"
                }}>
                    <h2 style={{ width: "300px" }}>Create a Candidate</h2>
                </Stack>
                <Button
                    variant="contained"
                    to="/dashboard/jobs/create-job"
                >
                    Create
                </Button>
            </Stack>
            <Stack direction="row" alignItems="flex-start" justifyContent="center">
                <Stack>
                    <h3>Personal Details</h3>
                    <Stack>
                        <Stack direction="row" alignItems="center" justifyContent="flex-start" width={1} gap={10} mb={5} ml={0} mr={0}>
                            <TextField sx={{
                                width: "30%"
                            }}
                                required
                                id="standard-required"
                                label="First Name"
                                variant="standard"
                            />
                            <TextField sx={{
                                width: "30%"
                            }}
                                required
                                id="standard-required"
                                label="Last Name"
                                variant="standard"
                            />
                        </Stack>
                        <Stack direction="row" alignItems="center" justifyContent="flex-start" width={1} gap={10} mb={5} ml={0} mr={0}>
                            <TextField sx={{
                                width: "30%"
                            }}
                                required
                                id="standard-required"
                                label="Email"
                                variant="standard"
                            />
                            <TextField sx={{
                                width: "30%"
                            }}
                                required
                                id="standard-required"
                                label="Mobile Number"
                                variant="standard"
                            />
                        </Stack>
                        <Stack direction="row" alignItems="center" justifyContent="flex-start" width={1} gap={10} mb={5} ml={0} mr={0}>
                            <TextField sx={{
                                width: "30%"
                            }}
                                required
                                id="standard-required"
                                label="Alternate Email"
                                variant="standard"
                            />
                            <TextField sx={{
                                width: "30%"
                            }}
                                required
                                id="standard-required"
                                label="Enter Mobile Number"
                                variant="standard"
                            />
                        </Stack>
                        <Stack direction="row" alignItems="center" justifyContent="flex-start" width={1} gap={10} mb={5} ml={0} mr={0}>
                            <TextField sx={{
                                width: "30%"
                            }}
                                required
                                id="standard-required"
                                label="Address"
                                variant="standard"
                            />
                            <TextField sx={{
                                width: "30%"
                            }}
                                required
                                id="standard-required"
                                label="Country"
                                variant="standard"
                            />
                        </Stack>
                        <Stack direction="row" alignItems="center" justifyContent="flex-start" width={1} gap={10} mb={5} ml={0} mr={0}>
                            <TextField sx={{
                                width: "30%"
                            }}
                                required
                                id="standard-required"
                                label="State"
                                variant="standard"
                            />
                            <TextField sx={{
                                width: "10%"
                            }}
                                required
                                id="standard-required"
                                label="City"
                                variant="standard"
                            />
                            <TextField sx={{
                                width: "10%"
                            }}
                                required
                                id="standard-required"
                                label="Zip-code"
                                variant="standard"
                            />
                        </Stack>
                        <Stack direction="row" alignItems="center" justifyContent="flex-start" width={1} gap={10} mb={5} ml={0} mr={0}>
                            <TextField sx={{
                                width: "19%"
                            }}
                                required
                                id="standard-required"
                                label="Highest Degree"
                                variant="standard"
                            />
                            <TextField sx={{
                                width: "19%"
                            }}
                                required
                                id="standard-required"
                                label="Total Experience"
                                variant="standard"
                            />
                        </Stack>
                    </Stack>
                    <h3>Education Details</h3>
                    <Stack>
                        <Stack direction="row" alignItems="center" justifyContent="flex-start" width={1} gap={10} mb={5} ml={0} mr={0}>
                            <TextField sx={{
                                width: "30%"
                            }}
                                required
                                id="standard-required"
                                label="Institute"
                                variant="standard"
                            />
                            <TextField sx={{
                                width: "30%"
                            }}
                                required
                                id="standard-required"
                                label="Degree"
                                variant="standard"
                            />
                        </Stack>
                        <Stack direction="row" alignItems="center" justifyContent="flex-start" width={1} gap={10} mb={5} ml={0} mr={0}>
                            <TextField sx={{
                                width: "30%"
                            }}
                                required
                                id="standard-required"
                                label="From"
                                variant="standard"
                            />
                            <TextField sx={{
                                width: "30%"
                            }}
                                required
                                id="standard-required"
                                label="To"
                                variant="standard"
                            />
                        </Stack>
                    </Stack>
                </Stack>
                <Stack>
                    <Stack mt={7}>
                        <Stack direction="row" alignItems="center" justifyContent="flex-start" width={400} gap={10} mb={5} ml={0} mr={0}>
                            <TextField sx={{
                                width: "50%"
                            }}
                                required
                                id="standard-required"
                                label="Add"
                                variant="standard"
                            />
                        </Stack>
                        <Stack direction="row" alignItems="center" justifyContent="flex-start" width={400} gap={10} mb={5} ml={0} mr={0}>
                            <TextField sx={{
                                width: "100%"
                            }}
                                required
                                id="standard-required"
                                label="General Questions"
                                variant="standard"
                            />
                        </Stack>
                    </Stack>
                </Stack>
            </Stack>
        </div>
    )
}

export default NewcreateCandidate