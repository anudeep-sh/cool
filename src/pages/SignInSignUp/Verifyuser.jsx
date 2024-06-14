import React, { useState } from 'react';
import { Box, CardMedia, Grid, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router';
import { useEffect } from 'react';
import Skeletons from '../../components/Skeleton/Skeletons';
import { Link } from 'react-router-dom';
import verify from '../../assets/VerifyUserImages/Verified.svg';
import notVerified from '../../assets/VerifyUserImages/NotVerified.svg';
import { userAuthAPI } from '../../api/requests/users/userAuthAPI';

const Verifyuser = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successApi, setSuccessApi] = useState(null);

  let { id } = useParams();
  const verifyuser = async () => {
    setLoading(true);
    try {
      const data = await userAuthAPI.verifyUser(id);
      if (data?.msg === 'successfully verified') {
        localStorage.setItem('Token', data?.token);
        localStorage.setItem('Username', data?.username);
        setSuccessApi(true);
        setTimeout(() => {
          navigate('/organization');
        }, 5000);
      } else if (data?.msg === 'Unauthorized user') {
        setError(true);
      }
    } catch (err) {
      setError(true);
    }
    setLoading(false);
  };

  useEffect(() => {
    verifyuser();
  }, []);

  return (
    <Grid
      container
      sx={{
        flexGrow: 1,
        p: { xs: 4, sm: 10 },
      }}
    >
      <Grid item xs={12}>
        {loading && (
          <Typography
            variant="h6"
            sx={{
              fontWeight: '300',
              fontSize: { xs: '28px!important', md: '34px!important' },
            }}
            textAlign="center"
          >
            Your email is being verified
          </Typography>
        )}
        {loading ? (
          <Box sx={{ display: 'flex', width: '100%', mt: 4 }}>
            <Skeletons type="CircularLoader" />
          </Box>
        ) : (
          <>
            <Grid item xs={12}>
              {successApi && (
                <>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: '300',
                      fontSize: { xs: '28px!important', md: '34px!important' },
                    }}
                    textAlign="center"
                  >
                    Your mail has been verified.
                  </Typography>

                  <Typography
                    variant="subtitle1"
                    sx={{ fontWeight: '300!important', color: '#868686' }}
                    textAlign="center"
                  >
                    Kindly wait we are redirecting you to home page.
                  </Typography>
                  <CardMedia
                    component="img"
                    height="300"
                    image={verify}
                    alt=" Page Not Found Image"
                    sx={{
                      objectFit: 'contain!important',
                      p: 0,
                      mt: 4,
                    }}
                  />
                </>
              )}
            </Grid>
            {error && (
              <>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: '300',
                    fontSize: { xs: '28px!important', md: '34px!important' },
                  }}
                  textAlign="center"
                >
                  Sorry we can't verify your mail.
                </Typography>

                <Typography
                  variant="subtitle1"
                  sx={{
                    fontWeight: '300!important',
                    color: '#868686',
                    mt: 2,
                    textAlign: 'center',
                  }}
                >
                  <Link> Contact Support</Link>
                </Typography>
                <CardMedia
                  component="img"
                  height="300"
                  image={notVerified}
                  alt=" Page Not Found Image"
                  sx={{
                    objectFit: 'contain!important',
                    p: 0,
                    mt: 4,
                  }}
                />
              </>
            )}
          </>
        )}
      </Grid>
    </Grid>
  );
};

export default Verifyuser;
