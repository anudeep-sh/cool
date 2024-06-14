import { Button, Divider, Grid, IconButton, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { IconTextField } from '../../components/TextField';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { userAuthAPI } from '../../api/requests/users/userAuthAPI';
import GoogleSignInButton from '../../components/GoogleSignInButton';
import jwt_decode from 'jwt-decode';
import { getOrgData } from '../../organization';
import { ASSET_CONFIGS } from '../../assets/assetConfigs';
import { useGoogleOneTapLogin } from '@react-oauth/google';
import { onGoogleSignInSuccess } from '../../utils/googleSignIn';
import './SignIn.css';
import BigLoader from '../../components/Skeleton/BigLoader';
import { handleAlert } from '../../utils/handleAlert';
import { useDocumentTitle } from '../../utils/useDocumentTitle';

const SignIn = () => {
  const [domainData, setDomainData] = useState(null);
  useDocumentTitle('Sign In');
  const [userData, setUserData] = useState({
    email: '',
    password: '',
  });

  // const imagesObj = JSON.parse(localStorage.getItem('imagesObj') ?? {});
  const storedImagesObj = localStorage.getItem('imagesObj');
  const imagesObj = storedImagesObj ? JSON.parse(storedImagesObj) : {};
  let sign_in_logo_url = imagesObj && imagesObj[ASSET_CONFIGS.SIGN_IN_LOGO];
  let sign_in_logo_phone_url = imagesObj && imagesObj[ASSET_CONFIGS.SIGN_IN_LOGO_PHONE];

  const [showPassword, setShowPassword] = useState(false);

  const [loader, setLoader] = useState(false);

  const [loading, setLoading] = useState(true);

  const passwordRef = useRef(null);

  useEffect(() => {
    (async () => {
      const orgData = await getOrgData();
      setDomainData(orgData);
      setLoading(false);
    })();
  }, []);

  // Regex for validating the Email Address
  const validEmailRegex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const navigate = useNavigate();
  const validateSignInData = () => {
    for (let key in userData) {
      if (userData[key] === '') {
        handleAlert('Please fill all fields', 'error');
        return false;
      }
    }
    if (!userData.email.match(validEmailRegex)) {
      handleAlert('Invalid Email', 'error');
      return false;
    }
    return true;
  };
  const LoginApi = async (e) => {
    if (!validateSignInData()) return;
    setLoader(true);

    try {
      const data = await userAuthAPI.signIn(userData);
      const Token = data?.token;

      if (Token) {
        localStorage.setItem('Token', Token);
        const userOrgId = jwt_decode(Token)?.organizationId;
        const urlOrgId = domainData?.id;
        // const isPartOfAnyOrganization = jwt_decode(Token)?.isPartOfAnyOrganization;

        if (urlOrgId && urlOrgId !== userOrgId) {
          setLoader(false);
          handleAlert('Please use your organization mail to sign-in', 'error');
        } else if (userOrgId && userOrgId !== urlOrgId) {
          setLoader(false);
          handleAlert('This email does not belongs to this organization', 'error');
        } else {
          setLoader(false);
          handleAlert(data?.msg, 'success');

          // if (!isPartOfAnyOrganization) {
          //   navigate('/organization', { replace: true });
          // } else {
          navigate('/organization', { replace: true });
          // }
        }
      } else {
        if (data.msg === 'Incorrect Password') {
          setLoader(false);
          handleAlert(data?.msg, 'error');
        } else if (data.msg === 'please verify by the link you get in mail') {
          setLoader(false);
          handleAlert(data?.msg, 'error');
        } else if (data?.msg === 'please signUp first') {
          setLoader(false);
          handleAlert("This email hasn't been registered try signing up", 'error');
        }
      }
    } catch (err) {
      setLoader(false);
      if (!userData.email.match(validEmailRegex)) {
        handleAlert('Invalid Email', 'error');
      } else {
        handleAlert(err?.message, 'error');
      }
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  useGoogleOneTapLogin({
    onSuccess: (data) => {
      onGoogleSignInSuccess(data, navigate);
    },
    onError: () => {
      console.log('Login Failed');
    },
  });

  return (
    <>
      {loading ? (
        <BigLoader />
      ) : (
        <>
          {!domainData && <useGoogleOneTapLogin></useGoogleOneTapLogin>}
          <form onSubmit={LoginApi}>
            <Grid
              container
              spacing={0}
              sx={{
                flexGrow: 1,
                m: 0,
                width: { sm: `calc(100%)` },
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
                    sx={{
                      mb: 4,
                    }}
                  >
                    <img
                      style={{ paddingBottom: '60px' }}
                      src={imagesObj && sign_in_logo_phone_url}
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
                      Welcome back!
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        fontWeight: '400',
                        color: '#a4a4a4',
                        letterSpacing: '1px',
                      }}
                    >
                      Please enter your details.
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={12} pt="0px!important" pl="0px!important" sx={{ mb: 2.5 }}>
                    <IconTextField
                      autoFocus
                      size="small"
                      label={'Enter your email'}
                      type="email"
                      fullWidth
                      required
                      value={userData.email}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          passwordRef.current.focus();
                        }
                      }}
                      onChange={(event) => {
                        setUserData((prevState) => ({
                          ...prevState,
                          email: event.target.value,
                        }));
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} md={12} pt="0px!important" pl="0px!important" sx={{ mb: 1.5 }}>
                    <IconTextField
                      inputRef={passwordRef}
                      size="small"
                      label={'Enter your password'}
                      type={showPassword ? 'text' : 'password'}
                      fullWidth
                      required
                      value={userData.password}
                      onChange={(event) => {
                        setUserData((prevState) => ({
                          ...prevState,
                          password: event.target.value,
                        }));
                      }}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          LoginApi();
                        }
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

                  <Grid item xs={12} md={12} pt="0px!important" pl="0px!important" sx={{ mb: 1.5 }}>
                    {/* <FormControlLabel
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
                /> */}
                    <Button
                      sx={{
                        textTransform: 'none',
                        p: '0px',
                        px: '8px',
                        height: '28px',
                      }}
                      onClick={() => navigate('/forgot-password')}
                    >
                      Forgot your password?
                    </Button>
                  </Grid>
                  <LoadingButton
                    variant="contained"
                    fullWidth
                    sx={{ fontWeight: '400' }}
                    onClick={() => LoginApi()}
                    Fload
                    loading={loader}
                  >
                    Sign in
                  </LoadingButton>
                  {!domainData && (
                    <Grid item xs={12} md={12} pt="0px!important" pl="0px!important" sx={{ my: 2 }}>
                      {' '}
                      <Divider orientation="horizontal" flexItem>
                        <Typography variant="body2" sx={{ color: '#A0A0A0' }}>
                          OR
                        </Typography>
                      </Divider>
                    </Grid>
                  )}
                  {/* <Button
                onClick={GoogleSignIn}
                fullWidth
                variant="outlined"
                startIcon={svgIcon}
                sx={{
                  textTransform: "none",
                  fontWeight: "400",
                  mb: 2,
                  borderColor: "#EBEBEB",
                  color: "#787878",
                }}
              >
                Sign in with Google
              </Button> */}
                  {!domainData && <GoogleSignInButton />}

                  {!domainData && (
                    <Grid
                      item
                      mt={2}
                      xs={12}
                      md={12}
                      pt="0px!important"
                      pl="0px!important"
                      display="flex"
                    >
                      {' '}
                      <Typography
                        sx={{
                          color: '#787878',
                          fontWeight: '400',
                          fontSize: '14px',
                          mr: 1,
                        }}
                      >
                        Don't have an account
                      </Typography>
                      <Link to="/sign-up" style={{ textDecoration: 'none' }}>
                        <Typography
                          sx={{
                            fontWeight: '500',
                            color: '#698AFF',
                            fontSize: '14px',
                          }}
                        >
                          Sign-Up
                        </Typography>
                      </Link>
                    </Grid>
                  )}
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
                <img src={imagesObj && sign_in_logo_url} alt="LOGO" className="signInLogoDesktop" />
              </Grid>
            </Grid>
          </form>
        </>
      )}
    </>
  );
};

export default SignIn;
