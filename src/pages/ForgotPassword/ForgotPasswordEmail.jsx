import { Button, Grid, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';

import { userAuthAPI } from '../../api/requests/users/userAuthAPI';
import { ASSET_CONFIGS } from '../../assets/assetConfigs';
import './password.css';
import { handleAlert } from '../../utils/handleAlert';

function ForgotPasswordEmail() {

  const [email, setEmail] = useState('');

  
  const validEmailRegex =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const imagesObj = JSON.parse(localStorage.getItem('imagesObj'));
  let forgot_passward_logo_url = imagesObj && imagesObj[ASSET_CONFIGS.FORGET_PASSWORD_LOGO];
  let forgot_passward_logo_phone_url =
    imagesObj && imagesObj[ASSET_CONFIGS.FORGET_PASSWORD_LOGO_PHONE];

  const validateEmail = () => {
    if (!email.match(validEmailRegex)) {
      handleAlert('Invalid Email', 'error');
      return false;
    }
    return true;
  };
  const EmailSent = async (e) => {
    e.preventDefault();
    if (!validateEmail()) {
      return;
    }

    try {
      const data = await userAuthAPI.requestPasswordUpdate({ email });
      handleAlert(data?.message, 'success');
    } catch (err) {
      handleAlert("This email hasn't been registered try signing up", 'error');
    }
  };
  return (
    <form onSubmit={EmailSent}>
      <Grid
        container
        spacing={0}
        sx={{
          m: 0,
          width: { sm: `calc(100%)` },
          height: '100vh',
        }}
      >
        <Grid
          item
          xs={12}
          md={6}
          sx={{ p: '16px' }}
          display="flex"
          alignItems={'center'}
          justifyContent="center"
        >
          <Grid container xs={10} sm={6} md={8} lg={6}>
            <Grid
              item
              xs={12}
              md={12}
              pl="0px!important"
              sx={{
                mb: 4,
              }}
            >
              <img
                style={{ paddingBottom: '50px' }}
                src={imagesObj && forgot_passward_logo_url}
                alt="LOGO"
                className="passwordLogoPhone"
              />
              <Typography
                variant="h5"
                sx={{
                  fontSize: '28px',
                  fontWeight: '500',
                  color: '#454545',
                  mb: 0.5,
                }}
              >
                Forgot your password?
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  fontWeight: '400',
                  color: '#a4a4a4',
                  letterSpacing: '0.5px',
                  mt: 2,
                }}
              >
                Enter your email address and we will share a link to create a new password.
              </Typography>
            </Grid>
            <TextField
              size="small"
              label={'Enter your email'}
              type="text"
              fullWidth
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            ></TextField>
            <Button
              variant="contained"
              fullWidth
              sx={{ fontWeight: '400', mt: 2, textTransform: 'none' }}
              // onClick={() => ForgotPasswordEmail()}
              type="submit"
              disabled={!email}
            >
              Send
            </Button>
          </Grid>
        </Grid>
        <Grid
          item
          container
          spacing={0}
          xs={12}
          md={6}
          sx={{
            p: '0px',
            backgroundColor: '#EBEFFF',
            height: { xs: '400px', md: '100vh' },
            fontSize: '55px',
            display: { xs: 'none', sm: 'flex' },
          }}
          style={{ fontFamily: 'Light' }}
          display="flex"
          alignItems={'left'}
          justifyContent="left"
        >
          <img
            src={imagesObj && forgot_passward_logo_url}
            alt="LOGO"
            className="signInLogoDesktop"
          />
        </Grid>
      </Grid>
    </form>
  );
}

export default ForgotPasswordEmail;
