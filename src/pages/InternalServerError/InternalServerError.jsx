import React from 'react';
import { Box, Button, CardMedia, Grid, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import InternalServerErrorImage from '../../assets/InternalServerError/internalservererror.svg';

const InternalServerError = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        flexGrow: 1,
      }}
    >
      <Grid
        container
        spacing={2}
        sx={{
          flexGrow: 1,
          m: 0,
          height: '100vh',
        }}
      >
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            p: { xs: 4, md: 2 },
            display: 'flex!important',
            justifyContent: 'center!important',
            alignItems: 'center!important',
            backgroundColor: '#D4DEFF',
          }}
        >
          <CardMedia
            component="img"
            image={InternalServerErrorImage}
            alt="Session Timed Out"
            sx={{
              objectFit: 'contain!important',
              height: { xs: '300px', md: '400px' },
            }}
          />
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            display: {
              xs: 'none!important',
              sm: 'flex!important',
              md: 'none!important',
            },
            justifyContent: 'center!important',
            alignItems: 'center',
            flexDirection: 'column',
            paddingLeft: {
              xs: '16px!important',
              md: '60px!important',
              lg: '120px!important',
            },
            pb: { xs: 4, md: 0 },
            mt: { xs: 2, md: 0 },
            p: 2,
          }}
        >
          <Typography
            variant="h2"
            sx={{
              lineHeight: { xs: '58px', md: '78px' },
              fontSize: { xs: '40px', md: '60px' },
              fontWeight: '700',
            }}
            // textAlign="left"
          >
            Oops!
          </Typography>
          <Typography
            variant="h2"
            sx={{
              lineHeight: { xs: '50px', md: '78px' },
              fontSize: { xs: '40px', md: '60px' },
              fontWeight: '300!important',
            }}
          >
            Internal Server Error
          </Typography>
          <Typography variant="h6" sx={{ mt: 4, lineHeight: '32px', fontWeight: '300!important' }}>
            The server encountered an internal error and could not complete your request
          </Typography>
          <Button
            variant="contained"
            sx={{ width: '160px', mt: { xs: 4, md: 2 } }}
            onClick={() => navigate('/sign-in')}
          >
            Sign In
          </Button>
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            display: {
              xs: 'flex!important',
              sm: 'none!important',
              md: 'flex!important',
            },
            justifyContent: 'center!important',
            alignItems: 'left',
            flexDirection: 'column',
            paddingLeft: {
              xs: '16px!important',
              md: '60px!important',
              lg: '120px!important',
            },
            pb: { xs: 4, md: 0 },
            mt: { xs: 2, md: 0 },
            p: 2,
          }}
        >
          <Typography
            variant="h2"
            sx={{
              lineHeight: { xs: '58px', md: '78px' },
              fontSize: { xs: '40px', md: '60px' },
              fontWeight: '700',
            }}
            // textAlign="left"
          >
            Oops!
          </Typography>
          <Typography
            variant="h2"
            sx={{
              lineHeight: { xs: '50px', md: '78px' },
              fontSize: { xs: '40px', md: '60px' },
              fontWeight: '300!important',
            }}
          >
            Internal Server Error
          </Typography>
          <Typography variant="h6" sx={{ mt: 4, lineHeight: '32px', fontWeight: '300!important' }}>
            The server encountered an internal error and could not complete your request
          </Typography>
          <Button
            variant="contained"
            sx={{ width: '160px', mt: { xs: 4, md: 2 } }}
            onClick={() => navigate('/sign-in')}
          >
            Sign In
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default InternalServerError;
