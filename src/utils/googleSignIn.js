import axios from 'axios';
import jwt_decode from 'jwt-decode';

export const onGoogleSignInSuccess = async (data, navigate) => {
  try {
    let userData;
    if (data.credential) {
      userData = jwt_decode(data.credential);
    } else if (data.access_token) {
      const userInfoResponse = await axios.get('https://www.googleapis.com/oauth2/v1/userinfo', {
        headers: {
          Authorization: `Bearer ${data.access_token}`,
        },
      });
      userData = userInfoResponse.data;
    } else {
      throw new Error('Google Login Failed!');
    }
    const response = await axios.post(
      `${process.env.REACT_APP_URL}loginthroughgoogle`,
      {
        firstName: userData.given_name ?? '',
        lastName: userData.family_name ?? userData.given_name,
        email: userData.email,
        profilePhotoLink: userData.picture ?? '',
        username: userData.email,
      },
      {
        'Cross-Origin-Opener-Policy': 'same-origin-allow-popups',
      }
    );
    localStorage.setItem('Token', response?.data.token);
    navigate('/organization', { replace: true });
  } catch (error) {
    console.log('Google Login failed!');
    localStorage.setItem('Token', '');
  }
};
