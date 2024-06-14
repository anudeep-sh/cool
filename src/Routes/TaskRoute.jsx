import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { LazyComponent } from '../components/LazyLoader';
import PrivateRoute from './PrivateRoute';
import { useDocumentTitle } from '../utils/useDocumentTitle';

const CreatedTasks = LazyComponent(() => import('../pages/CreatedTasks'));
const AssignedTasks = LazyComponent(() => import('../pages/AssignedTasks'));
const TaskDetails = LazyComponent(() => import('../pages/Task/ViewTask'));
const TaskProgress = LazyComponent(() => import('../pages/Task/TaskProgress'));
const EditTask = LazyComponent(() => import('../pages/Task/CreateEditTask'));

export const TaskRoutes = () => {
  useDocumentTitle('Task');
  return (
    <Routes>
      <Route path="/created" element={<CreatedTasks />} />
      <Route path="/assigned" element={<AssignedTasks />} />
      <Route path="/:id" element={<TaskDetails />} />
      <Route path="/:id/:userId" element={<TaskDetails />} />
      <Route path="/progress/:id" element={<TaskProgress />} />
      <Route
        path="/edit/:id"
        element={
          <PrivateRoute accessibleTo={['SUPERADMIN', 'ADMIN', 'CREATOR']} notCoursePage={true}>
            <EditTask />
          </PrivateRoute>
        }
      />
    </Routes>
  );
};
