import React from 'react';
import { Box } from '@mui/system';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';

const ContestCard = ({ Contest, startedContest }) => {
  var timeFrom = new Date(Contest.startingDate * 1000);

  const days = Math.floor((Contest.endingDate - Contest.startingDate) / (24 * 60 * 60));
  const hours = Math.floor(
    ((Contest.endingDate - Contest.startingDate) % (24 * 60 * 60)) / (60 * 60)
  );

  var s = '';
  if (days === 0) s = hours + ' hours';
  else s = days + 'd ' + hours + 'h';

  return (
    <Grid
      container
      display="flex"
      flexDirection="row"
      sx={{
        p: 1,
        borderRadius: 3,
        bgcolor: '#ffffff',
        mt: 2,
        width: '100%',
        border: 1,
        borderColor: '#e5e5e5',
      }}
    >
      <Grid item xs={2} sm={2} md={2} lg={1.4} sx={{ mr: { xs: 1, sm: 2 } }}>
        <Box
          display="flex"
          justifyContent={'center'}
          flexDirection="column"
          sx={{
            p: { xs: '4px 8px', md: '10px 16px' },
            bgcolor: '#000',
            borderRadius: '8px',
          }}
        >
          <Typography
            margin={0}
            padding={0}
            sx={{
              m: 0,
              p: 0,
              fontWeight: '300',
              color: '#E1E1E1',
              lineHeight: '16px',
              textAlign: 'center',
            }}
            variant="caption"
          >
            {String(timeFrom).slice(4, 7)}
          </Typography>
          <Typography
            sx={{
              m: 0,
              p: 0,
              fontWeight: '500',
              lineHeight: '24px',
              color: '#fff',
              fontSize: { xs: '16px', md: '24px' },
              textAlign: 'center',
            }}
            variant="h5"
          >
            {String(timeFrom).slice(8, 10)}
          </Typography>
        </Box>
      </Grid>
      {/* {(timeFrom).getFullYear()} */}
      <Grid
        container
        item
        xs={9.5}
        sm={9.2}
        md={9.3}
        lg={10}
        display="flex"
        alignItems={'center'}
        justifyContent="space-between"
      >
        <Grid item xs={12} sm={12} md={12} lg={4}>
          <Typography
            sx={{
              mr: 0.5,
              display: '-webkit-box!important',
              WebkitLineClamp: 1,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              WebkitBoxOrient: ' vertical',
            }}
            variant="body1"
            color="#2B3746"
          >
            {Contest.title}
          </Typography>
        </Grid>
        <Grid
          item
          sm="auto"
          md={6}
          lg={4}
          sx={{ display: { xs: 'none', md: 'flex' } }}
          alignItems="center"
        >
          <Typography
            sx={{
              display: '-webkit-box!important',
              WebkitLineClamp: 1,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              WebkitBoxOrient: ' vertical',
            }}
            variant="caption"
            color="#787878"
          >
            Code:
          </Typography>
          <Typography
            sx={{
              ml: 1,
              mr: 0.5,
              fontSize: { xs: '12px', md: '13px' },
              display: '-webkit-box!important',
              WebkitLineClamp: 1,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              WebkitBoxOrient: ' vertical',
            }}
            variant="caption"
            color="#2B3746"
          >
            {Contest.code.toUpperCase()}{' '}
          </Typography>
        </Grid>
        <Grid item xs={7} sm={7} sx={{ display: { xs: 'flex', md: 'none' } }}>
          {startedContest ? (
            <Typography
              sx={{
                display: '-webkit-box!important',
                WebkitLineClamp: 1,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                WebkitBoxOrient: ' vertical',
              }}
              variant="caption"
              color="#787878"
            >
              Started At
            </Typography>
          ) : (
            <Typography
              sx={{
                display: '-webkit-box!important',
                WebkitLineClamp: 1,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                WebkitBoxOrient: ' vertical',
              }}
              variant="caption"
              color="#787878"
            >
              Starts At
            </Typography>
          )}
          <Typography
            sx={{
              ml: 1,
              fontSize: { xs: '12px', md: '13px' },
              display: '-webkit-box!important',
              WebkitLineClamp: 1,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              WebkitBoxOrient: ' vertical',
            }}
            variant="caption"
            color="#2B3746"
          >
            {' '}
            {timeFrom.toLocaleString('en-US', {
              hour: 'numeric',
              minute: 'numeric',
              hour12: true,
            })}{' '}
          </Typography>
        </Grid>
        <Grid item xs={5} sm={5} md={6} lg={4} sx={{ display: 'flex' }} alignItems="center">
          <Typography
            variant="caption"
            color="grey"
            sx={{
              display: '-webkit-box!important',
              WebkitLineClamp: 1,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              WebkitBoxOrient: ' vertical',
            }}
          >
            Duration:{' '}
          </Typography>
          <Typography
            sx={{
              ml: 1,
              fontSize: { xs: '12px', md: '13px' },
              display: '-webkit-box!important',
              WebkitLineClamp: 1,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              WebkitBoxOrient: ' vertical',
            }}
            variant="caption"
            color="#2B3746"
          >
            {s}
          </Typography>
        </Grid>
        <Grid
          container
          item
          xs={6}
          sm={6}
          md={12}
          lg={12}
          display="flex"
          alignItems={'center'}
          justifyContent="space-between"
        >
          <Grid
            item
            xs={12}
            sm={12}
            md={6}
            lg={8}
            sx={{ display: { xs: 'none', sm: 'none', md: 'flex' } }}
            alignItems="center"
          >
            {startedContest ? (
              <Typography
                sx={{
                  display: '-webkit-box!important',
                  WebkitLineClamp: 1,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  WebkitBoxOrient: ' vertical',
                }}
                variant="caption"
                color="#787878"
              >
                Starts At
              </Typography>
            ) : (
              <Typography
                sx={{
                  display: '-webkit-box!important',
                  WebkitLineClamp: 1,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  WebkitBoxOrient: ' vertical',
                }}
                variant="caption"
                color="#787878"
              >
                Started At
              </Typography>
            )}
            <Typography
              sx={{
                ml: 1,
                fontSize: { xs: '12px', md: '13px' },
                display: '-webkit-box!important',
                WebkitLineClamp: 1,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                WebkitBoxOrient: ' vertical',
              }}
              variant="caption"
              color="#2B3746"
            >
              {' '}
              {timeFrom.toLocaleString('en-US', {
                hour: 'numeric',
                minute: 'numeric',
                hour12: true,
              })}{' '}
            </Typography>
          </Grid>
          <Grid
            item
            xs={12}
            sm="auto"
            md={6}
            lg={4}
            sx={{ display: { xs: 'none', md: 'flex' } }}
            alignItems="center"
          >
            <Typography
              variant="caption"
              color="#787878"
              sx={{
                display: '-webkit-box!important',
                WebkitLineClamp: 1,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                WebkitBoxOrient: ' vertical',
              }}
            >
              Contest Type:{' '}
            </Typography>
            <Typography
              sx={{
                ml: 1,
                mr: 0.5,
                fontSize: { xs: '12px', md: '13px' },
                display: '-webkit-box!important',
                WebkitLineClamp: 1,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                WebkitBoxOrient: ' vertical',
              }}
              variant="caption"
              color="#2B3746"
            >
              {Contest.type.toUpperCase()}{' '}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ContestCard;
