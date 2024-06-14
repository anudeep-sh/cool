import React from 'react';
import Grid from '@mui/material/Grid';
import { Button } from '@mui/material';
import { Box } from '@mui/system';
import Typography from '@mui/material/Typography';
import { NavLink } from 'react-router-dom';
import { getOrgName } from '../../utils/appendOrgQuery';

const ShowRank = ({ contestStatus, contest_code, time, contestId }) => {
  const orgName = getOrgName();
  return (
    <>
      <Grid container mt={4}>
        <Grid
          item
          xs={12}
          md={12}
          sx={{
            bgcolor: '#FAFCFE',
            p: 2,
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: '700', fontSize: { xs: '16px', lg: '18px' } }}>
            Rank
          </Typography>
          {/*title of the container*/}
        </Grid>
        <Grid
          sx={{
            border: 1,
            borderColor: '#e5e5e5',
            backgroundColor: '#g1g1g1',
            width: '100%',
          }}
        >
          <Grid item xs={12} display="flex" flexDirection="column" my={4}>
            {contestStatus === true && (
              <Typography
                textAlign="center"
                sx={{ fontSize: '15px', fontWeight: '200', color: 'grey' }}
                variant="body2"
              >
                {' '}
                Current rank: 3899
              </Typography>
            )}
            <Box textAlign="center" mt={2}>
              <NavLink
                to={`/org/${orgName}/contest/${contestId}/${time}/${contest_code}/ranking`}
                style={{ textDecoration: 'none' }}
              >
                <Button
                  margin="auto"
                  variant="outlined"
                  sx={{
                    color: 'black',
                    borderColor: 'black',
                    '&:hover': {
                      color: '#ffffff',
                      backgroundColor: 'black',
                      borderColor: 'black',
                    },
                  }}
                >
                  Go to contest ranks
                </Button>
              </NavLink>
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default ShowRank;
