import React from 'react';
import { ContainerOfTitle } from '../../../../Style/VideoSlider';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import AnnouncementCard from './AnnouncementCard';
import bgImage from '../../../../assets/ContestImages/speakers.png';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Accordion, Typography } from '@mui/material';

const Announcements = ({ announcements }) => {
  return (
    <>
      <Grid justifyContent="flex-start" rowSpace={1} sx={{ mt: 4 }}>
        <Accordion
          m={0}
          p={0}
          defaultExpanded={true}
          disableGutters="true"
          sx={{
            // boxShadow:" 0px 2px 10px rgba(0, 0, 0, 0.1)",
            boxShadow: 'none',
          }}
        >
          <AccordionSummary sx={{ backgroundColor: '#FAFCFE' }} expandIcon={<ExpandMoreIcon />}>
            <Typography
              variant="h6"
              sx={{ fontWeight: '500', fontSize: { xs: '16px', md: '20px' } }}
            >
              Announcements
            </Typography>
          </AccordionSummary>
          <AccordionDetails
            sx={{
              p: 2,
              backgroundImage: `url(${bgImage})`,
              objectFit: 'contain',
              border: '1px solid #e5e5e5',
            }}
          >
            {announcements.map((announcement, index) => {
              return <AnnouncementCard key={index} announcement={announcement} />;
            })}
          </AccordionDetails>
        </Accordion>
      </Grid>
    </>
  );
};

export default Announcements;
