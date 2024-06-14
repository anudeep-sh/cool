import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';

function ProtechtedRoute({ children, ...rest }) {
  const url = window.location.href;
  const splittedUrl = url.split('.');
  if (splittedUrl.length > 0) {
    const domainWithHTTP = splittedUrl[0];
    const domainSplit = domainWithHTTP.split('//');
    const domain = domainSplit[1];
    if (domain) {
      // const checkOrg = await
    }
  }
  const parseJwt = (token) => {
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
      return null;
    }
  };
  const validateToken = () => {
    const token = localStorage.getItem('Token');
    if (token) {
      const decodedJwt = parseJwt(token);
      if (decodedJwt.exp * 1000 > Date.now()) {
        return true;
      }
    }
    return false;
  };
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (validateToken()) {
      setIsLoggedIn(true);
      setIsVisible(true);
    } else {
      setIsLoggedIn(false);
      setIsVisible(true);
    }
  }, []);

  return <>{isVisible ? isLoggedIn ? <Outlet /> : (window.location.href = '/sign-in') : null}</>;
}

export default ProtechtedRoute;
