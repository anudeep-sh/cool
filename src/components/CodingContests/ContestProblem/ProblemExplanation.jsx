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
import Button from '@mui/material/Button';

const ProblemExplanation = ({ testcases }) => {
  return testcases[0] ? (
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
            Explanation
          </Typography>{' '}
          {/*title of the container*/}
        </AccordionSummary>

        <AccordionDetails sx={{ border: '1px solid #e5e5e5', px: '0px', p: 2, pb: 0 }}>
          <Grid Container direction={'column'}>
            {testcases?.map((testcase, index) => {
              return testcase ? (
                <>
                  <Grid item sx={12} mb={2}>
                    <Box
                      sx={{
                        p: '4px 8px',
                        bgcolor: '#343434',
                        maxWidth: 'fit-content',
                        borderRadius: '4px',
                        mb: 1,
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: '10px',
                          fontWeight: '200',
                          color: '#fff',
                        }}
                        variant="body2"
                      >
                        TEST CASE: {index + 1}
                      </Typography>
                    </Box>
                    <Typography
                      ml={1}
                      sx={{
                        color: '#282828',
                        fontWeight: '400',
                      }}
                      variant="body2"
                    >
                      {testcase}
                    </Typography>
                  </Grid>
                </>
              ) : null;
            })}
          </Grid>
        </AccordionDetails>
      </Accordion>
    </>
  ) : null;
};

export default ProblemExplanation;
