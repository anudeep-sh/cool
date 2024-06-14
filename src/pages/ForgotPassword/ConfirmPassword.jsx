import { Box, Button, Grid, IconButton, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';

import { useNavigate, useParams } from 'react-router-dom';
import { manipulateuserdata } from '../../Redux/UserData/User-Action';
import { SET_ALERT_DATA } from '../../Redux/UserData/User-Constants';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { IconTextField } from '../../components/TextField';
import { userAuthAPI } from '../../api/requests/users/userAuthAPI';
import { ASSET_CONFIGS } from '../../assets/assetConfigs';
import './password.css';
import { handleAlert } from '../../utils/handleAlert';

function ConfirmPass() {
  const [confirmPass, setConfirmPass] = useState({
    password: '',
    confirmPassword: '',
  });
  const [isMatched, setIsMatched] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  let { id } = useParams();

  const imagesObj = JSON.parse(localStorage.getItem('imagesObj'));
  const forgot_passward_logo_url = imagesObj && imagesObj[ASSET_CONFIGS.FORGET_PASSWORD_LOGO];
  const forgot_passward_logo_phone_url =
    imagesObj && imagesObj[ASSET_CONFIGS.FORGET_PASSWORD_LOGO_PHONE];

  

  const navigate = useNavigate();

  const handleConfirmPassword = async (e) => {
    e.preventDefault();
    if (confirmPass.password === confirmPass.confirmPassword) {
      setIsMatched(false);
      try {
        await userAuthAPI.resetPassword(id, {
          password: confirmPass.confirmPassword,
        });
        handleAlert('Password changed successfully', 'success');
        navigate('/sign-in', { replace: true });
      } catch (err) {
        handleAlert(err?.message, 'error');
      }
    } else {
      setIsMatched(true);
    }
  };
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <form onSubmit={handleConfirmPassword}>
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
                src={imagesObj && forgot_passward_logo_phone_url}
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
                Set new password
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
                Your new password must be diffrent to previously used password.
              </Typography>
            </Grid>
            <IconTextField
              error={isMatched ? true : false}
              size="small"
              label={'Password'}
              type={showPassword ? 'text' : 'password'}
              fullWidth
              value={confirmPass.password}
              onChange={(event) => {
                setConfirmPass((prevState) => ({
                  ...prevState,
                  password: event.target.value,
                }));
              }}
            />
            <IconTextField
              error={isMatched ? true : false}
              size="small"
              label={'Confirm password'}
              sx={{ mt: 2.5 }}
              type={showPassword ? 'text' : 'password'}
              fullWidth
              value={confirmPass.confirmPassword}
              onChange={(event) => {
                setConfirmPass((prevState) => ({
                  ...prevState,
                  confirmPassword: event.target.value,
                }));
              }}
              iconEnd={
                <IconButton
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  sx={{
                    fontSize: 20,
                    cursor: 'pointer',
                  }}
                >
                  {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                </IconButton>
              }
              helperText={isMatched ? 'Password should be same in confirm password.' : null}
            />
            <Button
              variant="contained"
              fullWidth
              sx={{ fontWeight: '400', mt: 2, textTransform: 'none' }}
              // onClick={() => ForgotPasswordEmail()}
              type="submit"
              disabled={!confirmPass.password || !confirmPass.confirmPassword}
            >
              Reset password
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

export default ConfirmPass;
