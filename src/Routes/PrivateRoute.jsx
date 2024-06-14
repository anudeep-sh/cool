import React, { useState, useEffect } from 'react';
import PageNotFound from '../pages/PageNotFound/PageNotFound';
import { useParams } from 'react-router';
import { Box } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { courseAPI } from '../api/requests/courses/courseAPI';
import getRoleForOrganization from '../utils/GetUserRoleInOrganization';

const PrivateRoute = ({ children, notCoursePage, accessibleTo }) => {
  const [isValidCourseId, setIsValidCourseId] = useState(true);
  const [loading, setLoading] = useState(true);
  const [isAccessibelByRole, setIsAccessibelByRole] = useState(false);
  const { id } = useParams();

  const [role, setRole] = useState(null);

  useEffect(() => {
    const getUserRole = async () => {
      const userRole = await getRoleForOrganization();
      setRole(userRole);
    };
    getUserRole();
  }, []);
  // eslint-disable-next-line array-callback-return
  accessibleTo?.map((accessibleRole) => {
    if (accessibleRole === role && !isAccessibelByRole) setIsAccessibelByRole(true);
  });

  const checkIdValidity = async () => {
    try {
      if (!notCoursePage) {
        const response = await courseAPI.getSpecificCourse(id);
        setIsValidCourseId(response && true);
      }
    } catch (error) {
      if (error.request.status === 404) setIsValidCourseId(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkIdValidity(id);
  }, []);

  if (loading)
    return (
      <Box
        sx={{
          display: 'flex',
          height: '100vh',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <CircularProgress />
      </Box>
    );

  return (
    <React.Fragment>
      {role && (
        <>
          {isAccessibelByRole && (isValidCourseId || notCoursePage) ? (
            <>{children}</>
          ) : (
            <PageNotFound />
          )}
        </>
      )}
    </React.Fragment>
  );
};

export default PrivateRoute;
