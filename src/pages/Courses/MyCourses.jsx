import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import Product from '../../components/ProductCarousel/Product';
import 'react-phone-number-input/style.css';
import 'react-multi-carousel/lib/styles.css';
import { courseAPI } from '../../api/requests/courses/courseAPI';

const MyCourses = () => {
  const [loading, setLoading] = useState(true);
  const [isUserProfileInProduct, setIsUserProfileInProduct] = useState(true);
  const [courses, setCourses] = useState();
  const [enrolledCourses, setEnrolledCourses] = useState();

  useEffect(() => {
    const getAllData = async () => {
      setLoading(true);
      await Promise.all([getEnrolledCourses(), getCourses()]);
      setLoading(false);
    };
    getAllData();
  }, []);

  const getCourses = async () => {
    try {
      const data = await courseAPI.getUserCourses(0);
      setCourses(data && data);
    } catch (err) {}
  };
  const getEnrolledCourses = async () => {
    try {
      const data = await courseAPI.getCourseUserHasAccessTo();
      setEnrolledCourses(data && data);
    } catch (err) {}
  };
  const drawerWidth = 200;
  return (
    <>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Box display="flex" flexDirection="column">
          <Box sx={{ margin: '1rem' }}>
            <Product
              title={'Courses created by you'}
              dataRender={courses}
              loading={loading}
              isEditable={true}
              isUserProfileInProduct={isUserProfileInProduct}
              getCourses={getCourses}
              courses={courses}
            />
          </Box>
          <Box sx={{ margin: '1rem' }}>
            {enrolledCourses?.length > 0 ? (
              <Product
                title={'Courses you have Enrolled'}
                dataRender={enrolledCourses}
                loading={loading}
              />
            ) : null}
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default MyCourses;
