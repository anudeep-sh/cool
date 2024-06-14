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
import CircleIcon from '@mui/icons-material/Circle';
import Button from '@mui/material/Button';

const ProblemDataApi = ({ apis }) => {
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
          <Typography variant="h6" sx={{ fontWeight: '500', fontSize: { xs: '16px', md: '20px' } }}>
            Data APIs
          </Typography>{' '}
          {/*title of the container*/}
        </AccordionSummary>

        <AccordionDetails
          sx={{
            border: '1px solid #e5e5e5',
            px: '0px',
            p: 2,
            pb: '0px!important',
          }}
        >
          <Grid Container direction={'column'}>
            {apis?.map((api, index) => {
              const arr = api.split(' ');
              let des = '';
              for (let i = 2; i < arr.length; i++) {
                des += arr[i];
                des += ' ';
              }
              return (
                <Grid item sx={12} mb={2}>
                  <Box display="flex" mb={1}>
                    <Box
                      sx={{
                        p: '4px 8px',
                        bgcolor: '#0a0a0a',
                        maxWidth: 'fit-content',
                        borderRadius: '4px',
                        mr: 1,
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
                        {arr[0]}
                      </Typography>
                    </Box>
                    <Typography variant="caption"> {arr[1]}</Typography>
                  </Box>
                  <List sx={{ p: '0px!important' }}>
                    <ListItem key={index} sx={{ ml: 2 }}>
                      <CircleIcon sx={{ fontSize: '8px' }} />
                      <Typography
                        ml={1}
                        sx={{
                          fontSize: { xs: '13px', md: '14px' },
                          lineHeight: '18px',
                          fontWeight: '400',
                        }}
                        variant="body2"
                      >
                        {des}
                      </Typography>
                    </ListItem>
                  </List>
                </Grid>
              );
            })}
            {/* <Box>
                                    <Typography paragraph ml={2} sx={{ fontSize: "15px", fontWeight: "400" }} variant="body2">{des}</Typography>
                                </Box> */}
          </Grid>
        </AccordionDetails>
      </Accordion>
    </>
  );
};

export default ProblemDataApi;
