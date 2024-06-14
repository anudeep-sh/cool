import React, { Fragment, useEffect, useState } from 'react';
import WatchLaterOutlinedIcon from '@mui/icons-material/WatchLaterOutlined';
import { ContainerOfTitle } from '../../Style/VideoSlider';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { Skeleton } from '@mui/material';
import { Box } from '@mui/system';

const ContestClock = ({ start, contestStatus, days, mins, hours, seconds }) => {
  const [isTimeValid, setIsTimeValid] = useState(false);
  const checkTimeValidity = () => {
    const check =
      !isNaN(seconds) &&
      !isNaN(mins) &&
      !isNaN(hours) &&
      !isNaN(days) &&
      (days > 0 || hours > 0 || mins > 0 || seconds > 0);

    setIsTimeValid(check);
  };
  useEffect(() => {
    checkTimeValidity();
  }, [days, mins, hours, seconds]);
  return (
    <>
      <Grid container>
        {contestStatus === false && (
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
            <WatchLaterOutlinedIcon
              sx={{
                mb: 0,
                padding: 0,
                fontSize: { xs: '16px', md: '20px' },
                mr: 2,
              }}
            />
            <Typography
              variant="h6"
              sx={{ fontWeight: '700', fontSize: { xs: '16px', md: '18px' } }}
            >
              Contest end
            </Typography>
          </Grid>
        )}
        {contestStatus === true && (
          <>
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
              <WatchLaterOutlinedIcon
                sx={{
                  mb: 0,
                  padding: 0,
                  fontSize: { xs: '16px', lg: '20px' },
                  mr: 2,
                }}
              />
              <Typography
                variant="h6"
                sx={{ fontWeight: '700', fontSize: { xs: '16px', lg: '18px' } }}
              >
                Contest ends in
              </Typography>
            </Grid>

            <Grid
              container
              sx={{
                p: 2,
                border: 1,
                borderColor: '#e5e5e5',
                backgroundColor: '#g1g1g1',
              }}
              display="flex"
              flexDirection="row"
              alignItems="center"
              justifyContent={{ xs: 'space-around', md: 'center' }}
            >
              <Grid
                item
                md={2.2}
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
              >
                <Typography
                  sx={{
                    fontSize: { xs: '16px', lg: '20px' },
                    fontWeight: '700',
                  }}
                  variant="body2"
                >
                  {!isTimeValid ? <Skeleton /> : days}
                </Typography>
                <Typography
                  sx={{
                    fontWeight: '400',
                    fontSize: { md: '10px', lg: '12px' },
                  }}
                  variant="caption"
                >
                  Days
                </Typography>
              </Grid>
              <Typography sx={{ fontSize: '20px', fontWeight: '600', m: 1 }} variant="body2">
                :
              </Typography>
              <Grid
                item
                md={2.2}
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
              >
                <Typography
                  sx={{
                    fontSize: { xs: '16px', lg: '20px' },
                    fontWeight: '700',
                  }}
                  variant="body2"
                >
                  {!isTimeValid ? <Skeleton /> : hours}
                </Typography>
                <Typography
                  sx={{
                    fontWeight: '400',
                    fontSize: { md: '10px', lg: '12px' },
                  }}
                  variant="caption"
                >
                  Hours
                </Typography>
              </Grid>
              <Typography sx={{ fontSize: '20px', fontWeight: '600', m: 1 }} variant="body2">
                :
              </Typography>

              <Grid
                item
                md={2.2}
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
              >
                <Typography
                  sx={{
                    fontSize: { xs: '16px', lg: '20px' },
                    fontWeight: '700',
                  }}
                  variant="body2"
                >
                  {!isTimeValid ? <Skeleton /> : mins}
                </Typography>
                <Typography
                  sx={{
                    fontWeight: '400',
                    fontSize: { md: '10px', lg: '12px' },
                  }}
                  variant="caption"
                >
                  Minutes
                </Typography>
              </Grid>
              <Typography sx={{ fontSize: '20px', fontWeight: '600', m: 1 }} variant="body2">
                :
              </Typography>
              <Grid
                item
                md={2.2}
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
              >
                <Typography
                  sx={{
                    fontSize: { xs: '16px', lg: '20px' },
                    fontWeight: '700',
                  }}
                  variant="body2"
                >
                  {!isTimeValid ? <Skeleton /> : seconds}
                </Typography>
                <Typography
                  sx={{
                    fontWeight: '400',
                    fontSize: { md: '10px', lg: '12px' },
                  }}
                  variant="caption"
                >
                  Seconds
                </Typography>
              </Grid>
            </Grid>
          </>
        )}
      </Grid>
    </>
  );
};

export default ContestClock;
