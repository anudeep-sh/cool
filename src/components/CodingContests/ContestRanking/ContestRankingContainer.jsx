import React from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { Box } from '@mui/system';
import ContestRankingCard from './ContestRankingCard';

const ContestRankingContainer = ({ people }) => {
  return (
    <>
      <Box>
        <Grid justifyContent="flex-start" rowSpace={1}>
          <Paper
            elevation={1}
            square={true}
            sx={{
              p: 1,
              boxShadow: 0,
              flexGrow: 1,
            }}
          >
            <Box display="flex" flexDirection="column" sx={{ p: 1, bgcolor: '#ffffff' }}>
              {people.map((person, index) => {
                return <ContestRankingCard key={index} person={person} />;
              })}
            </Box>
          </Paper>
        </Grid>
      </Box>
    </>
  );
};

export default ContestRankingContainer;
