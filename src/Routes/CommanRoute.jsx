import React from 'react';
import { Navigate, Outlet, Route } from 'react-router-dom';
import { useAuth } from './useAuth';

function CommanRoute({ ...rest }) {
  const { isLoggedIn, isVisible } = useAuth();

  return <>{isVisible ? !isLoggedIn ? <Outlet /> : <Navigate to="/organization" /> : null}</>;
}

export default CommanRoute;
