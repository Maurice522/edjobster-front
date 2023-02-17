import React, { useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Container } from "@mui/material"
import Addresses from './Addresses';


function InstitueAddress() {

    const [expanded, setExpanded] = useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
      setExpanded(isExpanded ? panel : false);
    };

  return (
    <Addresses 
        sx={{
            paddingTop:"0px",
            marginToppaddingTop:"0px"
        }}
    />
  )
}

export default InstitueAddress