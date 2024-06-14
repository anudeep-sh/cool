import React from 'react';
import { ContainerOfTitle } from '../../../Style/VideoSlider';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Accordion } from '@mui/material';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import StarIcon from '@mui/icons-material/Star';

const ProblemConstraints = ({ constraints }) => {
  return (
    constraints?.length > 0 &&
    constraints[0] !== '' && (
      <>
        <Accordion
          m={0}
          p={0}
          defaultExpanded={true}
          sx={{ boxShadow: 'none', mt: '32px!important' }}
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
              Constraints
            </Typography>
          </AccordionSummary>

          <AccordionDetails sx={{ border: '1px solid #e5e5e5', px: '0px', py: 1 }}>
            <List sx={{ p: '0px!important' }}>
              {constraints?.map((constraint, index) => {
                return (
                  <ListItem key={index}>
                    <StarIcon sx={{ color: '#e5e5e5', fontSize: '16px' }} mr={1} />
                    <Typography
                      ml={1}
                      sx={{
                        fontSize: { xs: '12px', md: '13px' },
                        lineHeight: '18px',
                        fontWeight: '200',
                      }}
                      variant="body2"
                    >
                      {constraint}
                    </Typography>
                  </ListItem>
                );
              })}
            </List>
          </AccordionDetails>
        </Accordion>
      </>
    )
  );
};

export default ProblemConstraints;
