import jwt_decode from 'jwt-decode';

const parseJwt = (token) => {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch (e) {
    return null;
  }
};

const GetValidatedTokenData = () => {
  const token = localStorage.getItem('Token');
  if (token) {
    const decodedJwt = parseJwt(token);
    if (decodedJwt.exp * 1000 > Date.now()) {
      return { ...jwt_decode(token), isLoggedIn: true };
    } else {
      localStorage.removeItem('Token');
      window.location.href = '/sign-in';
      return { role: null, isLoggedIn: false };
    }
  } else {
    // if (window.location.pathname !== "/sign-in")
    //   window.location.href = "/sign-in";
    // needs to be added back once we have defined routes which needs token or not
    return { role: null, isLoggedIn: false };
  }
};

export default GetValidatedTokenData;
