import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { LazyComponent } from '../components/LazyLoader';
import PrivateRoute from './PrivateRoute';

const CreateContest = LazyComponent(() => import('../components/Admin/Pages/CreateContest'));
const CreateProblem = LazyComponent(() => import('../components/Admin/Pages/CreateProblem'));
const EditContest = LazyComponent(() => import('../components/Admin/Pages/EditContest'));
const EditProblem = LazyComponent(() => import('../components/Admin/Pages/EditProblem'));
const AddOrganization = LazyComponent(() => import('../pages/Organization/Organization'));
const MigrateOrganization = LazyComponent(() =>
  import('../pages/Organization/MigrateOrganization')
);
const ProblemDetails = LazyComponent(() =>
  import('../components/Admin/Components/Contest/ProblemsDetails')
);
const ProblemSubmissionData = LazyComponent(() =>
  import('../components/Admin/Components/Contest/ProblemSubmissionData')
);

export const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/contest/:contestId/problems/:problemId" element={<ProblemSubmissionData />} />
      <Route path="/contest/:contestId/problems" element={<ProblemDetails />} />
      <Route path="/contest" element={<CreateContest />} />
      <Route path="/:contestId" element={<CreateProblem />} />
      <Route path="/contest/:contestId/edit" element={<EditContest />} />
      <Route path="/:problemId/edit/" element={<EditProblem />} />
      {/* <Route
        path="/organization/add"
        element={
          <PrivateRoute notCoursePage={true} accessibleTo={['SUPERADMIN', 'CREATOR']}>
            <AddOrganization />
          </PrivateRoute>
        }
      />
      <Route
        path="/organization/actions"
        element={
          <PrivateRoute notCoursePage={true} accessibleTo={['SUPERADMIN']}>
            <MigrateOrganization />
          </PrivateRoute>
        }
      /> */}
    </Routes>
  );
};
