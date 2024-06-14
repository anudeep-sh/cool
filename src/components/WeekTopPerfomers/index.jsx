import React from 'react';
import { ContainerOfTitle } from '../../Style/VideoSlider';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { Box } from '@mui/system';
import PerformersCard from './PerformersCard';

const WeekTopPerformers = ({ topPerformers }) => {
  return (
    <div>
      <Grid justifyContent="flex-start" rowSpace={1}>
        <Paper
          elevation={1}
          square={true}
          sx={{
            p: 2,
            flexGrow: 1,
            backgroundColor: '#FAFCFE',
          }}
        >
          <Grid maxWidth="65%">
            <ContainerOfTitle variant="h6">
              <strong>Week Top Performers</strong>
            </ContainerOfTitle>{' '}
            {/*title of the container*/}
          </Grid>
        </Paper>
        <Paper
          elevation={1}
          square={true}
          sx={{
            p: 1,
            flexGrow: 1,
            backgroundColor: '#F1F1F1',
          }}
        >
          <Box
            sx={{
              display: 'grid',
              columnGap: 3,
              rowGap: 1,
              gridTemplateColumns: 'repeat(2, 1fr)',
            }}
          >
            {topPerformers.map((performer, index) => {
              return <PerformersCard key={index} performer={performer} />;
            })}
          </Box>
        </Paper>
      </Grid>
    </div>
  );
};

export default WeekTopPerformers;
