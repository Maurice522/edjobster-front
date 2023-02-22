import React, { useState, forwardRef } from 'react'
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, Grid, Typography, TextField, Select, Radio, FormControlLabel, Checkbox, Stack } from '@mui/material';
import DialogTitle from '@mui/material/DialogTitle';
import { Container } from '@mui/system';
import { CheckBox } from '@mui/icons-material';



const AssesmentModal = (props) => {
    const { open, handleClose, data } = props;
    console.log(data)
    return (
        <>
            <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
                <DialogTitle>Assesment Response</DialogTitle>
                <DialogContent
                    sx={{
                        // width: "600px", 
                        padding: "0 1rem",
                        paddingTop: "2rem",
                        paddingBottom: "6rem",
                        display: "flex",
                        flexDirection: "column",
                        gap: "2rem",
                        // backgroundColor: "#828282"
                    }}
                >
                    <Stack sx={{
                        marginLeft:"auto",
                        marginRight:"auto"
                    }}>
                        {data?.map((e, i) => (
                            <Container key={i}>
                                <Container>{i + 1}{") "}{e.question}- Marks Obtained{e?.eval}</Container>
                                {e.type === "T" && (
                                    <Container
                                        sx={{
                                            display: "flex",
                                            justifyContent: "center",
                                            textAlign: "center",
                                            alignItems: "center",
                                            backgroundColor: "white"
                                        }}
                                    >
                                        {e.candidateAnswer}
                                    </Container>
                                )}
                                {e.type === "R" && (
                                    <Container
                                        sx={{
                                            display: "flex",
                                            gap: "1rem"
                                        }}
                                    >
                                        {e.options.map((option, index) => {
                                            return (
                                                <FormControlLabel
                                                    control={<Radio disabled />}
                                                    label={option}
                                                    checked={e.candidateAnswer.map(e => +e - 1).includes(index)}
                                                    key={index}
                                                    color={(e.answers.map(e => +e - 1).includes(index) || +e.answer - 1 === index) && "red"}
                                                />
                                            )
                                        })}
                                    </Container>
                                )}
                                {e.type === "C" && (
                                    <Container
                                        sx={{
                                            display: "flex",
                                            gap: "1rem"
                                         }}
                                     >
                                        {e.options.map((option, index) => {
                                            return (
                                                <FormControlLabel
                                                    control={<Checkbox disabled  />}
                                                    label={option}
                                                    checked={e.candidateAnswer.map(e => +e - 1).includes(index)}
                                                    key={index}
                                                    color={(e.answers.map(e => +e - 1).includes(index) || +e.answer - 1 === index) && "red"}
                                                />
                                            )
                                        })}
                                    </Container>
                                )}
                            </Container>

                        ))}
                    </Stack>
                </DialogContent>
                <DialogActions>
                    {/* <Button onClick={() => {handleSubmit(); handleClose()}} variant="outlined">Add</Button> */}
                </DialogActions>
            </Dialog>
        </>
    )
}

export default AssesmentModal
