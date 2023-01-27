import React, { useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Addresses from './Addresses';


function InstitueAddress() {

    const [expanded, setExpanded] = useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
      setExpanded(isExpanded ? panel : false);
    };

  return (
    <div>
        <Accordion>
            <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
            sx={{
                paddingDown:"0px",
                marginDown:"0px"
            }}>
                <h2 className='accordianheadings'>Address</h2>
            </AccordionSummary>
            <AccordionDetails sx={{
                paddingTop:"0px",
                marginTop:"0px"
            }}>
                <Typography>
                    <Addresses sx={{
                        paddingTop:"0px",
                        marginToppaddingTop:"0px"
                         }}/>
                </Typography>
            </AccordionDetails>
        </Accordion>
    </div>
  )
}

export default InstitueAddress