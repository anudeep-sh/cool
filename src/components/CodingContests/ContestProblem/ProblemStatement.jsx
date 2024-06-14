import React from 'react';
import { ContainerOfTitle } from '../../../Style/VideoSlider';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Accordion } from '@mui/material';
import { Box } from '@mui/system';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import StarIcon from '@mui/icons-material/Star';

const ProblemStatement = ({ problem }) => {
  return (
    <>
      <Accordion m={0} p={0} defaultExpanded={true} sx={{ boxShadow: 'none' }}>
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
            Problem
          </Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ border: '1px solid #e5e5e5', px: '0px', pb: 1 }}>
          <List>
            {problem?.statement?.map((ele, index) => {
              return (
                ele && (
                  <ListItem key={index}>
                    <StarIcon sx={{ color: '#e5e5e5', fontSize: '16px' }} mr={1} />
                    <Typography
                      ml={1}
                      sx={{
                        fontSize: { xs: '12px', md: '13px' },
                        lineHeight: '18px',
                        textTransform: { xs: 'none', md: 'uppercase' },
                        fontWeight: '200',
                      }}
                      variant="body2"
                    >
                      {ele}
                    </Typography>
                  </ListItem>
                )
              );
            })}
          </List>
          <Box ml={2}>
            <Typography ml={1} sx={{ fontWeight: '400', mb: 1 }} variant="body2">
              You can code the problem in the languages-{' '}
            </Typography>
            {problem?.languages?.map((lang, index) => {
              return (
                <Typography
                  key={index}
                  ml={1}
                  sx={{
                    fontSize: { xs: '13px' },
                    textTransform: { xs: 'none' },
                    fontWeight: '400',
                    mb: 1,
                  }}
                  variant="body2"
                >
                  {index + 1}. {lang}
                </Typography>
              );
            })}
          </Box>
        </AccordionDetails>
      </Accordion>
    </>
  );
};

export default ProblemStatement;
