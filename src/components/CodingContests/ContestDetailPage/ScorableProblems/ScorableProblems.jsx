import React from 'react';
import Grid from '@mui/material/Grid';
import ProblemCard from './ProblemCard';
import { Box } from '@mui/system';
import { NavLink } from 'react-router-dom';
import { Typography } from '@mui/material';
import { getOrgName } from '../../../../utils/appendOrgQuery';

const ScorableProblems = ({ ContestProbs, contestStatus, contestId }) => {
  const orgName = getOrgName();

  return (
    <>
      <Grid container justifyContent="flex-start" rowSpace={1}>
        <Grid item xs={12} sx={{ bgcolor: '#FAFCFE', p: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: '500', fontSize: { xs: '16px', md: '20px' } }}>
            Scorable Problems for Division 1
          </Typography>
          {/*title of the container*/}
        </Grid>
        <Grid
          item
          xs={12}
          sx={{
            p: { xs: 0, md: 2 },
            pt: 0,
            flexGrow: 1,
            border: { xs: 0, md: 1 },
            borderColor: { xs: 'none', md: '#e5e5e5' },
            backgroundColor: '#g1g1g1',
            maxHeight: 400,
            overflowY: 'scroll',
            scrollbarWidth: 'thin',
            '&::-webkit-scrollbar': {
              width: '0.4em',
            },
            '&::-webkit-scrollbar-track': {
              background: '#f1f1f1',
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: '#888',
            },
            '&::-webkit-scrollbar-thumb:hover': {
              background: '#555',
            },
          }}
        >
          {ContestProbs?.length > 0 ? (
            ContestProbs.map((problem, index) => {
              return (
                <NavLink
                  to={`/org/${orgName}/problem/${problem.id}`}
                  style={{ textDecoration: 'none' }}
                >
                  <ProblemCard key={index} i={index} problem={problem} />
                </NavLink>
              );
            })
          ) : (
            <Box m={4}>
              <Typography
                sx={{
                  m: 'auto',
                  fontWeight: '200',
                  alignItems: 'center',
                  textAlign: 'center',
                }}
                paragraph
              >
                No problems as of yet
              </Typography>
            </Box>
          )}
        </Grid>
      </Grid>
    </>
  );
};

export default ScorableProblems;
