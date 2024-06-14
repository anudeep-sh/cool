import { Box, Button, CardMedia, Grid, Typography } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import illustration from '../../assets/review.svg';

const CourseUnderReview = () => {
  const navigate = useNavigate();
  return (
    <>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          alignItems: 'center',
          justifyContent: 'center',
          m: 'auto',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Box>
          <img src={illustration} style={{ height: '250px', width: '250px' }}></img>
        </Box>
        <Box sx={{ maxWidth: '35em' }}>
          <Typography
            variant="h4"
            sx={{
              //   lineHeight: { xs: "50px", md: "78px" },
              fontSize: { xs: '12px', md: '22px' },
              fontWeight: '300!important',
              textAlign: 'center',
            }}
          >
            Your course is still under review and will be made available to public soon, once the
            review process is complete. In case of any concern please reach out to us on mail{' '}
            <a href="mailto: support@simppWey.com">support@OptiGrit.com</a>
          </Typography>
        </Box>
        <Box>
          <Button
            variant="contained"
            sx={{ width: '160px', mt: { xs: 4, md: 3 } }}
            onClick={() => navigate('/organization')}
          >
            Go To Home
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default CourseUnderReview;
