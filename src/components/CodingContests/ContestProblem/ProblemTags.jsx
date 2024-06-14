import React from 'react';
import { ContainerOfTitle } from '../../../Style/VideoSlider';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Accordion } from '@mui/material';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

const ProblemTags = ({ tags }) => {
  return (
    tags?.length > 0 &&
    tags[0] !== '' && (
      <>
        <Accordion
          m={0}
          p={0}
          defaultExpanded={true}
          sx={{ boxShadow: 'none', mt: '32px!important' }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            sx={{
              backgroundColor: '#FAFCFE',
              minHeight: { xs: '48px!important', md: '58px!important' },
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontWeight: '500',
                fontSize: { xs: '16px', md: '20px' },
              }}
            >
              Tags
            </Typography>{' '}
          </AccordionSummary>

          <AccordionDetails sx={{ border: '1px solid #e5e5e5', px: '0px', p: 2 }}>
            <Stack direction="row" spacing={2}>
              {tags?.map((tag, index) => {
                return (
                  <Chip
                    key={index}
                    p={1}
                    sx={{ maxHeight: '24px!important' }}
                    label={
                      <Typography
                        sx={{
                          fontSize: '12px',
                          fontWeight: '400',
                          color: '#343434',
                        }}
                        variant="caption"
                      >
                        {tag}
                      </Typography>
                    }
                    variant="outlined"
                  />
                );
              })}
            </Stack>
          </AccordionDetails>
        </Accordion>
      </>
    )
  );
};

export default ProblemTags;
