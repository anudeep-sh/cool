import React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { ContainerOfTitle } from '../../../Style/VideoSlider';
import { Box } from '@mui/system';

const ClockRanking = ({ contestStatus, days, mins, hours, seconds }) => {
  return (
    <>
      {contestStatus === false && (
        <Grid>
          <ContainerOfTitle variant="h6">
            <strong>Contest end</strong>
          </ContainerOfTitle>
        </Grid>
      )}
      {contestStatus === true && (
        <Grid justifyContent="flex-start" rowSpace={1}>
          <Box
            display={{ xs: 'none', md: 'flex' }}
            flexDirection="row"
            alignItems="center"
            justifyContent="center"
          >
            <Box m={1}>
              <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
              >
                <Box>
                  <Typography sx={{ fontSize: '22px', fontWeight: '600' }} variant="body2">
                    {days}
                  </Typography>
                </Box>
                <Box>
                  <Typography sx={{ fontWeight: '100' }} variant="caption">
                    Days
                  </Typography>
                </Box>
              </Box>
            </Box>
            <Box m={1}>
              <Typography sx={{ fontSize: '20px', fontWeight: '600' }} variant="body2">
                :
              </Typography>
            </Box>
            <Box m={1}>
              <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
              >
                <Box>
                  <Typography sx={{ fontSize: '22px', fontWeight: '600' }} variant="body2">
                    {hours}
                  </Typography>
                </Box>
                <Box>
                  <Typography sx={{ fontWeight: '100' }} variant="caption">
                    Hours
                  </Typography>
                </Box>
              </Box>
            </Box>
            <Box m={1}>
              <Typography sx={{ fontSize: '20px', fontWeight: '600' }} variant="body2">
                :
              </Typography>
            </Box>
            <Box m={1}>
              <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
              >
                <Box>
                  <Typography sx={{ fontSize: '22px', fontWeight: '600' }} variant="body2">
                    {mins}
                  </Typography>
                </Box>
                <Box>
                  <Typography sx={{ fontWeight: '100' }} variant="caption">
                    Minutes
                  </Typography>
                </Box>
              </Box>
            </Box>
            <Box m={1}>
              <Typography sx={{ fontSize: '20px', fontWeight: '600' }} variant="body2">
                :
              </Typography>
            </Box>
            <Box m={1}>
              <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
              >
                <Box>
                  <Typography sx={{ fontSize: '22px', fontWeight: '600' }} variant="body2">
                    {seconds}
                  </Typography>
                </Box>
                <Box>
                  <Typography sx={{ fontWeight: '100' }} variant="caption">
                    Seconds
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        </Grid>
      )}
    </>
  );
};

export default ClockRanking;
