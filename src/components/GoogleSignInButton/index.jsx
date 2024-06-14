import React from 'react';
import { Button, CircularProgress, Icon } from '@mui/material';
import GoogleIcon from '../../assets/SignInSignUp/icon/google-icon.svg';
import { useGoogleLogin } from '@react-oauth/google';
import { onGoogleSignInSuccess } from '../../utils/googleSignIn';
import { useNavigate } from 'react-router-dom';

const GoogleSignInButton = () => {
  const navigate = useNavigate();
  const svgIcon = (
    <Icon sx={{ lineHeight: '0.75' }}>
      <img alt="edit" src={GoogleIcon} />
    </Icon>
  );
  const [isLoading, setIsLoading] = React.useState(false);

  const login = useGoogleLogin({
    onSuccess: (data) => {
      onGoogleSignInSuccess(data, navigate);
    },
    onNonOAuthError: () => {
      setIsLoading(() => false);
    },
  });
  const handleLogin = () => {
    setIsLoading(() => true);
    login();
  };
  return (
    <Button
      fullWidth
      variant="outlined"
      startIcon={isLoading ? null : svgIcon}
      onClick={() => handleLogin()}
      sx={{
        textTransform: 'none',
        fontWeight: '400',
        mb: 2,
        pt: 1,
        pb: 1,
        borderColor: '#EBEBEB',
        color: '#787878',
        boxShadow: 'rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px',
      }}
    >
      {isLoading ? <CircularProgress /> : 'Sign in with Google'}
    </Button>
  );
};

export default GoogleSignInButton;
