import React, { useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Departments from './Departments';
import Designations from './Designations';
import Degrees from './Degrees';


function NewIS() {

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
                <h2 className='accordianheadings'>Departments</h2>
            </AccordionSummary>
            <AccordionDetails sx={{
                paddingTop:"0px",
                marginTop:"0px"
            }}>
                <Typography>
                    <Departments sx={{
                        paddingTop:"0px",
                        marginToppaddingTop:"0px"
                         }}/>
                </Typography>
            </AccordionDetails>
        </Accordion>
        <Accordion>
            <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
            >
                <h2 className='accordianheadings'>Designations</h2>
            </AccordionSummary>
            <AccordionDetails>
                <Typography>
                    <Designations />
                </Typography>
            </AccordionDetails>
        </Accordion>
        <Accordion>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel3a-content"
                id="panel3a-header"
            >
                <h2 className='accordianheadings'>Degrees</h2>
            </AccordionSummary>
            <AccordionDetails>
                <Typography>
                    <Degrees />
                </Typography>
            </AccordionDetails>
        </Accordion>
    </div>
  )
}

export default NewIS