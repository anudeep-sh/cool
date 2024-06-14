import React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { ContainerOfTitle } from '../../../Style/VideoSlider';
import { Box } from '@mui/system';

const ClockRankingForMobile = ({ contestStatus, days, mins, hours, seconds }) => {
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
            display={{ xs: 'flex', md: 'none' }}
            flexDirection="row"
            alignItems="center"
            justifyContent="center"
          >
            <Box m={0.5}>
              <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
              >
                <Typography sx={{ fontSize: '16px', fontWeight: '500' }} variant="body2">
                  {days}
                </Typography>
                {/* <Typography sx={{ fontWeight: "100" }} variant="caption">Days</Typography> */}
              </Box>
            </Box>
            <Box m={0.5}>
              <Typography sx={{ fontSize: '16px', fontWeight: '600' }} variant="body2">
                :
              </Typography>
            </Box>
            <Box m={0.5}>
              <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
              >
                <Typography sx={{ fontSize: '16px', fontWeight: '500' }} variant="body2">
                  {hours}
                </Typography>
                {/* <Typography sx={{ fontWeight: "100" }} variant="caption">Hours</Typography> */}
              </Box>
            </Box>
            <Box m={0.5}>
              <Typography sx={{ fontSize: '16px', fontWeight: '600' }} variant="body2">
                :
              </Typography>
            </Box>
            <Box m={0.5}>
              <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
              >
                <Typography sx={{ fontSize: '16px', fontWeight: '500' }} variant="body2">
                  {mins}
                </Typography>

                {/* <Typography sx={{ fontWeight: "100" }} variant="caption">Minutes</Typography> */}
              </Box>
            </Box>
            <Box m={0.5}>
              <Typography sx={{ fontSize: '16px', fontWeight: '500' }} variant="body2">
                :
              </Typography>
            </Box>
            <Box m={0.5}>
              <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
              >
                <Typography sx={{ fontSize: '16px', fontWeight: '500' }} variant="body2">
                  {seconds}
                </Typography>

                {/* <Typography sx={{ fontWeight: "100" }} variant="caption">Seconds</Typography> */}
              </Box>
            </Box>
          </Box>
        </Grid>
      )}
    </>
  );
};

export default ClockRankingForMobile;
