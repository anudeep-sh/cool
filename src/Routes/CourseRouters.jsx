import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { LazyComponent } from '../components/LazyLoader';
import PrivateRoute from './PrivateRoute';

const CreateCourse = LazyComponent(() => import('../pages/Courses/CreateCourse'));
const CourseHomePage = LazyComponent(() => import('../pages/Courses/CourseHomePage'));
const UpdateCourse = LazyComponent(() => import('../pages/Courses/CourseUpdate'));
const CourseUpload = LazyComponent(() => import('../pages/Courseupload/Courseupload'));
const CourseVideo = LazyComponent(() => import('../pages/Coursevideo/Coursevideo'));
const CourseStatus = LazyComponent(() => import('../pages/Courses/CourseStatusUpdate'));

export const CourseRoutes = () => {
  return (
    <Routes>
      <Route path="/create" element={<CreateCourse />} />
      <Route path="/user" element={<CourseHomePage />} />

      <Route path="/update/:id" element={<UpdateCourse />} />
      <Route path="/upload/:id" element={<CourseUpload />} />
      <Route path="/videos/:id" element={<CourseVideo />} />
      {/* <Route
        path="/status/:id"
        element={
          <PrivateRoute notCoursePage={false} accessibleTo={['SUPERADMIN']}>
            <CourseStatus />
          </PrivateRoute>
        }
      /> */}
    </Routes>
  );
};
