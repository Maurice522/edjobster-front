import { useState } from "react";
import { Box, Container, Modal, Button, Dialog, DialogTitle, DialogContent } from "@mui/material";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  // width: 400,
  bgcolor: 'background.paper',
  // border: '2px solid #000',
  // boxShadow: 24,
  // p: 4,
};

export default ({open, children, handleClose, handleSubmit, title}) => (
    <Dialog 
      sx={style}
      open={open}
      onClose={handleClose}
      BackdropProps={{ style: { background: 'transparent', border: "none" } }}
      maxWidth="lg"
      color="white"
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "2rem"
        }}
      >
        {children}
        <Container
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "flex-end",
            gap: "2rem",
            justifyContent: "flex-end"
          }}
        >
          <Button 
            variant="outlined"
            onClick={handleClose}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </Container>
      </DialogContent>
    </Dialog>
  )