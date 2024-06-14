import { useParams } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';
import { Box, Button, CircularProgress, Stack, Typography } from '@mui/material';
import SideBarResponsive from '../../components/SideBarResponsive';
import { courseAPI } from '../../api/requests/courses/courseAPI';
import { courseStageAPI } from '../../api/requests/courses/courseStageAPI';
import { useState, useEffect } from 'react';
import PageNotFound from '../PageNotFound/PageNotFound';
import { UserRoles } from '../../utils/RoleDetails';
import getRoleForOrganization from '../../utils/GetUserRoleInOrganization';

const CourseStatusUpdate = ({ status, courseStage, courseId, setCourseStage, setStatus }) => {
  const CustomWidthTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))({
    [`& .${tooltipClasses.tooltip}`]: {
      maxWidth: 245,
    },
  });

  const { id } = useParams();
  const [isValidCourseId, setIsValidCourseId] = useState(true);
  const [loading, setLoading] = useState(true);
  const [approveStatus, setApproveStatus] = useState(status === 'APPROVED');
  const updateCourseStatus = async (status) => {
    try {
      await courseAPI.updateCourseStatus({ status: status }, id);
      setApproveStatus(!approveStatus);
      setStatus(status);
    } catch (err) {}
  };

  const checkIdValidity = async () => {
    try {
      const response = await courseAPI.getSpecificCourse(id);
      setIsValidCourseId(response && true);
    } catch (error) {
      error.request.status === 404 && setIsValidCourseId(false);
    } finally {
      setLoading(false);
    }
  };
  const [currUserRole, setCurrUserRole] = useState(null);

  useEffect(() => {
    const getUserRole = async () => {
      const userRole = await getRoleForOrganization();
      setCurrUserRole(userRole);
    };
    getUserRole();
  });

  const enrollCourse = async () => {
    await courseStageAPI.addCourseStage(courseId, 'ENROLLED').catch((err) => {});
    setCourseStage('ENROLLED');
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
  // {Role === UserRoles.SUPERADMIN && status !== '' ? (
  //   <CourseStatusUpdate status={status} Role={currUserRole}/>
  // ) : null}
  return (
    <>
      {isValidCourseId ? (
        <>
          {/* <SideBarResponsive /> */}
          {/* <Box
            sx={{
              flexGrow: 1,
              p: 3,
              width: { sm: `calc(100% - ${drawerWidth}px)` },
              ml: { sm: `${drawerWidth}px` },
              height: '100vh',
            }}
          > */}
          {/* <Typography variant="h5" mb={4} sx={{ textAlign: 'center' }}>
              Update Course Status
            </Typography>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Stack
                direction={{ md: 'row' }}
                p={5}
                alignItems="center"
                justifyContent="space-between"
                spacing={{ xs: 3, sm: 2, md: 4 }}
                sx={{
                  width: { lg: '80%', xl: '70%' },
                  borderRadius: '4px',
                  backgroundColor: '#f2f0f0',
                }}
              >
                <Stack>
                  <Typography variant="bod2" sx={{ fontWeight: 'bold' }}>
                    Course ID
                  </Typography>
                  <Typography variant="body1" sx={{ color: 'grey' }}>
                    {id}
                  </Typography>
                </Stack> */}

          {(currUserRole === UserRoles.SUPERADMIN || currUserRole === UserRoles.CREATOR) &&
          status &&
          status !== 'APPROVED' ? (
            <Stack direction="row" alignItems="center" spacing={2}>
              <CustomWidthTooltip
                title="Click Approve to share this course with your organization users"
                width={'20px'}
                arrow
              >
                <Button
                  onClick={() => updateCourseStatus('APPROVED')}
                  variant="contained"
                  width="2rem"
                  disabled={approveStatus}
                  sx={{
                    fontFamily: 'Poppins',
                    fontSize: '15px',
                    fontStyle: 'normal',
                    fontWeight: '400',
                    lineHeight: 'normal',
                  }}
                >
                  APPROVE
                </Button>
              </CustomWidthTooltip>

              <Tooltip
                title="Click Review to update it with the latest knowledge and skills. Course won't be available until approved again."
                arrow
              >
                <Button
                  onClick={() => updateCourseStatus('UNDERREVIEW')}
                  variant="contained"
                  disabled={!approveStatus}
                  sx={{
                    fontFamily: 'Poppins',
                    fontSize: '15px',
                    fontStyle: 'normal',
                    fontWeight: '400',
                    lineHeight: 'normal',
                  }}
                >
                  REVIEW
                </Button>
              </Tooltip>
            </Stack>
          ) : courseStage !== 'ENROLLED' ? (
            <Stack>
              <Button
                variant="contained"
                onClick={() => {
                  enrollCourse();
                }}
                sx={{
                  fontFamily: 'Poppins',
                  fontSize: '15px',
                  fontStyle: 'normal',
                  fontWeight: '400',
                  lineHeight: 'normal',
                }}
              >
                Enroll Now
              </Button>
            </Stack>
          ) : null}
        </>
      ) : (
        <PageNotFound />
      )}
    </>
  );
};

export default CourseStatusUpdate;
