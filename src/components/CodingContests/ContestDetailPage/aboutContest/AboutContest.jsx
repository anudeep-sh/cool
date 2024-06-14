import React from 'react';
import { ContainerOfTitle } from '../../../../Style/VideoSlider';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { Box } from '@mui/system';
import Typography from '@mui/material/Typography';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Accordion } from '@mui/material';

const AboutContest = ({ about, duration }) => {
  const days = Math.floor(duration / (24 * 60 * 60));
  const hours = Math.floor((duration % (24 * 60 * 60)) / (60 * 60));
  return (
    <>
      <Accordion
        m={0}
        p={0}
        defaultExpanded={true}
        sx={{ boxShadow: 'none', marginTop: '32px!important' }}
      >
        <AccordionSummary
          sx={{
            backgroundColor: '#FAFCFE',
            minHeight: { xs: '48px!important', md: '58px!important' },
          }}
          expandIcon={<ExpandMoreIcon />}
        >
          <Typography
            variant="h6"
            sx={{
              fontWeight: '500',
              fontSize: { xs: '16px', md: '20px' },
            }}
          >
            About this Contest
          </Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ border: '1px solid #e5e5e5', p: 2 }}>
          <Typography
            sx={{
              fontWeight: '200',
              fontSize: '14px',
              lineHeight: '24px',
              mb: 4,
            }}
            paragraph
          >
            {about}
          </Typography>
          <Box mt={2} display="flex" flexDirection="row" justifyContent="left">
            <Box>
              <Typography
                sx={{ mr: 1, fontSize: '12px', lineHeight: '18px', fontWeight: '300' }}
                variant="caption"
                color="#787878"
              >
                DURATION:
              </Typography>

              <Typography
                sx={{ ml: 1, mr: 0.5, fontSize: '13px', fontWeight: '500' }}
                variant="caption"
                color="black"
              >
                {days} days {hours} hours
              </Typography>
            </Box>
            {/* <Box>
                       <Typography sx={{ ml: 4, mr: 0.5, fontSize: "13px", fontWeight: "500" }} variant="caption" color="grey">TIME:
                       </Typography>
                       <Typography sx={{ ml: 1, mr: 0.5, fontSize: "13px", fontWeight: "500" }} variant="caption" color="black">{days} days {hours} hours to {ed}</Typography>
                </Box> */}
          </Box>
        </AccordionDetails>
      </Accordion>
    </>
  );
};

export default AboutContest;
