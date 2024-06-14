import {
  Divider,
  Grid,
  IconButton,
  Typography,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { IconTextField } from '../../components/TextField';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { MuiTelInput, matchIsValidTel } from 'mui-tel-input';
import { userAuthAPI } from '../../api/requests/users/userAuthAPI';
import GoogleSignInButton from '../../components/GoogleSignInButton';
import { getOrgData } from '../../organization';
import { ASSET_CONFIGS } from '../../assets/assetConfigs';
import { useGoogleOneTapLogin } from '@react-oauth/google';
import { onGoogleSignInSuccess } from '../../utils/googleSignIn';
import './SignIn.css';
import { handleAlert } from '../../utils/handleAlert';
import { useDocumentTitle } from '../../utils/useDocumentTitle';

function SignUp() {
  const navigate = useNavigate();
  useDocumentTitle('Sign Up');
  const [domainData, setDomainData] = useState(null);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [signUpUserData, setSignUpUserData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    mobile: '+91',
    password: '',
  });
  const [loader, setLoader] = useState(false);

  const imagesObj = JSON.parse(localStorage.getItem('imagesObj'));
  let sign_up_logo_url = imagesObj && imagesObj[ASSET_CONFIGS.SIGN_UP_LOGO];
  let sign_up_logo_phone_url = imagesObj && imagesObj[ASSET_CONFIGS.SIGN_UP_LOGO_PHONE];

  const lastNameRef = useRef(null);
  const userNameRef = useRef(null);
  const emailRef = useRef(null);
  const mobileRef = useRef(null);
  const passwordRef = useRef(null);

  useEffect(() => {
    (async () => {
      const orgData = await getOrgData();
      setDomainData(orgData);
    })();
  }, []);

  
  const validEmailRegex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const Navigate = useNavigate();

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const validateSignUpData = () => {
    for (let key in signUpUserData) {
      if (signUpUserData[key] === '') {
        handleAlert('Please fill all fields', 'error');
        return false;
      }
    }
    if (!signUpUserData.email.match(validEmailRegex)) {
      handleAlert('Invalid Email', 'error');
      return false;
    }
    if (!matchIsValidTel(signUpUserData.mobile)) {
      handleAlert('Please enter a valid phone number', 'error');
      return false;
    }
    return true;
  };
  const SignUpApi = async () => {
    if (!validateSignUpData()) return;
    setLoader(true);

    try {
      const data = await userAuthAPI.signUp(signUpUserData);
      setMessage(data?.message);
      setOpen(true);
      setLoader(false);
      handleAlert('Signed up successfully now sign in', 'success');
      Navigate('/sign-in', { replace: true });
    } catch (err) {
      setLoader(false);
      handleAlert(err?.message, 'error');
    }
  };

  const handlePhoneNo = (e) => {
    if (e) {
      if (e.length >= 16) {
      } else {
        setSignUpUserData((prevState) => ({
          ...prevState,
          mobile: e,
        }));
      }
    }
  };

  useGoogleOneTapLogin({
    onSuccess: (data) => onGoogleSignInSuccess(data, navigate),
    onError: () => {
      console.log('Login Failed');
    },
  });

  return (
    <>
      <useGoogleOneTapLogin></useGoogleOneTapLogin>
      <Grid
        container
        spacing={0}
        sx={{
          flexGrow: 1,
          m: 0,
          width: '100%',
          height: '100vh',
        }}
      >
        <Grid
          item
          xs={12}
          md={6}
          sx={{ py: { xs: '50px', md: '16px' } }}
          display="flex"
          alignItems={'center'}
          justifyContent="center"
        >
          <Grid container xs={10} sm={8} md={8} spacing={2}>
            <Grid
              item
              xs={12}
              md={12}
              pl="0px!important"
              sx={{ mb: 4, pt: { xs: '100px!important', md: '0px!important' } }}
            >
              <img
                style={{ paddingBottom: '50px' }}
                src={imagesObj && sign_up_logo_phone_url}
                alt="LOGO"
                className="signInLogoPhone"
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
                Create your account
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  fontWeight: '400',
                  color: '#a4a4a4',
                  letterSpacing: '1px',
                }}
              >
                Enter the fields below to get started.
              </Typography>
            </Grid>

            <Grid
              item
              xs={12}
              md={6}
              pt="0px!important"
              pl="0px!important"
              sx={{ pr: { md: '8px!important', xs: '0px!important' }, mb: 2.5 }}
            >
              <IconTextField
                autoFocus
                size="small"
                label={'First Name'}
                sx={{}}
                type="text"
                fullWidth
                value={signUpUserData.firstName}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    lastNameRef.current.focus();
                  }
                }}
                onChange={(event) => {
                  setSignUpUserData((prevState) => ({
                    ...prevState,
                    firstName: event.target.value,
                  }));
                }}
              />
            </Grid>
            <Grid
              item
              xs={12}
              md={6}
              pt="0px!important"
              sx={{ pl: { md: '8px!important', xs: '0px!important' }, mb: 2.5 }}
            >
              <IconTextField
                inputRef={lastNameRef}
                size="small"
                label={'Last Name'}
                type="text"
                fullWidth
                value={signUpUserData.lastName}
                onChange={(event) => {
                  setSignUpUserData((prevState) => ({
                    ...prevState,
                    lastName: event.target.value,
                  }));
                }}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    userNameRef.current.focus();
                  }
                }}
              />
            </Grid>

            <Grid item xs={12} md={12} pt="0px!important" pl="0px!important" sx={{ mb: 2.5 }}>
              <IconTextField
                inputRef={userNameRef}
                size="small"
                label={'Username'}
                type="email"
                fullWidth
                value={signUpUserData.username}
                onChange={(event) => {
                  setSignUpUserData((prevState) => ({
                    ...prevState,
                    username: event.target.value,
                  }));
                }}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    emailRef.current.focus();
                  }
                }}
              />
            </Grid>
            <Grid item xs={12} md={12} pt="0px!important" pl="0px!important" sx={{ mb: 2.5 }}>
              <IconTextField
                inputRef={emailRef}
                size="small"
                label={'Email'}
                type="text"
                fullWidth
                value={signUpUserData.email}
                onChange={(event) => {
                  setSignUpUserData((prevState) => ({
                    ...prevState,
                    email: event.target.value,
                  }));
                }}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    mobileRef.current.focus();
                  }
                }}
              />
            </Grid>
            <Grid item xs={12} md={12} pt="0px!important" pl="0px!important" sx={{ mb: 2.5 }}>
              <MuiTelInput
                inputRef={mobileRef}
                InputLabelProps={{ shrink: true }}
                size="small"
                label={'Mobile'}
                fullWidth
                value={signUpUserData.mobile}
                onChange={handlePhoneNo}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    passwordRef.current.focus();
                  }
                }}
                defaultCountry={'in'}
              />
            </Grid>
            <Grid item xs={12} md={12} pt="0px!important" pl="0px!important" sx={{ mb: 2.5 }}>
              <IconTextField
                inputRef={passwordRef}
                size="small"
                label={'Password'}
                type={showPassword ? 'text' : 'password'}
                fullWidth
                value={signUpUserData.password}
                onChange={(event) => {
                  setSignUpUserData((prevState) => ({
                    ...prevState,
                    password: event.target.value,
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
              />
            </Grid>

            {/* <Box
              display={"flex"}
              justifyContent={"space-between"}
              alignItems="center"
              sx={{ my: 1 }}
            >
              <FormControlLabel
                control={
                  <Checkbox
                    sx={{
                      "& .MuiSvgIcon-root": {
                        fontSize: 18,
                        "& .MuiCheckbox-root ": { pt: "0px!important" },
                      },
                    }}
                  />
                }
                label="Remeber Password"
                sx={{
                  "& .MuiTypography-root": { fontSize: 14, color: "#787878" },
                }}
              />
            </Box> */}
            <LoadingButton
              variant="contained"
              fullWidth
              sx={{ fontWeight: '400' }}
              onClick={() => SignUpApi()}
              loading={loader}
            >
              Sign Up
            </LoadingButton>
            {/* <GoogleSignInButton /> */}
            <Grid item xs={12} md={12} pt="0px!important" pl="0px!important" sx={{ my: 2 }}>
              {' '}
              <Divider orientation="horizontal" flexItem>
                <Typography variant="body2" sx={{ color: '#A0A0A0' }}>
                  OR
                </Typography>
              </Divider>
            </Grid>

            <GoogleSignInButton />

            <Grid item mt={2} xs={12} md={12} pt="0px!important" pl="0px!important" display="flex">
              {' '}
              <Typography
                sx={{
                  color: '#787878',
                  fontWeight: '400',
                  fontSize: '14px',
                  mr: 1,
                }}
              >
                Already have an account?
              </Typography>
              <Link to="/sign-in" style={{ textDecoration: 'none' }}>
                <Typography sx={{ fontWeight: '500', color: '#698AFF', fontSize: '14px' }}>
                  Sign-in
                </Typography>
              </Link>
            </Grid>
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
          <img src={imagesObj && sign_up_logo_url} alt="LOGO" className="signInLogoDesktop" />
        </Grid>
      </Grid>
    </>
  );
}

export default SignUp;
