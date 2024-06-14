import React from 'react';
import Grid from '@mui/material/Grid';
import ContestCard from './ContestCard';
import { NavLink, useNavigate } from 'react-router-dom';
import { Box, Typography, Button, CircularProgress } from '@mui/material';
import { getOrgName } from '../../../utils/appendOrgQuery';

const ContestContainer = ({ title, Contests, startedContest, query, loader }) => {
  const orgName = getOrgName();
  var d = Math.floor(Date.now() / 1000);
  const navigate = useNavigate();
  return (
    <>
      <Grid container justifyContent="flex-start" rowSpace={1}>
        <Grid item xs={12} sx={{ bgcolor: '#FAFCFE', p: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: '500', fontSize: { xs: '16px', md: '20px' } }}>
            {title}
          </Typography>
        </Grid>

        {loader ? (
          <Box
            sx={{ display: 'flex', width: '100%', justifyContent: 'center', alignItems: 'center' }}
          >
            <CircularProgress />
          </Box>
        ) : (
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
            }}
          >
            {Contests?.length > 0 ? (
              Contests.slice(0, 3)?.map((Contest, index) => {
                return (
                  <>
                    {Contest.endingDate > d && Contest.startingDate < d ? (
                      <NavLink
                        to={`/org/${orgName}/contest/${Contest.id}`}
                        style={{ textDecoration: 'none' }}
                      >
                        <ContestCard
                          key={index}
                          Contest={Contest}
                          startedContest={startedContest}
                        />
                      </NavLink>
                    ) : query === 'ATTEMPTED' || query === 'COMPLETED' ? (
                      <NavLink
                        to={`/org/${orgName}/contest/${Contest?.id}/${Contest.endingDate}/${Contest?.code}/ranking`}
                        style={{ textDecoration: 'none' }}
                      >
                        <ContestCard
                          key={index}
                          Contest={Contest}
                          startedContest={startedContest}
                        />
                      </NavLink>
                    ) : (
                      <ContestCard key={index} Contest={Contest} startedContest={startedContest} />
                    )}
                  </>
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
                    py: 4,
                  }}
                  paragraph
                >
                  No contests, Please check back soon
                </Typography>
              </Box>
            )}
            {Contests.length > 3 && (
              <Box
                sx={{
                  mt: 1,
                  display: 'flex',
                  width: '100%',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Button
                  onClick={() => {
                    navigate(`viewAllContest?search=${query}`);
                  }}
                >
                  Show More Contests
                </Button>
              </Box>
            )}
          </Grid>
        )}
      </Grid>
    </>
  );
};

export default ContestContainer;
