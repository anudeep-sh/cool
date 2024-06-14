import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { LazyComponent } from '../components/LazyLoader';
import { useDocumentTitle } from '../utils/useDocumentTitle';

const Contest = LazyComponent(() => import('../pages/Contest/ContestHome'));
const ViewAll = LazyComponent(() => import('../components/CodingContests/ContestHome/ViewAll'));
const ContestDetails = LazyComponent(() => import('../pages/Contest/ContestDetail'));
const ContestRanking = LazyComponent(() => import('../pages/Contest/ContestRanking'));
const AllUserCreatedContest = LazyComponent(() => import('../pages/Contest/AllUserCreatedContest'));
const ViewAllContests = LazyComponent(() => import('../pages/Contest/ViewAllContests'));
export const ContestRoutes = () => {
  useDocumentTitle('Contest');
  return (
    <Routes>
      <Route index element={<Contest />} />
      <Route path="/user" element={<AllUserCreatedContest />} />
      <Route path="/rankings" element={<ViewAll />} />
      <Route path="/:contestId" element={<ContestDetails />} />
      <Route path="/:contestId/:time/:contest_code/ranking" element={<ContestRanking />} />
      <Route path="/viewAllContest" element={<ViewAllContests />} />
    </Routes>
  );
};
